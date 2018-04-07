var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('MainMenu', MainMenu);
game.state.add('Exterior', Exterior);
game.state.add('Interior', Interior);

game.state.start('Boot');