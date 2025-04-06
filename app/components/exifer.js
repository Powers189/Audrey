import React, { useEffect, useState } from "react";
import EXIF from "exif-js";

const imagePaths = [
  "/art/starry_night.jpg",
  "/art/forest_dream.jpg",
  "/art/lake_reflection.jpg",
];

const loadExifData = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // if images are from a public server
    img.src = src;
    img.onload = () => {
      EXIF.getData(img, function () {
        const title = EXIF.getTag(this, "ImageDescription");
        const date =
          EXIF.getTag(this, "DateTimeOriginal") ||
          EXIF.getTag(this, "DateTime");
        resolve({
          src,
          title: title || src.split("/").pop().split(".")[0].replace(/_/g, " "),
          date: date || "Unknown",
        });
      });
    };
  });
};

export default function ArtGalleryExif() {
  const [artPieces, setArtPieces] = useState([]);

  useEffect(() => {
    Promise.all(imagePaths.map(loadExifData)).then(setArtPieces);
  }, []);

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
      {artPieces.map((art, i) => (
        <div
          key={i}
          className="relative group overflow-hidden rounded-xl shadow-md"
        >
          <img src={art.src} alt={art.title} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-center p-2">
            <div>
              <div className="font-bold">{art.title}</div>
              <div className="text-sm">{art.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
