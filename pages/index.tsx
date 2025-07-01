import { useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { animate, stagger } from 'animejs'; // Import animate and stagger
import Navbar from '../components/Navbar';
import SuspectCard from '../components/SuspectCard';

const SUSPECTS_QUERY = gql`
  query {
    suspects {
      id
      title
      description
      images
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(SUSPECTS_QUERY);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate page title
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
      });
    }

    // Animate suspect cards when data loads
    if (data && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.suspect-card');
      animate(cards, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(100), // Use imported stagger
        easing: 'easeOutQuad',
      });

      // Animate card titles and descriptions
      cards.forEach((card) => {
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        if (title && desc) {
          animate([title, desc], {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 600,
            delay: stagger(200, { start: 300 }), // Use imported stagger
            easing: 'easeOutQuad',
          });
        }
      });
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1
          ref={titleRef}
          className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        >
          FBI Wanted
        </h1>
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Loading...
          </p>
        )}
        {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
        {data && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {data.suspects.map((suspect: any) => (
              <div key={suspect.id} className="suspect-card">
                <SuspectCard suspect={suspect} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}