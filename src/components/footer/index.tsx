'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='border-card-border relative overflow-hidden border-t py-12'>
      {/*  Background Effect */}
      <div className='from-muted/10 absolute inset-0 bg-gradient-to-t to-transparent' />

      <div className='relative z-10 container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          {/* Logo */}
          <div className='mb-6 flex items-center justify-center space-x-2'>
            <div className='relative'>
              <Sparkles className='text-primary animate-glow-pulse h-8 w-8' />
              <div className='text-secondary animate-glow-pulse absolute inset-0 h-8 w-8 opacity-50' />
            </div>
            <span className='bg-gradient-primary !bg-clip-text text-2xl font-bold text-transparent'>
              Lumina AI
            </span>
          </div>

          {/* Description */}
          <p className='text-muted-foreground mx-auto mb-8 max-w-2xl'>
            Transformez vos photos grâce à l’IA. Supprimez l’arrière-plan, améliorez la qualité et
            donnez vie à des visuels incroyables en quelques secondes.
          </p>

          {/* Made with love */}
          <div className='text-muted-foreground flex items-center justify-center space-x-2 text-sm'>
            <span>Créé avec</span>
            <Heart className='h-4 w-4 animate-pulse text-red-500' />
            <span>pour inspirer vos créations</span>
          </div>

          {/* Copyright */}
          <div className='border-card-border mt-8 border-t pt-8 text-center'>
            <p className='text-muted-foreground text-center text-sm'>
              © 2025 Lumina AI. Inspirer, créer, partager.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
