
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, FileCheck, Pencil, Plus, Save, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingSpinner from "./LoadingSpinner";

const categoryColors = {
  "Feature": "bg-changelog-feature-bg text-changelog-feature border-changelog-feature/20",
  "Enhancement": "bg-changelog-enhancement-bg text-changelog-enhancement border-changelog-enhancement/20",
  "Fix": "bg-changelog-fix-bg text-changelog-fix border-changelog-fix/20",
  "Breaking Change": "bg-changelog-breaking-bg text-changelog-breaking border-changelog-breaking/20",
};

const ChangelogEditor = ({ 
  changelogData, 
  onPublish 
}: { 
  changelogData: any, 
  onPublish: (data: any) => void 
}) => {
  const [entries, setEntries] = useState(changelogData.entries);
  const [version, setVersion] = useState(changelogData.version);
  const [editEntryIndex, setEditEntryIndex] = useState<number | null>(null);
  const [editedEntry, setEditedEntry] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({
    category: "Enhancement",
    description: "",
    technical_details: "",
    related_commits: [],
    importance: "medium"
  });
  
  const { toast } = useToast();

  const handleEditEntry = (index: number) => {
    setEditEntryIndex(index);
    setEditedEntry({ ...entries[index] });
  };

  const handleSaveEdit = () => {
    if (editEntryIndex === null || !editedEntry) return;
    
    const newEntries = [...entries];
    newEntries[editEntryIndex] = editedEntry;
    setEntries(newEntries);
    setEditEntryIndex(null);
    setEditedEntry(null);
    
    toast({
      title: "Entry updated",
      description: "Changelog entry has been updated",
    });
  };

  const handleCancelEdit = () => {
    setEditEntryIndex(null);
    setEditedEntry(null);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
    
    toast({
      title: "Entry removed",
      description: "Changelog entry has been removed",
    });
  };

  const handleAddEntry = () => {
    if (!newEntry.description) {
      toast({
        title: "Description required",
        description: "Please add a description for the new entry",
        variant: "destructive",
      });
      return;
    }
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setShowAddDialog(false);
    setNewEntry({
      category: "Enhancement",
      description: "",
      technical_details: "",
      related_commits: [],
      importance: "medium"
    });
    
    toast({
      title: "Entry added",
      description: "New changelog entry has been added",
    });
  };

  const handlePublish = () => {
    setPublishing(true);
    
    // Simulate API call
    setTimeout(() => {
      const finalChangelog = {
        ...changelogData,
        version,
        entries,
      };
      
      onPublish(finalChangelog);
      
      toast({
        title: "Changelog published",
        description: `Version ${version} has been published successfully`,
      });
      
      setPublishing(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Edit Changelog</h2>
          <p className="text-gray-500">Review and edit AI-generated changelog entries</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="version" className="text-sm font-medium">
              Version:
            </label>
            <Input
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-28 bg-white/50"
            />
          </div>
          <Button onClick={handlePublish} disabled={publishing} className="gap-2">
            {publishing ? <LoadingSpinner size="sm" color="white" /> : <FileCheck size={16} />}
            {publishing ? "Publishing..." : "Publish Changelog"}
          </Button>
        </div>
      </div>
      
      <Card className="glass border border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Changelog Entries</CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus size={14} />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border border-gray-100">
              <DialogHeader>
                <DialogTitle>Add New Changelog Entry</DialogTitle>
                <DialogDescription>
                  Create a new entry to include in your changelog
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={newEntry.category} 
                    onValueChange={(value) => setNewEntry({...newEntry, category: value})}
                  >
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Feature">Feature</SelectItem>
                      <SelectItem value="Enhancement">Enhancement</SelectItem>
                      <SelectItem value="Fix">Fix</SelectItem>
                      <SelectItem value="Breaking Change">Breaking Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                    placeholder="Enter a user-friendly description"
                    className="resize-none bg-white/50"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Technical Details</label>
                  <Textarea
                    value={newEntry.technical_details}
                    onChange={(e) => setNewEntry({...newEntry, technical_details: e.target.value})}
                    placeholder="Optional technical context"
                    className="resize-none bg-white/50"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Importance</label>
                  <Select 
                    value={newEntry.importance} 
                    onValueChange={(value) => setNewEntry({...newEntry, importance: value})}
                  >
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Select importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  Add Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No changelog entries yet</p>
              </div>
            ) : (
              entries.map((entry: any, index: number) => (
                <div 
                  key={index} 
                  className="rounded-lg bg-white border border-gray-100 shadow-sm overflow-hidden transition-all"
                >
                  {editEntryIndex === index ? (
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select 
                          value={editedEntry?.category} 
                          onValueChange={(value) => setEditedEntry({...editedEntry, category: value})}
                        >
                          <SelectTrigger className="bg-white/50">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Feature">Feature</SelectItem>
                            <SelectItem value="Enhancement">Enhancement</SelectItem>
                            <SelectItem value="Fix">Fix</SelectItem>
                            <SelectItem value="Breaking Change">Breaking Change</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={editedEntry?.description}
                          onChange={(e) => setEditedEntry({...editedEntry, description: e.target.value})}
                          className="resize-none bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Technical Details</label>
                        <Textarea
                          value={editedEntry?.technical_details}
                          onChange={(e) => setEditedEntry({...editedEntry, technical_details: e.target.value})}
                          className="resize-none bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Importance</label>
                        <Select 
                          value={editedEntry?.importance} 
                          onValueChange={(value) => setEditedEntry({...editedEntry, importance: value})}
                        >
                          <SelectTrigger className="bg-white/50">
                            <SelectValue placeholder="Select importance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveEdit} className="gap-1">
                          <Save size={14} />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[entry.category as keyof typeof categoryColors]}`}>
                            {entry.category}
                          </span>
                          {entry.importance === "high" && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                              High Priority
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditEntry(index)}>
                            <Pencil size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveEntry(index)}>
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-800 font-medium">{entry.description}</p>
                        {entry.technical_details && (
                          <p className="text-gray-500 text-sm mt-1">{entry.technical_details}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangelogEditor;
