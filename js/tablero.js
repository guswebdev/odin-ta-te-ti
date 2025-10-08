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

    for (let fila of tabla) {
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

export { tablero };
