import { ArrowRight, Globe } from 'lucide-react'
import { useEffect, useRef, type FormEvent } from 'react'
import AboutSection from '../components/AboutSection'
import FeaturedVideoSection from '../components/FeaturedVideoSection'
import PhilosophySection from '../components/PhilosophySection'
import ServicesSection from '../components/ServicesSection'

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let raf = 0
    let fadingOut = false
    let cancelled = false
    let didInitialFade = false

    const animateOpacity = (
      from: number,
      to: number,
      duration: number,
      onComplete?: () => void,
    ) => {
      cancelAnimationFrame(raf)
      const start = performance.now()
      const tick = (now: number) => {
        if (cancelled) return
        const t = Math.min(1, (now - start) / duration)
        video.style.opacity = String(from + (to - from) * t)
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          onComplete?.()
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const handleCanPlay = () => {
      void video.play()
      if (!didInitialFade) {
        didInitialFade = true
        animateOpacity(0, 1, 500)
      }
    }

    const handleTimeUpdate = () => {
      if (fadingOut || !Number.isFinite(video.duration) || video.duration === 0) {
        return
      }
      if (video.duration - video.currentTime <= 0.55) {
        fadingOut = true
        const current = parseFloat(video.style.opacity || '1')
        animateOpacity(Number.isFinite(current) ? current : 1, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      window.setTimeout(() => {
        if (cancelled) return
        video.currentTime = 0
        void video.play()
        fadingOut = false
        animateOpacity(0, 1, 500)
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="bg-black">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />

        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
            <div className="flex items-center">
              <a href="#hero" className="flex items-center gap-2 text-white">
                <Globe size={24} aria-hidden="true" />
                <span className="text-lg font-semibold">Asme</span>
              </a>
              <div className="ml-8 hidden items-center gap-8 md:flex">
                <a
                  href="#features"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Sign Up
              </button>
              <button
                type="button"
                className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        <div
          id="hero"
          className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center"
        >
          <h1
            className="whitespace-nowrap text-7xl tracking-tight text-white md:text-8xl lg:text-9xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Know it <em className="italic">all</em>.
          </h1>

          <form
            onSubmit={handleSubscribe}
            className="mt-10 w-full max-w-xl"
          >
            <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pr-2 pl-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="rounded-full bg-white p-3 text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </form>

          <p className="mt-6 px-4 text-sm leading-relaxed text-white">
            Stay updated with the latest news and insights. Subscribe to our
            newsletter today and never miss out on exciting updates.
          </p>

          <button
            type="button"
            className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Manifesto
          </button>
        </div>

        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button
            type="button"
            aria-label="Instagram"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <InstagramIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Twitter"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <TwitterIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Website"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Globe size={20} aria-hidden="true" />
          </button>
        </div>
      </section>

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  )
}
