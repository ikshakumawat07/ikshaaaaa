import { Suspense, lazy } from 'react';
import JourneyViewer from './components/JourneyViewer';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-cream selection:bg-lavender/30 selection:text-white">
      <JourneyViewer />
    </div>
  );
}
