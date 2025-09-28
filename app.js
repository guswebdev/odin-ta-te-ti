
const flujoJuego = {};

function flujoDelJuego(){}

const jugarJuego = flujoDelJuego()

function createBoard() {
  const tabla = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const agregarJugada = (fila, columna, forma) => {
    tabla[fila][columna] = forma;
  };

  const mostrarTablero = () => {
    console.log("----------------");
    console.log(tabla[0]);
    console.log(tabla[1]);
    console.log(tabla[2]);
    console.log("----------------");
  };

  return { mostrarTablero, agregarJugada };
}
const tablero = createBoard();

//tablero.mostrarTablero();

tablero.agregarJugada(2, 1, "x");
tablero.agregarJugada(1, 0, "o");
tablero.agregarJugada(0, 0, "x");

//tablero.mostrarTablero();

function createPlayer(nombre, forma) {
  let fila = "";
  let columna = "";

  const getNombre = () => nombre;
  const setNombre = (nuevoNombre) => (nombre = nuevoNombre);

  function random(){
    return Math.floor(Math.random() * 3)
  }

  const hacerJugada = () => {
    fila = random()
    columna = random()
    return [fila,columna,forma]
  }

  return { getNombre, setNombre, hacerJugada };
}

const juan = createPlayer("juan", "x");
const pedro = createPlayer("pedro", "o");

console.log(juan.getNombre());
console.log(pedro.hacerJugada());
