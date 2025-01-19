import { useState, useEffect } from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: "/src/assets/nike.png",
      title: "NIKE",
      color: "bg-blue-500",
      logo: "/src/assets/nike-logo.png",
    },
    {
      id: 2,
      image: "/src/assets/adidas.png",
      title: "ADIDAS",
      color: "bg-green-500",
      logo: "/src/assets/adidas-logo.png",
    },
    {
      id: 3,
      image: "/src/assets/puma.png",
      title: "PUMA",
      color: "bg-purple-500",
      logo: "/src/assets/puma-logo.png",
    },
    {
      id: 4,
      image: "/src/assets/new-balance.png",
      title: "NEW-BALANCE",
      color: "bg-blue-700",
      logo: "/src/assets/new-balance-logo.png",
    },
    {
      id: 5,
      image: "/src/assets/reebok.png",
      title: "REEBOK",
      color: "bg-red-500",
      logo: "/src/assets/reebok-logo.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full mx-auto overflow-hidden md:mr-5 lg:-mt-12 xl:-mt-28 xxl:-mt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Image carousel"
    >
      {/* Carousel Wrapper */}
      <div
        className="relative flex items-center transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full grid">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto mx-auto xs:w-[420px] sm:w-[500px] lg:w-[600px] xl:w-[720px] xl:h-[550px] xxl:w-[750px]"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 xs:left-6 sm:left-8 md:left-5"
        onClick={goToPrevious}
        aria-label="Previous Slide"
      >
        <BsArrowLeftSquare className="w-8 h-8 text-gray-400  hover:text-darkBlue lg:w-10 lg:h-10 xxl:w-12 xxl:h-12" />
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 xs:right-6 sm:right-8 md:right-5"
        onClick={goToNext}
        aria-label="Next Slide"
      >
        <BsArrowRightSquare className="w-8 h-8 text-gray-400 hover:text-darkBlue lg:w-10 lg:h-10 xxl:w-12 xxl:h-12" />
      </button>

      {/* Image Indicators */}
      <div className="flex justify-center items-center mt-8 border-2 mx-10 xs:mx-16 md:mt-0 lg:mt-12">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-full grid h-12 overflow-hidden border-2 xs:h-14 sm:h-16 lg:h-20 ${
              index === currentIndex ? slide.color : " bg-white"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          >
            <img
              src={slide.logo}
              alt={slide.title}
              className="w-16 p-2 m-auto sm:w-20 lg:w-24"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
