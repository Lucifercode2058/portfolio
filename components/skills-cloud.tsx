"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaFigma,
  FaMobile,
  FaAccessibleIcon,
  FaPalette,
} from "react-icons/fa"
import { SiNextdotjs, SiTailwindcss, SiFlutter, SiFastapi, SiTestinglibrary } from "react-icons/si"
import { BsSpeedometer } from "react-icons/bs"

// Custom hook for media queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const updateMatch = () => setMatches(media.matches)
    
    // Set initial value
    updateMatch()
    
    // Listen for changes
    media.addEventListener("change", updateMatch)
    
    // Cleanup
    return () => media.removeEventListener("change", updateMatch)
  }, [query])

  return matches
}

// Using the skills list as provided in your last code block
const skills = [
  { name: "React", icon: FaReact, level: 95, color: "#61DAFB" },
  { name: "JavaScript", icon: FaJs, level: 90, color: "#F7DF1E" },
  { name: "Next.js", icon: SiNextdotjs, level: 90, color: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 92, color: "#06B6D4" },
  { name: "HTML5", icon: FaHtml5, level: 95, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, level: 90, color: "#1572B6" },
  { name: "Flutter", icon: SiFlutter, level: 80, color: "#02569B" },
  { name: "FastAPI", icon: SiFastapi, level: 75, color: "#009688" },
  { name: "Git", icon: FaGitAlt, level: 85, color: "#F05032" },
  { name: "UI/UX Design", icon: FaPalette, level: 78, color: "#A971F5" },
  { name: "Responsive Design", icon: FaMobile, level: 90, color: "#4CAF50" },
  { name: "Figma", icon: FaFigma, level: 70, color: "#F24E1E" },
  { name: "Testing", icon: SiTestinglibrary, level: 75, color: "#E33332" },
  { name: "Performance", icon: BsSpeedometer, level: 80, color: "#FF9800" },
  { name: "Accessibility", icon: FaAccessibleIcon, level: 85, color: "#0056B3" },
]

