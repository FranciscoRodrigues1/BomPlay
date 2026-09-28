import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Main() {

  /* ========================================
     ESTADOS DOS FILMES
  ======================================== */

  const [filmes, setFilmes] =
    useState([]);

  const [maisAssistidos, setMaisAssistidos] =
    useState([]);

  const [filmeAtual, setFilmeAtual] =
    useState(0);


  /* ========================================
     ESTADOS DO MODAL
  ======================================== */

  const [filmeSelecionado, setFilmeSelecionado] =
    useState(null);

  const [provedores, setProvedores] =
    useState([]);

  const [carregandoProvedores, setCarregandoProvedores] =
    useState(false);


  /* ========================================
     ESTADOS GERAIS
  ======================================== */

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");


  /* ========================================
     ESTADOS DA PESQUISA
  ======================================== */

  const [resultadosBusca, setResultadosBusca] =
    useState([]);

  const [termoPesquisa, setTermoPesquisa] =
    useState("");

  const [pesquisando, setPesquisando] =
    useState(false);

  const [erroPesquisa, setErroPesquisa] =
    useState("");


  /* ========================================
     ESTADOS DOS GÊNEROS
  ======================================== */

  const [generoSelecionado, setGeneroSelecionado] =
    useState(null);

  const [filmesGenero, setFilmesGenero] =
    useState([]);

  const [pesquisandoGenero, setPesquisandoGenero] =
    useState(false);

  const [erroGenero, setErroGenero] =
    useState("");


  /* ========================================
     CONFIGURAÇÃO DA API
  ======================================== */

  const API_KEY =
    import.meta.env.VITE_TMDB_API_KEY;

  const URL_BASE =
    "https://api.themoviedb.org/3";

  const URL_IMAGEM =
    "https://image.tmdb.org/t/p/w500";

  const URL_BACKDROP =
    "https://image.tmdb.org/t/p/original";


  /* ========================================
     BUSCAR FILMES PRINCIPAIS
  ======================================== */

  useEffect(() => {

    async function buscarFilmes() {

      try {

        const [
          lancamentos,
          populares
        ] = await Promise.all([

          axios.get(
            `${URL_BASE}/movie/now_playing`,
            {
              params: {
                api_key: API_KEY,
                language: "pt-BR",
                page: 1,
              },
            }
          ),

          axios.get(
            `${URL_BASE}/movie/popular`,
            {
              params: {
                api_key: API_KEY,
                language: "pt-BR",
                page: 1,
              },
            }
          ),

        ]);


        setFilmes(
          lancamentos.data.results
        );

        setMaisAssistidos(
          populares.data.results
        );


      } catch (error) {

        console.error(error);

        setErro(
          "Não foi possível carregar os filmes."
        );

      } finally {

        setCarregando(false);

      }

    }


    buscarFilmes();

  }, [API_KEY]);


  /* ========================================
     RECEBER PESQUISA DO HEADER
  ======================================== */

  useEffect(() => {

    async function realizarPesquisa(evento) {

      const termo =
        evento.detail?.trim();


      if (!termo) {
        return;
      }


      setGeneroSelecionado(null);

      setFilmesGenero([]);

      setPesquisando(true);

      setErroPesquisa("");

      setResultadosBusca([]);

      setTermoPesquisa(termo);


      try {

        const resposta =
          await axios.get(
            `${URL_BASE}/search/movie`,
            {
              params: {
                api_key: API_KEY,
                language: "pt-BR",
                query: termo,
                page: 1,
                include_adult: false,
              },
            }
          );


        setResultadosBusca(
          resposta.data.results || []
        );


        setTimeout(() => {

          const elemento =
            document.getElementById(
              "resultados-busca"
            );

          if (elemento) {

            elemento.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

          }

        }, 100);


      } catch (error) {

        console.error(error);

        setErroPesquisa(
          "Não foi possível realizar a pesquisa."
        );

      } finally {

        setPesquisando(false);

      }

    }


    window.addEventListener(
      "bomplay-search",
      realizarPesquisa
    );


    return () => {

      window.removeEventListener(
        "bomplay-search",
        realizarPesquisa
      );

    };

  }, [API_KEY]);


  /* ========================================
     RECEBER GÊNERO DO HEADER
  ======================================== */

  useEffect(() => {

    async function realizarPesquisaGenero(evento) {

      const genero =
        evento.detail;


      if (!genero) {
        return;
      }


      setTermoPesquisa("");

      setResultadosBusca([]);

      setErroPesquisa("");

      setGeneroSelecionado(genero);

      setPesquisandoGenero(true);

      setErroGenero("");

      setFilmesGenero([]);


      try {

        const resposta =
          await axios.get(
            `${URL_BASE}/discover/movie`,
            {
              params: {

                api_key: API_KEY,

                language: "pt-BR",

                sort_by:
                  "popularity.desc",

                with_genres:
                  genero.id,

                page: 1,

                include_adult: false,

              },
            }
          );


        setFilmesGenero(
          resposta.data.results || []
        );


        setTimeout(() => {

          const elemento =
            document.getElementById(
              "resultados-genero"
            );

          if (elemento) {

            elemento.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

          }

        }, 100);


      } catch (error) {

        console.error(error);

        setErroGenero(
          "Não foi possível carregar os filmes desse gênero."
        );

      } finally {

        setPesquisandoGenero(false);

      }

    }


    window.addEventListener(
      "bomplay-genre",
      realizarPesquisaGenero
    );


    return () => {

      window.removeEventListener(
        "bomplay-genre",
        realizarPesquisaGenero
      );

    };

  }, [API_KEY]);


  /* ========================================
     CARROSSEL
  ======================================== */

  useEffect(() => {

    if (filmes.length === 0) {
      return;
    }


    const filmesHero =
      filmes.slice(0, 5);


    const intervalo =
      setInterval(() => {

        setFilmeAtual(
          (indiceAtual) => {

            if (
              indiceAtual ===
              filmesHero.length - 1
            ) {

              return 0;

            }

            return indiceAtual + 1;

          }
        );

      }, 5000);


    return () =>
      clearInterval(intervalo);

  }, [filmes]);


  /* ========================================
     SELECIONAR FILME
  ======================================== */

  async function selecionarFilme(filme) {

    setFilmeSelecionado(filme);

    setProvedores([]);

    setCarregandoProvedores(true);


    try {

      const resposta =
        await axios.get(
          `${URL_BASE}/movie/${filme.id}/watch/providers`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );


      const brasil =
        resposta.data.results?.BR;


      if (brasil) {

        const plataformas = [

          ...(brasil.flatrate || []),

          ...(brasil.rent || []),

          ...(brasil.buy || []),

        ];


        const plataformasUnicas =
          plataformas.filter(
            (
              plataforma,
              indice,
              array
            ) =>
              array.findIndex(
                (item) =>
                  item.provider_id ===
                  plataforma.provider_id
              ) === indice
          );


        setProvedores(
          plataformasUnicas
        );

      }


    } catch (error) {

      console.error(error);

    } finally {

      setCarregandoProvedores(false);

    }

  }


  /* ========================================
     FECHAR MODAL
  ======================================== */

  function fecharFilme() {

    setFilmeSelecionado(null);

    setProvedores([]);

  }


  /* ========================================
     VOLTAR PARA OS FILMES
  ======================================== */

  function voltarParaFilmes() {

    setResultadosBusca([]);

    setTermoPesquisa("");

    setGeneroSelecionado(null);

    setFilmesGenero([]);

    setErroPesquisa("");

    setErroGenero("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  /* ========================================
     OBTER ANO
  ======================================== */

  function obterAno(data) {

    if (!data) {
      return "Ano não informado";
    }

    return data.substring(0, 4);

  }


  /* ========================================
     CARREGANDO
  ======================================== */

  if (carregando) {

    return (

      <main id="conteudo-principal">

        <div className="estado">

          <p>
            Carregando filmes...
          </p>

        </div>

      </main>

    );

  }


  /* ========================================
     ERRO
  ======================================== */

  if (erro) {

    return (

      <main id="conteudo-principal">

        <div className="estado estado-erro">

          <p>
            {erro}
          </p>

        </div>

      </main>

    );

  }


  const filmesHero =
    filmes.slice(0, 5);


  const filmeDestaque =
    filmesHero[filmeAtual];


  return (

    <main id="conteudo-principal">


      {/* ========================================
          RESULTADOS POR GÊNERO
      ======================================== */}

      {generoSelecionado && (

        <section
          id="resultados-genero"
          className="movies-section genre-results-section"
        >

          <div className="section-header">

            <div>

              <h2>
                Filmes de{" "}
                {generoSelecionado.nome}
              </h2>

              {!pesquisandoGenero &&
                !erroGenero &&
                filmesGenero.length > 0 && (

                  <span>
                    Filmes encontrados para este gênero
                  </span>

                )}

            </div>


            <button
              className="back-button"
              type="button"
              onClick={voltarParaFilmes}
            >
              ← Voltar para filmes
            </button>

          </div>


          {/* ========================================
              PESQUISANDO GÊNERO
          ======================================== */}

          {pesquisandoGenero && (

            <div className="estado">

              <p>
                Buscando filmes de{" "}
                {generoSelecionado.nome}...
              </p>

            </div>

          )}


          {/* ========================================
              ERRO DO GÊNERO
          ======================================== */}

          {!pesquisandoGenero &&
            erroGenero && (

              <div className="estado estado-erro">

                <p>
                  {erroGenero}
                </p>

              </div>

            )}


          {/* ========================================
              FILMES DO GÊNERO
          ======================================== */}

          {!pesquisandoGenero &&
            !erroGenero &&
            filmesGenero.length > 0 && (

              <div className="movie-grid">

                {filmesGenero
                  .slice(0, 18)
                  .map((filme) => (

                    <article
                      className="movie-card"
                      key={filme.id}
                    >

                      <div className="movie-poster">

                        {filme.poster_path ? (

                          <img
                            src={`${URL_IMAGEM}${filme.poster_path}`}
                            alt={`Pôster do filme ${filme.title}`}
                          />

                        ) : (

                          <div className="poster-placeholder">
                            Sem imagem
                          </div>

                        )}


                        <button
                          className="play-button"
                          type="button"
                          onClick={() =>
                            selecionarFilme(filme)
                          }
                          aria-label={`Ver onde assistir ${filme.title}`}
                        >
                          ▶
                        </button>

                      </div>


                      <div className="movie-information">

                        <h3>
                          {filme.title}
                        </h3>


                        <div className="movie-meta">

                          <span>
                            ⭐{" "}
                            {filme.vote_average
                              ? filme.vote_average.toFixed(1)
                              : "N/A"}
                          </span>

                          <span>
                            {obterAno(
                              filme.release_date
                            )}
                          </span>

                        </div>

                      </div>

                    </article>

                  ))}

              </div>

            )}


        </section>

      )}


      {/* ========================================
          RESULTADOS DA PESQUISA
      ======================================== */}

      {termoPesquisa && (

        <section
          id="resultados-busca"
          className="movies-section search-results-section"
        >

          <div className="section-header">

            <div>

              <h2>
                Resultados para "{termoPesquisa}"
              </h2>

              {!pesquisando &&
                !erroPesquisa &&
                resultadosBusca.length > 0 && (

                  <span>
                    {resultadosBusca.length} filmes encontrados
                  </span>

                )}

            </div>


            <button
              className="back-button"
              type="button"
              onClick={voltarParaFilmes}
            >
              ← Voltar para filmes
            </button>

          </div>


          {/* ========================================
              PESQUISANDO
          ======================================== */}

          {pesquisando && (

            <div className="estado">

              <p>
                Buscando filmes...
              </p>

            </div>

          )}


          {/* ========================================
              ERRO DA PESQUISA
          ======================================== */}

          {!pesquisando &&
            erroPesquisa && (

              <div className="estado estado-erro">

                <p>
                  {erroPesquisa}
                </p>

              </div>

            )}


          {/* ========================================
              NENHUM RESULTADO
          ======================================== */}

          {!pesquisando &&
            !erroPesquisa &&
            resultadosBusca.length === 0 && (

              <div className="estado">

                <p>
                  Nenhum filme encontrado para "
                  {termoPesquisa}".
                </p>

              </div>

            )}


          {/* ========================================
              RESULTADOS
          ======================================== */}

          {!pesquisando &&
            !erroPesquisa &&
            resultadosBusca.length > 0 && (

              <div className="movie-grid">

                {resultadosBusca
                  .slice(0, 18)
                  .map((filme) => (

                    <article
                      className="movie-card"
                      key={filme.id}
                    >

                      <div className="movie-poster">

                        {filme.poster_path ? (

                          <img
                            src={`${URL_IMAGEM}${filme.poster_path}`}
                            alt={`Pôster do filme ${filme.title}`}
                          />

                        ) : (

                          <div className="poster-placeholder">
                            Sem imagem
                          </div>

                        )}


                        <button
                          className="play-button"
                          type="button"
                          onClick={() =>
                            selecionarFilme(filme)
                          }
                          aria-label={`Ver onde assistir ${filme.title}`}
                        >
                          ▶
                        </button>

                      </div>


                      <div className="movie-information">

                        <h3>
                          {filme.title}
                        </h3>


                        <div className="movie-meta">

                          <span>
                            ⭐{" "}
                            {filme.vote_average
                              ? filme.vote_average.toFixed(1)
                              : "N/A"}
                          </span>

                          <span>
                            {obterAno(
                              filme.release_date
                            )}
                          </span>

                        </div>

                      </div>

                    </article>

                  ))}

              </div>

            )}

        </section>

      )}


      {/* ========================================
          HERO
      ======================================== */}

      {!termoPesquisa &&
        !generoSelecionado &&
        filmeDestaque && (

          <section
            className="hero"
            aria-label="Filmes em destaque"
          >

            <div
              className="hero-background"
              style={{
                backgroundImage: `url(${URL_BACKDROP}${filmeDestaque.backdrop_path})`,
              }}
            />

            <div className="hero-overlay" />


            <div className="hero-content">

              <div className="hero-information">

                <span className="hero-label">
                  EM DESTAQUE
                </span>


                <h1>
                  {filmeDestaque.title}
                </h1>


                <div className="hero-meta">

                  <span>
                    ⭐{" "}
                    {filmeDestaque.vote_average?.toFixed(1)}
                  </span>

                  <span>
                    {obterAno(
                      filmeDestaque.release_date
                    )}
                  </span>

                </div>


                <p>
                  {filmeDestaque.overview ||
                    "Descrição não disponível."}
                </p>


                <button
                  className="hero-button"
                  type="button"
                  onClick={() =>
                    selecionarFilme(
                      filmeDestaque
                    )
                  }
                >
                  ▶ Assistir
                </button>

              </div>


              <div className="hero-poster">

                {filmeDestaque.poster_path && (

                  <img
                    src={`${URL_IMAGEM}${filmeDestaque.poster_path}`}
                    alt={`Pôster do filme ${filmeDestaque.title}`}
                  />

                )}

              </div>

            </div>


            <div className="hero-controls">

              {filmesHero.map(
                (filme, indice) => (

                  <button
                    key={filme.id}
                    type="button"
                    className={
                      indice === filmeAtual
                        ? "hero-indicator active"
                        : "hero-indicator"
                    }
                    onClick={() =>
                      setFilmeAtual(indice)
                    }
                    aria-label={`Mostrar ${filme.title}`}
                  />

                )
              )}

            </div>

          </section>

        )}


      {/* ========================================
          FILMES
      ======================================== */}

      {!termoPesquisa &&
        !generoSelecionado && (

          <section
            id="filmes"
            className="movies-section"
          >

            <div className="section-header">

              <h2>
                Filmes
              </h2>

              <span>
                Os filmes mais populares
              </span>

            </div>


            <div className="movie-grid">

              {maisAssistidos
                .slice(0, 18)
                .map((filme) => (

                  <article
                    className="movie-card"
                    key={filme.id}
                  >

                    <div className="movie-poster">

                      {filme.poster_path ? (

                        <img
                          src={`${URL_IMAGEM}${filme.poster_path}`}
                          alt={`Pôster do filme ${filme.title}`}
                        />

                      ) : (

                        <div className="poster-placeholder">
                          Sem imagem
                        </div>

                      )}


                      <button
                        className="play-button"
                        type="button"
                        onClick={() =>
                          selecionarFilme(filme)
                        }
                        aria-label={`Ver onde assistir ${filme.title}`}
                      >
                        ▶
                      </button>

                    </div>


                    <div className="movie-information">

                      <h3>
                        {filme.title}
                      </h3>


                      <div className="movie-meta">

                        <span>
                          ⭐{" "}
                          {filme.vote_average?.toFixed(1)}
                        </span>

                        <span>
                          {obterAno(
                            filme.release_date
                          )}
                        </span>

                      </div>

                    </div>

                  </article>

                ))}

            </div>

          </section>

        )}


      {/* ========================================
          LANÇAMENTOS
      ======================================== */}

      {!termoPesquisa &&
        !generoSelecionado && (

          <section
            id="lancamentos"
            className="movies-section"
          >

            <div className="section-header">

              <h2>
                Lançamentos
              </h2>

              <span>
                Filmes recentes
              </span>

            </div>


            <div className="movie-grid">

              {filmes
                .slice(0, 18)
                .map((filme) => (

                  <article
                    className="movie-card"
                    key={filme.id}
                  >

                    <div className="movie-poster">

                      {filme.poster_path ? (

                        <img
                          src={`${URL_IMAGEM}${filme.poster_path}`}
                          alt={`Pôster do filme ${filme.title}`}
                        />

                      ) : (

                        <div className="poster-placeholder">
                          Sem imagem
                        </div>

                      )}


                      <button
                        className="play-button"
                        type="button"
                        onClick={() =>
                          selecionarFilme(filme)
                        }
                        aria-label={`Ver onde assistir ${filme.title}`}
                      >
                        ▶
                      </button>

                    </div>


                    <div className="movie-information">

                      <h3>
                        {filme.title}
                      </h3>


                      <div className="movie-meta">

                        <span>
                          ⭐{" "}
                          {filme.vote_average?.toFixed(1)}
                        </span>

                        <span>
                          {obterAno(
                            filme.release_date
                          )}
                        </span>

                      </div>

                    </div>

                  </article>

                ))}

            </div>

          </section>

        )}


      {/* ========================================
          MAIS ASSISTIDOS
      ======================================== */}

      {!termoPesquisa &&
        !generoSelecionado && (

          <section
            id="mais-assistidos"
            className="movies-section"
          >

            <div className="section-header">

              <h2>
                Mais Assistidos
              </h2>

              <span>
                Os filmes mais populares
              </span>

            </div>


            <div className="movie-grid">

              {maisAssistidos
                .slice(0, 18)
                .map((filme) => (

                  <article
                    className="movie-card"
                    key={filme.id}
                  >

                    <div className="movie-poster">

                      {filme.poster_path ? (

                        <img
                          src={`${URL_IMAGEM}${filme.poster_path}`}
                          alt={`Pôster do filme ${filme.title}`}
                        />

                      ) : (

                        <div className="poster-placeholder">
                          Sem imagem
                        </div>

                      )}


                      <button
                        className="play-button"
                        type="button"
                        onClick={() =>
                          selecionarFilme(filme)
                        }
                        aria-label={`Ver onde assistir ${filme.title}`}
                      >
                        ▶
                      </button>

                    </div>


                    <div className="movie-information">

                      <h3>
                        {filme.title}
                      </h3>


                      <div className="movie-meta">

                        <span>
                          ⭐{" "}
                          {filme.vote_average?.toFixed(1)}
                        </span>

                        <span>
                          {obterAno(
                            filme.release_date
                          )}
                        </span>

                      </div>

                    </div>

                  </article>

                ))}

            </div>

          </section>

        )}


      {/* ========================================
          MODAL DE STREAMING
      ======================================== */}

      {filmeSelecionado && (

        <div
          className="streaming-overlay"
          onClick={fecharFilme}
        >

          <section
            className="streaming-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
            aria-labelledby="streaming-title"
          >

            <button
              className="close-button"
              type="button"
              onClick={fecharFilme}
              aria-label="Fechar"
            >
              ×
            </button>


            <div className="streaming-header">

              {filmeSelecionado.poster_path && (

                <img
                  src={`${URL_IMAGEM}${filmeSelecionado.poster_path}`}
                  alt=""
                />

              )}


              <div>

                <span>
                  ONDE ASSISTIR
                </span>

                <h2 id="streaming-title">
                  {filmeSelecionado.title}
                </h2>

              </div>

            </div>


            <div className="streaming-content">

              {carregandoProvedores && (

                <p>
                  Buscando plataformas...
                </p>

              )}


              {!carregandoProvedores &&
                provedores.length > 0 && (

                  <>

                    <p>
                      Disponível em:
                    </p>


                    <div className="streaming-options">

                      {provedores.map(
                        (provedor) => (

                          <a
                            key={
                              provedor.provider_id
                            }
                            className="streaming-pill"
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              `${filmeSelecionado.title} ${provedor.provider_name}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            <img
                              src={`https://image.tmdb.org/t/p/original${provedor.logo_path}`}
                              alt=""
                            />

                            <span>
                              {
                                provedor.provider_name
                              }
                            </span>

                          </a>

                        )
                      )}

                    </div>

                  </>

                )}


              {!carregandoProvedores &&
                provedores.length === 0 && (

                  <p className="streaming-empty">
                    Não encontramos plataformas
                    de streaming disponíveis
                    no momento.
                  </p>

                )}

            </div>

          </section>

        </div>

      )}

    </main>

  );

}

export default Main;