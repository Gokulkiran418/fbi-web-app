import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate } from 'animejs';

type Suspect = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

export default function SuspectCard({ suspect }: { suspect: Suspect }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    suspect.images[0] || '/images/placeholder.png'
  );

  useEffect(() => {
    if (!cardRef.current) return;

    // Hover animations
    const animateIn = () => {
      if (cardRef.current) {
        animate(cardRef.current, {
          scale: 1.02,
          translateY: -5,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          duration: 300,
          easing: 'easeOutQuad',
        });
      }
      if (imageRef.current) {
        animate(imageRef.current, {
          scale: 1.0,
          duration: 400,
          easing: 'easeOutQuad',
        });
      }
    };

    const animateOut = () => {
      if (cardRef.current) {
        animate(cardRef.current, {
          scale: 1,
          translateY: 0,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          duration: 300,
          easing: 'easeOutQuad',
        });
      }
      if (imageRef.current) {
        animate(imageRef.current, {
          scale: 0.9,
          duration: 400,
          easing: 'easeOutQuad',
        });
      }
    };

    const card = cardRef.current;
    card.addEventListener('mouseenter', animateIn);
    card.addEventListener('mouseleave', animateOut);

    return () => {
      card.removeEventListener('mouseenter', animateIn);
      card.removeEventListener('mouseleave', animateOut);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md transition-transform duration-300"
      style={{ transform: 'scale(1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <div ref={imageRef} className="flex justify-center items-center overflow-hidden rounded-t-lg">
        <Image
          src={imageSrc}
          alt={suspect.title}
          width={150}
          height={150}
          className="object-cover transform scale-90"
          onError={() => setImageSrc('/images/placeholder.png')}
        />
      </div>
      <h3 ref={titleRef} className="text-base font-bold mt-3 text-gray-800 dark:text-gray-100">
        {suspect.title}
      </h3>
      <p ref={descRef} className="text-xs text-gray-700 dark:text-gray-200 mt-1">
        {suspect.description.slice(0, 80)}...
      </p>
    </div>
  );
}