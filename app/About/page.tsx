"use client"
import React from "react"
import HeroHeader from "../navbar/page"
import { ParticleTextEffect } from "@/components/interactive-text-particle/interactive-text-particle"
import Lightning from "../Backgrounds/Lightning/Lightning"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cpu, Github, Linkedin, Mail, Zap } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CommitsGrid } from "@/components/commits-grid/commits-grid"
import Link from "next/link"
import { Footer } from "../components/Footer/Footer"
import SchemaCard from "@/components/schema-card/schema-card"
import SplashCursor from "../Animations/SplashCursor/SplashCursor"

const agencySkills = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "E-commerce Solutions",
  "Cloud Services",
  "AI Integration",
  "Blockchain Development",
]

const teamMembers = [
  {
    name: "Aiden Zapanta",
    role: "Founder & CEO",
    image: "/joe.jpg",
    bio: "Joe has over 15 years of experience in tech leadership and software development.",
    skills: ["Strategic Planning", "Team Leadership"],
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
    email: "jane@youragency.com",
  },
  {
    name: "Erdene Batbayar",
    role: "Lead Developer",
    image: "/erdene.jpg",
    bio: "Eddie is an expert in React and Node.js with a passion for building scalable applications.",
    skills: ["React", "Node.js", "GraphQL", "AWS"],
    github: "https://github.com/syren0914",
    linkedin: "https://linkedin.com/in/johnsmith",
    email: "erdenebatbayar3@gmail.com",
  },
  {
    name: "Izzy Burley",
    role: "UX/UI Designer",
    image: "/emily.jpg",
    bio: "Emily creates intuitive and beautiful user interfaces that drive engagement.",
    skills: ["UI Design", "User Research", "Prototyping", "Figma"],
    github: "https://github.com/emilybrown",
    linkedin: "https://linkedin.com/in/emilybrown",
    email: "emily@youragency.com",
  },
]

function About() {
  return (
    <div className="relative min-h-screen  text-white overflow-x-hidden">
      
      <SplashCursor/>

      <HeroHeader />

      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
        
        
      </div>

      


      {/* Content */}
      <main className="pt-[100px] container mx-auto px-4">
      <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full animate-pulse" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                </div>

      <section className="py-16 md:py-32">
      
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        Built by the Community <br /> for the Community
                    </h2>
                    <p className="mt-6">Harum quae dolore orrupti aut temporibus ariatur.</p>
                </div>
                <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-3">
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/2.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/3.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/4.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/5.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/6.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/7.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/8.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/9.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="https://github.com/meschacirung" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/10.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                </div>
            </div>
        </section>
        
      
        
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <SchemaCard />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            
          
            {/* {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SchemaCard />
                
                <Card className="bg-transparent border-2 border-indigo-400/30 rounded-lg">
                    
                  <CardHeader>
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                    <p className="text-center text-muted-foreground">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-medium text-white/70 mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span className="inline-block px-3 py-1 glass text-indigo-300 rounded-full text-xs font-medium mb-3 border border-indigo-400/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))} */}
          </div>
        </motion.section>

        <motion.section
          className="py-12 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          
        </motion.section>
      </main>
      <Footer/>
    </div>
    
  )
}

export default About
