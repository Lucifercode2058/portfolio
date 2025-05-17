"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, User, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    })

    setFormState({
      name: "",
      email: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 shadow-lg"
    >
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              className="pl-10"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              className="pl-10"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-8 space-y-2">
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </div>
          <Textarea
            name="message"
            placeholder="Your Message"
            className="min-h-[160px] pl-10"
            value={formState.message}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  )
}
