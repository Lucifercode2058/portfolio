"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import bardali from "@/public/bardali.png"
import Lubro from "@/public/lubro.png"
import pre from "@/public/premier.png"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  showDemo?: boolean
  showGithub?: boolean
  demoLink?: string
  githubLink?: string
  demoText?: string
  githubText?: string
}

function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  showDemo = true,
  showGithub = true,
  demoLink = "#",
  githubLink = "#",
  demoText = "Live Demo",
  githubText = "Code",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative h-full overflow-hidden rounded-xl border bg-card shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-fit transition-transform duration-500 group-hover:"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 line-clamp-2 text-muted-foreground">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {(showDemo || showGithub) && (
          <div className="flex items-center justify-between">
            {showDemo && (
              <Button variant="ghost" size="sm" asChild>
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {demoText}
                </a>
              </Button>
            )}

            {showGithub && (
              <Button variant="ghost" size="sm" asChild>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {githubText}
                </a>
              </Button>
            )}

            {(showDemo && !showGithub) || (!showDemo && showGithub && <div></div>)}
          </div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const projects = [
    {
      title: "Bardali Creation",
      description: "A modern tech company driving innovation across web, software, and digital solutions.",
      tags: ["Reactjs", "Tailwind CSS"],
      imageUrl: bardali,
      demoLink: "https://bardali.com.np",
      showDemo: true,
      showGithub: false,
      demoText: "Live Demo",
    },
    {
      title: "Lubro Paints",
      description:
        "A complete website for Lubro Paints with user-facing pages, admin dashboard, and full content management system.",
      tags: ["React.js", "Tailwind CSS", "FastAPI", "Django", "mySQL"],
      imageUrl: Lubro,
      showGithub: false,
      demoText: "Launching Soon...",
    },
    {
      title: "School Management System",
      description:
        "A full-featured school management system for Premier College with admin panels, dynamic content, and multi-role access built using modern tech stacks.",
      tags: ["React.js", "Tailwind CSS", "FastAPI", "Django", "mySQL"],
      imageUrl: pre,
      showGithub: false,
      demoText: "Launching Soon...",
    },
    {
      title: "E-Commerce Platform",
      description:
        "A comprehensive e-commerce solution with product management, cart functionality, payment integration, and order tracking.",
      tags: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      showDemo: true,
      showGithub: true,
      demoText: "View Demo",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered platform that generates high-quality content for blogs, social media, and marketing materials using advanced language models.",
      tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      showDemo: true,
      showGithub: true,
    },
    {
      title: "Health & Fitness App",
      description:
        "A mobile-first application for tracking workouts, nutrition, and health metrics with personalized recommendations and progress visualization.",
      tags: ["React Native", "Firebase", "Redux", "Chart.js"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      showDemo: true,
      demoText: "Preview App",
    },
  ]

  // Set up autoplay
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const startAutoplay = () => {
      stopAutoplay()
      autoplayRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollTo(0)
        }
      }, 4000) // 5 seconds interval
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }

    startAutoplay()

    // Update active slide index when scrolling
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)

    return () => {
      stopAutoplay()
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, isPaused])

  // Handle scrolling to a specific slide
  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <section id="projects" className="py-20 md:py-32">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        Featured{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Projects</span>
      </h2>

      <div
        className="relative mx-auto max-w-7xl px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute -left-4 top-1/2 z-0 -translate-y-1/2 transform rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute -right-8 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>

        {/* Modern Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`group relative h-2 w-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {projects[index].title}
              </span>
            </button>
          ))}
        </div>

        {/* Autoplay Status */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div
            className={`flex h-2 w-2 items-center justify-center rounded-full ${isPaused ? "bg-yellow-500" : "bg-green-500"}`}
          ></div>
          <span className="text-xs text-muted-foreground">
            {isPaused ? "Paused (hover to resume)" : "Auto-scrolling"}
          </span>
        </div>
      </div>
    </section>
  )
}
