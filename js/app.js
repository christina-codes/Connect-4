const beginGame = document.querySelector('#begin-game');
const resetGame = document.querySelector('#reset');
const playArea = document.querySelector('#play-area');

const game = new Game();

beginGame.addEventListener('click', () => {
  beginGame.style.display = 'none';
  playArea.style.opacity = '1';
});
