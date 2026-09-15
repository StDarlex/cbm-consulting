import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroImage from "../assets/imagen hero.jpg";
import "../styles/Hero.css";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!hero || !image || !content) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(image, {
          scale: 1.14,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
        })
        .from(
          ".hero__topline",
          {
            opacity: 0,
            y: -25,
            duration: 0.8,
          },
          "-=1.3"
        )
        .from(
          ".hero__eyebrow",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero__title-line",
          {
            opacity: 0,
            y: 60,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".hero__description",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero__actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero__bottom",
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.4"
        );

      gsap.to(image, {
        scale: 1.07,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(image, {
        yPercent: -8,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      gsap.to(content, {
  yPercent: -6,
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: hero,
    start: "25% top",
    end: "bottom bottom",
    scrub: 1.2,
  },
});

      gsap.to(".hero__topline", {
        y: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "5% top",
          end: "45% top",
          scrub: 1,
        },
      });

      gsap.to(".hero__bottom", {
        y: 25,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "0% top",
          end: "35% top",
          scrub: 1,
        },
      });

      const handleMouseMove = (event) => {
        const x =
          (event.clientX / window.innerWidth - 0.5) * 2;

        const y =
          (event.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(image, {
          x: x * 10,
          y: y * 7,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(".hero__light", {
          x: x * -20,
          y: y * -15,
          duration: 1.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
    >
      <div className="hero__media">
        <img
          ref={imageRef}
          className="hero__image"
          src={heroImage}
          alt="CBM Consulting"
        />

        <div className="hero__image-overlay"></div>
        <div className="hero__gradient"></div>
        <div className="hero__light"></div>
        <div className="hero__vignette"></div>
      </div>

      <header className="hero__topline">
        <div className="hero__brand">
          <span className="hero__brand-dot"></span>
          <span>CBM CONSULTING</span>
        </div>

        <span>PUERTO VALLARTA · MÉXICO</span>

        <span>EST. 2026</span>
      </header>

      <div
        ref={contentRef}
        className="hero__content"
      >
        <p className="hero__eyebrow">
          CONSULTORÍA
          <span>/</span>
          TECNOLOGÍA
          <span>/</span>
          ESPACIOS
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">
            Construimos
          </span>

          <span className="hero__title-line">
            empresas que
          </span>

          <span className="hero__title-line hero__title-line--gold">
            están listas
          </span>

          <span className="hero__title-line">
            para crecer.
          </span>
        </h1>

        <p className="hero__description">
          Consultoría, tecnología y espacios de trabajo
          diseñados para hacer avanzar tu negocio.
        </p>

        {/* 
          Se eliminaron los botones.
          Esta zona conserva su presencia dentro del Hero,
          pero ahora funciona únicamente como información.
        */}
        <div className="hero__actions">
          <div className="hero__statement">
            <span>CBM CONSULTING</span>
            <p>
              Una visión integral para empresas que
              buscan ordenar, transformar y crecer.
            </p>
          </div>

          <div className="hero__statement">
            <span>BUILD · CONNECT · GROW</span>
            <p>
              Estrategia, tecnología y espacios de trabajo
              conectados dentro de un mismo ecosistema.
            </p>
          </div>
        </div>
      </div>

      <div className="hero__bottom">
        <span>
          BUILD · CONNECT · GROW
        </span>

        <div className="hero__scroll">
          <span>SCROLL TO EXPLORE</span>
          <i></i>
        </div>

        <span>
          CONSULTING · DIGITAL · SPACES
        </span>
      </div>

      <div className="hero__frame"></div>
    </section>
  );
}

export default Hero;
