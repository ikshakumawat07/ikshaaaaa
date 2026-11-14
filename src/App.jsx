import { useState, useRef } from 'react';
import JourneyViewer from './components/JourneyViewer';
import ConnectSection from './components/ConnectSection';

export default function App() {
  const [videoEnded, setVideoEnded] = useState(false);
  const connectRef = useRef(null);
  const journeyRef = useRef(null);

  const scrollToConnect = () => {
    connectRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-screen h-screen bg-black text-cream selection:bg-lavender/30 selection:text-white overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory no-scrollbar"
    >
      <section ref={journeyRef} className="relative w-full h-[100dvh] snap-start shrink-0">
        <JourneyViewer
          videoEnded={videoEnded}
          onVideoEnded={() => setVideoEnded(true)}
          onVideoRestart={() => setVideoEnded(false)}
          onScrollDownClick={scrollToConnect}
        />
      </section>

      <section ref={connectRef} id="connect" className="relative w-full min-h-[100dvh] snap-start shrink-0">
        <ConnectSection onBackToTop={scrollToTop} />
      </section>
    </div>
  );
}
