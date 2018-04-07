'use strict';

this.ready = false;

var Preload = {
    preload: function() {

        game.load.image('grass', 'assets/images/grass.png');
        game.load.image('wood', 'assets/images/wood.png');
        game.load.image('door', 'assets/images/door.png');

        game.load.image('player', 'assets/images/cube.png');

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    update: function() {
        if (this.ready === true) {
            game.state.start('MainMenu');
        }
    },
    onLoadComplete: function() {
        this.ready = true;
    }
};