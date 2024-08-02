const questions = [
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nlet a = 5;\nlet b = 10;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nlet result = add(a, b);\n\nconsole.log(result);`,
    options: [
      { id: "option1", text: "5" },
      { id: "option2", text: "10" },
      { id: "option3", text: "15" },
    ],
    correctAnswer: "15"  // Respuesta correcta
  },
  {
    question: `¿Qué valor imprime el siguiente código JavaScript?\n\nfunction mysteryFunction(num) {\n  if (num < 2) return num;\n  return mysteryFunction(num - 1) + mysteryFunction(num - 2);\n}\n\nlet result = mysteryFunction(5);\n\nconsole.log(result);`,
    options: [
      { id: "option1", text: "5" },
      { id: "option2", text: "8" },
      { id: "option3", text: "10" },
    ],
    correctAnswer: "8"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nconst array = [1, 2, 3, 4, 5];\n\nconst doubled = array.map(x => x * 2);\n\nconsole.log(doubled);`,
    options: [
      { id: "option1", text: "[2, 4, 6, 8, 10]" },
      { id: "option2", text: "[1, 2, 3, 4, 5]" },
      { id: "option3", text: "[2, 4, 6, 8, 10, 12]" },
    ],
    correctAnswer: "[2, 4, 6, 8, 10]"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nlet counter = 0;\n\nconst increment = () => {\n  counter += 1;\n};\n\nincrement();\nincrement();\n\nconsole.log(counter);`,
    options: [
      { id: "option1", text: "0" },
      { id: "option2", text: "1" },
      { id: "option3", text: "2" },
    ],
    correctAnswer: "2"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nconst foo = () => console.log("Foo");\nconst bar = () => console.log("Bar");\n\nfoo();\nsetTimeout(bar, 0);\nconsole.log("Baz");`,
    options: [
      { id: "option1", text: "Foo Baz Bar" },
      { id: "option2", text: "Foo Bar Baz" },
      { id: "option3", text: "Baz Foo Bar" },
      { id: "option4", text: "Bar Foo Baz" },
    ],
    correctAnswer: "Foo Baz Bar"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nlet numbers = [1, 2, 3, 4, 5];\nlet total = 0;\n\nfor (let i = 0; i < numbers.length; i++) {\n  if (i % 2 === 0) {\n    total += numbers[i];\n  }\n}\n\nconsole.log(total);`,
    options: [
      { id: "option1", text: "9" },
      { id: "option2", text: "6" },
      { id: "option3", text: "15" },
      { id: "option4", text: "10" },
    ],
    correctAnswer: "9"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nconst fruits = ["apple", "banana", "cherry"];\nfruits.push("date");\nfruits.unshift("elderberry");\n\nconsole.log(fruits);`,
    options: [
      { id: "option1", text: '["apple", "banana", "cherry", "date", "elderberry"]' },
      { id: "option2", text: '["elderberry", "apple", "banana", "cherry", "date"]' },
      { id: "option3", text: '["date", "elderberry", "apple", "banana", "cherry"]' },
      { id: "option4", text: '["banana", "cherry", "date", "elderberry", "apple"]' },
    ],
    correctAnswer: '["elderberry", "apple", "banana", "cherry", "date"]'  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst counter = outer();\ncounter();\ncounter();\ncounter();`,
    options: [
      { id: "option1", text: "0 1 2" },
      { id: "option2", text: "1 1 1" },
      { id: "option3", text: "1 2 3" },
      { id: "option4", text: "1 2 2" },
    ],
    correctAnswer: "1 2 3"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nconst numbers = [1, 2, 3, 4, 5];\nconst result = numbers.filter(num => num % 2 === 0).map(num => num * 2);\n\nconsole.log(result);`,
    options: [
      { id: "option1", text: "[2, 4, 6, 8, 10]" },
      { id: "option2", text: "[4, 8]" },
      { id: "option3", text: "[1, 2, 3, 4, 5]" },
      { id: "option4", text: "[2, 4]" }
    ],
    correctAnswer: "[4, 8]"  // Respuesta correcta
  },
  {
    question: `¿Qué imprime el siguiente código JavaScript?\n\nfunction asyncTask() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('Task completed');\n    }, 1000);\n  });\n}\n\nasync function run() {\n  console.log('Start');\n  const result = await asyncTask();\n  console.log(result);\n  console.log('End');\n}\n\nrun();`,
    options: [
      { id: "option1", text: "Start\nTask completed\nEnd" },
      { id: "option2", text: "Task completed\nStart\nEnd" },
      { id: "option3", text: "Start\nEnd\nTask completed" },
      { id: "option4", text: "End\nStart\nTask completed" }
    ],
    correctAnswer: "Start\nTask completed\nEnd"  // Respuesta correcta
  }
];

export default questions;
