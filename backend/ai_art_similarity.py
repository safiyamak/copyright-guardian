import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing import image  # Add this line

from tensorflow.keras.models import Model
import matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
import requests
from PIL import Image
from io import BytesIO
import pickle
import glob
from tqdm import tqdm
import base64

class ImageSimilaritySearch:
    def __init__(self, model_type="resnet50", pooling="avg"):
        """
        Initialize the image similarity search system.
        
        Args:
            model_type (str): The pre-trained model to use as feature extractor.
            pooling (str): The pooling method to use for the feature extraction.
        """
        self.model_type = model_type
        self.pooling = pooling
        self.feature_vector_size = 2048  # ResNet50 feature size
        self.feature_extractor = self._build_feature_extractor()
        self.database_features = None
        self.database_paths = None
        self.nn_model = None
        
    def _build_feature_extractor(self):
        """Build the feature extractor model."""
        base_model = ResNet50(weights='imagenet', include_top=False, pooling=self.pooling)
        model = Model(inputs=base_model.input, outputs=base_model.output)
        return model
    def save_features_cache(self, cache_path):
        """
        Save extracted features and model state to cache.
        
        Args:
            cache_path (str): Path to save the cache file.
        """
        cache = {
            'features': self.database_features,
            'paths': self.database_paths,
            'model_type': self.model_type,
            'pooling': self.pooling,
            'feature_vector_size': self.feature_vector_size
        }
        with open(cache_path, 'wb') as f:
            pickle.dump(cache, f)
        print(f"Features cache saved to {cache_path}")

    def load_features_cache(self, cache_path):
        """
        Load extracted features and model state from cache.
        
        Args:
            cache_path (str): Path to load the cache file from.
        """
        with open(cache_path, 'rb') as f:
            cache = pickle.load(f)
        
        self.database_features = cache['features']
        self.database_paths = cache['paths']
        self.model_type = cache['model_type']
        self.pooling = cache['pooling']
        self.feature_vector_size = cache['feature_vector_size']
        
        # Rebuild the nearest neighbors model
        self._build_nn_model()
    def _preprocess_image(self, img_data, target_size=(224, 224)):
        """
        Preprocess an image for the feature extractor.
        
        Args:
            img_data (str or PIL.Image): Base64 string, file path, or PIL Image object.
            target_size (tuple): Target size for resizing.
            
        Returns:
            numpy.ndarray: Preprocessed image.
        """
        try:
            if isinstance(img_data, str):
                if img_data.startswith('data:image'):
                    # Handle base64 data URL
                    base64_data = img_data.split(',')[1]
                    img_bytes = base64.b64decode(base64_data)
                    img = Image.open(BytesIO(img_bytes))
                elif img_data.startswith('http'):
                    # Handle HTTP URLs
                    response = requests.get(img_data)
                    img = Image.open(BytesIO(response.content))
                else:
                    # Handle local file paths
                    img = Image.open(img_data)
            else:
                img = img_data
                
            # Convert grayscale to RGB if needed
            if img.mode != 'RGB':
                img = img.convert('RGB')
                
            img = img.resize(target_size)
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            return preprocess_input(img_array)
        except Exception as e:
            raise ValueError(f"Error processing image: {str(e)}")

    
    def extract_features(self, img_data):
        """
        Extract features from an image.
        
        Args:
            img_data (str or PIL.Image): Base64 string, file path, or PIL Image object.
            
        Returns:
            numpy.ndarray: Feature vector.
        """
        preprocessed_img = self._preprocess_image(img_data)
        features = self.feature_extractor.predict(preprocessed_img)
        return features.flatten()
    
    def index_database(self, database_dir, pattern="*.png", batch_size=32, save_path=None, cache_path=None):
        """
        Index all images in a directory to build a searchable database.
        
        Args:
            database_dir (str): Directory containing images.
            pattern (str): Pattern to match image files.
            batch_size (int): Batch size for feature extraction.
            save_path (str, optional): Path to save the database.
            
        Returns:
            tuple: (features, image_paths)
        """
        image_paths = glob.glob(os.path.join(database_dir, pattern))
        image_paths.extend(glob.glob(os.path.join(database_dir, "*.jpeg")))
        image_paths.extend(glob.glob(os.path.join(database_dir, "*.png")))
        if cache_path and os.path.exists(cache_path):
            print("Loading features from cache...")
            self.load_features_cache(cache_path)
            return self.database_features, self.database_paths
        print(f"Found {len(image_paths)} images in database directory.")
        
        if len(image_paths) == 0:
            raise ValueError(f"No images found in {database_dir} with pattern {pattern}")
        
        # Process images in batches
        all_features = []
        valid_paths = []
        
        for i in tqdm(range(0, len(image_paths), batch_size), desc="Extracting features"):
            batch_paths = image_paths[i:i+batch_size]
            batch_images = []
            
            for img_path in batch_paths:
                try:
                    preprocessed_img = self._preprocess_image(img_path)
                    batch_images.append(preprocessed_img[0])  # Remove batch dimension
                    valid_paths.append(img_path)
                except Exception as e:
                    print(f"Error processing {img_path}: {e}")
            
            if batch_images:
                batch_images = np.array(batch_images)
                batch_features = self.feature_extractor.predict(batch_images)
                all_features.extend(batch_features)
        
        # Convert to numpy arrays
        features_array = np.array(all_features)
        
        self.database_features = features_array
        self.database_paths = valid_paths
        
        # Build the nearest neighbors model
        self._build_nn_model()
        
        if save_path:
            self.save_database(save_path)
        if cache_path:
            self.save_features_cache(cache_path)
            
        return features_array, valid_paths
    
    def _build_nn_model(self):
        """Build the nearest neighbors model for searching."""
        self.nn_model = NearestNeighbors(n_neighbors=10, algorithm='auto', metric='cosine')
        self.nn_model.fit(self.database_features)
    
    def search(self, query_img_data, top_k=5):
        """
        Search for similar images in the database.
        
        Args:
            query_img_data (str or PIL.Image): Base64 string, file path, or PIL Image object.
            top_k (int): Number of results to return.
            
        Returns:
            list: List of (similarity_score, image_path) tuples.
        """
        if self.database_features is None or self.nn_model is None:
            raise ValueError("Database not indexed. Call index_database() first.")
        
        # Extract features from query image
        query_features = self.extract_features(query_img_data)
        query_features = query_features.reshape(1, -1)
        
        # Find nearest neighbors
        distances, indices = self.nn_model.kneighbors(
            query_features, 
            n_neighbors=min(top_k, len(self.database_paths))
        )
        
        # Prepare results
        results = []
        for i, idx in enumerate(indices[0]):
            similarity_score = 1.0 - distances[0][i]  # Convert distance to similarity
            results.append((similarity_score, self.database_paths[idx]))
        
        return results
    
    def save_database(self, path):
        """
        Save the indexed database to disk.
        
        Args:
            path (str): Path to save the database.
        """
        database = {
            'features': self.database_features,
            'paths': self.database_paths
        }
        with open(path, 'wb') as f:
            pickle.dump(database, f)
        print(f"Database saved to {path}")
    
    def load_database(self, path):
        """
        Load an indexed database from disk.
        
        Args:
            path (str): Path to load the database from.
        """
        with open(path, 'rb') as f:
            database = pickle.load(f)
        
        self.database_features = database['features']
        self.database_paths = database['paths']
        self._build_nn_model()
        print(f"Loaded database with {len(self.database_paths)} images")
    
    def visualize_results(self, query_img_path, results, display_size=(224, 224)):
        """
        Visualize search results.
        
        Args:
            query_img_path (str or PIL.Image): Path to query image or PIL Image object.
            results (list): List of (similarity_score, image_path) tuples.
            display_size (tuple): Display size for images.
        """
        if isinstance(query_img_path, str):
            if query_img_path.startswith('http'):
                response = requests.get(query_img_path)
                query_img = Image.open(BytesIO(response.content))
            else:
                query_img = Image.open(query_img_path)
        else:
            query_img = query_img_path
        
        # Create a figure with subplots
        n_results = len(results)
        fig, axes = plt.subplots(1, n_results + 1, figsize=(15, 4))
        
        # Display query image
        axes[0].imshow(query_img.resize(display_size))
        axes[0].set_title("Query Image")
        axes[0].axis('off')
        
        # Display results
        for i, (score, path) in enumerate(results):
            img = Image.open(path)
            axes[i + 1].imshow(img.resize(display_size))
            axes[i + 1].set_title(f"Score: {score:.2f}")
            axes[i + 1].axis('off')
        
        plt.tight_layout()
        plt.show()


