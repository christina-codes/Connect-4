const beginGame = document.querySelector('#begin-game');
const resetGame = document.querySelector('#reset');
const title = document.querySelector('#title');

const game = new Game();

beginGame.addEventListener('click', () => {
  game.startGame();
  $('#begin-game').fadeOut();
  $('#play-area').fadeTo('slow', 1);
  title.className = 'smaller';
});

resetGame.addEventListener('click', (e) => {
  e.target.style.display = 'none';
  location.reload();
})

document.addEventListener('keydown', (e) => {
  game.handleKeyDown(e);
});
