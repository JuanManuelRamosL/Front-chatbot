/* const problemasDeProgramacion = [
  {
    problema: "Encuentra el número más bajo en un array de números.",
    dificultad: "Fácil",
    ej: `minimo([3, 1, 7, 2, 5]) ➞ 1`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario([3, 1, 7, 2, 5]) === 1;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que invierta una cadena de texto.",
    dificultad: "Fácil",
    ej: `invertir("hola") ➞ "aloh"`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario("hola") === "aloh";
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Devuelve 'true' si una palabra es un palíndromo.",
    dificultad: "Intermedio",
    ej: `esPalindromo("radar") ➞ true`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario("radar") === true;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Encuentra el número que más se repite en un array.",
    dificultad: "Intermedio",
    ej: `masFrecuente([1, 2, 3, 2, 4, 2, 5]) ➞ 2`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario([1, 2, 3, 2, 4, 2, 5]) === 2;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que calcule la suma de los primeros 'n' números naturales.",
    dificultad: "Fácil",
    ej: `sumaNaturales(5) ➞ 15`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario(5) === 15;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Encuentra el subarray contiguo de mayor suma en un array de enteros.",
    dificultad: "Difícil",
    ej: `maxSumaSubarray([-2,1,-3,4,-1,2,1,-5,4]) ➞ 6`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Convierte un número romano a un número entero.",
    dificultad: "Intermedio",
    ej: `romanoAEntero("IX") ➞ 9`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario("IX") === 9;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Dada una matriz de enteros, devuelve la transpuesta de la matriz.",
    dificultad: "Intermedio",
    ej: `transpuesta([[1,2,3],[4,5,6]]) ➞ [[1,4],[2,5],[3,6]]`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return JSON.stringify(funcionUsuario([[1, 2, 3], [4, 5, 6]])) === JSON.stringify([[1, 4], [2, 5], [3, 6]]);
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que devuelva los números primos hasta un número dado.",
    dificultad: "Intermedio",
    ej: `numerosPrimos(10) ➞ [2, 3, 5, 7]`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return JSON.stringify(funcionUsuario(10)) === JSON.stringify([2, 3, 5, 7]);
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Calcula el factorial de un número dado.",
    dificultad: "Fácil",
    ej: `factorial(5) ➞ 120`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario(5) === 120;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Devuelve el elemento más común en un array de strings.",
    dificultad: "Intermedio",
    ej: `masComun(["a", "b", "a", "c", "a", "b"]) ➞ "a"`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario(["a", "b", "a", "c", "a", "b"]) === "a";
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que devuelva el enésimo número de Fibonacci.",
    dificultad: "Intermedio",
    ej: `fibonacci(6) ➞ 8`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = eval(`(${respuestaUsuario})`);
        return funcionUsuario(6) === 8;
      } catch (error) {
        return false;
      }
    },
  },
];

export default problemasDeProgramacion;
 */

const problemasDeProgramacion = [
  {
    problema: "Encuentra el número más bajo en un array de números.",
    dificultad: "Fácil",
    ej: `minimo([3, 1, 7, 2, 5]) ➞ 1`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario([3, 1, 7, 2, 5]) === 1;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que invierta una cadena de texto.",
    dificultad: "Fácil",
    ej: `invertir("hola") ➞ "aloh"`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario("hola") === "aloh";
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Devuelve 'true' si una palabra es un palíndromo.",
    dificultad: "Intermedio",
    ej: `esPalindromo("radar") ➞ true`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario("radar") === true;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Encuentra el número que más se repite en un array.",
    dificultad: "Intermedio",
    ej: `masFrecuente([1, 2, 3, 2, 4, 2, 5]) ➞ 2`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario([1, 2, 3, 2, 4, 2, 5]) === 2;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que calcule la suma de los primeros 'n' números naturales.",
    dificultad: "Fácil",
    ej: `sumaNaturales(5) ➞ 15`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario(5) === 15;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Encuentra el subarray contiguo de mayor suma en un array de enteros.",
    dificultad: "Difícil",
    ej: `maxSumaSubarray([-2,1,-3,4,-1,2,1,-5,4]) ➞ 6`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Convierte un número romano a un número entero.",
    dificultad: "Intermedio",
    ej: `romanoAEntero("IX") ➞ 9`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario("IX") === 9;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Dada una matriz de enteros, devuelve la transpuesta de la matriz.",
    dificultad: "Intermedio",
    ej: `transpuesta([[1,2,3],[4,5,6]]) ➞ [[1,4],[2,5],[3,6]]`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return JSON.stringify(funcionUsuario([[1, 2, 3], [4, 5, 6]])) === JSON.stringify([[1, 4], [2, 5], [3, 6]]);
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que devuelva los números primos hasta un número dado.",
    dificultad: "Intermedio",
    ej: `numerosPrimos(10) ➞ [2, 3, 5, 7]`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return JSON.stringify(funcionUsuario(10)) === JSON.stringify([2, 3, 5, 7]);
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Calcula el factorial de un número dado.",
    dificultad: "Fácil",
    ej: `factorial(5) ➞ 120`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario(5) === 120;
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Devuelve el elemento más común en un array de strings.",
    dificultad: "Intermedio",
    ej: `masComun(["a", "b", "a", "c", "a", "b"]) ➞ "a"`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario(["a", "b", "a", "c", "a", "b"]) === "a";
      } catch (error) {
        return false;
      }
    },
  },
  {
    problema: "Escribe una función que devuelva el enésimo número de Fibonacci.",
    dificultad: "Intermedio",
    ej: `fibonacci(6) ➞ 8`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario(6) === 8;
      } catch (error) {
        return false;
      }
    },
  }, 
  {
    problema : "Escribi una funcion que se le pase por parametro un numero que sera el numero de años en humano y debes devolver un arry donde el peimer valor sea el año en humano el 2 sea el año en gato y el 3 en perro año gato 1 = 15 año 2 gato = 9 resto de años gato = 4",
    dificultad:"Difícil",
    ej:`(1) ➞[1,15,15] ,(10)➞ [10,56,64]`,
    test: (respuestaUsuario) => {
      try {
        const funcionUsuario = new Function('return ' + respuestaUsuario)();
        return funcionUsuario(10) ===  JSON.stringify([10,56,64]);
      } catch (error) {
        return false;
      }
    },
  }
];

export default problemasDeProgramacion;

