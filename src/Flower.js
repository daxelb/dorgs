class Flower {
  constructor() {
    this.element = document.getElementById('flower-canvas');
    // this.element.addEventListener();
  }

  go() {
    var c = document.getElementById("flower-canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
    ctx.stroke();
  }
}

export default Flower;
