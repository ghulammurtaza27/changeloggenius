
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, GitBranch, CheckCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import api from "@/utils/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GitHubConnector = ({ onConnect }: { onConnect: (repoData: any) => void }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const { toast } = useToast();

  // Check for GitHub token in environment variables on component mount
  useEffect(() => {
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    if (githubToken) {
      setTokenAvailable(true);
    } else {
      console.warn("VITE_GITHUB_TOKEN environment variable is not set. GitHub integration will not work properly.");
      toast({
        title: "GitHub token not found",
        description: "Please set the VITE_GITHUB_TOKEN environment variable.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleConnect = async () => {
    setLoading(true);
    
    // Validate repository URL
    if (!repoUrl.includes("github.com")) {
      toast({
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Ensure token is available from environment variables
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    if (!githubToken) {
      toast({
        title: "GitHub token not found",
        description: "Please set the VITE_GITHUB_TOKEN environment variable.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      // Extract owner and repo from URL
      const urlParts = repoUrl.split("github.com/")[1].split("/");
      const owner = urlParts[0];
      const repo = urlParts[1]?.split('#')[0]?.split('?')[0];
      
      if (!owner || !repo) {
        throw new Error("Invalid GitHub URL format");
      }
      
      // Validate the token and repository access
      const validationResult = await api.validateGitHubAccess(owner, repo, githubToken);
      
      if (!validationResult.success) {
        throw new Error(validationResult.error || "Could not access repository with provided token");
      }
      
      const repoData = {
        owner,
        repo,
        url: repoUrl,
        token: githubToken,
        connected: true,
      };
      
      onConnect(repoData);
      
      toast({
        title: "Repository connected",
        description: `Successfully connected to ${owner}/${repo}`,
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Could not connect to the repository. Please check the URL and token.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md glass border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="mr-2" size={20} />
          Connect GitHub Repository
        </CardTitle>
        <CardDescription>
          Link a GitHub repository to generate changelogs from its commit history and code diffs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tokenAvailable && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                GitHub token detected from environment variables
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label htmlFor="repo-url" className="text-sm font-medium">
              Repository URL
            </label>
            <Input
              id="repo-url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-white/50"
            />
          </div>
          {!tokenAvailable && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-700">
                Please set the VITE_GITHUB_TOKEN environment variable with appropriate permissions to access repositories.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={loading || !repoUrl || !tokenAvailable} 
          className="w-full"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Connecting...</span>
            </>
          ) : (
            <>
              <GitBranch className="mr-2" size={16} />
              Connect Repository
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GitHubConnector;
