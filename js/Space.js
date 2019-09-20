class Space {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `space-${x}-${y}`;
    this.checker = null;
    this.diameter = 76;
    this.radius = this.diameter/2;
  }

  // checks if space has an associated checker to find its owner
  get owner() {
    if (this.checker === null) {
      return null;
    } else {
      return this.checker.owner;
    }
  }
  // create spaces
  drawSVGSpace() {
    const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    svgSpace.setAttributeNS(null, "id", this.id);
    svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "r", this.radius - 8);
    svgSpace.setAttributeNS(null, "fill", "black");
    svgSpace.setAttributeNS(null, "stroke", "none");

    document.getElementById('mask').appendChild(svgSpace);
  }

  // updates space to reflect a checker has been dropped into it
   mark(checker) {
    this.checker = checker;
  }
}
