import { useState } from "react";
import "../styles/Navbar.css";

const navItems = [
  {
    label: "Consulting",
    target: "consulting",
  },
  {
    label: "Digital",
    target: "spaces",
  },
  {
    label: "Work",
    target: "spaces",
  },
  {
    label: "Spaces",
    target: "spaces",
  },
  {
    label: "Conferences",
    target: "spaces",
  },
  {
    label: "Nosotros",
    target: "contacto",
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (target) => {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${menuOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="navbar__brand"
        onClick={() => handleNavigation("home")}
        aria-label="Ir al inicio"
      >
        <span className="navbar__brand-mark">C</span>

        <span className="navbar__brand-name">
          CBM
        </span>
      </button>

      <nav className="navbar__links">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            onClick={() =>
              handleNavigation(item.target)
            }
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="navbar__cta"
        onClick={() => handleNavigation("contacto")}
      >
        Agendar consulta
        <span>↗</span>
      </button>

      <button
        type="button"
        className="navbar__menu"
        aria-label={
          menuOpen
            ? "Cerrar menú"
            : "Abrir menú"
        }
        aria-expanded={menuOpen}
        onClick={() =>
          setMenuOpen((open) => !open)
        }
      >
        <span></span>
        <span></span>
      </button>

      <div className="navbar__mobile">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            onClick={() =>
              handleNavigation(item.target)
            }
          >
            <span>{item.label}</span>
            <span>↗</span>
          </button>
        ))}

        <button
          type="button"
          className="navbar__mobile-cta"
          onClick={() =>
            handleNavigation("contacto")
          }
        >
          <span>Agendar consulta</span>
          <span>↗</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
