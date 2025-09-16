import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Crown, Star, X, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  usageCount: number;
  usageLimit: number;
}

const PaymentModal = ({
  isOpen,
  onClose,
  onUpgrade,
  usageCount,
  usageLimit,
}: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Échec de création de la session de paiement');
      }

      const { url } = await response.json();

      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Aucune URL de paiement reçue');
      }
    } catch (error) {
      console.error('Échec du paiement:', error);
      alert('Échec du paiement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className='glass border-card-border shadow-glow-primary relative w-full max-w-md rounded-2xl border p-6'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className='hover:bg-muted absolute top-4 right-4 rounded-full p-2 transition-colors'
            >
              <X className='text-muted-foreground h-4 w-4' />
            </button>

            {/* Header */}
            <div className='mb-6 text-center'>
              <div className='bg-gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                <Crown className='text-primary-foreground h-8 w-8' />
              </div>
              <h2 className='text-foreground mb-2 text-2xl font-bold'>Débloquez le mode Pro ✨</h2>
              <p className='text-muted-foreground'>
                {usageCount}/{usageLimit} essais gratuits utilisés
              </p>
            </div>

            {/* Features */}
            <div className='mb-6 space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full'>
                  <Check className='text-primary h-4 w-4' />
                </div>
                <div>
                  <p className='text-foreground font-medium'>Uploads sans limites 🚀</p>
                  <p className='text-muted-foreground text-sm'>
                    Laissez libre cours à votre créativité, sans restrictions
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <div className='bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full'>
                  <Zap className='text-primary h-4 w-4' />
                </div>
                <div>
                  <p className='text-foreground font-medium'>Traitement express ⚡</p>
                  <p className='text-muted-foreground text-sm'>
                    Profitez d’une vitesse IA ultra-rapide
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <div className='bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full'>
                  <Star className='text-primary h-4 w-4' />
                </div>
                <div>
                  <p className='text-foreground font-medium'>Effets exclusifs ✨</p>
                  <p className='text-muted-foreground text-sm'>
                    Débloquez les outils IA les plus puissants
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className='bg-muted/50 mb-6 rounded-xl p-4'>
              <div className='text-center'>
                <p className='text-muted-foreground text-sm'>Passez à Pro 🚀</p>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='text-foreground text-3xl font-bold'>19€</span>
                  <span className='text-muted-foreground'>/mois</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
              <Button
                onClick={handleUpgrade}
                disabled={isLoading}
                className='bg-gradient-primary text-primary-foreground hover:shadow-glow-primary w-full transition-all'
              >
                {isLoading ? (
                  <>
                    <div className='border-primary-foreground/30 border-t-primary-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2' />
                    En cours...
                  </>
                ) : (
                  <>
                    <Crown className='mr-2 h-4 w-4' />
                    Débloquer le Pro 🚀
                  </>
                )}
              </Button>

              <Button variant='outline' onClick={onClose} className='border-card-border w-full'>
                Pas maintenant
              </Button>
            </div>

            {/* Footer */}
            <p className='text-muted-foreground mt-4 text-center text-xs'>
              En passant au plan Pro, vous acceptez nos Conditions d’utilisation et notre Politique
              de confidentialité.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
