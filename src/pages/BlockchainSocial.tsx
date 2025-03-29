import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Heart,
  MessageSquare,
  Bookmark,
  Shield,
  Award,
  Lock,
} from "lucide-react";

const posts = [
  {
    id: 1,
    author: {
      name: "Maya Johnson",
      handle: "@maya_creates",
      avatar: null,
      initials: "MJ",
    },
    content:
      "Just finished my latest digital painting series! All works are now secured with blockchain verification. #DigitalArt #BlockchainProtected",
    timestamp: "2 hours ago",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    stats: {
      likes: 128,
      comments: 24,
      shares: 18,
    },
    verified: true,
  },
  {
    id: 2,
    author: {
      name: "Alex Rivera",
      handle: "@alex_music",
      avatar: null,
      initials: "AR",
    },
    content:
      "Released my new EP today! Each track has a unique NFT certificate of authenticity. Listen now and check out the blockchain verification. #MusicNFT #NewRelease",
    timestamp: "5 hours ago",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    stats: {
      likes: 243,
      comments: 56,
      shares: 87,
    },
    verified: true,
  },
  {
    id: 3,
    author: {
      name: "Tara Chen",
      handle: "@tara_visuals",
      avatar: null,
      initials: "TC",
    },
    content:
      "Working on a new photography collection that explores urban landscapes. All previews are watermarked and blockchain-protected. #Photography #UrbanArt",
    timestamp: "Yesterday",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    stats: {
      likes: 92,
      comments: 17,
      shares: 5,
    },
    verified: true,
  },
];

const BlockchainSocial = () => {
  return (
    <div className="space-y-8">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Blockchain Social Media</h1>
        <p className="dashboard-description">
          A secure social platform for artists with blockchain-verified content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Activity Feed</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-4 mt-4">
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="flex">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>CG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 border rounded-lg">
                    <textarea
                      className="w-full p-3 resize-none h-24 rounded-lg focus:outline-none"
                      placeholder="Share your work with blockchain protection..."
                    />
                    <div className="flex justify-between items-center p-3 border-t">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Lock className="h-4 w-4 mr-2" />
                          Protect
                        </Button>
                      </div>
                      <Button>Post</Button>
                    </div>
                  </div>
                </div>
              </div>

              {posts.map((post) => (
                <Card key={post.id} className="border shadow-sm">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Avatar className="h-10 w-10 mr-3">
                          {post.author.avatar ? (
                            <AvatarImage src={post.author.avatar} />
                          ) : (
                            <AvatarFallback>
                              {post.author.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-base">
                              {post.author.name}
                            </CardTitle>
                            {post.verified && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-brand-50 text-brand-700 border-brand-200"
                              >
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">
                            {post.author.handle} • {post.timestamp}
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-3">{post.content}</p>
                    {post.image && (
                      <div className="relative rounded-lg overflow-hidden mb-3">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 text-white border-0">
                            <Award className="h-3 w-3 mr-1" />
                            Blockchain Protected
                          </Badge>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.stats.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.stats.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.stats.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trending">
              <div className="h-64 flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">
                  Trending content will appear here
                </p>
              </div>
            </TabsContent>

            <TabsContent value="following">
              <div className="h-64 flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">
                  Content from followed creators will appear here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Stats</CardTitle>
              <CardDescription>Your content protection metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Protected Works</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Verification Requests
                  </span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Blockchain Certificates
                  </span>
                  <span className="font-medium">35</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Network Security
                  </span>
                  <span className="text-green-600 font-medium">High</span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  View Blockchain Records
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Suggested Creators</CardTitle>
              <CardDescription>
                Artists you might want to follow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Jordan Lee", handle: "@jordanart", initials: "JL" },
                { name: "Priya Sharma", handle: "@priyamusic", initials: "PS" },
                { name: "Marco Diaz", handle: "@marcophotos", initials: "MD" },
              ].map((creator, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{creator.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{creator.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {creator.handle}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSocial;
