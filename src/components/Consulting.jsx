import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/Consulting.css";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    name: "Estrategia",
    text: "Definimos hacia dónde debe avanzar la empresa y qué decisiones tienen mayor impacto.",
    tags: ["Dirección", "Modelo de negocio", "Crecimiento"],
  },
  {
    number: "02",
    name: "Operación",
    text: "Convertimos la operación en un sistema más claro, ordenado y preparado para crecer.",
    tags: ["Procesos", "Estructura", "Productividad"],
  },
  {
    number: "03",
    name: "Finanzas",
    text: "Transformamos la información financiera en una herramienta real para decidir mejor.",
    tags: ["Control", "Indicadores", "Planeación"],
  },
  {
    number: "04",
    name: "Personas",
    text: "Alineamos responsabilidades, equipos y liderazgo con los objetivos de la organización.",
    tags: ["Talento", "Roles", "Liderazgo"],
  },
];

function Consulting() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const pulseRef = useRef(null);
  const progressRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    const pulse = pulseRef.current;
    const progress = progressRef.current;

    if (!section || !stage || !orbit || !pulse || !progress) {
      return;
    }

    const ctx = gsap.context(() => {
      const pillarElements = gsap.utils.toArray(
        ".consulting__pillar"
      );

      /* INTRO */
      gsap.from(".consulting__intro > *", {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".consulting__intro",
          start: "top 80%",
          once: true,
        },
      });

      /* SISTEMA */
      gsap.from(".consulting__system", {
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stage,
          start: "top 85%",
          once: true,
        },
      });

      /* ÓRBITA CONTINUA */
      const orbitAnimation = gsap.to(orbit, {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      /* PULSO */
      const pulseAnimation = gsap.to(pulse, {
        scale: 1.08,
        opacity: 0.35,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /*
       * SCROLL
       *
       * IMPORTANTE:
       * No usamos pin.
       * El stage se queda sticky mediante CSS.
       */
      const scrollAnimation = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        endTrigger: section,
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          const scrollProgress = self.progress;

          gsap.set(progress, {
            scaleX: Math.max(0.04, scrollProgress),
          });

          const nextIndex = Math.min(
            pillars.length - 1,
            Math.floor(scrollProgress * pillars.length)
          );

          setActiveIndex((currentIndex) => {
            if (currentIndex === nextIndex) {
              return currentIndex;
            }

            return nextIndex;
          });

          pillarElements.forEach((pillar, index) => {
            const isActive = index === nextIndex;

            gsap.to(pillar, {
              opacity: isActive ? 1 : 0.3,
              scale: isActive ? 1.05 : 1,
              duration: 0.35,
              overwrite: true,
              ease: "power2.out",
            });

            const number = pillar.querySelector(
              ".consulting__pillar-number"
            );

            if (number) {
              gsap.to(number, {
                borderColor: isActive
                  ? "rgba(198, 161, 91, 0.8)"
                  : "rgba(23, 23, 21, 0.18)",
                backgroundColor: isActive
                  ? "rgba(198, 161, 91, 0.08)"
                  : "transparent",
                duration: 0.35,
                overwrite: true,
              });
            }
          });
        },
      });

      /* ANILLO EXTERIOR */
      gsap.to(".consulting__ring--outer", {
        rotation: -180,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          endTrigger: section,
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* ANILLO INTERIOR */
      gsap.to(".consulting__ring--inner", {
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          endTrigger: section,
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      return () => {
        scrollAnimation.kill();
        orbitAnimation.kill();
        pulseAnimation.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const active = pillars[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="consulting"
      id="consulting"
    >
      <div className="consulting__intro">
        <div className="consulting__label">
          <span></span>
          <strong>02 / CONSULTING</strong>
          <span></span>
        </div>

        <h2>
          Antes de crecer,
          <em>hay que entender.</em>
        </h2>

        <p>
          Analizamos la empresa como un sistema completo:
          estrategia, operación, finanzas y personas trabajando
          en una misma dirección.
        </p>
      </div>

      <div
        ref={stageRef}
        className="consulting__stage"
      >
        <div className="consulting__system">
          <div
            ref={orbitRef}
            className="consulting__orbit"
          >
            <span className="consulting__orbit-dot consulting__orbit-dot--one"></span>
            <span className="consulting__orbit-dot consulting__orbit-dot--two"></span>
            <span className="consulting__orbit-dot consulting__orbit-dot--three"></span>
          </div>

          <div className="consulting__ring consulting__ring--outer"></div>

          <div className="consulting__ring consulting__ring--inner"></div>

          <div className="consulting__center">
            <div
              ref={pulseRef}
              className="consulting__pulse"
            ></div>

            <span className="consulting__center-small">
              CBM
            </span>

            <strong>
              BUSINESS
              <br />
              SYSTEM
            </strong>

            <div className="consulting__center-line"></div>

            <small>
              BUILD · CONNECT · GROW
            </small>
          </div>

          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              className={`consulting__pillar consulting__pillar--${
                index + 1
              }`}
            >
              <span className="consulting__pillar-number">
                {pillar.number}
              </span>

              <span className="consulting__pillar-name">
                {pillar.name}
              </span>
            </div>
          ))}

          <div className="consulting__active">
            <span className="consulting__active-number">
              {active.number} / 04
            </span>

            <h3 className="consulting__active-name">
              {active.name}
            </h3>

            <p className="consulting__active-text">
              {active.text}
            </p>

            <div className="consulting__active-tags">
              {active.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="consulting__progress">
          <span>01</span>

          <div>
            <i ref={progressRef}></i>
          </div>

          <span>04</span>
        </div>

        <div className="consulting__hint">
          <span>CONTINÚA</span>
          <i></i>
        </div>
      </div>
    </section>
  );
}

export default Consulting;