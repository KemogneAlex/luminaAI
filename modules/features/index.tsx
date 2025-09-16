'use client';
import React from 'react';
import { Crop, Expand, Scissors, Type, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Scissors,
    title: 'Suppression d’arrière-plan IA',
    description:
      'En un clic, nettoyez vos photos avec une précision incroyable. Supprimez tout arrière-plan instantanément et obtenez un rendu professionnel.',
    gradient: 'from-primary to-primary-glow',
    delay: 0.1,
  },
  {
    icon: Expand,
    title: 'Remplissage génératif IA',
    description:
      'Agrandissez votre image et complétez automatiquement les bords. Créez des formats parfaits sans effort.',
    gradient: 'from-secondary to-secondary-glow',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: 'Amélioration & Super-résolution IA',
    description:
      'Multipliez la résolution par 4 et restaurez les détails. Transformez une image floue en visuel haute qualité époustouflant.',
    gradient: 'from-primary to-secondary',
    delay: 0.3,
  },
  {
    icon: Crop,
    title: 'Recadrage intelligent & Focus visage',
    description:
      'Des miniatures parfaites automatiquement. L’IA détecte les visages et le contenu clé pour un cadrage optimal.',
    gradient: 'from-secondary to-primary',
    delay: 0.4,
  },
  {
    icon: Type,
    title: 'Filigrane & Texte',
    description:
      'Personnalisez vos visuels comme un pro. Ajoutez filigranes et textes avec un positionnement impeccable.',
    gradient: 'from-primary-glow to-secondary-glow',
    delay: 0.5,
  },
];

const Features = () => {
  return (
    <section id='features' className='relative overflow-hidden py-24'>
      <div className='via-muted/20 absolute inset-0 bg-gradient-to-b from-transparent to-transparent' />

      <div className='relative z-10 container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-6 text-4xl font-bold lg:text-5xl'>
            <span className='bg-gradient-primary !bg-clip-text text-transparent'>Caractéristiques </span>
            <span className='text-foreground'>Magiques</span>
          </h2>

          <p className='text-muted-foreground mx-auto max-w-3xl text-xl'>
            Sublimez vos photos grâce à la puissance de l’IA. Chaque fonctionnalité est pensée pour
            vous offrir des résultats professionnels en quelques secondes, pas en heures.
          </p>
        </motion.div>

        <div className='mb-12 grid gap-8 lg:grid-cols-3'>
          {features?.slice(0, 3).map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className='mx-auto grid max-w-4xl gap-8 lg:grid-cols-2'>
          {features.slice(3).map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const { icon: Icon, title, description, gradient, delay } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className='group'
    >
      <div className='glass border-card-border hover:border-primary/30 shadow-glow-subtle hover:shadow-glow-primary flex h-full flex-col rounded-2xl border p-8 transition-all duration-300'>
        <div className='relative mb-6'>
          <div
            className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} group-hover:animate-glow-pulse p-4`}
          >
            <Icon className='text-background h-full w-full' />
          </div>
          <div className='from-primary/20 to-secondary/20 absolute inset-0 h-16 w-16 rounded-2xl bg-gradient-to-br blur-xl transition-all duration-300 group-hover:blur-2xl' />
        </div>

        <h3 className='text-foreground group-hover:text-primary mb-4 text-2xl font-bold transition-colors' style={{ minHeight: '72px', display: 'flex', alignItems: 'center' }}>
          {title}
        </h3>

        <p className='text-muted-foreground mb-6 leading-relaxed' style={{ minHeight: '96px' }}>{description}</p>

        <div className='border-card-border border-t pt-6 mt-auto'>
          <div className='text-primary flex items-center space-x-2 text-sm'>
            <div className='bg-primary h-2 w-2 animate-pulse rounded-full' />
            <span className='font-medium'>La puissance de Lumina AI</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default Features;
