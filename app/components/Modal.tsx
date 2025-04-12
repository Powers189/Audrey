import React from "react";

interface ModalProps {
  image: {
    src: string;
    title: string;
    date: string;
    refSrc?: string | null;
  };
  onClose: () => void; //send fnc to on close sets selected image to null therefore this part wount be rendered
}

//takes in an image and what to do on close

const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
  return (
    // fixed inset-0: take up the entire screen.
    <div
      className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Be a max width (max-w-3xl) but still fill available space (w-full). */}
      <div
        className="relative bg-white p-4 rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-800 text-3xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="mt-6">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[60vh] w-auto mx-auto rounded"
          />
          <div className="mt-4 text-gray-800">
            <h2 className="text-xl font-semibold">{image.title}</h2>
            {image.date && (
              <p className="text-sm text-gray-600">Date: {image.date}</p>
            )}
            {image.refSrc && (
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

        {/* <button
          onClick={onClose}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
