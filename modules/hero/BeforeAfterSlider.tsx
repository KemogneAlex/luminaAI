import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Images réelles avant/après
  const beforeImage =
    'https://ik.imagekit.io/sjbr5usgh/pixora-uploads/Roadster_Hero_W0sp0doWK.webp';
  const afterImage =
    'https://ik.imagekit.io/sjbr5usgh/pixora-uploads/Roadster_Hero_W0sp0doWK.webp?tr=e-changebg-prompt-Change%20scene%20to%20snowy%20alpine%20road%2C%20cold%20blue%20tones%2C%20clean%20snowbanks%3B%20keep%20car%20untouched';

  return (
    <motion.div
      className='relative mx-auto w-full max-w-md'
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        ref={containerRef}
        className='shadow-glass border-card-border glow-subtle relative aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-2xl border select-none'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Image avant*/}
        <div className='absolute inset-0'>
          <img
            src={beforeImage}
            alt='Before - Original car on road'
            className='h-full w-full object-cover select-none'
          />
        </div>

        {/* Image après */}
        <div
          className='absolute inset-0 overflow-hidden'
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt='After - Car with snowy alpine background'
            className='h-full w-full object-cover select-none'
          />
        </div>

        {/* Poignée coulissante */}
        <div
          className='bg-gradient-primary group absolute top-0 bottom-0 w-1 cursor-ew-resize'
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
        >
          <div className='bg-gradient-primary shadow-glow-primary absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full transition-transform group-hover:scale-110'>
            <div className='bg-background flex h-6 w-6 items-center justify-center rounded-full'>
              <div className='bg-gradient-primary h-4 w-1 rounded-full' />
            </div>
          </div>
        </div>

        {/* Texte des labels */}
        <div className='text-muted-foreground absolute bottom-4 left-4 text-xs font-medium'>
          Après
        </div>
        <div className='text-primary absolute right-4 bottom-4 text-xs font-medium'>Avant</div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className='text-muted-foreground mt-4 text-center text-sm'
      >
        Glissez le curseur et admirez la magie ✨
      </motion.p>
    </motion.div>
  );
};

export default BeforeAfterSlider;
