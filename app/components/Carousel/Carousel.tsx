'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Arrow Components
interface ArrowProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PrevArrow = ({ onClick }: ArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="ก่อนหน้า"
    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 glass hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-x-0.5 ring-1 ring-primary/10"
  >
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="ถัดไป"
    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 glass hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:translate-x-0.5 ring-1 ring-primary/10"
  >
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

interface CarouselProps {
  images: string[];
  showThumbnails?: boolean;
  thumbnailsToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
  heightMainImg?: number;
}

const Carousel = ({
  images,
  showThumbnails = true,
  thumbnailsToShow = 4,
  autoplay = false,
  autoplaySpeed = 3000,
  className = '',
  heightMainImg,
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const mainSettings = {
    arrows: true,
    dots: !showThumbnails,
    autoplay,
    autoplaySpeed,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_current: number, next: number) => {
      setCurrentSlide(next);
      thumbSliderRef.current?.slickGoTo(next);
    },
  };

  const thumbnailSettings = {
    slidesToShow: Math.min(thumbnailsToShow, images.length),
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    beforeChange: (_current: number, next: number) => {
      mainSliderRef.current?.slickGoTo(next);
    },
  };

  return (
    <div className={className}>
      {/* Main Slider */}
      <div className="relative">
        <Slider {...mainSettings} ref={mainSliderRef}>
          {images.map((src, index) => (
            <div key={index} className="p-3">
              <div
                className="relative overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-lg shadow-primary/5 ring-1 ring-black/5"
                style={{ height: heightMainImg ? `${heightMainImg}px` : '450px' }}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Slider */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-4">
          <Slider {...thumbnailSettings} ref={thumbSliderRef}>
            {images.map((src, index) => (
              <div key={index} className="px-1 cursor-pointer">
                <div
                  className={`relative aspect-square border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                    currentSlide === index
                      ? 'border-primary ring-2 ring-primary/20 scale-95'
                      : 'border-gray-200 hover:border-primary/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Carousel;
