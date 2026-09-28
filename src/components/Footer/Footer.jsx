import "./Footer.css";

// Componente responsável pelo rodapé da aplicação BomPlay.
// Contém a identidade da plataforma, informações e redes sociais.

function Footer() {
  return (
    <footer className="footer">

      {/* Identidade visual do BomPlay */}
      <section
        className="footer-brand"
        aria-label="Identidade do BomPlay"
      >
        <a
          href="/"
          aria-label="Ir para a página inicial do BomPlay"
        >
          <img
            src="/src/assets/Logo.png"
            alt="BomPlay"
          />
        </a>
      </section>


      {/* Informações do projeto */}
      <section
        className="footer-information"
        aria-label="Informações do BomPlay"
      >
        <p>
          Desenvolvido para estudos e consumo de APIs,
          todos os direitos reservados.
        </p>

        <p className="footer-copyright">
          © 2026 BomPlay. Todos os direitos reservados.
        </p>

        <p className="footer-author">
          Francisco Rodrigues
        </p>
      </section>


      {/* Redes sociais */}
      <nav
        className="footer-social"
        aria-label="Redes sociais"
      >

        <a
          href="#"
          aria-label="Instagram do BomPlay"
        >
          <i className="fa-brands fa-instagram"></i>
          <span>Instagram</span>
        </a>


        <a
          href="#"
          aria-label="LinkedIn do BomPlay"
        >
          <i className="fa-brands fa-linkedin-in"></i>
          <span>LinkedIn</span>
        </a>


        <a
          href="#"
          aria-label="GitHub do BomPlay"
        >
          <i className="fa-brands fa-github"></i>
          <span>GitHub</span>
        </a>


        <a
          href="#"
          aria-label="YouTube do BomPlay"
        >
          <i className="fa-brands fa-youtube"></i>
          <span>YouTube</span>
        </a>

      </nav>

    </footer>
  );
}

export default Footer;