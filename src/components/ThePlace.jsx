import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/ThePlace.css";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    id: "01",
    name: "WORK LOUNGE",
    category: "WORK",
    description:
      "Un entorno pensado para trabajar con libertad, comodidad y concentración.",
  },
  {
    id: "02",
    name: "MEETING ROOM",
    category: "MEET",
    description:
      "Un espacio preparado para reuniones, presentaciones y conversaciones importantes.",
  },
  {
    id: "03",
    name: "PRIVATE OFFICE",
    category: "WORK",
    description:
      "Privacidad, presencia y tranquilidad para quienes necesitan su propio espacio.",
  },
  {
    id: "04",
    name: "CAFÉ",
    category: "CONNECT",
    description:
      "Un punto de encuentro para hacer una pausa, conversar o simplemente quedarse un rato.",
  },
  {
    id: "05",
    name: "EVENT SPACE",
    category: "CONNECT",
    description:
      "Un espacio flexible para encuentros, talleres, presentaciones y experiencias.",
  },
];

function ThePlace() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const frameRef = useRef(null);
  const glowRef = useRef(null);

  const [activeSpace, setActiveSpace] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const frame = frameRef.current;
    const glow = glowRef.current;

    if (!section || !map || !frame || !glow) return;

    const ctx = gsap.context(() => {
      gsap.from(".the-place__eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".the-place__title-line", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".the-place__description", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          once: true,
        },
      });

      gsap.from(frame, {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: frame,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(map, {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(glow, {
        scale: 1.25,
        opacity: 0.45,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const handleMouseMove = (event) => {
        const rect = frame.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) / rect.width - 0.5) * 2;

        const y =
          ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        gsap.to(map, {
          x: x * 12,
          y: y * 8,
          duration: 1.2,
          ease: "power3.out",
          overwrite: true,
        });

        gsap.to(glow, {
          x: x * 25,
          y: y * 20,
          duration: 1.4,
          ease: "power3.out",
          overwrite: true,
        });
      };

      frame.addEventListener("mousemove", handleMouseMove);

      return () => {
        frame.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const activateSpace = (index) => {
    setActiveSpace(index);
  };

  const active = spaces[activeSpace];

  return (
    <section
      ref={sectionRef}
      className="the-place"
      id="spaces"
    >
      <div className="the-place__intro">
        <span className="the-place__eyebrow">
          <i></i>
          03 / THE PLACE
          <i></i>
        </span>

        <h2>
          <span className="the-place__title-line">
            Donde las
          </span>

          <span className="the-place__title-line">
            ideas
          </span>

          <span className="the-place__title-line the-place__title-line--gold">
            toman lugar.
          </span>
        </h2>

        <p className="the-place__description">
          Un espacio creado para trabajar, reunirse,
          conectar y formar parte de algo más grande.
        </p>
      </div>

      <div className="the-place__experience">
        <div
          ref={frameRef}
          className="the-place__frame"
        >
          <div
            ref={mapRef}
            className="the-place__map"
          >
            <div className="the-place__grid"></div>

            <div
              ref={glowRef}
              className="the-place__glow"
            ></div>

            <div className="the-place__architecture">
              <span className="the-place__wall the-place__wall--top"></span>
              <span className="the-place__wall the-place__wall--right"></span>
              <span className="the-place__wall the-place__wall--bottom"></span>
              <span className="the-place__wall the-place__wall--left"></span>

              <span className="the-place__room the-place__room--one">
                WORK
              </span>

              <span className="the-place__room the-place__room--two">
                MEET
              </span>

              <span className="the-place__room the-place__room--three">
                PRIVATE
              </span>

              <span className="the-place__room the-place__room--four">
                CAFÉ
              </span>

              <span className="the-place__room the-place__room--five">
                EVENTS
              </span>

              <span className="the-place__entrance">
                ENTRANCE
              </span>
            </div>

            <div className="the-place__center">
              <span>CBM</span>
              <strong>
                THE
                <br />
                PLACE
              </strong>
              <small>
                PUERTO VALLARTA
              </small>
            </div>

            {spaces.map((space, index) => (
              <button
                key={space.id}
                type="button"
                className={`the-place__point the-place__point--${
                  index + 1
                } ${
                  index === activeSpace
                    ? "is-active"
                    : ""
                }`}
                onMouseEnter={() =>
                  activateSpace(index)
                }
                onFocus={() =>
                  activateSpace(index)
                }
                onClick={() =>
                  activateSpace(index)
                }
                aria-label={`Ver ${space.name}`}
              >
                <span className="the-place__point-number">
                  {space.id}
                </span>

                <span className="the-place__point-name">
                  {space.name}
                </span>
              </button>
            ))}
          </div>

          <div className="the-place__coordinates">
            <span>20°39′N</span>
            <span>105°13′W</span>
          </div>

          <span className="the-place__corner the-place__corner--top">
            CBM / PV
          </span>

          <span className="the-place__corner the-place__corner--bottom">
            2026
          </span>
        </div>

        <div className="the-place__info">
          <div className="the-place__info-index">
            <span>{active.id}</span>
            <i></i>
            <span>05</span>
          </div>

          <span className="the-place__info-category">
            {active.category}
          </span>

          <h3>{active.name}</h3>

          <p>{active.description}</p>
        </div>
      </div>

      <div className="the-place__motto">
        <span>WORK · MEET · CONNECT</span>

        <h3>
          A place to
          <em>build.</em>
        </h3>

        <div className="the-place__motto-line"></div>
      </div>
    </section>
  );
}

export default ThePlace;
