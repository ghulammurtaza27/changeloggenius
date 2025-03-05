import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all changelogs
app.get('/api/changelogs', async (req, res) => {
  try {
    const changelogs = await prisma.changelog.findMany({
      include: {
        entries: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json({ success: true, data: changelogs });
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch changelogs' });
  }
});

// Create a new changelog
app.post('/api/changelogs', async (req, res) => {
  try {
    const changelogData = req.body;
    const changelog = await prisma.changelog.create({
      data: {
        version: changelogData.version,
        date: new Date(changelogData.date),
        repository: changelogData.repository || 'unknown',
        owner: changelogData.owner || 'unknown',
        entries: {
          create: changelogData.entries.map(entry => ({
            category: entry.category,
            description: entry.description,
            technicalDetails: entry.technical_details,
            relatedCommits: entry.related_commits,
            importance: entry.importance,
            breakingChange: entry.breaking_change || false,
            affectedFiles: entry.affected_files || [],
            affectedApis: entry.affected_apis || []
          }))
        }
      },
      include: {
        entries: true
      }
    });
    res.json({ success: true, data: changelog });
  } catch (error) {
    console.error('Error creating changelog:', error);
    res.status(500).json({ success: false, error: 'Failed to create changelog' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 