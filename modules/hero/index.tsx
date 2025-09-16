'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section
      id='hero'
      className='relative flex min-h-screen items-center justify-center overflow-hidden pt-20'
    >
      {/* Background Gradient */}
      <div className='from-background via-background to-muted absolute inset-0 bg-gradient-to-br opacity-50' />
      {/* Orbes flottantes */}
      <div className='bg-primary/20 animate-float absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl' />
      <div
        className='bg-secondary/20 animate-float absolute right-10 bottom-20 h-96 w-96 rounded-full blur-3xl'
        style={{ animationDelay: '-1s' }}
      />
      <div className='relative z-10 container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2'>
        {/* Contenu de gauche */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center lg:text-left'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-gradient-glass glass border-card-border mb-4 mt-6 inline-flex items-center space-x-2 rounded-full border px-3 py-1.5'
          >
            <Sparkles className='text-primary h-4 w-4' />
            <span className='text-sm font-medium'>Propulsé par la magie de l'IA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mb-6 text-4xl font-bold leading-tight lg:text-5xl'
          >
            <span className='bg-gradient-primary !bg-clip-text text-transparent'>Lumina AI</span>
            <br />
            <span className='text-foreground'>L'art de sublimer vos photos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='text-muted-foreground mb-6 max-w-2xl text-base leading-relaxed'
          >
            Sublimez vos photos avec l’IA : arrière-plans supprimés, qualité améliorée et visuels
            époustouflants en quelques secondes. Déposez votre photo, la magie fait le reste.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'
          >
            <Button
              variant='hero'
              size='default'
              onClick={() => scrollToSection('editor')}
              className='group text-white'
            >
              <Play className='mr-2 h-5 w-5 group-hover:animate-pulse' />
              Essayez gratuitement
            </Button>
            <Button
              variant='secondary'
              size='default'
              onClick={() => scrollToSection('editor')}
              className='group'
            >
              Démarrer l’application
              <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='text-muted-foreground mt-6 flex items-center justify-center space-x-4 text-xs lg:justify-start'
          >
            <div className='flex items-center space-x-2'>
              <div className='bg-primary h-2 w-2 animate-pulse rounded-full' />
              <span>Téléchargements illimités en Pro</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='bg-secondary h-2 w-2 animate-pulse rounded-full' />
              <span>Modifications illimitées</span>
            </div>
          </motion.div>
        </motion.div>
        {/* Contenu de droite - Curseur avant/après */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex justify-center'
        >
          <BeforeAfterSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
