-- CreateTable
CREATE TABLE "Changelog" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repository" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Changelog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangelogEntry" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technicalDetails" TEXT,
    "relatedCommits" TEXT[],
    "importance" TEXT NOT NULL,
    "breakingChange" BOOLEAN NOT NULL DEFAULT false,
    "affectedFiles" TEXT[],
    "affectedApis" TEXT[],
    "changelogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChangelogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChangelogEntry_changelogId_idx" ON "ChangelogEntry"("changelogId");

-- AddForeignKey
ALTER TABLE "ChangelogEntry" ADD CONSTRAINT "ChangelogEntry_changelogId_fkey" FOREIGN KEY ("changelogId") REFERENCES "Changelog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
