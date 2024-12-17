import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HereMap = dynamic(() => import('./components/hereMap'), { ssr: false } );

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Simulator
      </h1>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">HERE Map</h1>
        <Suspense fallback={<div>Loading map...</div>}>
          <HereMap />
        </Suspense>
      </div>
    </section>
  );
}
