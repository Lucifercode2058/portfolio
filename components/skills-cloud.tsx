"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, FaMobile, FaAccessibleIcon, FaPalette } from "react-icons/fa"
import { SiNextdotjs, SiTailwindcss, SiFlutter, SiFastapi, SiTestinglibrary } from "react-icons/si"
import { BsSpeedometer } from "react-icons/bs"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [positions, setPositions] = useState<Array<{ x: number; y: number; size: number }>>([])

  useEffect(() => {
    const calculateAndSetPositions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = window.innerWidth >= 768 ? 600 : 500 
        
        setDimensions({ width, height })
        const newPositions = calculatePositions(width, height, skills.length)
        setPositions(newPositions)
      }
    }

    calculateAndSetPositions()

    window.addEventListener("resize", calculateAndSetPositions)
    return () => window.removeEventListener("resize", calculateAndSetPositions)
  }, [])

  const calculatePositions = (width: number, height: number, count: number) => {
    const newPositions: Array<{ x: number; y: number; size: number }> = []
    const minDistanceBetweenEdges = 12 // Slightly increased for a bit more spacing with faster movement
    const padding = 25 // Increased padding slightly
    const maxAttempts = 300

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let currentPosition
      let overlapping = true

      const skill = skills[i]
      const levelFactor = skill.level / 100
      const size = 50 + levelFactor * 70 // min 50, max 120

      while (overlapping && attempts < maxAttempts) {
        const x = padding + Math.random() * (width - 2 * padding - size)
        const y = padding + Math.random() * (height - 2 * padding - size)
        currentPosition = { x, y, size }

        overlapping = newPositions.some((pos) => {
          const dx = pos.x + pos.size / 2 - (currentPosition.x + currentPosition.size / 2)
          const dy = pos.y + pos.size / 2 - (currentPosition.y + currentPosition.size / 2)
          const distanceBetweenCenters = Math.sqrt(dx * dx + dy * dy)
          return distanceBetweenCenters < (pos.size / 2 + currentPosition.size / 2 + minDistanceBetweenEdges)
        })
        attempts++
      }
      
      if (currentPosition) {
        newPositions.push(currentPosition)
      } else {
        newPositions.push({ 
            x: padding + Math.random() * (width - 2 * padding - size),
            y: padding + Math.random() * (height - 2 * padding - size),
            size
        });
      }
    }
    return newPositions
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <p className="text-center text-md sm:text-lg text-slate-400 mb-10 italic">
        Hover & explore the constellations of my expertise.
      </p>

      <div 
        ref={containerRef} 
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 shadow-2xl border border-slate-700"
        style={{ height: dimensions.height > 0 ? `${dimensions.height}px` : '500px' }}
      >
        {dimensions.width > 0 &&
          positions.length === skills.length &&
          skills.map(
            (skill, i) => <SkillBubble key={skill.name} skill={skill} index={i} position={positions[i]} />,
          )}
      </div>
    </div>
  )
}

function SkillBubble({
  skill,
  index,
  position,
}: {
  skill: (typeof skills)[0]
  index: number
  position: { x: number; y: number; size: number }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  // FASTER and TIGHTER "Orbital" Drift Animation
  const driftDuration = 6 + Math.random() * 6 // Range: 6s to 12s for a full cycle (A->B->A) - Much faster
  const initialDelay = index * 0.08 // Slightly faster stagger

  // Define patrol range for x and y. Keep it relatively small for tighter orbits.
  const patrolAmplitudeX = 8 + Math.random() * 7; // 8px to 15px patrol range
  const patrolAmplitudeY = 8 + Math.random() * 7; // 8px to 15px patrol range

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
        // Simpler keyframes for mirror repeat: [extreme1, extreme2]
        x: [position.x - patrolAmplitudeX, position.x + patrolAmplitudeX],
        y: [position.y - patrolAmplitudeY, position.y + patrolAmplitudeY],
        width: position.size,
        height: position.size,
        scale: isHovered ? 1.25 : 1, // Slightly more pronounced hover scale
        zIndex: isHovered ? 20 : 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay: initialDelay, ease: "easeOut" },
        width: { duration: 0.6, delay: initialDelay, ease: "circOut" },
        height: { duration: 0.6, delay: initialDelay, ease: "circOut" },
        scale: { duration: 0.25, ease: "easeOut" }, // Faster scale
        x: {
          duration: driftDuration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut", // Smooth oscillations
          delay: initialDelay // Stagger start of drift
        },
        y: {
          // Vary Y's duration slightly from X's for more organic, non-linear paths
          duration: driftDuration * (0.9 + Math.random() * 0.2), 
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: initialDelay // Stagger start of drift
        },
        zIndex: { delay: isHovered ? 0 : 0.25 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: isHovered ? `${skill.color}33` : "rgba(100, 116, 139, 0.18)", // Slightly more opaque base, more vivid hover
        backdropFilter: "blur(10px)", // Slightly stronger blur
        WebkitBackdropFilter: "blur(10px)",
        border: `1.5px solid ${isHovered ? skill.color : "rgba(156, 163, 175, 0.25)"}`, // Slightly more prominent border
        boxShadow: isHovered 
          ? `0 0 30px -4px ${skill.color}70, 0 0 15px -4px ${skill.color}40` // Enhanced glow
          : "0 6px 10px -3px rgba(0,0,0,0.1), 0 3px 6px -3px rgba(0,0,0,0.08)", // Subtler, softer base shadow
      }}
    >
      <div className="flex flex-col items-center justify-center text-center p-1 transition-all duration-300">
        <Icon 
          className="mb-0.5 sm:mb-1 transition-all duration-300" 
          size={isHovered ? position.size * 0.30 : position.size * 0.26} // Slightly larger icon
          style={{ color: skill.color }}
        />
        <span 
            className="text-slate-50 font-semibold whitespace-nowrap transition-all duration-300" // Lighter text, slightly bolder
            style={{ fontSize: Math.max(9, position.size * 0.10) + 'px' }} // Font size: 9px to 12px
        >
          {skill.name}
        </span>

        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }} 
            animate={{ opacity: 1, height: 'auto', marginTop: position.size * 0.06 }} // Slightly more margin
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }} // Faster appearance
            className="w-[90%] px-1" // Make bar slightly less than full width
          >
            <div className="relative h-1.5 sm:h-2 w-full rounded-full bg-slate-600 overflow-hidden"> {/* Darker bar BG */}
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.4, ease: "circOut", delay: 0.15 }} // Faster bar fill
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}