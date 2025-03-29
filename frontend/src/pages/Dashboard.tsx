import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Database,
  Eye,
  Music,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const features = [
    {
      title: "Blockchain Social Media",
      description:
        "A secure social media platform for artists built on blockchain technology to protect their intellectual property.",
      icon: <Database className="h-6 w-6 text-brand-500" />,
      path: "/blockchain-social",
      stats: { users: "5.2K", posts: "18.3K", secured: "100%" },
    },
    {
      title: "Art Theft Detection",
      description:
        "AI-powered visual analysis to detect unauthorized use and plagiarism of your artwork across the web.",
      icon: <Eye className="h-6 w-6 text-brand-500" />,
      path: "/art-theft-detection",
      stats: { scanned: "12M", detected: "426", accuracy: "99.2%" },
    },
    {
      title: "Music Similarity Detection",
      description:
        "Advanced audio analysis to identify potential copyright infringement in music using AI algorithms.",
      icon: <Music className="h-6 w-6 text-brand-500" />,
      path: "/music-similarity",
      stats: { analyzed: "8.4K", matches: "312", confidence: "97.8%" },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Copyright Guardian Dashboard</h1>
        <p className="dashboard-description">
          Monitor and protect your intellectual property with our AI-powered
          tools
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {features.map((feature, index) => (
          <Link to={feature.path} key={index} className="group">
            <div className="feature-card h-full flex flex-col">
              <div className="feature-card-header">
                <div className="feature-card-title">{feature.title}</div>
                {feature.icon}
              </div>
              <div className="feature-card-description">
                {feature.description}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {Object.entries(feature.stats).map(([label, value]) => (
                  <div key={label} className="stats-card text-center">
                    <div className="text-xl font-semibold">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end">
                <Button
                  variant="ghost"
                  className="group-hover:text-brand-600 group-hover:bg-brand-50"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Protected Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26,843</div>
            <div className="text-xs flex items-center mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Potential Infringements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">738</div>
            <div className="text-xs flex items-center mt-1 text-amber-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+3.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Protection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.6%</div>
            <div className="text-xs flex items-center mt-1 text-green-500">
              <ShieldCheck className="h-3 w-3 mr-1" />
              <span>Excellent protection</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248,392</div>
            <div className="text-xs flex items-center mt-1 text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+18.3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
