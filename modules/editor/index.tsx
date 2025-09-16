'use client';
import {
  CheckCircle,
  Clock,
  Crop,
  Download,
  Expand,
  Loader2,
  Scissors,
  Type,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
import CanvasEditor from './canvas-editor';
import UploadZone from './upload-zone';

type JobStatus = 'idle' | 'queued' | 'processing' | 'completed' | 'error';

interface ProcessingJob {
  id: string;
  type: string;
  status: JobStatus;
  progress: number;
  result?: string;
}
const primaryTools = [
  {
    id: 'e-bgremove',
    name: "Supprimer l'arrière-plan",
    icon: Scissors,
    color: 'primary',
    description: 'Enlève automatiquement l’arrière-plan avec l’IA',
  },
  {
    id: 'e-removedotbg',
    name: "Supprimer l'arrière-plan (Pro)",
    icon: Scissors,
    color: 'secondary',
    description: 'Suppression d’arrière-plan haute qualité',
  },
  {
    id: 'e-changebg',
    name: "Changer l'arrière-plan",
    icon: Expand,
    color: 'primary',
    description: 'Remplace l’arrière-plan avec l’IA',
    hasPrompt: true,
  },
  {
    id: 'e-edit',
    name: 'Édition IA',
    icon: Type,
    color: 'secondary',
    description: 'Modifie l’image à l’aide de commandes texte',
    hasPrompt: true,
  },
  {
    id: 'bg-genfill',
    name: 'Remplissage génératif',
    icon: Expand,
    color: 'primary',
    description: 'Complète les zones vides automatiquement',
    hasPrompt: true,
  },
];

const secondaryTools = [
  {
    id: 'e-dropshadow',
    name: 'Ombre réaliste',
    icon: Zap,
    color: 'secondary',
    description: 'Ajoute des ombres réalistes à vos images',
  },
  {
    id: 'e-retouch',
    name: 'Retouche IA',
    icon: Zap,
    color: 'primary',
    description: 'Améliore et retouche vos images',
  },
  {
    id: 'e-upscale',
    name: 'Amélioration x2',
    icon: Zap,
    color: 'secondary',
    description: 'Augmente la résolution et la qualité de vos images',
  },
  {
    id: 'e-genvar',
    name: 'Générer des variantes',
    icon: Type,
    color: 'primary',
    description: 'Crée automatiquement des variations de vos images',
    hasPrompt: true,
  },
  {
    id: 'e-crop-face',
    name: 'Recadrage visage',
    icon: Crop,
    color: 'secondary',
    description: 'Recadre intelligemment en se concentrant sur les visages',
  },
  {
    id: 'e-crop-smart',
    name: 'Recadrage intelligent',
    icon: Crop,
    color: 'primary',
    description: 'Recadrage optimisé par l’IA pour vos images',
  },
];
const allTools = [...primaryTools, ...secondaryTools];

const Editor = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null);
  const [editHistory, setEditHistory] = useState<ProcessingJob[]>([]);
  const [activeEffects, setActiveEffects] = useState<Set<string>>(new Set());
  const [promptText, setPromptText] = useState<string>('');
  const [showPromptInput, setShowPromptInput] = useState<boolean>(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setProcessedImage(null);
    setCurrentJob(null);
  };
  const handlePromptSubmit = async () => {
    if (!promptText.trim()) return;

    // Find the tool that was clicked
    const tool = allTools.find((t) => t.hasPrompt && !activeEffects.has(t.id));
    if (!tool) return;

    await applyEffect(tool.id, promptText);
    setShowPromptInput(false);
    setPromptText('');
  };
  const getImageKitTransform = (tooldId: string, prompt?: string): string => {
    const transforms: Record<string, string> = {
      'e-bgremove': 'e-bgremove',
      'e-removedotbg': 'e-removedotbg',
      'e-changebg': prompt ? `e-changebg-prompt-${encodeURIComponent(prompt)}` : 'e-changebg',
      'e-edit': prompt ? `e-edit:${encodeURIComponent(prompt)}` : 'e-edit',
      'bg-genfill': prompt ? `bg-genfill:${encodeURIComponent(prompt)}` : 'bg-genfill',
      'e-dropshadow': 'e-dropshadow',
      'e-retouch': 'e-retouch',
      'e-upscale': 'e-upscale',
      'e-genvar': prompt ? `e-genvar:${encodeURIComponent(prompt)}` : 'e-genvar',
      'e-crop-face': 'e-crop-face',
      'e-crop-smart': 'e-crop-smart',
    };

    return transforms[tooldId] || '';
  };

  const handleToolClick = async (toolId: string) => {
    if (!uploadedImage) return;

    const tool = allTools.find((t) => t.id === toolId);

    if (!tool) return;

    // Toogle effect on/off
    const newActiveEffects = new Set(activeEffects);
    if (newActiveEffects.has(toolId)) {
      newActiveEffects.delete(toolId);
      setActiveEffects(newActiveEffects);

      // remove effect from image
      const remainingEffects = Array.from(newActiveEffects);

      const newImageUrl =
        remainingEffects.length > 0
          ? `${uploadedImage}?tr=${remainingEffects
              .map((effect) => getImageKitTransform(effect))
              .join(',')}`
          : uploadedImage;
      setProcessedImage(newImageUrl);
      return;
    }

    // Check if tool requires prompt
    if (tool.hasPrompt) {
      setShowPromptInput(true);
      setPromptText('');
      return;
    }

    // Apply effect immediately
    await applyEffect(toolId);
  };

  const applyEffect = async (toolId: string, prompt?: string) => {
    if (!uploadedImage) return;

    const newJob: ProcessingJob = {
      id: Date.now().toString(),
      type: toolId,
      status: 'queued',
      progress: 0,
    };

    setCurrentJob(newJob);

    // Apply effect to active effects
    const newActiveEffects = new Set(activeEffects);
    newActiveEffects.add(toolId);
    setActiveEffects(newActiveEffects);

    // Generate the ImageKit transformation URL
    const allEffects = Array.from(newActiveEffects);
    const transforms = allEffects.map((effect) =>
      getImageKitTransform(effect, effect === toolId ? prompt : undefined)
    );
    const newImageUrl = `${uploadedImage}?tr=${transforms.join(',')}`;

    try {
      // Start polling the AI transformation URL to check when it's complete
      setCurrentJob((prev) => (prev ? { ...prev, status: 'processing', progress: 10 } : null));

      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max (5s intervals)
      const pollInterval = 5000; // 5seconds / 5k ms

      const pollImageKit = async (): Promise<boolean> => {
        attempts++;

        try {
          const response = await fetch(newImageUrl, {
            method: 'HEAD', // only check headers, don't download image
            cache: 'no-cache', // don't use cached version
          });

          if (response.ok) {
            // AI transformation is complete
            setProcessedImage(newImageUrl);
            setCurrentJob((prev) =>
              prev ? { ...prev, progress: 100, status: 'completed' } : null
            );

            const completedJob = {
              ...newJob,
              status: 'completed' as JobStatus,
              progress: 100,
              result: newImageUrl,
            };
            setEditHistory((prev) => [completedJob, ...prev.slice(0, 2)]);
            return true;
          }
        } catch (error) {
          console.log(`Tentative ${attempts}: l'IA est toujours en train de traiter...`);
        }

        // update progress based on attempts
        const progress = Math.min(10 + attempts * 1.5, 90); // 10% to 90%
        setCurrentJob((prev) => (prev ? { ...prev, progress } : null));

        if (attempts >= maxAttempts) {
          // Timeout - mark as completed anyway
          setProcessedImage(newImageUrl);
          setCurrentJob((prev) => (prev ? { ...prev, progress: 100, status: 'completed' } : null));

          const completedJob = {
            ...newJob,
            status: 'completed' as JobStatus,
            progress: 100,
            result: newImageUrl,
          };
          setEditHistory((prev) => [completedJob, ...prev.slice(0, 2)]);
          return true;
        }

        // Continue polling
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        return pollImageKit();
      };

      // starting polling
      await pollImageKit();
    } catch (error) {
      console.error("Erreur lors de l'application de l'effet :", error);
      setCurrentJob((prev) => (prev ? { ...prev, status: 'error' } : null));
    }
  };
  const handleExport = (format: string) => {
    if (!processedImage) return;

    saveAs(processedImage, `Lumina-${Date.now()}.${format}`);
  };
  return (
    <section id='editor' className='relative overflow-hidden py-24'>
      {/* Background effects */}
      <div className='from-background to-muted/10 absolute inset-0 bg-gradient-to-b' />

      <div className='relative z-10 container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-12 text-center'
        >
          <h2 className='mb-6 text-4xl font-bold lg:text-6xl'>
            <span className='bg-gradient-primary !bg-clip-text text-transparent'>Studio</span>
            <span className='text-foreground'> Magique</span>
          </h2>
          <p className='text-muted-foreground mx-auto max-w-3xl text-xl'>
            Téléversez votre photo et transformez-la avec nos outils IA. Admirez la magie opérer en
            temps réel.
          </p>
        </motion.div>

        <div className='grid gap-8 lg:grid-cols-4'>
          {/* upload area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-1'
          >
            <UploadZone onImageUpload={handleImageUpload} />

            {/* Toolbar */}
            <div className='mt-6 space-y-3'>
              <h3 className='text-foreground mb-4 text-lg font-semibold'>Outils IA</h3>

              {/* Prompt Input */}
              {showPromptInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='glass border-card-border space-y-3 rounded-lg border p-4'
                >
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder='Describe what you want to change...'
                    className='bg-background border-border text-foreground placeholder:text-muted-foreground w-full resize-none rounded-md border p-3'
                    rows={3}
                  />

                  <div className='flex gap-2'>
                    <Button
                      onClick={handlePromptSubmit}
                      disabled={!promptText.trim()}
                      className='flex-1'
                    >
                      Appliquer
                    </Button>
                    <Button variant='outline' onClick={() => setShowPromptInput(false)}>
                      Annuler
                    </Button>
                  </div>
                </motion.div>
              )}

              {primaryTools.map((tool) => {
                const isActive = activeEffects.has(tool.id);
                const isProcessing =
                  currentJob?.type === tool.id && currentJob.status === 'processing';
                const isQueued = currentJob?.type === tool.id && currentJob.status === 'processing';
                const isDisabled = !uploadedImage || currentJob?.status === 'processing';

                return (
                  <Button
                    key={tool.id}
                    variant={isActive ? 'default' : 'outline'}
                    className={`shadow-glass w-full justify-start transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:border-primary/30 border-gray-600'
                    }`}
                    onClick={() => handleToolClick(tool.id)}
                    disabled={isDisabled}
                    title={tool.description}
                  >
                    <tool.icon className={`mr-2 h-4 w-4 ${isProcessing ? 'animate-pulse' : ''}`} />
                    <div className='flex-1 text-left'>
                      <div className='font-medium'>{tool.name}</div>
                      {tool?.hasPrompt && (
                        <div className='text-xs opacity-70'>requiert un prompt</div>
                      )}
                    </div>
                    {isActive && !isProcessing && (
                      <div className='bg-primary-foreground h-2 w-2 rounded-full' />
                    )}
                    {isQueued && (
                      <div className='bg-muted-foreground h-2 w-2 animate-pulse rounded-full' />
                    )}
                    {isProcessing && <Loader2 className='ml-auto h-4 w-4 animate-spin' />}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Main Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-2'
          >
            <CanvasEditor
              originalImage={uploadedImage}
              processedImage={processedImage}
              isProcessing={currentJob?.status === 'processing'}
            />

            {/* Secondery Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-6'
            >
              <h4 className='text-foreground mb-3 text-sm font-semibold'>Outils supplémentaires</h4>
              <div className='grid grid-cols-2 gap-2'>
                {secondaryTools.map((tool) => {
                  const isActive = activeEffects.has(tool.id);
                  const isProcessing =
                    currentJob?.type === tool.id && currentJob.status === 'processing';
                  const isQueued = currentJob?.type === tool.id && currentJob.status === 'queued';
                  const isDisabled = !uploadedImage || currentJob?.status === 'processing';

                  return (
                    <Button
                      key={tool.id}
                      variant={isActive ? 'default' : 'outline'}
                      size='sm'
                      className={`shadow-glass justify-start transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'hover:border-primary/30 border-gray-600'
                      }`}
                      onClick={() => handleToolClick(tool.id)}
                      disabled={isDisabled}
                      title={tool.description}
                    >
                      <tool.icon
                        className={`mr-2 h-3 w-3 ${isProcessing ? 'animate-pulse' : ''}`}
                      />
                      <span className='text-xs'>{tool.name}</span>
                      {isActive && !isProcessing && (
                        <div className='bg-primary-foreground ml-auto h-1.5 w-1.5 rounded-full' />
                      )}
                      {isProcessing && <Loader2 className='ml-auto h-3 w-3 animate-spin' />}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Job Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-1'
          >
            <div className='shadow-glass rounded-xl border border-gray-800 p-6'>
              <h3 className='text-foreground mb-4 text-lg font-semibold'>Statut de la tâche</h3>

              {currentJob ? (
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    {currentJob.status === 'processing' ? (
                      <Loader2 className='text-primary h-5 w-5 animate-spin' />
                    ) : currentJob.status === 'completed' ? (
                      <CheckCircle className='text-primary h-5 w-5' />
                    ) : currentJob.status === 'queued' ? (
                      <Clock className='text-muted-foreground h-5 w-5 animate-pulse' />
                    ) : (
                      <Clock className='text-muted-foreground h-5 w-5' />
                    )}
                    <div>
                      <p className='text-foreground font-medium capitalize'>
                        {allTools.find((t) => t.id === currentJob.type)?.name ||
                          currentJob.type.replace('-', ' ')}
                      </p>
                      <p className='text-muted-foreground text-sm capitalize'>
                        {currentJob.status === 'queued' && 'Preparing AI transformation...'}
                        {currentJob.status === 'processing' &&
                          `Processing with AI... (${currentJob.progress}%)`}
                        {currentJob.status === 'completed' && 'AI transformation completed!'}
                        {currentJob.status === 'error' && 'Processing failed'}
                      </p>
                    </div>
                  </div>

                  {(currentJob.status === 'processing' || currentJob.status === 'queued') && (
                    <div className='bg-muted h-2 w-full rounded-full'>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentJob.status === 'queued'
                            ? 'bg-muted-foreground animate-pulse'
                            : 'bg-gradient-primary'
                        }`}
                        style={{
                          width:
                            currentJob.status === 'queued' ? '100%' : `${currentJob.progress}%`,
                        }}
                      />
                      <div className='text-muted-foreground mt-1 text-center text-xs'>
                        {currentJob.status === 'queued' && 'Initializing...'}
                        {currentJob.status === 'processing' &&
                          'Waiting for AI to complete transformation...'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className='text-muted-foreground text-sm'>
                  Téléchargez une image et sélectionnez un outil pour commencer
                </p>
              )}

              {/* Edit History */}
              {editHistory?.length > 0 && (
                <div className='mt-8'>
                  <h4 className='text-foreground mb-3 text-sm font-semibold'>Dernières éditions</h4>
                  <div className='space-y-2'>
                    {editHistory?.map((job) => (
                      <div key={job.id} className='flex items-center space-x-2 text-sm'>
                        <CheckCircle className='text-primary h-3 w-3 flex-shrink-0' />
                        <span className='text-muted-foreground capitalize'>
                          {job?.type?.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Button */}
              {processedImage && (
                <div className='mt-6'>
                  <Button variant={'hero'} onClick={() => handleExport('jpg')} className='w-full'>
                    <Download className='mr-2 h-4 w-4' />
                    Télécharger
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Editor;
