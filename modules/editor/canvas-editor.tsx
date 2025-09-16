import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CanvasEditorProps {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
}

const CanvasEditor = ({ originalImage, processedImage, isProcessing }: CanvasEditorProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  if (!originalImage) {
    return (
      <div className='shadow-glass flex aspect-[4/3] items-center justify-center rounded-xl border border-gray-800'>
        <div className='text-center'>
          <div className='bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl'>
            <span className='text-2xl'>🎨</span>
          </div>
          <h3 className='text-foreground mb-2 text-lg font-semibold'>Prêt pour la magie?</h3>
          <p className='text-muted-foreground'>Téléversez une photo pour commencer l’édition</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Canvas */}

      <motion.div
        layout
        className='glass border-card-border relative aspect-[4/3] overflow-hidden rounded-xl border'
      >
        {isProcessing && (
          <div className='bg-background/80 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
            <div className='text-center'>
              <Loader2 className='text-primary mx-auto mb-3 h-8 w-8 animate-spin' />
              <p className='text-foreground font-medium'>L’IA opère sa magie...</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                Cela prend généralement quelques secondes
              </p>
            </div>
          </div>
        )}

        {showComparison && processedImage ? (
          // Before/After comparison
          <div className='relative h-full w-full cursor-ew-resize' onMouseMove={handleSliderMove}>
            {/* Original Image */}
            <div className='absolute inset-0'>
              <img src={originalImage} alt='Original' className='h-full w-full object-contain' />
            </div>

            {/* Processed Image */}
            <div
              className='absolute inset-0 overflow-hidden'
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img src={processedImage} alt='Processed' className='h-full w-full object-contain' />
            </div>

            {/* Slider */}
            <div
              className='bg-gradient-primary absolute top-0 bottom-0 w-1'
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className='bg-gradient-primary shadow-glow-primary absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full'>
                <div className='bg-background flex h-6 w-6 items-center justify-center rounded-full'>
                  <div className='bg-gradient-primary h-4 w-1 rounded-full' />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className='text-background bg-foreground/80 absolute bottom-4 left-4 rounded px-2 py-1 text-xs font-medium'>
              Avant
            </div>
            <div className='text-background bg-primary absolute right-4 bottom-4 rounded px-2 py-1 text-xs font-medium'>
              Après
            </div>
          </div>
        ) : (
          <div className='h-full w-full'>
            <img
              src={processedImage || originalImage}
              alt={processedImage ? 'Processed' : 'Original'}
              className='h-full w-full object-contain'
            />
          </div>
        )}

        {/* Overlay controls */}
        {processedImage && !isProcessing && (
          <div className='absolute top-4 right-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowComparison(!showComparison)}
              className='glass bg-background/20 border-foreground/20 text-foreground hover:bg-background/40'
            >
              {showComparison ? (
                <>
                  <EyeOff className='mr-2 h-4 w-4' />
                  Masquer la comparaison
                </>
              ) : (
                <>
                  <Eye className='mr-2 h-4 w-4' />
                  Comparer
                </>
              )}
            </Button>
          </div>
        )}
      </motion.div>

      {/* Status */}
      <div className='text-center'>
        {isProcessing ? (
          <p className='text-primary text-sm'>Traitement en cours...</p>
        ) : processedImage ? (
          <p className='text-primary text-sm'>
            ✨ Magie appliquée! Comparez ou exportez votre résultat
          </p>
        ) : (
          <p className='text-muted-foreground text-sm'>
            Sélectionnez un outil pour commencer l’édition
          </p>
        )}
      </div>
    </div>
  );
};

export default CanvasEditor;
