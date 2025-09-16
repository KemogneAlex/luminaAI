'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const CookiesBanner = dynamic(() => import('@/components/cookies-banner'), {
  ssr: false,
  loading: () => null, // Ne rien afficher pendant le chargement
});

export default function CookiesBannerWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  // Éviter l'hydratation côté serveur
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CookiesBanner />;
}
