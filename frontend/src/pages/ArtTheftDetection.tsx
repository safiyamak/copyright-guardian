import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  UploadCloud,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Fingerprint,
  Search,
  ImageOff,
  ScanLine,
  Globe,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4",
    title: "Potential match found",
    description:
      "Your artwork 'Urban Landscape #3' was found on unauthorized gallery site",
    matchPercentage: 92,
    detectedUrl: "unauthorized-gallery.example.com/item/283",
    timestamp: "2 hours ago",
    status: "high",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5",
    title: "Multiple copies detected",
    description:
      "Your 'Abstract Flow Series' appeared on 3 different marketplaces",
    matchPercentage: 87,
    detectedUrl: "digital-marketplace.example.com/product/87342",
    timestamp: "Yesterday",
    status: "medium",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7",
    title: "Modified version detected",
    description:
      "A modified version of 'Neon Dreams' was found with 76% similarity",
    matchPercentage: 76,
    detectedUrl: "social-platform.example.com/post/29875",
    timestamp: "3 days ago",
    status: "low",
  },
];

const recentScans = [
  {
    id: 1,
    name: "Sunset Horizon.jpg",
    timestamp: "Today, 10:23 AM",
    status: "complete",
    matches: 0,
  },
  {
    id: 2,
    name: "Abstract_Collection_2023.zip",
    timestamp: "Yesterday, 4:45 PM",
    status: "complete",
    matches: 3,
  },
  {
    id: 3,
    name: "Portrait_Series.png",
    timestamp: "Aug 15, 2023",
    status: "complete",
    matches: 1,
  },
];

const ArtTheftDetection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchPrompt, setSearchPrompt] = useState(
    "Please identify this image and provide relevant information about it"
  );
  const [apiKey, setApiKey] = useState("");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      // Reset previous results when a new file is selected
      setScanResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      // Reset previous results when a new file is selected
      setScanResult(null);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="dashboard-header">
        <h1 className="dashboard-title">AI Art Theft Detection</h1>
        <p className="dashboard-description">
          Protect your artwork with advanced AI visual recognition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Upload Artwork for Protection</CardTitle>
              <CardDescription>
                Our AI will scan and protect your visual artwork across the web
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isScanning ? (
                <div className="space-y-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Scanning web for matches...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <div className="flex flex-col items-center p-8 text-center text-muted-foreground">
                    <ScanLine className="h-12 w-12 text-brand-500 mb-4 animate-pulse" />
                    <p className="max-w-md">
                      Our AI is scanning the web for similar images. This may
                      take a few minutes.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center mb-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <div className="flex flex-col items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground max-w-md">
                      {selectedFile
                        ? `Selected: ${selectedFile.name}`
                        : "Drag and drop your images here, or click to browse files"}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, WEBP, SVG | Max size: 20MB
                    </div>
                  </div>
                </div>
              )}
              <Button
                onClick={startScan}
                disabled={!selectedFile || isScanning}
                className="w-full"
              >
                {isScanning ? "Scanning..." : "Scan with Perplexity Sonar"}
              </Button>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Potential Theft Alerts
            </h2>
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className="border shadow-sm overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto">
                        <img
                          src={alert.image}
                          alt={alert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold flex items-center">
                              {alert.status === "high" ? (
                                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                              ) : alert.status === "medium" ? (
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                              )}
                              {alert.title}
                            </h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </div>
                          </div>
                          <Badge
                            className={
                              alert.status === "high"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : alert.status === "medium"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          >
                            {alert.matchPercentage}% match
                          </Badge>
                        </div>

                        <div className="mt-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Globe className="h-3 w-3 mr-1" />
                            Found at: {alert.detectedUrl}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Detected {alert.timestamp}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm">Take Action</Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border shadow-sm p-8 text-center">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <p className="text-muted-foreground">
                    No theft alerts detected. Your artwork is currently secure.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Protection Statistics</CardTitle>
              <CardDescription>Overview of your art protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Protected Artworks
                  </span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Monitors</span>
                  <span className="font-medium">38</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Potential Matches
                  </span>
                  <span className="font-medium text-amber-600">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confirmed Theft</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Web Pages Scanned
                  </span>
                  <span className="font-medium">5.2M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                Latest artwork protection activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between pb-2 border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{scan.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {scan.timestamp}
                        </div>
                      </div>
                    </div>
                    {scan.status === "complete" ? (
                      scan.matches > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          {scan.matches} matches
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Secure
                        </Badge>
                      )
                    ) : (
                      <Badge>Scanning...</Badge>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Scans
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>AI Detection Settings</CardTitle>
              <CardDescription>
                Configure theft detection sensitivity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm">Similarity Threshold</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm">Scan Frequency</span>
                    <span className="text-sm font-medium">Daily</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm">Alert Sensitivity</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                Adjust Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtTheftDetection;
