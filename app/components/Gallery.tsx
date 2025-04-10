import React, { useEffect, useState } from "react";
//useEffect: A React hook that runs side effects (like fetching data).
//useState: A React hook to create and manage local component state
import Modal from "./Modal";

interface ImageItem {
  src: string;
  title: string;
  date: string;
  refSrc?: string | null;
}
const getColumnClasses = (count: number) => {
  if (count < 8) {
    return "columns-1 sm:columns-2"; // fewer columns if <8 images
  } else {
    return "columns-1 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5";
  }
};

//.FC means functional comonent
const ImageGallery: React.FC<{ imageFile: string }> = ({ imageFile }) => {
  //const[state,setState]-useState(initialState) in bellow <ImageItem[]>([]) means we set empty array of imageItems as inital state
  //and for selected image it is an inital state or a image item or null
  //images: holds an array of all image data from images.json
  //selectedImage: stores the currently clicked image (or null when none is selected)

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  //Use effect is top level so it cant be called in loops or conditions
  //runs once after component mounts
  useEffect(() => {
    const fetchImages = async () => {
      //call to get json of images
      const response = await fetch(imageFile);
      const data = await response.json(); //this tells it to wait untill it gets response and its json
      setImages(data); //populates images array with data
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto max-w-[2400px] p-4">
      {/* //small screen 2 columns large screen 3 */}
      <div className={`gap-4 space-y-4 ${getColumnClasses(images.length)}`}>
        {images.map(
          (
            image,
            index //loop through images arrray
          ) => (
            <div //overaching div for each pic
              key={index}
              className="relative group break-inside-avoid overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(image)} //when clicked on
            >
              {/* automatic width and heigh set for image */}
              <img
                src={image.src}
                alt={image.title} //alternative text if image cant be displayed
                className="w-full h-auto object-cover rounded-lg"
              />

              {/* Show pic info on hover set with tailwind */}
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg">
                <p className="font-semibold">Title: {image.title}</p>
                <p>Date: {image.date}</p>
                {image.refSrc && ( //ternary thing says if refSrc exists then generate the p tag
                  <a
                    href={image.refSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500 mt-2 block"
                  >
                    View Reference Image
                  </a>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {selectedImage && ( //if selected image is not null then render modal
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default ImageGallery;
