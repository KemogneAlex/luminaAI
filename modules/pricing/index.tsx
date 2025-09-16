'use client';
import { Check, Crown, Star, Zap } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'sans limite de durée',
    description: 'Idéal pour découvrir Lumina AI',
    features: [
      '3 retouches incluses',
      'Suppression d’arrière-plan basique',
      'Résolution standard',
      'Support communautaire',
    ],
    limitations: ['Usage quotidien limité'],
    cta: 'Commencer gratuitement',
    popular: false,
    icon: Star,
  },
  {
    name: 'Pro',
    price: '19€',
    period: 'par mois',
    description: 'Toute la puissance de l’IA pour les pros',
    features: [
      'Retouches illimitées',
      'Toutes les fonctionnalités IA débloquées',
      'Résolution jusqu’à 4K',
      'Support prioritaire',
      'Traitement par lot',
      'Accès API',
      'Licence commerciale',
    ],
    cta: 'Passer en Pro',
    popular: true,
    icon: Crown,
  },
];

const Pricing = () => {
  const scrollToEditor = () => {
    const element = document.getElementById('editor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='pricing' className='relative overflow-hidden py-24'>
      {/* Background effects */}
      <div className='bg-primary/10 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl' />
      <div className='bg-secondary/10 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl' />

      <div className='relative z-10 container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-16 text-center'
        >
          <div className='bg-gradient-glass glass border-card-border mb-6 inline-flex items-center space-x-2 rounded-full border px-6 py-3'>
            <Zap className='text-primary h-5 w-5' />
            <span className='font-medium'>
              Commencez gratuitement, passez au Pro quand vous êtes prêt.
            </span>
          </div>

          <h2 className='mb-6 text-4xl font-bold lg:text-6xl'>
            <span className='text-foreground'>Optez pour votre </span>
            <span className='bg-gradient-primary !bg-clip-text text-transparent'>
              Offre Magique
            </span>
          </h2>
          <p className='text-muted-foreground mx-auto max-w-3xl text-xl'>
            Commencez gratuitement, passez au Pro quand vous en avez besoin. Pas de frais cachés,
            résiliez à tout moment.
          </p>
        </motion.div>

        <div className='mx-auto grid max-w-4xl gap-8 lg:grid-cols-2'>
          {plans?.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative ${plan.popular ? 'lg:-mt-8' : ''}`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform'>
                  <div className='bg-gradient-primary text-background rounded-full px-6 py-2 text-sm font-bold'>
                    Best-seller
                  </div>
                </div>
              )}

              <div
                className={`glass h-full rounded-2xl border p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary/50 shadow-glow-primary'
                    : 'border-card-border hover:border-primary/30 shadow-glow-subtle hover:shadow-glow-primary'
                }`}
              >
                <div className='mb-8 text-center'>
                  <div className='from-primary to-secondary group-hover:animate-glow-pulse mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br'>
                    <plan.icon className='text-background h-8 w-8' />
                  </div>

                  <h3 className='text-foreground mb-2 text-2xl font-bold'>{plan.name}</h3>
                  <p className='text-muted-foreground mb-4'>{plan.description}</p>

                  <div className='mb-6'>
                    <span className='text-foreground text-5xl font-bold'>{plan.price}</span>
                    <span className='text-muted-foreground ml-2'>/{plan.period}</span>
                  </div>
                </div>

                <div className='mb-8 space-y-4'>
                  {plan?.features?.map((feature) => (
                    <div key={feature} className={'flex items-center space-x-3'}>
                      <div className='bg-primary/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full'>
                        <Check className='text-primary h-3 w-3' />
                      </div>
                      <span className='text-foreground'>{feature}</span>
                    </div>
                  ))}

                  {plan?.limitations?.map((limitation) => (
                    <div key={limitation} className='flex items-center space-x-3'>
                      <div className='bg-muted flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full'>
                        <div className='bg-muted-foreground h-0.5 w-3' />
                      </div>
                      <span className='text-muted-foreground'>{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.popular ? 'hero' : 'secondary'}
                  className='w-full font-semibold'
                  onClick={scrollToEditor}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 text-center'
        >
          <p className='text-muted-foreground'>
            Tous les plans incluent l’accès à nos fonctionnalités IA principales. Passez au Pro à
            tout moment pour plus de puissance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
