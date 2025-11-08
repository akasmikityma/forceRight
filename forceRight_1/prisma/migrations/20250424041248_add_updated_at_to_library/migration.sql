-- Step 1: Add columns as nullable first
ALTER TABLE "Library" 
ADD COLUMN "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "parentId" INTEGER,
ADD COLUMN "updatedAt" TIMESTAMP(3);

-- Step 2: Update existing records
UPDATE "Library" SET "updatedAt" = "createdAt";

-- Step 3: Make columns required
ALTER TABLE "Library" 
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- Step 4: Add foreign key for nested structure
ALTER TABLE "Library" 
ADD CONSTRAINT "Library_parentId_fkey" 
FOREIGN KEY ("parentId") 
REFERENCES "Library"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;