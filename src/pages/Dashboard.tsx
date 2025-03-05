
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GitHubConnector from "@/components/GitHubConnector";
import AIProcessor from "@/components/AIProcessor";
import ChangelogEditor from "@/components/ChangelogEditor";
import { useToast } from "@/components/ui/use-toast";
import api from "@/utils/api";
import AnimatedBackground from "@/components/AnimatedBackground";

const Dashboard = () => {
  const [repoData, setRepoData] = useState<any>(null);
  const [changelogData, setChangelogData] = useState<any>(null);
  const [publishedChangelog, setPublishedChangelog] = useState<any>(null);
  const { toast } = useToast();

  const handleConnectRepo = (data: any) => {
    setRepoData(data);
  };

  const handleProcessChangelog = (data: any) => {
    setChangelogData(data);
  };

  const handlePublishChangelog = async (data: any) => {
    try {
      const result = await api.publishChangelog(data);
      
      if (result.success) {
        setPublishedChangelog(result.data);
        toast({
          title: "Success!",
          description: `Changelog v${result.data.version} has been published`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish changelog",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="relative pt-12">
          <AnimatedBackground />
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-4">Developer Dashboard</h1>
              <p className="text-gray-500">Generate and manage changelogs for your projects</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                {!repoData ? (
                  <div className="flex flex-col items-center">
                    <GitHubConnector onConnect={handleConnectRepo} />
                  </div>
                ) : !changelogData ? (
                  <div className="flex flex-col items-center">
                    <AIProcessor repoData={repoData} onProcess={handleProcessChangelog} />
                  </div>
                ) : (
                  <ChangelogEditor changelogData={changelogData} onPublish={handlePublishChangelog} />
                )}
              </div>
              
              <div className="bg-white/30 backdrop-blur-md rounded-xl border border-gray-100 p-6 shadow-sm h-fit">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Workflow Status</h2>
                  {publishedChangelog && (
                    <Link to="/changelog">
                      <Button variant="outline" size="sm">
                        View Published Changelog
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      repoData ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {repoData ? "✓" : "1"}
                    </div>
                    <div>
                      <p className="font-medium">Connect GitHub Repository</p>
                      {repoData && (
                        <p className="text-sm text-gray-500">{repoData.owner}/{repoData.repo}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-200 ml-4"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      changelogData ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {changelogData ? "✓" : "2"}
                    </div>
                    <div>
                      <p className="font-medium">Generate Changelog with AI</p>
                      {changelogData && (
                        <p className="text-sm text-gray-500">{changelogData.entries.length} entries generated</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-200 ml-4"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      publishedChangelog ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {publishedChangelog ? "✓" : "3"}
                    </div>
                    <div>
                      <p className="font-medium">Edit and Publish Changelog</p>
                      {publishedChangelog && (
                        <p className="text-sm text-gray-500">Version {publishedChangelog.version} published</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {!repoData && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">Getting Started</p>
                    <p className="mt-1">
                      Connect your GitHub repository to begin generating changelogs.
                      You can use any public repository URL.
                    </p>
                  </div>
                )}
                
                {repoData && !changelogData && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">Repository Connected</p>
                    <p className="mt-1">
                      Select a date range to analyze commits and generate changelog entries.
                    </p>
                  </div>
                )}
                
                {changelogData && !publishedChangelog && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">Changelog Generated</p>
                    <p className="mt-1">
                      Review and edit the AI-generated changelog entries before publishing.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ChangeLogger. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
