"use client"
import { MoveRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ThemeSwitcher from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"

import SkillsCloud from "@/components/skills-cloud"
import ExperienceTimeline from "@/components/experience-timeline"
import AnimatedSection from "@/components/animated-section"
import ContactForm from "@/components/contact-form"
import Rabin from "@/public/Rabin.png"

import ProjectCarousel from "@/components/project-carousel"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && 
          !event.target.closest('.menu-button')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])
  
  // Mobile menu links
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <main className="min-h-screen">
      {/* Floating Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-purple-200 dark:bg-purple-900/20 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[40%] -left-[5%] h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-blue-200 dark:bg-blue-900/20 blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[20%] h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-pink-200 dark:bg-pink-900/20 blur-[80px] md:blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'} border-b border-slate-100/10 dark:border-slate-800/10`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="hover:text-purple-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <ThemeSwitcher />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="mobile-menu flex flex-col h-full pt-20 pb-6 px-6 items-center justify-between">
          <div className="w-full space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center w-full py-4 text-xl font-medium border-b border-slate-100/10 dark:border-slate-800/10 hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex gap-4 mt-auto pt-8">
            {/* GitHub Button */}
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <a href="https://github.com/Lucifercode2058" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.53 2.341 1.088 2.91.832.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </Button>

            {/* LinkedIn Button */}
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <a href="https://www.linkedin.com/in/rabin-subedi-80b290181/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  />
                </svg>
              </a>
            </Button>

            {/* Instagram Button */}
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <a href="https://www.instagram.com/lucifer_devilish" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <AnimatedSection className="flex min-h-screen flex-col items-center justify-center py-20 md:py-32">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Rabin Subedi</span>
            </h1>
            <h2 className="mb-6 text-2xl md:text-3xl font-bold">Frontend Engineer</h2>
            <p className="mb-8 text-base md:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Creating exceptional digital experiences with clean code and creative designs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="#contact">
                  Let's Talk <MoveRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 perspective-1000">
            <div className="relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 mx-auto rotate-6 transform rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 p-1 shadow-xl transition-all duration-500 hover:rotate-12 hover:scale-105">
              <Image
                src={Rabin}
                alt="Profile"
                width={500}
                height={500}
                className="h-full w-full rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about" className="py-16 md:py-28">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            About <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="perspective-1000">
              <div className="group relative h-64 w-full rounded-2xl bg-muted p-6 shadow-lg transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-70 blur-lg group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-70 blur-lg group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full w-full rounded-xl bg-card p-6 shadow-md border border-border">
                  <h3 className="mb-4 text-xl font-bold">Personal Philosophy</h3>
                  <p className="text-muted-foreground">
                    I believe in creating digital experiences that not only look beautiful but also solve real problems
                    and make people's lives better.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-6 text-base md:text-lg">
                Hey there! 👋 I'm a Frontend Engineer with a deep love for tech — sparked years ago 🔌 and supercharged during my Computer Science degree 🎓.

                For the past 1–1.5 years, I've been crafting sleek, responsive web apps full-time 💻✨ and constantly learning new tricks to level up my UI game.
              </p>
              <p className="mb-6 text-base md:text-lg">
                Off the screen, you'll catch me cruising on my bike 🏍️, hanging out with friends 🧋, or just soaking in the good vibes 🌅. Tech fuels me — but living fully is the vibe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-bold">Location</h3>
                  <p className="text-muted-foreground">Itahari-2, Sunsari</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-bold">Experience</h3>
                  <p className="text-muted-foreground">1+ Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="py-16 md:py-28">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            My{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Skills Galaxy</span>
          </h2>
          <SkillsCloud />
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="py-16 md:py-28">
        <div className="container px-4">
          
          <ProjectCarousel />
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="py-16 md:py-28 bg-muted/50">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            Work{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <ExperienceTimeline />
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-16 md:py-28">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t bg-background py-8 md:py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl md:text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </Link>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">© {new Date().getFullYear()} | All Rights Reserved</p>
            </div>
            <div className="flex gap-4">
              {/* GitHub Button */}
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <a href="https://github.com/Lucifercode2058" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.53 2.341 1.088 2.91.832.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </a>
              </Button>

              {/* LinkedIn Button */}
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <a href="https://www.linkedin.com/in/rabin-subedi-80b290181/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    />
                  </svg>
                </a>
              </Button>

              {/* Instagram Button */}
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <a href="https://www.instagram.com/lucifer_devilish" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                    />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}