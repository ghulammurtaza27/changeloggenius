import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import api from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";

const categoryColors = {
  "Feature": "bg-changelog-feature-bg text-changelog-feature border-changelog-feature/20",
  "Enhancement": "bg-changelog-enhancement-bg text-changelog-enhancement border-changelog-enhancement/20",
  "Fix": "bg-changelog-fix-bg text-changelog-fix border-changelog-fix/20",
  "Breaking Change": "bg-changelog-breaking-bg text-changelog-breaking border-changelog-breaking/20",
};

const ChangelogViewer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [changelogs, setChangelogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchChangelogs = async () => {
      try {
        const result = await api.getChangelogs();
        if (result.success) {
          setChangelogs(result.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch changelogs",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching changelogs:", error);
        toast({
          title: "Error",
          description: "Failed to fetch changelogs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChangelogs();
  }, [toast]);
  
  const categories = ["Feature", "Enhancement", "Fix", "Breaking Change"];
  
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  // Filter changelogs by search query and category
  const filteredChangelogs = changelogs.map(changelog => {
    const filteredEntries = changelog.entries.filter(entry => {
      const matchesSearch = !searchQuery || 
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.technicalDetails && entry.technicalDetails.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesCategory = !selectedCategory || entry.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    return {
      ...changelog,
      entries: filteredEntries,
      hasMatchingEntries: filteredEntries.length > 0
    };
  }).filter(changelog => changelog.hasMatchingEntries);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <>
      <div className="mb-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
          <p className="text-gray-500 text-lg">
            Track all the updates and improvements to our platform
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search changelogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/60 backdrop-blur-sm w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`h-9 text-xs px-3 ${
                  selectedCategory === category ? "" : "bg-white/60 backdrop-blur-sm"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-12">
        {filteredChangelogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">
              {changelogs.length === 0 
                ? "No changelogs available yet" 
                : "No changelog entries match your filters"}
            </p>
          </div>
        ) : (
          filteredChangelogs.map((changelog, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Version {changelog.version}</h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {new Date(changelog.date).toLocaleDateString()}
                </div>
              </div>
              
              <Card className="glass border border-gray-100">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {changelog.entries.map((entry: any, entryIdx: number) => (
                      <div key={entryIdx} className="p-4 transition-colors hover:bg-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[entry.category as keyof typeof categoryColors]}`}>
                            {entry.category}
                          </span>
                          {entry.importance === "high" && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                              High Priority
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800 font-medium">{entry.description}</p>
                        {entry.technicalDetails && (
                          <p className="text-gray-500 text-sm mt-1">{entry.technicalDetails}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ChangelogViewer;
