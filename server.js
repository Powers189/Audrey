//This was used to extract metadata from the images but it's not currently being used.
// See \public\images.json for current implimentation on how tiltes and dates are set up

import express from "express";
import cors from "cors"; //middleware
import fs from "fs-extra";
import exifr from "exifr"; //reads metadata from files
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //absolute path of the current file
const __dirname = path.dirname(__filename); //directory of the current file

const app = express();
app.use(cors());
const PORT = 5000;

//Base directory for images
const IMAGES_BASE_DIR = path.join(__dirname, "public/images");

// Read EXIF and return image info
//dirPath-directory containing the images to serve
//urlPrefix=prefix that you will use to access each image being served  ie /images/paintings is prefix
const readImagesWithMetadata = async (dirPath, urlPrefix) => {
  const files = await fs.readdir(dirPath);
  // A JavaScript Promise is an object representing the eventual result of an asynchronous operation. It acts as a placeholder for a value that might not be available immediately.
  const images = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const metadata = await exifr.parse(filePath); //use exifr
      return {
        src: `${urlPrefix}/${file}`,
        metadata: {
          name: file,
          date: metadata?.DateTimeOriginal || "Unknown",
          //   location: turn this back on if you want to show location
          //     metadata?.GPSLatitude && metadata?.GPSLongitude
          //       ? `${metadata.GPSLatitude}, ${metadata.GPSLongitude}`
          //       : "Unknown",
        },
      };
    })
  );
  return images;
};

// Route, where catergory is the type of images ie paintings, fiber arts etc and also the name of the folder they are stored in
app.get("/images/:category", async (req, res) => {
  const { category } = req.params;
  const folderPath = path.join(IMAGES_BASE_DIR, category); //full path to images

  // Safety check: does folder exist?
  if (!(await fs.pathExists(folderPath))) {
    return res.status(404).send("Category not found");
  }

  try {
    const images = await readImagesWithMetadata(
      //call helper fcn to get images
      folderPath,
      `/images/${category}`
    );
    res.json(images);
  } catch (error) {
    console.error("Error reading category:", category, error);
    res.status(500).send("Error fetching images");
  }
});

// Serve static folders
app.use(
  "/images/paintings",
  express.static(path.join(IMAGES_BASE_DIR, "paintings"))
);
app.use(
  "/images/fiber-arts",
  express.static(path.join(IMAGES_BASE_DIR, "fiber-arts"))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
