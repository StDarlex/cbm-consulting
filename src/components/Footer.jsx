import "../styles/Footer.css";

const footerLinks = [
  { label: "Consulting", href: "#consulting" },
  { label: "Digital", href: "#digital" },
  { label: "Spaces", href: "#spaces" },
  { label: "Conferences", href: "#conferences" },
  { label: "Nosotros", href: "#nosotros" },
];

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">C</span>
            <span className="footer__logo-name">CBM</span>
          </div>

          <p className="footer__brand-title">
            Consultoría Integral de
            <br />
            Gestión Empresarial
          </p>

          <p className="footer__brand-description">
            Estrategia, tecnología y espacios de trabajo
            conectados para empresas que quieren avanzar
            con claridad y propósito.
          </p>
        </div>

        <div className="footer__column">
          <span className="footer__label">EXPLORAR</span>

          <nav className="footer__links">
            {footerLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
                <span>↗</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__column">
          <span className="footer__label">CONTACTO</span>

          <div className="footer__contact">
            <a href="mailto:cbm.oficial@gmail.com">
              cbm.oficial@gmail.com
            </a>

            <a href="tel:+523221685490">
              +52 322 168 5490
            </a>

            <span>
              Puerto Vallarta
              <br />
              Jalisco · México
            </span>
          </div>
        </div>

        <div className="footer__column footer__column--ceo">
          <span className="footer__label">DIRECCIÓN</span>

          <div className="footer__ceo">
            <span>CEO</span>

            <strong>
              Patricia
              <br />
              Esquivel Colin
            </strong>

            <p>
              Liderando una visión empresarial
              construida para crecer.
            </p>
          </div>
        </div>
      </div>

      <div className="footer__statement">
        <span>BUILD · CONNECT · GROW</span>

        <h2>
          Empresas que
          <em>avanzan.</em>
        </h2>
      </div>

      <div className="footer__bottom">
        <span>
          © 2026 CBM CONSULTING. TODOS LOS DERECHOS RESERVADOS.
        </span>

        <span>
          CONSULTING · DIGITAL · SPACES
        </span>

        <span>
          by Ares Intelligence Corporation
        </span>
      </div>
    </footer>
  );
}

export default Footer;