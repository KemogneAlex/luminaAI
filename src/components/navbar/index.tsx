'use client';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = async () => {
    if (session?.user) {
      scrollToSection('editor');
    } else {
      await signIn('google');
    }
  };
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-card-border backdrop-blur-glass border-b' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            className='flex cursor-pointer items-center space-x-3 select-none'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('hero')}
          >
            {/* Icône avec étincelles animées */}
            <div className='relative'>
              <Sparkles fill='transparent' className='text-primary h-10 w-10 animate-pulse' />
              {/* Glow derrière l'icône */}
              <div className='from-primary to-secondary absolute inset-0 h-10 w-10 animate-ping rounded-full bg-gradient-to-r opacity-40' />
            </div>

            {/* Texte du logo avec gradient animé */}
            <span className='from-primary to-secondary animate-gradient-x bg-gradient-to-r bg-clip-text text-3xl font-extrabold text-transparent'>
              Lumina AI
            </span>
          </motion.div>
          {/* Navigation */}
          <div className='hidden items-center space-x-8 md:flex'>
            <button
              onClick={() => scrollToSection('features')}
              className='text-foreground hover:text-primary font-medium transition-colors'
            >
              Caractéristiques
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className='text-foreground hover:text-primary font-medium transition-colors'
            >
              Tarification
            </button>
            <Button variant='hero' className='w-full font-semibold' onClick={handleSubmit}>
              {session?.user ? "Lancer l'application" : 'Se connecter'}
            </Button>
          </div>
          {/* Bouton de menu mobile */}
          <button
            className='text-foreground md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className='overflow-hidden md:hidden'
        >
          <div className='space-y-4 py-4'>
            <button
              onClick={() => scrollToSection('features')}
              className='text-foreground hover:text-primary block w-full text-left font-medium transition-colors'
            >
              Caractéristiques
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className='text-foreground hover:text-primary block w-full text-left font-medium transition-colors'
            >
              Tarification
            </button>
            <Button variant='hero' className='w-full' onClick={handleSubmit}>
              {session?.user ? "Lancer l'application" : 'Se connecter'}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
export default Navbar;
