'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Assess',
    description: 'Tell us your goals, fitness level, and preferences. Our AI analyzes your unique profile.',
    icon: '📊',
  },
  {
    number: '02',
    title: 'AI Plan',
    description: 'Receive a personalized 7-day training program tailored to your body and objectives.',
    icon: '🤖',
  },
  {
    number: '03',
    title: 'Train & Improve',
    description: 'Track progress, adapt workouts, and watch your AI coach evolve with you.',
    icon: '💪',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
            Three simple steps to transform your fitness journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-dark-bg border border-primary-purple/30 rounded-2xl p-8 hover:border-primary-purple transition-all duration-300 hover:glow-purple h-full">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-primary-purple font-headline font-bold text-sm mb-2">
                  {step.number}
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                <p className="text-light-gray/70 font-body">{step.description}</p>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-purple to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

