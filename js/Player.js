class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.checkers = this.createCheckers(21);
  }

  // Creates checker objects for player
  createCheckers(num) {
    const checkers = [];
    for (let i = 0; i < num; i++) {
      let checker = new Checker(this, i);
      checkers.push(checker);
    }
    return checkers;
  }

  get unusedCheckers() {
    return this.checkers.filter(checker => !checker.dropped);
  }

  get activeChecker() {
    return this.unusedCheckers[0];
  }

  checkCheckers() {
    return this.unusedCheckers.length == 0 ? false : true;
  }
}
