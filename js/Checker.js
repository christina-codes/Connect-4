class Checker {
  constructor(owner, index) {
    this.owner = owner;
    this.id = `checker-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }
  // getter methods
  get htmlChecker() {
    return document.getElementById(this.id);
  }

  // gets left offset of html element
  get offsetLeft() {
    return this.htmlChecker.offsetLeft;
  }

  // draw checkers
  drawHTMLChecker() {
    const checker = document.createElement('div');
    document.getElementById('game-board-underlay').appendChild(checker);
    checker.setAttribute('id', this.id);
    checker.className = 'checker';
    checker.style.backgroundColor = this.owner.color;
  }
  // checker movement functions
  moveLeft() {
    if (this.columnLocation > 0) {
      this.htmlChecker.style.left = this.offsetLeft - 76;
      this.columnLocation -= 1;
    }
  }
  moveRight(columns) {
    if (this.columnLocation < columns - 1) {
      this.htmlChecker.style.left = this.offsetLeft + 76;
      this.columnLocation += 1;
    }
  }

  // drops html checker into targeted board space
  drop(target, reset) {
    this.dropped = true;
    $(this.htmlChecker).animate({
      top: (target.y * target.diameter)
    }, 750, 'easeOutBounce', reset);
  }
}
