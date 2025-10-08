export function createPlayer(nombre, forma, estado) {
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
