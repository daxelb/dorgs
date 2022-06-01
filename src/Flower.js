import { random, flowerGeneNames } from "./constants.js"
import {geno as generateGeno} from './utils/geno.js';
import { uniform, integer, hslToRgb, rgbToHsl } from './utils/pheno.js';
class Flower {
  constructor(geno = null, id=1) {
    if (!geno)
      geno = generateGeno(flowerGeneNames)
    this.geno = geno;

    $(`#flower${id}`).attr("width", $(window).width()/3);
    $(`#flower${id}`).attr("height", $(window).width()/3);
    
    // setting phenotype values
    this.segments = integer(geno.segments.val, 1, 5);
    this.repetitions = integer(geno.repetitions.val, 5, 70);
    this.repOffset = uniform(geno.repOffset, 0, Math.PI)
    this.p1Offset = uniform(geno.p1Offset.val, 0, 1);
    this.p2Offset = uniform(geno.p2Offset.val, 0, 1);
    this.p1RadiusCoeff = uniform(geno.p1RadiusCoeff.val, 0, 1);
    this.p2RadiusCoeff = uniform(geno.p2RadiusCoeff.val, 0, 1);
    console.log(geno.targetR.val, geno.targetG.val, geno.targetB.val);
    
    const startHue = rgbToHsl(geno.startR.val, geno.startG.val, geno.startB.val)[0]
    const targetHue = rgbToHsl(geno.targetR.val, geno.targetG.val, geno.targetB.val)[0]
    this.rgb = hslToRgb(startHue, 0.2, 0.5);
    this.rgbTarget = hslToRgb(targetHue, 1, 0.5)

    // constants
    this.c = document.getElementById(`flower${id}`);
    this.ctx = this.c.getContext("2d");
    this.ctx.strokeStyle = `#00aa00`; // green stroke
    this.originX = this.c.width / 2;
    this.originY = this.c.height / 2;
    this.radius = Math.min(
      Math.abs(this.originX - this.c.width),
      Math.abs(this.originY - this.c.height)
    )

    // draw it!
    this.draw();
  }

  drawPetal(theta) {
    // first stroke
    this.ctx.beginPath();
    this.ctx.moveTo(this.originX, this.originY);
    this.ctx.bezierCurveTo(
      this.bezierX(theta, this.p1Offset, this.radius * this.p1RadiusCoeff),
      this.bezierY(theta, this.p1Offset, this.radius * this.p1RadiusCoeff),
      this.bezierX(theta, this.p2Offset, this.radius * this.p2RadiusCoeff),
      this.bezierY(theta, this.p2Offset, this.radius * this.p2RadiusCoeff),
      this.bezierX(theta),
      this.bezierY(theta)
    );
    // mirror stroke
    this.ctx.moveTo(this.originX, this.originY);
    this.ctx.bezierCurveTo(
      this.bezierX(theta, -this.p1Offset, this.radius * this.p1RadiusCoeff),
      this.bezierY(theta, -this.p1Offset, this.radius * this.p1RadiusCoeff),
      this.bezierX(theta, -this.p2Offset, this.radius * this.p2RadiusCoeff),
      this.bezierY(theta, -this.p2Offset, this.radius * this.p2RadiusCoeff),
      this.bezierX(theta),
      this.bezierY(theta)
    );
    this.ctx.stroke();
    this.ctx.fillStyle = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
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
    segmentOffset = ((2 * Math.PI) / this.segments);
    // might want to adjust how quickly radius decreases
    // controlled by gene?
    radiusDec = this.radius / this.repetitions;
    for (i = 0; i < this.repetitions; i++) {
      for (j = 0; j < this.segments; j++) {
        theta = (j * segmentOffset) + (i * this.repOffset);
        this.drawPetal(theta)
      }
      this.radius -= radiusDec;
      for (let k = 0; k < 3; k++) {
        this.rgb[k] += (this.rgbTarget[k] - this.rgb[k]) / this.repetitions;
      }
    }
  }

  getOriginX() {
    return this.c.width / 2;
  }
}

export default Flower