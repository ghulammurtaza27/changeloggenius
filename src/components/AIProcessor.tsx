
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Calendar, Code, GitCompare, AlertCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/utils/api";

const AIProcessor = ({ 
  repoData, 
  onProcess 
}: { 
  repoData: any,
  onProcess: (changelogEntries: any) => void
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [includeDiffs, setIncludeDiffs] = useState(true);
  const [geminiKeyAvailable, setGeminiKeyAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      setGeminiKeyAvailable(true);
    } else {
      console.warn("VITE_GEMINI_API_KEY environment variable is not set. AI processing will not work properly.");
    }
  }, []);

  const handleGenerateChangelog = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date range required",
        description: "Please select a start and end date",
        variant: "destructive",
      });
      return;
    }

    if (!geminiKeyAvailable) {
      toast({
        title: "Gemini API key required",
        description: "Please set the VITE_GEMINI_API_KEY environment variable",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Call the API to generate changelog
      const result = await api.generateChangelog(repoData, { 
        start: startDate, 
        end: endDate,
        includeDiffs: includeDiffs
      });
      
      if (result.success) {
        onProcess(result.data);
        
        toast({
          title: "Changelog generated",
          description: `AI processed ${result.data.entries.length} entries from the commit history${includeDiffs ? ' with diff analysis' : ''}`,
        });
      } else {
        throw new Error(result.error || "Generation failed");
      }
    } catch (error) {
      console.error("Error generating changelog:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate changelog entries. Please try again.",
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
          <BrainCircuit className="mr-2" size={20} />
          Generate Changelog
        </CardTitle>
        <CardDescription>
          Select a date range to analyze commits from {repoData.owner}/{repoData.repo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!geminiKeyAvailable && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Gemini API key not found. Please set the VITE_GEMINI_API_KEY environment variable.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white/50"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <GitCompare size={16} />
              <span className="text-sm font-medium">Include code diff analysis</span>
            </div>
            <Switch
              checked={includeDiffs}
              onCheckedChange={setIncludeDiffs}
              aria-label="Toggle diff analysis"
            />
          </div>
          
          <div className="bg-blue-50 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Code className="text-blue-600 mt-0.5" size={16} />
              <div className="text-xs text-blue-700">
                <p className="font-medium">Enhanced Diff Analysis</p>
                <p className="mt-1">
                  When enabled, the AI will analyze code changes to better identify API modifications, breaking changes,
                  and provide more accurate categorization of changes based on what actually changed in the code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateChangelog} 
          disabled={loading || !startDate || !endDate || !geminiKeyAvailable} 
          className="w-full"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Generating...</span>
            </>
          ) : (
            <>
              <Calendar className="mr-2" size={16} />
              Generate Changelog
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProcessor;
