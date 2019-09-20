class Checker {
  constructor(owner, index) {
    this.owner = owner;
    this.id = `checker-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }
}
