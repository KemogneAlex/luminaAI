'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours actif car nécessaire au fonctionnement
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'all') {
      setPreferences({
        necessary: true,
        analytics: true,
        marketing: true,
      });
    } else if (consent === 'custom') {
      const savedPrefs = localStorage.getItem('cookiePreferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(newPrefs);
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
    setShowBanner(false);
    loadScripts(newPrefs);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowBanner(false);
    loadScripts(preferences);
  };

  const handleRejectAll = () => {
    const newPrefs = {
      necessary: true, // Nécessaire pour le fonctionnement du site
      analytics: false,
      marketing: false,
    };
    
    setPreferences(newPrefs);
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
    setShowBanner(false);
    loadScripts(newPrefs);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return; // On ne peut pas désactiver les cookies nécessaires
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const loadScripts = (prefs: typeof preferences) => {
    if (prefs.analytics) {
      // Charger Google Analytics ou autre outil d'analyse
      console.log('Chargement des scripts d\'analyse...');
    }
    
    if (prefs.marketing) {
      // Charger les scripts marketing (Facebook Pixel, etc.)
      console.log('Chargement des scripts marketing...');
    }
  };

  if (!showBanner) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4'>
      <div className='container mx-auto max-w-4xl'>
        {!showSettings ? (
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
                Nous utilisons des cookies
              </h3>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Certains sont nécessaires au bon fonctionnement du site, d'autres nous aident à améliorer nos services.
              </p>
              <button 
                onClick={toggleSettings}
                className='mt-2 text-sm text-primary hover:underline'
                type='button'
              >
                Personnaliser mes préférences
              </button>
            </div>
            
            <div className='flex flex-col sm:flex-row gap-2 w-full md:w-auto'>
              <Button 
                variant='outline' 
                size='sm' 
                onClick={handleRejectAll}
                className='w-full md:w-auto'
              >
                Tout refuser
              </Button>
              <Button 
                onClick={handleAcceptAll}
                size='sm'
                className='w-full md:w-auto'
              >
                Tout accepter
              </Button>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold text-gray-900 dark:text-white'>Préférences de cookies</h3>
              <a 
                href='/politique-de-confidentialite' 
                target='_blank' 
                rel='noopener noreferrer'
                className='text-sm text-primary hover:underline'
              >
                Voir la politique de confidentialité
              </a>
            </div>
            
            <div className='space-y-3'>
              {/* Cookies nécessaires */}
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Cookies nécessaires</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Essentiels au fonctionnement du site. Ne peuvent pas être désactivés.
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input 
                    type='checkbox' 
                    checked={preferences.necessary} 
                    disabled
                    className='sr-only peer' 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Cookies d'analyse */}
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Cookies d'analyse</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Nous aident à comprendre comment les visiteurs interagissent avec notre site.
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input 
                    type='checkbox' 
                    checked={preferences.analytics} 
                    onChange={() => handlePreferenceChange('analytics')}
                    className='sr-only peer' 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Cookies marketing */}
              <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Cookies marketing</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Utilisés pour personnaliser les publicités en fonction de vos intérêts.
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input 
                    type='checkbox' 
                    checked={preferences.marketing} 
                    onChange={() => handlePreferenceChange('marketing')}
                    className='sr-only peer' 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-between gap-3 pt-2'>
              <button
                type='button'
                onClick={toggleSettings}
                className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              >
                Retour
              </button>
              <div className='flex gap-2'>
                <Button 
                  variant='outline' 
                  size='sm' 
                  onClick={handleRejectAll}
                >
                  Tout refuser
                </Button>
                <Button 
                  onClick={handleSavePreferences}
                  size='sm'
                >
                  Enregistrer les préférences
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        aria-label='Fermer'
      >
        <X className='h-5 w-5' />
      </button>
    </div>
  );
}