def download_sample_dataset(output_dir, num_images=100):
    """
    Download a sample dataset from the CIFAR-10 dataset.
    
    Args:
        output_dir (str): Directory to save the images.
        num_images (int): Number of images to download.
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Load CIFAR-10 dataset
    (x_train, y_train), _ = tf.keras.datasets.cifar10.load_data()
    
    # Define class names
    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
                   'dog', 'frog', 'horse', 'ship', 'truck']
    
    # Save images
    count = 0
    for i in range(min(num_images, len(x_train))):
        img = Image.fromarray(x_train[i])
        class_name = class_names[y_train[i][0]]
        img_path = os.path.join(output_dir, f"{class_name}_{i}.png")
        img.save(img_path)
        count += 1
    
    print(f"Downloaded {count} images to {output_dir}")

def search_with_query_image(query_img_path, top_k=5):
    """
    Search for similar images using a user-provided query image.
    
    Args:
        cache_path (str): Path to the features cache file.
        database_path (str): Path to the database file.
        top_k (int): Number of similar images to return.
    """
    # Download a sample dataset
    sample_dir = "art_dataset"
    cache_path = "features_cache.pkl"
    print(query_img_path)
    # download_sample_dataset(sample_dir, num_images=200)
    
    # Initialize the image similarity search system
    search_system = ImageSimilaritySearch()
    
    # Index the database
    print("Indexing the database...")
    search_system.index_database(sample_dir, save_path="image_database.pkl", cache_path=cache_path)
    
    search_system.index_database(
        sample_dir, 
        save_path="image_database.pkl",
        cache_path=cache_path
    )

    # Test with a sample query image
    results = search_system.search(query_img_path, top_k=5)
    
    # Print results
    print("\nSearch results:")
    for score, path in results:
        print(f"Score: {score:.4f}, Path: {path}")
# Example usage
if __name__ == "__main__":
    base64_image = "data:image/jpeg;base64,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"
    search_with_query_image(base64_image)