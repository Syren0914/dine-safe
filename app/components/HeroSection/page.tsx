"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { useRouter } from 'next/navigation'

import { AnimatedGroup } from "@/components/ui/animated-group";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import HeroHeader from "@/app/navbar/page";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import SplitText from "@/app/TextAnimations/SplitText/SplitText";
import { ContainerScroll } from "@/components/container-scroll-animation";
import Image from "next/image";
import StatsSection from "../Stats/Stats";
import { motion } from "framer-motion";
import Aurora from "@/app/Backgrounds/Aurora/Aurora";

interface SearchBarProps {
    initialValue?: string
    onSearch?: (value: string) => void
    placeholder?: string
    className?: string
    autoFocus?: boolean
  }

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};


const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};
const placeholders = [
  "What's the first rule of Fight Club?",
  "Who is Tyler Durden?",
  "Where is Andrew Laeddis Hiding?",
  "Write a Javascript method to reverse a string",
  "How to assemble your own PC?",
];

export function HeroSection({
    initialValue = "",
    onSearch,
    placeholder = "Search for restaurants, cuisines...",
    className = "",
    autoFocus = false,
  }: SearchBarProps) {
    

    const [titleNumber, setTitleNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState(initialValue)
    const router = useRouter()
    
    const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    } else {
      // If no onSearch prop is provided, navigate to search page
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const titles = useMemo(
    () => ["Spots",
        "Eats",
        "Finds",
        "Cravings",
        "Joints",
        "Hotspots",
        "Hangouts",],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <>
      
      <div className="absolute inset-0">
      <Aurora
        colorStops={["#00DDF8", "#7CFF67", "#00DDF8"]}
        blend={1.0}
        amplitude={1.5}
        speed={0.6}
      />
      </div>
      <main className="overflow-hidden">
      
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
              children={undefined}
            >
              {/* <img
                                src=""
                                alt=""
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            /> */}
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Introducing DineSafe
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] flex flex-col">
                    Your Guide to Clean, Safe 
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                    &nbsp;
                    {titles.map((title, index) => (
                    <motion.span
                        key={index}
                        className="absolute font-semibold"
                        initial={{ opacity: 0, y: "-100" }}
                        transition={{ type: "spring", stiffness: 50 }}
                        animate={
                        titleNumber === index
                            ? {
                                y: 0,
                                opacity: 1,
                            }
                            : {
                                y: titleNumber > index ? -150 : 150,
                                opacity: 0,
                            }
                        }
                    >
                        {title}
                    </motion.span>
                  
                ))}
                </span>
                    
                    
                    
                  </h1>
                  
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                    Explore local restaurants with confidence. Real-time
                    inspection data, health scores, and safety transparency at
                    your fingertips.
                  </p>
                </AnimatedGroup>
                {/* Search Bar  */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSubmit={handleSubmit}
                  >
                    
                  </PlaceholdersAndVanishInput>
                </AnimatedGroup>

                
                <StatsSection />
                
                
              </div>
            </div>

            
          </div>
        </section>
        
      </main>
    </>
  );
}
