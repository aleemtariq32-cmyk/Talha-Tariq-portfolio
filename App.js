import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.3.1';
import ReactDOM from 'https://esm.sh/react-dom@18.3.1/client';
import htm from 'https://esm.sh/htm@3.1.1';

import { 
  personalInfo, 
  services, 
  techStackRow1,
  techStackRow2,
  decorativeIcons, 
  completedProjects 
} from './portfolioData.js';

const html = htm.bind(React.createElement);

export function ContactButton({ label = "Contact Me", onClick }) {
  const handleClick = onClick || (() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `mailto:${personalInfo.contactEmail}`;
    }
  });

  return html`
    <button
      onClick=${handleClick}
      className="relative group overflow-hidden rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer"
      style=${{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        ${label}
      </span>
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    </button>
  `;
}

export function LiveProjectButton({ label = "Live Project", href = "#" }) {
  return html`
    <a
      href=${href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200"
    >
      ${label}
    </a>
  `;
}

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "50px", threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return html`
    <div
      ref=${ref}
      className=${className}
      style=${{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0px, 0px)' : `translate(${x}px, ${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`
      }}
    >
      ${children}
    </div>
  `;
}

export function AnimatedText({ text, className = "" }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;
      
      const current = rect.top;
      let progress = (startTrigger - current) / (startTrigger - endTrigger);
      progress = Math.min(Math.max(progress, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const characters = text.split("");

  return html`
    <p ref=${containerRef} className=${className}>
      ${characters.map((char, index) => {
        const charProgress = index / characters.length;
        const opacity = scrollProgress >= charProgress ? 1 : Math.max(0.2, (scrollProgress - charProgress + 0.1) * 8);
        return html`
          <span
            key=${index}
            style=${{
              opacity,
              transition: 'opacity 0.1s ease-out',
              display: char === ' ' ? 'inline' : 'inline-block'
            }}
          >
            ${char === ' ' ? '\u00A0' : char}
          </span>
        `;
      })}
    </p>
  `;
}

export function ServiceDetailModal({ service, onClose }) {
  if (!service) return null;

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="bg-[#0C0C0C] border border-[#D7E2EA]/30 text-[#D7E2EA] rounded-[30px] p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden animate-fadeIn">
        <button
          onClick=${onClose}
          className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white text-2xl font-bold w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors"
        >
          &times;
        </button>

        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-black text-[#D7E2EA]" style=${{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
            ${service.number}
          </span>
          <h3 className="font-medium uppercase text-xl sm:text-2xl md:text-3xl text-white">
            ${service.name}
          </h3>
        </div>

        <p className="text-[#D7E2EA]/80 font-light leading-relaxed mb-6 text-sm sm:text-base border-b border-white/10 pb-4">
          ${service.shortDescription}
        </p>

        <div className="mb-8">
          <h4 className="font-medium uppercase tracking-widest text-xs text-[#D7E2EA]/60 mb-3">Included Capabilities & Features:</h4>
          <ul className="space-y-2">
            ${service.features.map((feature, idx) => html`
              <li key=${idx} className="flex items-center gap-3 text-sm sm:text-base font-light text-[#D7E2EA]">
                <span className="w-2 h-2 rounded-full bg-[#B600A8] inline-block shrink-0"></span>
                <span>${feature}</span>
              </li>
            `)}
          </ul>
        </div>

        <div className="flex justify-end">
          <${ContactButton} label="Inquire Service" onClick=${() => {
            onClose();
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }} />
        </div>
      </div>
    </div>
  `;
}

// --- JELLY PHYSICS LANYARD CARD (MINIMAL WHITE BORDER, BIGGER PHOTO) ---
export function JellyLanyardCard() {
  const [jellyStage, setJellyStage] = useState('initial');
  const [physicsTransform, setPhysicsTransform] = useState('translateY(0px) rotate(0deg) scale(1,1)');
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setJellyStage('drop'), 100);
    const t2 = setTimeout(() => setJellyStage('bounce'), 600);
    const t3 = setTimeout(() => setJellyStage('settled'), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const triggerJellyPhysics = () => {
    if (isPhysicsActive) return;
    setIsPhysicsActive(true);

    const keyframes = [
      { t: 'translateY(-10px) rotate(16deg) scale(0.95, 1.05)', d: 150 },
      { t: 'translateY(12px) rotate(-14deg) scale(1.06, 0.94)', d: 300 },
      { t: 'translateY(-6px) rotate(10deg) scale(0.97, 1.03)', d: 450 },
      { t: 'translateY(4px) rotate(-6deg) scale(1.02, 0.98)', d: 600 },
      { t: 'translateY(-2px) rotate(3deg) scale(0.99, 1.01)', d: 750 },
      { t: 'translateY(0px) rotate(0deg) scale(1, 1)', d: 900 }
    ];

    keyframes.forEach(({ t, d }) => {
      setTimeout(() => {
        setPhysicsTransform(t);
        if (d === 900) setIsPhysicsActive(false);
      }, d);
    });
  };

  let dropStyle = 'translateY(-140px) scale(0.8, 1.3) rotate(0deg)';
  if (jellyStage === 'drop') {
    dropStyle = 'translateY(15px) scale(1.08, 0.92) rotate(4deg)';
  } else if (jellyStage === 'bounce') {
    dropStyle = 'translateY(-5px) scale(0.96, 1.04) rotate(-2deg)';
  } else if (jellyStage === 'settled') {
    dropStyle = physicsTransform;
  }

  return html`
    <div 
      className="relative flex flex-col items-center my-4 z-30 cursor-pointer select-none" 
      onClick=${triggerJellyPhysics}
      onMouseEnter=${triggerJellyPhysics}
    >
      
      <div 
        className=${`w-3.5 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] border-x border-white/20 transition-all duration-700 ease-out origin-top ${
          jellyStage !== 'initial' ? 'h-16 sm:h-20 opacity-100' : 'h-0 opacity-0'
        }`}
        style=${{
          boxShadow: '0 0 12px rgba(0,0,0,0.9)'
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-around text-[6px] text-white/40 font-bold uppercase tracking-widest rotate-90">
          <span>TALHA</span>
        </div>
      </div>

      <div
        className="transition-all duration-300 ease-out origin-top-center"
        style=${{
          transform: dropStyle,
          transition: isPhysicsActive ? 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.5s ease-out'
        }}
      >
        <div className="w-60 sm:w-68 bg-white text-slate-900 rounded-2xl p-1.5 sm:p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-slate-200 flex flex-col items-center relative group hover:scale-105 transition-transform duration-300 -mt-1">
          
          <div className="w-8 h-1.5 rounded-full bg-slate-900 mb-1.5 border border-slate-400 shadow-inner"></div>

          <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-900 shadow-md border border-slate-200 mb-2">
            <img 
              src=${personalInfo.heroPortrait} 
              alt="Talha Tariq ID Photo" 
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="text-center pb-1">
            <h3 className="font-serif italic text-lg sm:text-xl tracking-wide text-slate-900 font-bold leading-tight">
              Talha Tariq
            </h3>
            <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-widest text-slate-500 block">
              Full-Stack Developer
            </span>
          </div>

        </div>
      </div>

    </div>
  `;
}

// --- PROGRAMMING LANGUAGES & TECH STACK MARQUEE SECTION ---
function TechStackMarqueeSection() {
  const sectionRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentScroll = window.scrollY;
      const offset = (currentScroll - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Triple = [...techStackRow1, ...techStackRow1, ...techStackRow1];
  const row2Triple = [...techStackRow2, ...techStackRow2, ...techStackRow2];

  const row1Transform = `translateX(${scrollOffset - 150}px)`;
  const row2Transform = `translateX(${-(scrollOffset - 150)}px)`;

  return html`
    <section ref=${sectionRef} className="bg-[#0C0C0C] py-16 sm:py-20 border-y border-white/10 overflow-hidden w-full relative z-20">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-4 py-1.5 rounded-full border border-[#B600A8]/30">
          Languages & Full-Stack Capabilities
        </span>
        <h3 className="hero-heading font-black uppercase text-2xl sm:text-4xl mt-3">
          Technologies I Code & Master
        </h3>
      </div>

      <div className="mb-4 overflow-hidden">
        <div 
          className="flex gap-4 w-max"
          style=${{ transform: row1Transform, willChange: 'transform' }}
        >
          ${row1Triple.map((item, i) => html`
            <div key=${`tech1-${i}`} className="flex items-center gap-3 bg-[#120826] border border-[#B600A8]/30 hover:border-[#B600A8] rounded-xl px-6 py-3.5 shadow-[0_0_15px_rgba(182,0,168,0.15)] transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B600A8]"></span>
              <div>
                <span className="text-white font-bold text-sm sm:text-base block uppercase tracking-wider">${item.name}</span>
                <span className="text-[#D7E2EA]/50 text-[10px] uppercase tracking-widest block">${item.category}</span>
              </div>
            </div>
          `)}
        </div>
      </div>

      <div className="overflow-hidden">
        <div 
          className="flex gap-4 w-max"
          style=${{ transform: row2Transform, willChange: 'transform' }}
        >
          ${row2Triple.map((item, i) => html`
            <div key=${`tech2-${i}`} className="flex items-center gap-3 bg-[#120826] border border-[#7621B0]/30 hover:border-[#7621B0] rounded-xl px-6 py-3.5 shadow-[0_0_15px_rgba(118,33,176,0.15)] transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7621B0]"></span>
              <div>
                <span className="text-white font-bold text-sm sm:text-base block uppercase tracking-wider">${item.name}</span>
                <span className="text-[#D7E2EA]/50 text-[10px] uppercase tracking-widest block">${item.category}</span>
              </div>
            </div>
          `)}
        </div>
      </div>
    </section>
  `;
}

// --- HERO SECTION ---
function HeroSection() {
  return html`
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-12 bg-[#0C0C0C] pb-12">
      <${FadeIn} delay=${0} y=${-20} className="w-full z-30">
        <nav className="flex justify-between items-center w-full pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#services" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      <//>

      <div className="w-full flex flex-col items-center text-center pt-8 md:pt-12 z-20 max-w-5xl mx-auto">
        
        <${FadeIn} delay=${0.15} y=${30} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] select-none mb-3">
            HI, I'M <span className="text-[#BBCCD7]">TALHA TARIQ</span>
          </h1>
        <//>

        <${FadeIn} delay=${0.3} y=${20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-relaxed text-xs sm:text-sm md:text-base max-w-3xl mb-4">
            ${personalInfo.tagline}
          </p>
        <//>

        <${JellyLanyardCard} />

        <${FadeIn} delay=${0.45} y=${20} className="mt-4">
          <${ContactButton} />
        <//>
      </div>

      <div className="w-full flex justify-between items-center pt-8 border-t border-white/10 text-xs uppercase tracking-widest text-[#D7E2EA]/40 mt-6">
        <span>Scroll to Explore</span>
        <span>Talha Tariq &bull; 2026</span>
      </div>
    </section>
  `;
}

function AboutSection() {
  return html`
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden">
      <${FadeIn} delay=${0.1} x=${-80} y=${0} duration=${0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <img src=${decorativeIcons.moon} alt="Moon Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
      <//>

      <${FadeIn} delay=${0.25} x=${-80} y=${0} duration=${0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <img src=${decorativeIcons.p59} alt="3D Object" className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl" />
      <//>

      <${FadeIn} delay=${0.15} x=${80} y=${0} duration=${0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <img src=${decorativeIcons.lego} alt="Lego Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
      <//>

      <${FadeIn} delay=${0.3} x=${80} y=${0} duration=${0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <img src=${decorativeIcons.group134} alt="3D Group" className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl" />
      <//>

      <div className="flex flex-col items-center text-center z-20 max-w-4xl mx-auto gap-10 sm:gap-14 md:gap-16">
        <${FadeIn} delay=${0} y=${40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style=${{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            ${personalInfo.aboutHeading}
          </h2>
        <//>

        <${AnimatedText}
          text=${personalInfo.aboutText}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style=${{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        <div className="pt-6 sm:pt-10">
          <${FadeIn} delay=${0.4} y=${20}>
            <${ContactButton} />
          <//>
        </div>
      </div>
    </section>
  `;
}

function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return html`
    <section id="services" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-5xl mx-auto">
        <${FadeIn} delay=${0} y=${40}>
          <h2 className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28" style=${{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}>
            Services
          </h2>
        <//>

        <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          ${services.map((service, i) => html`
            <${FadeIn} key=${service.number} delay=${i * 0.1} y=${30} className="py-8 sm:py-10 md:py-12">
              <div 
                onClick=${() => setSelectedService(service)}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-12 cursor-pointer p-4 rounded-2xl hover:bg-[#0C0C0C]/5 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12 md:gap-16">
                  <span className="font-black text-[#0C0C0C] shrink-0 group-hover:text-[#7621B0] transition-colors" style=${{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}>
                    ${service.number}
                  </span>

                  <div className="flex flex-col gap-2 sm:gap-3">
                    <h3 className="font-medium uppercase text-[#0C0C0C] group-hover:translate-x-2 transition-transform" style=${{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                      ${service.name}
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60" style=${{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                      ${service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <span className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full border border-[#0C0C0C]/20 group-hover:bg-[#0C0C0C] group-hover:text-white transition-colors">
                    View Details \u2192
                  </span>
                </div>
              </div>
            <//>
          `)}
        </div>
      </div>

      <${ServiceDetailModal} service=${selectedService} onClose=${() => setSelectedService(null)} />
    </section>
  `;
}

function ProjectsSection() {
  const containerRef = useRef(null);

  return html`
    <section id="projects" ref=${containerRef} className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 pt-20 sm:pt-24 md:pt-28 pb-32 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <${FadeIn} delay=${0} y=${40}>
          <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-24" style=${{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}>
            Project
          </h2>
        <//>

        <div className="relative flex flex-col gap-12 sm:gap-16">
          ${completedProjects.map((project, index) => {
            const topOffset = index * 28;

            return html`
              <div
                key=${project.id}
                className="sticky top-24 md:top-32 w-full transition-transform duration-300"
                style=${{ top: `${96 + topOffset}px` }}
              >
                <div 
                  className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/20">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className="font-black text-[#D7E2EA]" style=${{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1 }}>
                        ${project.id}
                      </span>
                      <div>
                        <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60 block mb-1">
                          ${project.category}
                        </span>
                        <h3 className="font-medium uppercase text-lg sm:text-2xl md:text-3xl text-[#D7E2EA]">
                          ${project.name}
                        </h3>
                      </div>
                    </div>

                    <${LiveProjectButton} href=${project.liveUrl} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                    <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                      <img 
                        src=${project.images.col1_top} 
                        alt="${project.name} preview 1"
                        className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                        style=${{ height: 'clamp(130px, 16vw, 230px)' }}
                      />
                      <img 
                        src=${project.images.col1_bottom} 
                        alt="${project.name} preview 2"
                        className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                        style=${{ height: 'clamp(160px, 22vw, 340px)' }}
                      />
                    </div>

                    <div className="md:col-span-7 h-full">
                      <img 
                        src=${project.images.col2} 
                        alt="${project.name} full render"
                        className="w-full h-full min-h-[300px] md:min-h-[420px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    </section>
  `;
}

function ContactSection() {
  return html`
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-12 px-6 md:px-10 border-t border-[#D7E2EA]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight mb-2">
            Let's build together
          </h2>
          <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base max-w-lg">
            Ready to grow your business, automate workflows, or launch your next app? Let's talk.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href=${personalInfo.socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white px-6 py-3 rounded-full border border-[#D7E2EA]/30 hover:border-white transition-all"
          >
            LinkedIn Profile \u2192
          </a>
          <a href=${`mailto:${personalInfo.contactEmail}`} className="text-base font-medium text-[#D7E2EA] hover:text-white underline underline-offset-4">
            ${personalInfo.contactEmail}
          </a>
          <${ContactButton} label="Send Email" onClick=${() => window.location.href = `mailto:${personalInfo.contactEmail}`} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#D7E2EA]/40 gap-4">
        <p>&copy; ${new Date().getFullYear()} ${personalInfo.name}. All Rights Reserved.</p>
        <div className="flex gap-[#1.5rem] uppercase tracking-widest font-medium">
          <a href="#about" className="hover:text-[#D7E2EA]">About</a>
          <a href="#services" className="hover:text-[#D7E2EA]">Services</a>
          <a href="#projects" className="hover:text-[#D7E2EA]">Projects</a>
        </div>
      </div>
    </footer>
  `;
}

export default function App() {
  return html`
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      <${HeroSection} />
      <${TechStackMarqueeSection} />
      <${AboutSection} />
      <${ServicesSection} />
      <${ProjectsSection} />
      <${ContactSection} />
    </div>
  `;
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(html`<${App} />`);
}
