'use client';
import Footer from '@/components/footer';
import Editor from '../../modules/editor';
import Features from '../../modules/features';
import Hero from '../../modules/hero';
import Pricing from '../../modules/pricing';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Clock, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [paymentStatus, setPaymentStatus] = useState<'upgraded' | 'canceled' | null>(null);

  // Handle payment success/cancel from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const upgraded = urlParams.get('upgraded');
    const canceled = urlParams.get('payment_canceled');

    if (upgraded) {
      setPaymentStatus('upgraded');
      // Clean up URL
      window.history.replaceState({}, '', '/');
    } else if (canceled) {
      setPaymentStatus('canceled');
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <div>
      {/* Payment Status Notification */}
      <AnimatePresence>
        {paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 rounded-xl border p-4 ${
              paymentStatus === 'upgraded'
                ? 'border-green-500/20 bg-green-500/10 text-green-600'
                : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600'
            }`}
          >
            <div className='flex items-center space-x-2'>
              {paymentStatus === 'upgraded' ? (
                <>
                  <CheckCircle className='h-5 w-5' />
                  <span className='font-medium'>
                    🎉 Bienvenue sur Pro ! Vous bénéficiez désormais de téléchargements illimités.
                  </span>
                </>
              ) : (
                <>
                  <Clock className='h-5 w-5' />
                  <span className='font-medium'>
                    Paiement annulé. Vous pouvez passer à Pro à tout moment !
                  </span>
                </>
              )}
              <button onClick={() => setPaymentStatus(null)} className='ml-2 hover:opacity-70'>
                <X className='h-4 w-4' />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero />
      <Features />
      <Pricing />
      <Editor />
      <Footer />
    </div>
  );
};

export default Page;
