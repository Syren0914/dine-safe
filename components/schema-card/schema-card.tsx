import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github } from 'lucide-react';


  
  

export default function SchemaCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const teamMembers = [
    {
      name: "Aiden Zapanta",
      role: "Founder & CEO",
      image: "/aiden.jpg",
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
      image: "/izzy.jpg",
      bio: "Emily creates intuitive and beautiful user interfaces that drive engagement.",
      skills: ["UI Design", "User Research", "Prototyping", "Figma"],
      github: "https://github.com/emilybrown",
      linkedin: "https://linkedin.com/in/emilybrown",
      email: "emily@youragency.com",
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));

    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    const updateWaveData = () => {
      waveData.forEach(data => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    };

    const draw = () => {
      ctx!.fillStyle = 'black';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx!.beginPath();
        for (let x = 0; x < canvas!.width; x++) {
          const nx = (x / canvas!.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * canvas!.height / 2;
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx!.lineWidth = 1 + i * 0.3;
        ctx!.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx!.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx!.shadowBlur = 5;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      });
    };

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <>
      <div className="inset-0 flex items-center justify-center p-4 z-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full max-w-xs">
            <div className="relative card-border overflow-hidden rounded-2xl flex flex-col animate-float">
              <div className="p-4 flex justify-center relative">
                <div className="w-full h-48 rounded-xl gradient-border inner-glow overflow-hidden relative ">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-8 object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="inline-block px-3 py-1 glass text-indigo-300 rounded-full text-xs font-medium border border-indigo-400/30">
                      {skill}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{member.name}</h3>
                <p className="text-white/70 mb-4 leading-relaxed text-xs">
                  {member.bio}
                </p>
                <div className="flex justify-between items-center">
                  <a href={member.github}  target="_blank" className="text-indigo-400 hover:text-indigo-300 transition flex items-center text-xs font-medium glass px-3 py-1.5 rounded-lg border border-indigo-400/30">
                  <Github className="h-4 w-4" />
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href={member.github}  target="_blank" className="text-indigo-400 hover:text-indigo-300 transition flex items-center text-xs font-medium glass px-3 py-1.5 rounded-lg border border-indigo-400/30">
                  <Github className="h-4 w-4" />
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href={member.github}  target="_blank" className="text-indigo-400 hover:text-indigo-300 transition flex items-center text-xs font-medium glass px-3 py-1.5 rounded-lg border border-indigo-400/30">
                  <Github className="h-4 w-4" />
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
