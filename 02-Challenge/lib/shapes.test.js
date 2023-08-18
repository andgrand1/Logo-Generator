const { Triangle } = require('./shapes.js'); 
const { Square } = require('./shapes.js');
const { Circle } = require('./shapes.js');

describe('Triangle Class', () => {
  it('renders triangle shape with correct color', () => {
    const shape = new Triangle();
    shape.setColor("blue");
    const expectedRenderedTriangle = '<polygon points="0,200 300,200 150,0" fill="blue"></polygon>';
    expect(shape.render()).toEqual(expectedRenderedTriangle);
  });
});

describe('Circle Class', () => {
    it('renders circle shape with correct color', () => {
        const shape = new Circle();
        shape.setColor("red");
        const expectedRenderedCircle = '<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="red"></circle>';
        expect(shape.render()).toEqual(expectedRenderedCircle);
    })
});

describe('Square Class', () => {
    it('renders square shape with correct color', () => {
        const shape = new Square();
        shape.setColor("black");
        const expectedRenderedSquare = '<rect x="50" height="200" width="200" fill="black"></rect>';
        expect(shape.render()).toEqual(expectedRenderedSquare);
    })
})
