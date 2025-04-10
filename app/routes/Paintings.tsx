import React from "react";
import ImageGallery from "~/components/Gallery";
function About() {
  return (
    <div className="bg-purple-100 min-h-screen p-2 ">
      <ImageGallery imageFile="/paintings.json" />
    </div>
  );
}

export default About;
