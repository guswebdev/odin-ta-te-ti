import { tablero } from "./tablero.js";
import { flujoJuego } from "./juego.js";

const controlarDisplay = (function () {
  const $tablero = document.querySelector(".tablero");
  const $templateCasilla = document.getElementById("template-casilla").content;
  const $fragment = document.createDocumentFragment();
  const $turnoJugador = document.querySelector("[data-turno]");
  const $jugadorGanador = document.querySelector("[data-ganador]");
  const $form = document.getElementById("form");
  const $sectorJuego = document.querySelector(".sector-juego");
  const $btnFormulario = document.querySelector("[type=submit]");

  const crearHtmlTablero = (container, template, fragment, arr) => {
    arr.forEach((el, i) => {
      let fila;
      let columna;

      switch (i) {
        case 0:
          fila = 0;
          columna = 0;
          break;
        case 1:
          fila = 0;
          columna = 1;
          break;
        case 2:
          fila = 0;
          columna = 2;
          break;
        case 3:
          fila = 1;
          columna = 0;
          break;
        case 4:
          fila = 1;
          columna = 1;
          break;
        case 5:
          fila = 1;
          columna = 2;
          break;
        case 6:
          fila = 2;
          columna = 0;
          break;
        case 7:
          fila = 2;
          columna = 1;
          break;
        case 8:
          fila = 2;
          columna = 2;
          break;

        default:
          break;
      }
      template.querySelector("article").dataset.fila = fila;
      template.querySelector("article").dataset.columna = columna;
      template.querySelector("h2").textContent = el;
      let clone = template.cloneNode(true);
      fragment.appendChild(clone);
    });
    container.appendChild(fragment);
  };

  const actualizarTurnoJugador = (string) => {
    //console.log($turnoJugador)
    $turnoJugador.textContent = "";
    let turno = flujoJuego.seleccionarJugador();
    $turnoJugador.textContent = string || turno.getNombre().toUpperCase();
  };

  const anunciarGanador = (ganador) => {
    if (ganador === "empate") {
      $jugadorGanador.textContent = `Fue un empate`;
    } else {
      $jugadorGanador.textContent = `El Ganador es ${ganador.getNombre()}`;
    }
  };

  const actualizarResultado = () => {
    $jugadorGanador.textContent = "-";
  };

  const desabilitarCasillas = () => {
    const $casillas = document.querySelectorAll(".casilla");
    $casillas.forEach((el) => {
      el.classList.remove("casilla");
      el.classList.add("casilla-disable");
    });
  };
  const habilitarCasillas = () => {
    const $casillas = document.querySelectorAll(".casilla");
    console.log($casillas);
    $casillas.forEach((el) => {
      el.classList.remove("casilla-disable");
      el.classList.add("casilla");
    });
  };

  const desabilitarFormulario = () => {
    $form.reset();
    const $elementosFormularios = $form.querySelectorAll("input");
    $elementosFormularios.forEach((el) => {
      el.disabled = true;
    });
    $btnFormulario.disabled = true;
  };

  const habilitarFormulario = () => {
    const $elementosFormularios = $form.querySelectorAll("input");
    $elementosFormularios.forEach((el) => {
      el.disabled = false;
    });
    $btnFormulario.disabled = false;
  };

  const renderTablero = () => {
    crearHtmlTablero(
      $tablero,
      $templateCasilla,
      $fragment,
      tablero.crearTablaDisplay()
    );
  };

  const limpiarTabla = () => {
    $tablero.innerHTML = "";
  };

  return {
    renderTablero,
    limpiarTabla,
    actualizarTurnoJugador,
    actualizarResultado,
    anunciarGanador,
    desabilitarCasillas,
    habilitarCasillas,
    desabilitarFormulario,
    habilitarFormulario,
    $form,
    $sectorJuego,
  };
})();

export { controlarDisplay };
