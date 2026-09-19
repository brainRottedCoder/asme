import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-black px-6 pt-6 pb-20 md:pt-10 md:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-video"
        >
          <video
            className="h-full w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <p className="mb-3 text-xs tracking-widest text-white/50 uppercase">
                Our Approach
              </p>
              <p className="text-sm leading-relaxed text-white md:text-base">
                We believe in the power of curiosity-driven exploration. Every
                project starts with a question, and every answer opens a new
                door to innovation.
              </p>
            </div>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass inline-flex w-fit rounded-full px-8 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Explore more
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
