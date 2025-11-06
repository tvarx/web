'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marathon Runner',
    quote: 'TvarX transformed my training. The AI understood my body better than I did.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Strength Athlete',
    quote: 'Finally, a program that adapts as I get stronger. No more plateaus.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Yoga Instructor',
    quote: 'The balance between challenge and recovery is perfect. My clients love it too.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            Loved by <span className="text-gradient">Athletes</span>
          </h2>
          <p className="text-light-gray/70 text-lg max-w-2xl mx-auto">
            Join thousands who've transformed their fitness journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-dark-bg border-2 border-primary-purple/30 rounded-xl p-6 hover:border-violet-accent transition-all duration-300 glow-purple hover:glow-violet"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-light-gray/90 font-body mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-headline font-bold text-light-gray">
                  {testimonial.name}
                </div>
                <div className="text-primary-purple text-sm font-body">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

