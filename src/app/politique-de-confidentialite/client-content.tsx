'use client';

import dynamic from 'next/dynamic';

// Import dynamique du composant client avec désactivation du SSR
const CookiePreferencesButton = dynamic(
  () => import('@/components/cookie-preferences-button'),
  { ssr: false }
);

export default function PrivacyPolicyContent() {
  return (
    <main className='container mx-auto px-4 py-16'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-8 text-4xl font-bold'>Politique de confidentialité</h1>
        
        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>1. Introduction</h2>
          <p className='mb-4 text-gray-700 dark:text-gray-300'>
            Chez LuminaAI, nous prenons la protection de vos données personnelles très au sérieux. 
            Cette politique explique quelles données nous collectons et comment nous les utilisons.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>2. Données que nous collectons</h2>
          <p className='mb-4 text-gray-700 dark:text-gray-300'>
            Nous collectons uniquement les données nécessaires au bon fonctionnement de notre service :
          </p>
          <ul className='mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300'>
            <li>Adresse e-mail pour la création de compte</li>
            <li>Photos que vous téléversez pour traitement</li>
            <li>Données d'utilisation anonymisées</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>3. Cookies et suivi</h2>
          <p className='mb-4 text-gray-700 dark:text-gray-300'>
            Nous utilisons des cookies essentiels pour le bon fonctionnement du site. 
            Les cookies de suivi ne sont activés qu'avec votre consentement.
          </p>
          <div id='cookie-preferences' className='mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
            <h3 className='font-semibold mb-2'>Préférences de cookies</h3>
            <CookiePreferencesButton />
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold'>4. Vos droits</h2>
          <p className='mb-4 text-gray-700 dark:text-gray-300'>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className='mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300'>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'oubli</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p className='text-gray-700 dark:text-gray-300'>
            Pour exercer ces droits, veuillez nous contacter à contact@luminaai.com
          </p>
        </section>

        <section>
          <h2 className='mb-4 text-2xl font-semibold'>5. Contact</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Pour toute question concernant cette politique de confidentialité, 
            veuillez nous contacter à l'adresse : contact@luminaai.com
          </p>
        </section>
      </div>
    </main>
  );
}
