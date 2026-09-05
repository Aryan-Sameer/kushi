'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { scrapbookData, PhotoItem } from '@/data/notes';

interface PositionedPhoto extends PhotoItem {
  tilt: number;
  tapeColor: 'pink' | 'blue' | 'yellow' | 'cream';
  tapeAngle: number;
}

export default function NotesPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<PositionedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    // Shuffle photos randomly and assign random tilts & tape accents on client mount
    const tapeColors: ('pink' | 'blue' | 'yellow' | 'cream')[] = ['pink', 'blue', 'yellow', 'cream'];
    
    const shuffled = [...scrapbookData.photos].sort(() => Math.random() - 0.5);

    const positioned: PositionedPhoto[] = shuffled.map((photo, index) => {
      // Random tilt between -6 and +6 degrees (avoiding 0 for dynamic scrapbook feel)
      const sign = index % 2 === 0 ? 1 : -1;
      const tilt = sign * (2.5 + Math.random() * 4);
      
      const tapeColor = tapeColors[Math.floor(Math.random() * tapeColors.length)];
      const tapeAngle = (Math.random() - 0.5) * 12; // -6 to +6 deg for tape

      return {
        ...photo,
        tilt,
        tapeColor,
        tapeAngle,
      };
    });

    setPhotos(positioned);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('authed');
    router.push('/');
  };

  // Group photos into gaps between paragraphs
  // 11 paragraphs = 10 gaps between paragraphs, plus gap at end
  const distributePhotosToGaps = () => {
    if (photos.length === 0) return [];
    
    const totalGaps = scrapbookData.paragraphs.length;
    const gapGroups: PositionedPhoto[][] = Array.from({ length: totalGaps }, () => []);

    photos.forEach((photo, idx) => {
      const gapIndex = idx % totalGaps;
      gapGroups[gapIndex].push(photo);
    });

    return gapGroups;
  };

  const photoGroups = distributePhotosToGaps();

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col p-4 sm:p-8 md:p-12 max-w-4xl mx-auto relative select-none">
        
        {/* Scrapbook Header */}
        <header className="flex flex-row items-center justify-between gap-4 border-b border-[#2c1d11]/15 pb-6 mb-10">
          <div>
            <h1 className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-[#8c6a46] font-bold tracking-tight">
              {scrapbookData.title}
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="font-handwriting text-xl sm:text-2xl text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 px-4 py-1.5 rounded-lg shadow-sm rotate-[-1.5deg] hover:rotate-0 transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0"
          >
            Close Book 🚪
          </button>
        </header>

        {/* Main Note Body */}
        <main className="flex-1 flex flex-col gap-10 md:gap-14 pb-16">
          
          {/* Main Title Image Banner at top of note */}
          <div className="relative w-full max-w-2xl mx-auto my-2">
            <div 
              className="bg-white p-3 sm:p-5 pb-8 sm:pb-10 shadow-[0_12px_30px_rgba(44,29,17,0.15)] border border-[#2c1d11]/10 rounded-sm rotate-[-1deg] hover:rotate-0 transition-transform duration-500 cursor-pointer group"
              onClick={() => setSelectedPhoto({ src: scrapbookData.titleImage, alt: scrapbookData.title })}
            >
              {/* Pushpin / Tape header */}
              <div className="washi-tape washi-tape-pink w-36 -top-4 left-1/2 -translate-x-1/2 z-20" />

              <div className="w-full aspect-[16/9] bg-[#eae3d2] overflow-hidden rounded relative shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scrapbookData.titleImage}
                  alt={scrapbookData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#d8c3a5]/10 mix-blend-overlay pointer-events-none" />
              </div>

              <div className="mt-3 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#8c6a46] font-bold">
                  {scrapbookData.title} ✨
                </p>
              </div>
            </div>
          </div>

          {/* Paragraphs and Random Tilted Pictures */}
          {scrapbookData.paragraphs.map((paragraphText, pIndex) => {
            const currentGapPhotos = photoGroups[pIndex] || [];

            return (
              <div key={pIndex} className="flex flex-col gap-8 md:gap-12">
                
                {/* Paragraph Paper Slip */}
                <div 
                  className="w-full max-w-2xl mx-auto"
                  style={{
                    transform: `rotate(${(pIndex % 2 === 0 ? 0.5 : -0.6)}deg)`,
                  }}
                >
                  <div className="lined-paper shadow-[2px_4px_16px_rgba(44,29,17,0.07)] border border-[#e0d7c5] rounded-md px-6 sm:px-10 py-6 sm:py-8 text-[#2c1d11] relative">
                    
                    {/* Binder Hole Punches */}
                    <div className="absolute top-4 left-2.5 sm:left-3 flex flex-col gap-6 select-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#faf7f0] border border-[#e0d7c5] shadow-inner" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#faf7f0] border border-[#e0d7c5] shadow-inner" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#faf7f0] border border-[#e0d7c5] shadow-inner" />
                    </div>

                    <div className="font-handwriting text-2xl sm:text-3xl font-medium leading-relaxed sm:leading-loose whitespace-pre-line pl-3 sm:pl-4 select-text">
                      {paragraphText}
                    </div>
                  </div>
                </div>

                {/* Scattered Photos between paragraphs */}
                {currentGapPhotos.length > 0 && (
                  <div className="w-full max-w-3xl mx-auto py-2 px-2">
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12">
                      {currentGapPhotos.map((photo) => {
                        let tapeStyle = "washi-tape-pink";
                        if (photo.tapeColor === 'blue') tapeStyle = "washi-tape-blue";
                        if (photo.tapeColor === 'yellow') tapeStyle = "bg-[#fef08a]/80";
                        if (photo.tapeColor === 'cream') tapeStyle = "";

                        return (
                          <div
                            key={photo.id}
                            className="relative transition-all duration-300 transform hover:scale-110 hover:rotate-0 hover:z-30 cursor-pointer"
                            style={{
                              transform: `rotate(${photo.tilt}deg)`,
                            }}
                            onClick={() => setSelectedPhoto({ src: photo.src, alt: photo.alt })}
                          >
                            {/* Tape accent */}
                            <div 
                              className={`washi-tape ${tapeStyle} w-24 -top-3`}
                              style={{ transform: `translateX(-50%) rotate(${photo.tapeAngle}deg)` }}
                            />

                            {/* Small Polaroid Card */}
                            <div className="bg-white p-2.5 sm:p-3 pb-6 sm:pb-8 border border-[#2c1d11]/15 rounded shadow-[0_6px_16px_rgba(44,29,17,0.12)] w-44 sm:w-52 md:w-56">
                              <div className="bg-[#eae3d2] aspect-[4/3] overflow-hidden rounded relative shadow-inner">
                                <div className="absolute inset-0 bg-[#d8c3a5]/10 mix-blend-overlay z-1 pointer-events-none" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={photo.src}
                                  alt={photo.alt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </main>

        {/* Lightbox Image Zoom Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative bg-white p-4 sm:p-6 pb-10 sm:pb-12 rounded-lg max-w-3xl max-h-[90vh] shadow-2xl overflow-auto rotate-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black font-sans font-bold text-xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>

              <div className="mt-2 bg-[#eae3d2] rounded overflow-hidden shadow-inner max-h-[75vh] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-w-full max-h-[75vh] object-contain rounded"
                />
              </div>

              <p className="font-handwriting text-2xl text-center mt-4 text-[#8c6a46] font-bold">
                {selectedPhoto.alt}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center font-handwriting text-2xl text-[#2c1d11]/40 border-t border-[#2c1d11]/10 pt-8 mt-8">
          ❤️ TrueShe ka janmdin ❤️
        </footer>
      </div>
    </AuthGuard>
  );
}
