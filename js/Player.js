class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.checkers = this.createCheckers(21);
  }

  // creates checker objects for player, returns array of checkers
  createCheckers(num) {
    const checkers = [];
    for (let i = 0; i < num; i++) {
      let checker = new Checker(this, i);
      checkers.push(checker);
    }
    return checkers;
  }
  // get remainig available checkers for player
  get unusedCheckers() {
    return this.checkers.filter(checker => !checker.dropped);
  }
  // retrieve first unused checker from array
  get activeChecker() {
    return this.unusedCheckers[0];
  }
  // check if there are available checkers
  checkCheckers() {
    return this.unusedCheckers.length === 0 ? false : true;
  }
}
