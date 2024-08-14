const questionsPY = [
    {
      question: `¿Qué imprime el siguiente código Python?\n\ndef invertir_cadena(cadena):\n    return cadena[::-1]\n\nresultado = invertir_cadena("hola mundo")\n\nprint(resultado)`,
      options: [
        { id: "option1", text: "odnum aloh" },
        { id: "option2", text: "hola mundo" },
        { id: "option3", text: "odnum aloH" },
      ],
      correctAnswer: "odnum aloh", // Respuesta correcta
    },
    {
      question: `¿Qué valor devuelve el siguiente código Python?\n\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n\nresultado = factorial(5)\n\nprint(resultado)`,
      options: [
        { id: "option1", text: "120" },
        { id: "option2", text: "24" },
        { id: "option3", text: "5" },
      ],
      correctAnswer: "120", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\nlista = [3, 6, 9, 12, 15]\n\nnueva_lista = [x // 3 for x in lista]\n\nprint(nueva_lista)`,
      options: [
        { id: "option1", text: "[1, 2, 3, 4, 5]" },
        { id: "option2", text: "[3, 6, 9, 12, 15]" },
        { id: "option3", text: "[0, 1, 2, 3, 4]" },
      ],
      correctAnswer: "[1, 2, 3, 4, 5]", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\ncadena = "abacabadabacaba"\nletras_unicas = [letra for letra in cadena if cadena.count(letra) == 1]\n\nprint(letras_unicas)`,
      options: [
        { id: "option1", text: "['d']" },
        { id: "option2", text: "['a', 'b', 'c', 'd']" },
        { id: "option3", text: "[]" },
      ],
      correctAnswer: "['d']", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\ndiccionario = {'a': 1, 'b': 2, 'c': 3}\n\nfor clave, valor in diccionario.items():\n    print(clave, valor)`,
      options: [
        { id: "option1", text: "a 1\nb 2\nc 3" },
        { id: "option2", text: "1 a\n2 b\n3 c" },
        { id: "option3", text: "a: 1, b: 2, c: 3" },
      ],
      correctAnswer: "a 1\nb 2\nc 3", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\ndef es_palindromo(cadena):\n    return cadena == cadena[::-1]\n\nresultado = es_palindromo("radar")\n\nprint(resultado)`,
      options: [
        { id: "option1", text: "True" },
        { id: "option2", text: "False" },
        { id: "option3", text: "Error" },
      ],
      correctAnswer: "True", // Respuesta correcta
    },
    {
      question: `¿Qué valor imprime el siguiente código Python?\n\na = [1, 2, 3]\nb = a\nb.append(4)\n\nprint(a)`,
      options: [
        { id: "option1", text: "[1, 2, 3]" },
        { id: "option2", text: "[1, 2, 3, 4]" },
        { id: "option3", text: "Error" },
      ],
      correctAnswer: "[1, 2, 3, 4]", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\nnumeros = [10, 20, 30, 40, 50]\nresultado = sum(numeros[:3])\n\nprint(resultado)`,
      options: [
        { id: "option1", text: "60" },
        { id: "option2", text: "100" },
        { id: "option3", text: "150" },
      ],
      correctAnswer: "60", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\nfrom math import sqrt\n\nnumero = 16\nraiz = sqrt(numero)\n\nprint(raiz)`,
      options: [
        { id: "option1", text: "4.0" },
        { id: "option2", text: "8.0" },
        { id: "option3", text: "16.0" },
      ],
      correctAnswer: "4.0", // Respuesta correcta
    },
    {
      question: `¿Qué imprime el siguiente código Python?\n\nfrase = "Hola Mundo"\nresultado = frase.lower().replace("o", "a")\n\nprint(resultado)`,
      options: [
        { id: "option1", text: "hala munda" },
        { id: "option2", text: "Hola Mundo" },
        { id: "option3", text: "hala mundo" },
      ],
      correctAnswer: "hala munda", // Respuesta correcta
    }
  ];
  export default questionsPY