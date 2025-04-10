import React from "react";
import ImageGallery from "~/components/Gallery";
function About() {
  return (
    <div className="bg-purple-100 min-h-screen p-2">
      <ImageGallery imageFile="/fiber-arts.json" />
    </div>
  );
}

export default About;
