import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500 text-sm md:text-base">No images available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
      {/* Main Image */}
      <img 
        src={images[currentIndex].image_url} 
        alt={`Product image ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />

      {/* Navigation Arrows - Touch-friendly on mobile */}
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white active:bg-white p-2 sm:p-2.5 rounded-full shadow-lg transition-all touch-manipulation"
            aria-label="Previous image"
          >
            <FiChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white active:bg-white p-2 sm:p-2.5 rounded-full shadow-lg transition-all touch-manipulation"
            aria-label="Next image"
          >
            <FiChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Thumbnails - Responsive sizing */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all touch-manipulation ${
                index === currentIndex ? 'bg-secondary scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