export default function SkillsCloud() {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [positions, setPositions] = useState([])
  
  // More specific breakpoints with additional iPhone 15 Pro Max consideration
  const isSmallPhone = useMediaQuery("(max-width: 375px)")
  const isMediumPhone = useMediaQuery("(min-width: 376px) and (max-width: 430px)") // iPhone 15 Pro Max falls here
  const isLargePhone = useMediaQuery("(min-width: 431px) and (max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 768px)")
  
  // Derived state for all mobile devices
  const isMobile = isSmallPhone || isMediumPhone || isLargePhone

  useEffect(() => {
    const calculateAndSetPositions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth

        // Responsive height based on device size
        let height = 600 // Default desktop height

        // Determine ideal height based on device
        if (isSmallPhone) {
          height = 450
        } else if (isMediumPhone) {
          // Specific for iPhone 15 Pro Max and similar
          height = 500
        } else if (isLargePhone) {
          height = 520
        } else if (isTablet) {
          height = 550
        }

        // Adjust for landscape orientation
        const isLandscape = window.innerWidth > window.innerHeight
        if (isLandscape && isMobile) {
          height = Math.min(400, window.innerHeight * 0.7)
        }

        setDimensions({ width, height })

        // Determine how many skills to show based on device
        let skillsToShow = skills
        if (isSmallPhone) {
          skillsToShow = skills.slice(0, 8)
        } else if (isMediumPhone || isLargePhone) {
          skillsToShow = skills.slice(0, 10)
        } else if (isTablet) {
          skillsToShow = skills.slice(0, 12)
        }

        const newPositions = calculatePositions(width, height, skillsToShow.length)
        setPositions(newPositions)
      }
    }

    calculateAndSetPositions()

    window.addEventListener("resize", calculateAndSetPositions)
    window.addEventListener("orientationchange", calculateAndSetPositions)

    return () => {
      window.removeEventListener("resize", calculateAndSetPositions)
      window.removeEventListener("orientationchange", calculateAndSetPositions)
    }
  }, [isSmallPhone, isMediumPhone, isLargePhone, isTablet])

  const calculatePositions = (width, height, count) => {
    const newPositions = []

    // Adjust spacing parameters based on screen size
    const minDistanceBetweenEdges = isSmallPhone ? 5 : isMediumPhone ? 7 : isMobile ? 10 : 12
    const padding = isSmallPhone ? 10 : isMediumPhone ? 15 : isMobile ? 20 : 25
    const maxAttempts = 300

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let currentPosition
      let overlapping = true

      const skill = skills[i]
      const levelFactor = skill.level / 100

      // Size adjustments for different devices
      let minSize, maxAdditionalSize
      
      if (isSmallPhone) {
        minSize = 35
        maxAdditionalSize = 30
      } else if (isMediumPhone) {
        // Optimized for iPhone 15 Pro Max
        minSize = 40
        maxAdditionalSize = 35
      } else if (isLargePhone) {
        minSize = 45
        maxAdditionalSize = 40
      } else if (isTablet) {
        minSize = 48
        maxAdditionalSize = 45
      } else {
        minSize = 50
        maxAdditionalSize = 70
      }

      const size = minSize + levelFactor * maxAdditionalSize

      while (overlapping && attempts < maxAttempts) {
        const x = padding + Math.random() * (width - 2 * padding - size)
        const y = padding + Math.random() * (height - 2 * padding - size)
        currentPosition = { x, y, size }

        overlapping = newPositions.some((pos) => {
          const dx = pos.x + pos.size / 2 - (currentPosition.x + currentPosition.size / 2)
          const dy = pos.y + pos.size / 2 - (currentPosition.y + currentPosition.size / 2)
          const distanceBetweenCenters = Math.sqrt(dx * dx + dy * dy)
          return distanceBetweenCenters < pos.size / 2 + currentPosition.size / 2 + minDistanceBetweenEdges
        })
        attempts++
      }

      if (currentPosition) {
        newPositions.push(currentPosition)
      } else {
        newPositions.push({
          x: padding + Math.random() * (width - 2 * padding - size),
          y: padding + Math.random() * (height - 2 * padding - size),
          size,
        })
      }
    }
    return newPositions
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-2 sm:px-3 md:px-4">
      <p className="text-center text-xs sm:text-sm md:text-lg text-slate-400 mb-4 sm:mb-6 md:mb-10 italic">
        Hover & explore the constellations of my expertise.
      </p>

      <div
        ref={containerRef}
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 shadow-xl sm:shadow-2xl border border-slate-700"
        style={{ height: dimensions.height > 0 ? `${dimensions.height}px` : "500px" }}
      >
        {dimensions.width > 0 &&
          positions.length > 0 &&
          positions.map((position, i) => {
            // Skip if we're beyond our skill count for this device size
            if ((isSmallPhone && i >= 8) || 
                ((isMediumPhone || isLargePhone) && i >= 10) || 
                (isTablet && i >= 12)) return null

            return (
              <SkillBubble 
                key={skills[i].name} 
                skill={skills[i]} 
                index={i} 
                position={position} 
                isMobile={isMobile}
                isSmallPhone={isSmallPhone}
                isMediumPhone={isMediumPhone}
              />
            )
          })}
      </div>

      {/* Responsive Skill list for the skills not shown in the cloud */}
      {isMobile && (
        <div className="mt-4 sm:mt-6">
          <h3 className="text-center text-xs sm:text-sm text-slate-300 mb-2">Additional Skills</h3>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {isSmallPhone && skills.slice(8).map((skill) => (
              <SkillListItem key={skill.name} skill={skill} />
            ))}
            {(isMediumPhone || isLargePhone) && skills.slice(10).map((skill) => (
              <SkillListItem key={skill.name} skill={skill} />
            ))}
            {isTablet && skills.slice(12).map((skill) => (
              <SkillListItem key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SkillListItem({ skill }) {
  return (
    <div
      className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-800/50 border border-slate-700"
    >
      <skill.icon color={skill.color} size={16} />
      <span className="text-xs text-slate-200">{skill.name}</span>
    </div>
  )
}

function SkillBubble({
  skill,
  index,
  position,
  isMobile,
  isSmallPhone,
  isMediumPhone
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const Icon = skill.icon

  // Adjust animation parameters based on device size
  const driftDuration = isSmallPhone ? 3 + Math.random() * 3 : 
                       isMediumPhone ? 3.5 + Math.random() * 3.5 :
                       isMobile ? 4 + Math.random() * 4 : 
                       6 + Math.random() * 6
                       
  const initialDelay = index * (isSmallPhone ? 0.04 : isMediumPhone ? 0.05 : isMobile ? 0.06 : 0.08)

  // Smaller patrol range for smaller screens
  const patrolAmplitudeX = isSmallPhone ? 3 + Math.random() * 3 : 
                          isMediumPhone ? 4 + Math.random() * 4 :
                          isMobile ? 5 + Math.random() * 5 : 
                          8 + Math.random() * 7
                          
  const patrolAmplitudeY = isSmallPhone ? 3 + Math.random() * 3 : 
                          isMediumPhone ? 4 + Math.random() * 4 :
                          isMobile ? 5 + Math.random() * 5 : 
                          8 + Math.random() * 7

  // Handle tap events for mobile
  const handleTap = () => {
    if (isMobile) {
      setIsTapped(!isTapped)

      // Auto-close after a delay - shorter for smaller screens
      if (!isTapped) {
        setTimeout(() => setIsTapped(false), isSmallPhone ? 2000 : isMediumPhone ? 2500 : 3000)
      }
    }
  }

  const isActive = isHovered || isTapped

  // Scale factors for different device sizes
  const getScaleFactor = () => {
    if (isSmallPhone) return 1.1
    if (isMediumPhone) return 1.12
    if (isMobile) return 1.15
    return 1.25
  }

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full cursor-pointer group"
      initial={{
        opacity: 0,
        x: position.x + position.size / 2,
        y: position.y + position.size / 2,
        width: 0,
        height: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        x: [position.x - patrolAmplitudeX, position.x + patrolAmplitudeX],
        y: [position.y - patrolAmplitudeY, position.y + patrolAmplitudeY],
        width: position.size,
        height: position.size,
        scale: isActive ? getScaleFactor() : 1,
        zIndex: isActive ? 20 : 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay: initialDelay, ease: "easeOut" },
        width: { duration: 0.6, delay: initialDelay, ease: "circOut" },
        height: { duration: 0.6, delay: initialDelay, ease: "circOut" },
        scale: { duration: 0.25, ease: "easeOut" },
        x: {
          duration: driftDuration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: initialDelay,
        },
        y: {
          duration: driftDuration * (0.9 + Math.random() * 0.2),
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: initialDelay,
        },
        zIndex: { delay: isActive ? 0 : 0.25 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={handleTap}
      style={{
        background: isActive ? `${skill.color}33` : "rgba(100, 116, 139, 0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `${isSmallPhone ? 1 : 1.5}px solid ${isActive ? skill.color : "rgba(156, 163, 175, 0.25)"}`,
        boxShadow: isActive
          ? `0 0 ${isSmallPhone ? 20 : 30}px -4px ${skill.color}70, 0 0 ${isSmallPhone ? 10 : 15}px -4px ${skill.color}40`
          : "0 6px 10px -3px rgba(0,0,0,0.1), 0 3px 6px -3px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center p-0.5 sm:p-1 transition-all duration-300">
        <Icon
          className="mb-0.5 transition-all duration-300"
          size={isActive ? position.size * (isSmallPhone ? 0.28 : 0.3) : position.size * (isSmallPhone ? 0.24 : 0.26)}
          style={{ color: skill.color }}
        />
        <span
          className="text-slate-50 font-semibold whitespace-nowrap transition-all duration-300"
          style={{
            fontSize: Math.max(
              isSmallPhone ? 7 : isMediumPhone ? 8 : 9, 
              position.size * (isSmallPhone ? 0.08 : isMediumPhone ? 0.085 : isMobile ? 0.09 : 0.1)
            ) + "px",
            lineHeight: 1.2,
          }}
        >
          {skill.name}
        </span>

        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: position.size * (isSmallPhone ? 0.04 : 0.06) }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
            className="w-[90%] px-1"
          >
            <div className="relative h-1 w-full rounded-full bg-slate-600 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.4, ease: "circOut", delay: 0.15 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}