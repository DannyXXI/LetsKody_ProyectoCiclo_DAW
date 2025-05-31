// interfaz que se usa para representar un juego
export interface Juego {
  nombre: string;
  numero: number;
  claseCSS: string;
}

// objeto que contiene los juegos organizados por materia ()
// la clave para obtenerlos sera el nombre de la materia y el valor devuelto el array de juegos
export const juegosPorMateria: Record<string, Juego[]> = {
  geografia: [
    { nombre: "Euro-Banderas", numero: 1, claseCSS: "geografia" }
  ],
  matematicas: [
    { nombre: "Numinario", numero: 1, claseCSS: "matematicas" }
  ]
};

// objeto para mostrar el nombre de la materia en el menú (si tienen tildes)
export const nombreVisibleMateria: Record<string, string> = {
  geografia: "Geografía",
  matematicas: "Matemáticas"
};

// esto permite añadir una lista variable de juegos en cada categoria o más categorias a futuro