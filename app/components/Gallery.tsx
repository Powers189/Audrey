import React, { useEffect, useState } from "react";

interface ImageMetadata {
  name: string;
  date: string;
}

interface ImageItem {
  src: string;
  metadata: ImageMetadata;
}

interface ImageGalleryProps {
  category: string; // String parameter to be passed to the component
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ category }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  //fetch(`http://localhost:5000/images/${category}`);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`http://localhost:5000/images/${category}`);
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group break-inside-avoid overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={`http://localhost:5000${image.src}`}
              alt={image.metadata.name}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg">
              <p className="font-semibold">Name: {image.metadata.name}</p>
              <p>Date: {image.metadata.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
