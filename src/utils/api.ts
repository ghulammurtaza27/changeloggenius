import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = 'http://localhost:3001/api';

// Function to validate GitHub access with token
const validateGitHubAccess = async (owner: string, repo: string, token: string) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to access repository');
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('GitHub API validation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to validate GitHub access'
    };
  }
};

// Fetch repository commits from GitHub
const fetchRepositoryCommits = async (repoData: any, dateRange: { start: string, end: string }) => {
  try {
    const since = new Date(dateRange.start).toISOString();
    const until = new Date(dateRange.end).toISOString();
    
    // Fetch only 10 most recent commits in the date range
    const response = await fetch(
      `https://api.github.com/repos/${repoData.owner}/${repoData.repo}/commits?since=${since}&until=${until}&per_page=10`,
      {
        headers: {
          'Authorization': `token ${repoData.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch commits');
    }
    
    const commits = await response.json();
    
    return commits.map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date
    }));

    /* To fetch ALL commits with pagination, replace the above code with this:
    
    let page = 1;
    let allCommits: any[] = [];
    
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${repoData.owner}/${repoData.repo}/commits?since=${since}&until=${until}&per_page=100&page=${page}`,
        {
          headers: {
            'Authorization': `token ${repoData.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch commits');
      }
      
      const commits = await response.json();
      if (commits.length === 0) break; // No more commits to fetch
      
      allCommits = allCommits.concat(commits);
      
      // Check if we have more pages
      const linkHeader = response.headers.get('Link');
      if (!linkHeader?.includes('rel="next"')) break;
      
      page++;
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit protection
    }
    
    return allCommits.map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date
    }));
    */
    
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
};

// Fetch diff for a specific commit
const fetchCommitDiff = async (repoData: any, commitSha: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoData.owner}/${repoData.repo}/commits/${commitSha}`,
      {
        headers: {
          'Authorization': `token ${repoData.token}`,
          'Accept': 'application/vnd.github.v3.diff'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch commit diff');
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching diff:', error);
    throw error;
  }
};

// Function to process commit data with Google's Gemini API
const processWithGemini = async (
  commits: any[], 
  dateRange: { start: string, end: string },
  diffs: Record<string, string> = {}
) => {
  try {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
    
    if (!GEMINI_API_KEY) {
      throw new Error("VITE_GEMINI_API_KEY environment variable is not set");
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Prepare the prompt
    let prompt = `
      You are an expert changelog writer${Object.keys(diffs).length > 0 ? ' and code analyzer' : ''}. Review the following commit messages and PR descriptions
      from a software repository for the time period ${dateRange.start} to ${dateRange.end}.
      
      ${JSON.stringify(commits)}
    `;
    
    // Add diffs if available
    if (Object.keys(diffs).length > 0) {
      prompt += `\n\nFor each commit, here is the associated diff:`;
      
      for (const [sha, diff] of Object.entries(diffs)) {
        const truncatedDiff = diff.length > 5000 
          ? diff.substring(0, 5000) + "\n... [diff truncated due to size]" 
          : diff;
          
        prompt += `\n${sha}: ${truncatedDiff}`;
      }
    }

    prompt += `\n\nRespond with ONLY a JSON object (no markdown, no code blocks, no backticks) following this structure:
    {
      "version": "x.y.z",
      "date": "YYYY-MM-DD",
      "entries": [
        {
          "category": "Feature|Enhancement|Fix|Breaking Change|etc",
          "description": "User-friendly description",
          "technical_details": "Optional technical context if relevant for developers",
          "related_commits": ["commit1", "commit2"],
          "importance": "high|medium|low"${Object.keys(diffs).length > 0 ? ',\n          "breaking_change": true|false,\n          "affected_files": ["path/to/file1"],\n          "affected_apis": ["API names"]' : ''}
        }
      ]
    }`;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textContent = response.text();
    
    // Clean up the response - remove any markdown formatting
    textContent = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(textContent);
      return parsedResponse;
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      console.error("Raw response:", textContent);
      throw new Error("Could not parse JSON from Gemini response");
    }
  } catch (error) {
    console.error("Error processing with Gemini:", error);
    throw error;
  }
};

// In-memory storage for changelogs (would be a database in production)
const changelogs: any[] = [];

export interface ExportOptions {
  format: 'csv' | 'json';
  includeHeaders?: boolean;
}

export class ExportService {
  static toCSV(data: Record<string, any>[], options: ExportOptions = { format: 'csv', includeHeaders: true }) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => {
        const cellValue = row[header];
        // Escape commas and quotes
        if (typeof cellValue === 'string') {
          return `"${cellValue.replace(/"/g, '""')}"`;
        }
        return cellValue;
      }).join(',')
    );
    
    if (options.includeHeaders) {
      rows.unshift(headers.join(','));
    }
    
    return rows.join('\n');
  }
}

// Actual API implementation
const api = {
  // Validate GitHub access token and repository
  validateGitHubAccess,
  
  // Generate changelog with AI
  generateChangelog: async (repoData: any, options: { start: string, end: string, includeDiffs?: boolean }) => {
    try {
      // 1. Fetch repository commits
      const commits = await fetchRepositoryCommits(repoData, options);
      
      let diffs = {};
      
      // 2. Fetch diffs if requested
      if (options.includeDiffs) {
        console.log("Fetching diffs for commits...");
        diffs = await Promise.all(
          commits.map(async (commit: any) => {
            const diff = await fetchCommitDiff(repoData, commit.sha);
            return { sha: commit.sha, diff };
          })
        ).then(results => 
          Object.fromEntries(results.map(({ sha, diff }) => [sha, diff]))
        );
      }
      
      // 3. Process commits with Gemini
      const processedChangelog = await processWithGemini(commits, options, diffs);
      
      return {
        success: true,
        data: processedChangelog
      };
    } catch (error) {
      console.error("Error generating changelog:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate changelog"
      };
    }
  },

  // Publish changelog
  publishChangelog: async (changelogData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/changelogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changelogData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish changelog');
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error publishing changelog:", error);
      return {
        success: false,
        error: "Failed to publish changelog"
      };
    }
  },
  
  // Get all changelogs
  getChangelogs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/changelogs`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch changelogs');
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching changelogs:", error);
      return {
        success: false,
        error: "Failed to fetch changelogs"
      };
    }
  }
};

export default api;
