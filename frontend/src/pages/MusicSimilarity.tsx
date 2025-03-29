import { useState } from "react";
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
  Music,
  AudioWaveform,
  PlayCircle,
  PauseCircle,
  Globe,
  FileAudio,
  Clock,
  Download,
  BarChart,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const audioTracks = [
  {
    id: 1,
    title: "Ambient Flow",
    artist: "Your Name",
    duration: "3:42",
    waveform: generateRandomWaveform(50),
    protected: true,
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "Your Name",
    duration: "4:18",
    waveform: generateRandomWaveform(50),
    protected: true,
  },
  {
    id: 3,
    title: "Midnight Groove",
    artist: "Your Name",
    duration: "2:55",
    waveform: generateRandomWaveform(50),
    protected: false,
  },
];

const similarityResults = [
  {
    id: 1,
    trackName: "Ambient Flow",
    artist: "Your Name",
    matchedTrack: "Ambient Waves",
    matchedArtist: "Unknown Artist",
    platform: "MusicStream",
    url: "musicstream.example.com/track/54321",
    similarityScore: 82,
    status: "high",
  },
  {
    id: 2,
    trackName: "Electric Dreams",
    artist: "Your Name",
    matchedTrack: "Dream Sequence",
    matchedArtist: "DJ ElectroBeat",
    platform: "BeatShare",
    url: "beatshare.example.com/track/9876",
    similarityScore: 68,
    status: "medium",
  },
];

function generateRandomWaveform(length: number) {
  return Array.from({ length }, () => Math.random() * 0.8 + 0.2);
}

const MusicSimilarity = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

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

  const togglePlay = (id: number) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Music Similarity Detection</h1>
        <p className="dashboard-description">
          AI-powered audio analysis to protect your music from unauthorized use
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Upload Audio for Protection</CardTitle>
              <CardDescription>
                Our AI will analyze and monitor your music across streaming
                platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isScanning ? (
                <div className="space-y-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Analyzing audio fingerprint...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <div className="flex flex-col items-center p-8 text-center text-muted-foreground">
                    <AudioWaveform className="h-12 w-12 text-brand-500 mb-4 animate-pulse" />
                    <p className="max-w-md">
                      Our AI is creating an audio fingerprint and scanning
                      platforms for similar tracks.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground max-w-md">
                      Drag and drop your audio files here, or click to browse
                      files
                    </p>
                    <div className="mt-4">
                      <Button onClick={startScan}>Upload & Analyze</Button>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Supported formats: MP3, WAV, FLAC, OGG | Max size: 50MB
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Your Protected Tracks
            </h2>
            <Card>
              <CardContent className="p-4">
                {audioTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center p-3 border-b last:border-0 hover:bg-muted/20 rounded-md transition-colors"
                  >
                    <button
                      className="mr-3 text-brand-500"
                      onClick={() => togglePlay(track.id)}
                    >
                      {currentlyPlaying === track.id ? (
                        <PauseCircle className="h-8 w-8" />
                      ) : (
                        <PlayCircle className="h-8 w-8" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{track.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {track.artist}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-3">
                            {track.duration}
                          </span>
                          {track.protected ? (
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              Protected
                            </Badge>
                          ) : (
                            <Badge variant="outline">Unprotected</Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center h-8">
                        {track.waveform.map((value, i) => (
                          <div
                            key={i}
                            className={`w-1 mx-0.5 rounded-full ${
                              currentlyPlaying === track.id
                                ? "bg-brand-500"
                                : "bg-gray-300"
                            }`}
                            style={{
                              height: `${value * 100}%`,
                              opacity: currentlyPlaying === track.id ? 1 : 0.7,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="ml-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Similarity Detection Results
            </h2>
            {similarityResults.length > 0 ? (
              <div className="space-y-4">
                {similarityResults.map((result) => (
                  <Card key={result.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            {result.status === "high" ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            ) : result.status === "medium" ? (
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                            )}
                            Similarity with "{result.matchedTrack}"
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            Your track "{result.trackName}" has similarities
                            with a track by {result.matchedArtist}
                          </div>
                        </div>
                        <Badge
                          className={
                            result.similarityScore > 80
                              ? "bg-red-50 text-red-700 border-red-200"
                              : result.similarityScore > 60
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {result.similarityScore}% similarity
                        </Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/20 rounded-md">
                          <div className="text-sm font-medium mb-1">
                            Your Track
                          </div>
                          <div className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-brand-500" />
                            <span className="text-sm">{result.trackName}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            by {result.artist}
                          </div>
                        </div>

                        <div className="p-3 bg-muted/20 rounded-md">
                          <div className="text-sm font-medium mb-1">
                            Similar Track
                          </div>
                          <div className="flex items-center">
                            <Music className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="text-sm">
                              {result.matchedTrack}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            by {result.matchedArtist}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Globe className="h-3 w-3 mr-1" />
                          Found on: {result.platform} ({result.url})
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button size="sm">Compare Tracks</Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border shadow-sm p-8 text-center">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <p className="text-muted-foreground">
                    No significant similarities detected. Your music is unique!
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Audio Protection Stats</CardTitle>
              <CardDescription>
                Overview of your music protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Protected Tracks
                  </span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    AI Scans Completed
                  </span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Platforms Monitored
                  </span>
                  <span className="font-medium">14</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Potential Matches
                  </span>
                  <span className="font-medium text-amber-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Combined Duration
                  </span>
                  <span className="font-medium">2h 42m</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Audio Analysis</CardTitle>
              <CardDescription>How your music is analyzed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Audio Fingerprinting</h3>
                <div className="h-10 bg-gradient-to-r from-brand-100 via-brand-500 to-brand-900 rounded-md relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                    Advanced Detection
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Our AI creates unique fingerprints based on acoustic features
                  of your tracks
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Feature Analysis</h3>
                <div className="grid grid-cols-5 gap-1 h-14">
                  {[65, 40, 85, 35, 70].map((value, i) => (
                    <div key={i} className="relative">
                      <div
                        className="absolute bottom-0 w-full bg-brand-500 rounded-t-sm"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tempo</span>
                  <span>Pitch</span>
                  <span>Melody</span>
                  <span>Rhythm</span>
                  <span>Harmony</span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  View Full Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Detection Platforms</CardTitle>
              <CardDescription>Where we monitor for your music</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Spotify", coverage: 98 },
                  { name: "YouTube", coverage: 95 },
                  { name: "SoundCloud", coverage: 92 },
                  { name: "Apple Music", coverage: 90 },
                  { name: "TikTok", coverage: 85 },
                ].map((platform, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{platform.name}</span>
                      <span className="text-muted-foreground">
                        {platform.coverage}%
                      </span>
                    </div>
                    <Progress value={platform.coverage} className="h-1" />
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-center text-muted-foreground">
                Plus 9 more platforms monitored
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicSimilarity;
