import { tablero } from "./tablero.js";
import { createPlayer } from "./crearPlayer.js";
import { controlarDisplay } from "./display.js";

const flujoJuego = (function () {
  let jugadorUno;
  let jugadorDos;

  function submit(e) {
    e.preventDefault();

    const formData = new FormData(this);

    jugadorUno = createPlayer(
      formData.get("nombre-j1"),
      formData.get("marcador-j1").charAt(0).toUpperCase(),
      true
    );
    jugadorDos = createPlayer(
      formData.get("nombre-j2"),
      formData.get("marcador-j2").charAt(0).toUpperCase(),
      false
    );

    controlarDisplay.desabilitarFormulario();
    controlarDisplay.limpiarTabla();
    controlarDisplay.renderTablero();
    controlarDisplay.actualizarTurnoJugador();
    controlarDisplay.$sectorJuego.classList.remove("d-none");
  }

  controlarDisplay.$form.addEventListener("submit", submit);

  const clickCasillas = (target) => {
    let jugadorEnTurno = seleccionarJugador();
    jugarPartida(target.dataset.fila, target.dataset.columna);
    controlarDisplay.actualizarTurnoJugador();
    controlarDisplay.limpiarTabla();
    controlarDisplay.renderTablero();
    if (verificarJuego()) {
      controlarDisplay.actualizarTurnoJugador("-");
      controlarDisplay.anunciarGanador(jugadorEnTurno);
      controlarDisplay.desabilitarCasillas();
    } else if (verificarEmpate()) {
      controlarDisplay.actualizarTurnoJugador("-");
      controlarDisplay.anunciarGanador("empate");
      controlarDisplay.desabilitarCasillas();
    }
  };

  const clickBtnJuegoNuevo = () => {
    //reiniciar tabla a valores vacios
    tablero.reiniciarTabla();
    //cambiar estados de jugadores a inicial
    jugadorUno.setEstado(true);
    jugadorDos.setEstado(false);

    //actualizar el mensaje de turno
    controlarDisplay.actualizarTurnoJugador();
    //cambiar el mensaje de resultado
    controlarDisplay.actualizarResultado();

    //habilitar el tablero a inicio
    controlarDisplay.limpiarTabla();
    controlarDisplay.renderTablero();
  };

  function click(e) {
    if (e.target.classList.contains("casilla")) {
      clickCasillas(e.target);
    }

    if (e.target.classList.contains("btn-juego-nuevo")) {
      clickBtnJuegoNuevo();
    }
    if (e.target.classList.contains("btn-reiniciar-juego")) {
      clickBtnJuegoNuevo();
      controlarDisplay.habilitarFormulario();
      controlarDisplay.$sectorJuego.classList.add("d-none");
    }
  }

  document.addEventListener("click", click);

  const jugarTurno = (jugador, fila, columna) => {
    return tablero.agregarJugada(...jugador.hacerJugada(fila, columna));
  };

  const seleccionarJugador = () => {
    if (jugadorUno.getEstado()) {
      return jugadorUno;
    } else if (jugadorDos.getEstado()) {
      return jugadorDos;
    }
  };

  const cambiarTurno = () => {
    jugadorUno.setEstado();
    jugadorDos.setEstado();
  };

  const jugarPartida = (fila, columna) => {
    let jugadorEnTurno = seleccionarJugador();

    if (jugarTurno(jugadorEnTurno, fila, columna)) {
      cambiarTurno();
    }
  };

  const verificarJuego = () => {
    if (tablero.exiteGanador()) {
      return true;
    } else {
      return false;
    }
  };

  const verificarEmpate = () => {
    if (tablero.crearTablaDisplay().every(Boolean)) {
      return true;
    } else {
      return false;
    }
  };

  return {
    jugarPartida,
    verificarJuego,
    seleccionarJugador,
    verificarEmpate,
  };
})();

export { flujoJuego };
