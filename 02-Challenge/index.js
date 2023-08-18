const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

const userPrompts = [
  {
    type: "input",
    name: "text",
    message: "Enter up to 3 characters for your logo.",
  },
  {
    type: "input",
    name: "textColor",
    message: "Please enter a color for the text.",
  },
  {
    type: "list",
    name: "userShape",
    message: "Please select a shape as your background.",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Please enter a color for the shape.",
  },
];

class Svg {
  constructor() {
    this.userText = '';
    this.userShape = '';
  }

  render() {
    if (!this.userShape) {
      return ''; 
    }
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.userShape}${this.userText}</svg>`;
  }

  setUserText(text, color) {
    this.userText = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setUserShape(shape) {
    this.userShape = shape.render();
  }
}

function writeToFile(filename, data) {
  fs.writeFile(filename, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Logo generated successfully.");
  });
}

async function init() {
  console.log("Starting init");
  const svg_file = "logo.svg";

  const userAnswers = await inquirer.prompt(userPrompts);

  const inputedText = userAnswers.text.slice(0, 3);

  const userSelectedTextColor = userAnswers.textColor;
  const userSelectedShapeColor = userAnswers.shapeColor;
  const userSelectedShape = userAnswers.userShape.toLowerCase(); 

  let user_shape;
  if (userSelectedShape === "square") {
    user_shape = new Square();
    console.log("User selected Square shape");
  } else if (userSelectedShape === "circle") {
    user_shape = new Circle();
    console.log("User selected Circle shape");
  } else if (userSelectedShape === "triangle") {
    user_shape = new Triangle();
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape!");
  }
  user_shape.setColor(userSelectedShapeColor); 

  const yourSvgObject = new Svg();
  yourSvgObject.setUserText(inputedText, userSelectedTextColor);
  yourSvgObject.setUserShape(user_shape);
  const svgString = yourSvgObject.render();

  console.log("Displaying shape:\n\n" + svgString);

  console.log("Generated logo.svg!");
  writeToFile(svg_file, svgString);
}

init();

    





    