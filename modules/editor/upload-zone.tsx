import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next';
import PaymentModal from '@/components/modals/payment-modal';

interface UploadZoneProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadZone = ({ onImageUpload }: UploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [usageData, setUsageData] = useState<{
    usageCount: number;
    usageLimit: number;
    plan: string;
    canUpload: boolean;
  } | null>(null);

  // check the usage on component mount
  useEffect(() => {
    checkUsage()?.catch(console.error);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const getUploadAuthParams = async () => {
    const response = await fetch('/api/upload-auth');

    if (!response.ok) {
      throw new Error("Erreur de récupération des paramètres d'authentification");
    }
    const data = await response?.json();

    return data;
  };

  const uploadToImageKit = async (file: File): Promise<string> => {
    try {
      // Get authentication parameters
      const { token, expire, signature, publicKey } = await getUploadAuthParams();

      const result = await upload({
        file,
        fileName: file?.name,
        folder: 'lumina-uploads',
        expire,
        token,
        signature,
        publicKey,
        onProgress: (event) => {
          // Update progress if needed
          console.log(`Progression de l'upload: ${(event.loaded / event.total) * 100}%`);
        },
      });

      return result.url || '';
    } catch (error) {
      if (error instanceof ImageKitInvalidRequestError) {
        throw new Error("Requête d'upload invalide");
      } else if (error instanceof ImageKitServerError) {
        throw new Error('Erreur du serveur ImageKit');
      } else if (error instanceof ImageKitUploadNetworkError) {
        throw new Error("Erreur de réseau lors de l'upload");
      } else {
        throw new Error('Upload echoué');
      }
    }
  };

  const handleFiles = async (files: File[]) => {
    const imageFile = files?.find((file) => file.type.startsWith('image/'));
    if (imageFile) {
      setIsUploading(true);

      try {
        // Check usage first
        await checkUsage();

        // Update usage count
        await updateUsage();

        // Upload to ImageKit
        const imageUrl = await uploadToImageKit(imageFile);
        setUploadedImage(imageUrl);
        onImageUpload(imageUrl);
      } catch (error) {
        console.error('Upload echoué:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const checkUsage = async () => {
    const response = await fetch('/api/usage');
    if (!response.ok) {
      throw new Error("Erreur de vérification de l'utilisation");
    }
    const data = await response.json();
    setUsageData(data);
    return data;
  };

  const updateUsage = async () => {
    const response = await fetch('/api/usage', { method: 'POST' });
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        // Usage limit reached
        setUsageData(errorData);
        setShowPaymentModal(true);
        throw new Error("Limite d'utilisation atteinte");
      }
      throw new Error("Erreur de mise à jour de l'utilisation");
    }
    const data = await response.json();
    setUsageData(data);
    return data;
  };

  const clearImage = () => {
    setUploadedImage(null);
    onImageUpload('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='relative'
    >
      {uploadedImage ? (
        <div className='glass border-card-border relative rounded-xl border p-4'>
          <button
            onClick={clearImage}
            className='bg-background/80 hover:bg-destructive/20 absolute top-2 right-2 z-10 rounded-full p-1 transition-colors'
          >
            <X className='text-foreground hover:text-destructive h-4 w-4' />
          </button>

          <div className='aspect-square overflow-hidden rounded-lg'>
            <img
              src={uploadedImage}
              alt='Uploaded Preview'
              className='h-full w-full object-cover'
            />
          </div>

          <div className='mt-3 text-center'>
            <p className='text-foreground text-sm font-medium'>
              {uploadedImage.startsWith('data:') ? 'Local preview' : 'Uploaded to cloud'}
            </p>
            <p className='text-muted-foreground text-xs'>Prêt pour la magie de l'IA ?✨</p>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`shadow-glass cursor-pointer rounded-xl border-2 border-dashed border-gray-800 p-8 transition-all duration-300 ${
            isDragOver
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-card-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <input
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            className='hidden'
            id='file-upload'
          />

          <label htmlFor='file-upload' className='block cursor-pointer text-center'>
            <motion.div animate={isDragOver ? { scale: 1.1 } : { scale: 1 }} className='mb-4'>
              <div className='from-primary/20 to-secondary/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br'>
                {isUploading ? (
                  <Loader2 className='text-primary h-8 w-8 animate-spin' />
                ) : isDragOver ? (
                  <Upload className='text-primary h-8 w-8 animate-bounce' />
                ) : (
                  <ImageIcon className='text-primary h-8 w-8' />
                )}
              </div>
            </motion.div>

            <h3 className='text-foreground mb-2 text-lg font-semibold'>
              {isUploading
                ? 'Envoi en cours...'
                : isDragOver
                  ? 'Déposez votre photo ici'
                  : 'Envoyer une photo'}
            </h3>

            <p className='text-muted-foreground mb-4 text-sm'>
              {isUploading
                ? 'Veuillez patienter pendant que nous envoyons votre image'
                : 'Faites glisser et déposez ou cliquez pour parcourir'}
            </p>

            <Button
              variant='outline'
              className='glass border-card-border'
              disabled={isUploading}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Téléchargement en cours...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  Parcourir les fichiers
                </>
              )}
            </Button>
          </label>
        </div>
      )}

      {/* Usage Info */}
      {usageData && (
        <div className='mt-4 text-center'>
          <div className='text-muted-foreground flex items-center justify-center space-x-2 text-xs'>
            <span>
              Usage: {usageData.usageCount}/{usageData.usageLimit}
            </span>
            {usageData.plan === 'Free' && <Crown className='text-primary h-3 w-3' />}
          </div>
          <p className='text-muted-foreground mt-1 text-xs'>Supporte JPG, PNG, WebP jusqu'à 10MB</p>
        </div>
      )}
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onUpgrade={() => {
          setShowPaymentModal(false);
        }}
        usageCount={usageData?.usageCount || 0}
        usageLimit={usageData?.usageLimit || 3}
      />
    </motion.div>
  );
};

export default UploadZone;
