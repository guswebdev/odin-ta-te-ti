const tablero = (function () {
  let tabla = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function rotarMatriz90Grados(matrizOriginal) {
    const numFilas = matrizOriginal.length;
    const numColumnas = matrizOriginal[0].length;

    // 1. Crear la matriz de destino con las dimensiones transponiendo
    const matrizRotada = new Array(numColumnas);
    for (let i = 0; i < numColumnas; i++) {
      matrizRotada[i] = new Array(numFilas);
    }

    // 2. Iterar y transponer los elementos
    for (let fila = 0; fila < numFilas; fila++) {
      for (let columna = 0; columna < numColumnas; columna++) {
        // 3. Asignar el elemento intercambiado
        matrizRotada[columna][fila] = matrizOriginal[fila][columna];
      }
    }

    return matrizRotada;
  }

  const obtenerDiagonales = () => {
    const diagonalPrincipal = [];

    for (let i = 0; i < tabla.length; i++) {
      diagonalPrincipal.push(tabla[i][i]);
    }

    const diagonalSecundaria = [];
    const dimension = tabla.length;

    for (let i = 0; i < dimension; i++) {
      diagonalSecundaria.push(tabla[i][dimension - 1 - i]);
    }

    return [diagonalPrincipal, diagonalSecundaria];
  };

  const verificarLineasIguales = (tabla) => {
    let verificacion = false;

    for (fila of tabla) {
      if (fila[0] != "") {
        if (fila.every((val) => val === fila[0])) {
          verificacion = true;
        }
      }
    }

    return verificacion;
  };

  const verificarFilasIguales = () => {
    return verificarLineasIguales(tabla);
  };

  const verificarColumnasIgules = () => {
    let nuevaTabla = rotarMatriz90Grados(tabla);
    return verificarLineasIguales(nuevaTabla);
  };

  const verificarDiagonalesIguales = () => {
    return verificarLineasIguales(obtenerDiagonales());
  };

  const exiteGanador = () => {
    if (
      verificarFilasIguales() ||
      verificarColumnasIgules() ||
      verificarDiagonalesIguales()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const verificarCasilla = (fila, columna) => {
    //verificar si hay un dato, si esta vacio ahi recien agregar jugada
    if (tabla[fila][columna] === "") {
      return true;
    }
  };

  const agregarJugada = (fila, columna, forma) => {
    let verificacion = false;
    if (verificarCasilla(fila, columna)) {
      tabla[fila][columna] = forma;
      verificacion = true;
    }
    return verificacion;
  };

  const mostrarTablero = () => {
    console.log("----------------");
    console.log(tabla[0]);
    console.log(tabla[1]);
    console.log(tabla[2]);
    console.log("----------------");
  };

  const crearTablaDisplay = () => {
    return [...tabla[0], ...tabla[1], ...tabla[2]];
  };

  const reiniciarTabla = () => {
    tabla = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  return {
    mostrarTablero,
    agregarJugada,
    exiteGanador,
    crearTablaDisplay,
    reiniciarTabla,
  };
})();

function createPlayer(nombre, forma, estado) {
  const getNombre = () => nombre;
  const getMarcador = () => forma;
  const getEstado = () => estado;
  const setNombre = (nuevoNombre) => (nombre = nuevoNombre);
  const setEstado = (nuevoEstado) => {
    if (typeof nuevoEstado === "boolean") {
      estado = nuevoEstado;
    } else {
      estado = !estado;
    }
  };

  const hacerJugada = (fila, columna) => {
    return [fila, columna, forma];
  };

  return {
    getNombre,
    getEstado,
    getMarcador,
    setNombre,
    setEstado,
    hacerJugada,
  };
}

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
    $jugadorGanador.textContent = `El Ganador es ${ganador.getNombre()}`;
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
    $form,
    $sectorJuego,
  };
})();

const flujoJuego = (function () {
  let jugadorUno;
  let jugadorDos;

  function submit(e) {
    e.preventDefault();

    const formData = new FormData(this);

    jugadorUno = createPlayer(
      formData.get("nombre-j1"),
      formData.get("marcador-j1"),
      true
    );
    jugadorDos = createPlayer(
      formData.get("nombre-j2"),
      formData.get("marcador-j2"),
      false
    );

    controlarDisplay.desabilitarFormulario();
    controlarDisplay.renderTablero();
    controlarDisplay.actualizarTurnoJugador();
    controlarDisplay.$sectorJuego.classList.remove("d-none");
  }

  controlarDisplay.$form.addEventListener("submit", submit);

  function click(e) {
    if (e.target.classList.contains("casilla")) {
      let jugadorEnTurno = seleccionarJugador();
      jugarPartida(e.target.dataset.fila, e.target.dataset.columna);
      controlarDisplay.actualizarTurnoJugador();
      controlarDisplay.limpiarTabla();
      controlarDisplay.renderTablero();
      if (verificarJuego()) {
        controlarDisplay.actualizarTurnoJugador("-");
        controlarDisplay.anunciarGanador(jugadorEnTurno);
        controlarDisplay.desabilitarCasillas();
      }
    }

    if (e.target.classList.contains("btn-juego-nuevo")) {
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

  const repetirTurno = (jugador, fila, columna) => {
    let condicion = jugarTurno(jugador, fila, columna);

    while (!condicion) {
      condicion = jugarTurno(jugador, fila, columna);
    }

    return condicion;
  };

  const jugarPartida = (fila, columna) => {
    let jugadorEnTurno = seleccionarJugador();
    //console.log(jugadorEnTurno);

    if (jugarTurno(jugadorEnTurno, fila, columna)) {
      cambiarTurno();
    } else {
      if (repetirTurno(jugadorEnTurno, fila, columna)) {
        cambiarTurno();
      }
    }
  };

  const verificarJuego = () => {
    if (tablero.exiteGanador()) {
      return true;
    } else {
      return false;
    }
  };

  return {
    jugarPartida,
    verificarJuego,
    seleccionarJugador,
  };
})();
