class Flower {
  constructor(radialSegments = 5) {
    $('#flower').attr("width", $(window).width());
    $('#flower').attr("height", $(window).height());
    this.c = document.getElementById("flower");
    this.ctx = this.c.getContext("2d");
    this.ctx.strokeStyle = '#00FF00'
    this.originX = this.c.width / 2;
    this.originY = this.c.height / 2;
    this.radialSegments = radialSegments;
    this.radius = Math.min(
      Math.abs(this.originX - this.c.width),
      Math.abs(this.originY - this.c.height)
    )
    this.draw();
  }

  draw() {
    let theta, thetaInc, i, endX, endY;
    thetaInc = (2 * Math.PI) / this.radialSegments
    // this.ctx.moveTo(this.originX, this.originY);
    // this.ctx.bezierCurveTo(this.originX, this.originY, this.originX, this.originY, this.radius * Math.cos(0), this.radius * Math.sin(0));
    // this.ctx.stroke();
    for (i = 0; i < this.radialSegments; i++) {
      this.ctx.moveTo(this.originX, this.originY)
      theta = i * thetaInc;
      endX = this.originX + (this.radius * Math.cos(theta));
      endY = this.originY + (this.radius * Math.sin(theta));
      this.ctx.bezierCurveTo(endX, endY, endX, endY, endX, endY);
      this.ctx.stroke();
      // this.ctx.noStroke();
    }
    


  }

  getOriginX() {
    return this.c.width / 2;
  }
}

export default Flower