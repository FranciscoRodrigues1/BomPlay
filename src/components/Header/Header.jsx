import "./Header.css";
import logo from "../../assets/Logo.png";

function Header() {

  /* ========================================
     PESQUISAR FILME
  ======================================== */

  function pesquisarFilme(evento) {

    evento.preventDefault();

    const formulario =
      evento.currentTarget;

    const input =
      formulario.elements.pesquisa;

    const termo =
      input.value.trim();

    if (!termo) {

      input.focus();

      return;
    }

    window.dispatchEvent(
      new CustomEvent("bomplay-search", {
        detail: termo,
      })
    );
  }


  /* ========================================
     SELECIONAR GÊNERO
  ======================================== */

  function selecionarGenero(genero) {

    window.dispatchEvent(
      new CustomEvent("bomplay-genre", {
        detail: genero,
      })
    );

  }


  return (

    <header className="header">


      {/* ========================================
          LOGO
      ======================================== */}

      <section className="header-brand">

        <a
          href="/"
          aria-label="Página inicial do BomPlay"
        >

          <img
            src={logo}
            alt="BomPlay"
          />

        </a>

      </section>


      {/* ========================================
          PESQUISA
      ======================================== */}

      <section className="header-search">

        <form
          onSubmit={pesquisarFilme}
        >

          <label htmlFor="pesquisa-filme">
            Pesquisar filme
          </label>

          <input
            type="search"
            id="pesquisa-filme"
            name="pesquisa"
            placeholder="Buscar filmes..."
          />

          <button type="submit">
            Buscar
          </button>

        </form>

      </section>


      {/* ========================================
          NAVEGAÇÃO
      ======================================== */}

      <nav
        className="header-navigation"
        aria-label="Navegação principal"
      >

        <ul>

          <li>
            <a href="/">
              Início
            </a>
          </li>


          <li>
            <a href="#filmes">
              Filmes
            </a>
          </li>


          {/* ========================================
              GÊNEROS
          ======================================== */}

          <li className="genres-menu">

            <a
              href="#generos"
              className="genres-menu-link"
            >
              Gêneros
              <span className="genres-arrow">
                ▾
              </span>
            </a>


            <div className="genres-dropdown">

              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 28,
                    nome: "Ação",
                  })
                }
              >
                Ação
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 12,
                    nome: "Aventura",
                  })
                }
              >
                Aventura
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 16,
                    nome: "Animação",
                  })
                }
              >
                Animação
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 35,
                    nome: "Comédia",
                  })
                }
              >
                Comédia
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 80,
                    nome: "Crime",
                  })
                }
              >
                Crime
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 18,
                    nome: "Drama",
                  })
                }
              >
                Drama
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 14,
                    nome: "Fantasia",
                  })
                }
              >
                Fantasia
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 27,
                    nome: "Terror",
                  })
                }
              >
                Terror
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 10749,
                    nome: "Romance",
                  })
                }
              >
                Romance
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 878,
                    nome: "Ficção Científica",
                  })
                }
              >
                Ficção Científica
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 53,
                    nome: "Suspense",
                  })
                }
              >
                Suspense
              </button>


              <button
                type="button"
                onClick={() =>
                  selecionarGenero({
                    id: 10751,
                    nome: "Família",
                  })
                }
              >
                Família
              </button>

            </div>

          </li>


          <li>
            <a href="#lancamentos">
              Lançamentos
            </a>
          </li>

        </ul>

      </nav>

    </header>
  );
}

export default Header;