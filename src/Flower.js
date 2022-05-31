class Flower {
  constructor(radialSegments) {
    $('#flower').attr("width", $(window).width());
    $('#flower').attr("height", $(window).height());
    this.a = 0.3;
    this.b = 1;
    this.a2 = 0.4;
    this.b2 = 0.4;
    this.radialSegments = 5;
    this.repetitions = 3;
    this.c = document.getElementById("flower");
    this.ctx = this.c.getContext("2d");
    this.originX = this.c.width / 2;
    this.originY = this.c.height / 2;
    this.radius = Math.min(
      Math.abs(this.originX - this.c.width),
      Math.abs(this.originY - this.c.height)
    )
    this.draw();
  }

  drawPetal(theta) {
    this.ctx.strokeStyle = '#00FF00';
    // first stroke
    this.ctx.moveTo(this.originX, this.originY);
    this.ctx.bezierCurveTo(
      this.bezierX(theta, this.a, this.radius * this.a2),
      this.bezierY(theta, this.a, this.radius * this.a2),
      this.bezierX(theta, this.b, this.radius * this.b2),
      this.bezierY(theta, this.b, this.radius * this.b2),
      this.bezierX(theta),
      this.bezierY(theta)
    );
    // mirror stroke
    this.ctx.moveTo(this.originX, this.originY);
    this.ctx.bezierCurveTo(
      this.bezierX(theta, -this.a, this.radius * this.a2),
      this.bezierY(theta, -this.a, this.radius * this.a2),
      this.bezierX(theta, -this.b, this.radius * this.b2),
      this.bezierY(theta, -this.b, this.radius * this.b2),
      this.bezierX(theta),
      this.bezierY(theta)
    );
    this.ctx.stroke();
    var grd = this.ctx.createRadialGradient(this.originX, this.originY, this.radius/5, this.originX, this.originY, this.radius)
    // gradient color should be also a function of which repetition we are on
    // that way we can make the "leaves" green
    // but we can make the flowers colorful
    grd.addColorStop(0, '#005500');
    grd.addColorStop(1, '#00aa00');
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }

  bezierX(theta, offset = 0, radius = this.radius) {
    return this.originX + (radius * Math.cos(theta + offset)); 
  }

  bezierY(theta, offset = 0, radius = this.radius) {
    return this.originY + (radius * Math.sin(theta + offset))
  }

  draw() {
    let theta, i, segmentOffset, radiusDec, j, repOffset;
    segmentOffset = ((2 * Math.PI) / this.radialSegments);
    // symmetry is best when the divisor is 2
    repOffset = ((2 * Math.PI) / 2);
    // might want to adjust how quickly radius decreases
    // controlled by gene?
    radiusDec = this.radius / (this.repetitions);
    for (j = 0; j < this.repetitions; j++) {
      for (i = 0; i < this.radialSegments; i++) {
        theta = (i * segmentOffset) + (j * repOffset);
        this.drawPetal(theta)
      }
      this.radius -= radiusDec;
    }
  }

  getOriginX() {
    return this.c.width / 2;
  }
}

export default Flower