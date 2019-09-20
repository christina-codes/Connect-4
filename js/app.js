const beginGame = document.querySelector('#begin-game');
const resetGame = document.querySelector('#reset');
const playArea = document.querySelector('#play-area');

const game = new Game();

beginGame.addEventListener('click', () => {
  game.startGame();
  beginGame.style.display = 'none';
  playArea.style.opacity = '1';
});

resetGame.addEventListener('click', (e) => {
  e.target.style.display = 'none';
  location.reload();
})

document.addEventListener('keydown', (e) => {
  game.handleKeyDown(e);
});
