"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    title: "Frontend Engineer",
    company: "Bardali Creation.",
    period: "2025-Present",
    description:
      "Collaborated with a cross-functional team of engineers, designers, and product specialists to tackle technical challenges and deliver impactful digital products by leveraging my expertise and knowledge.",
  },
  {
    title: "React Developer Intern",
    company: "Bardali Creation.",
    period: "2025(Feb)-2025(April)",
    description:
     "Assisted a cross-functional team of engineers and designers during my internship, contributing to the development of digital solutions by applying my technical skills and continuously learning from real-world challenges.",
  },
]

export default function ExperienceTimeline() {
  return (
    <div className="mx-auto max-w-4xl">
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="relative mb-12 ml-6 last:mb-0 md:ml-10"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Timeline connector */}
          <div className="absolute -left-11 top-0 bottom-0 border-l-2 border-dashed border-primary/30 md:-left-16" />

          {/* Circle icon */}
          <div className="absolute -left-14 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 text-white md:-left-[4.5rem]">
            <Briefcase className="h-3 w-3" />
          </div>

          {/* Content */}
          <div className="rounded-lg border bg-card p-6 shadow-md">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <h3 className="text-xl font-bold">{experience.title}</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {experience.period}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{experience.company}</p>
            <p className="mt-4">{experience.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
