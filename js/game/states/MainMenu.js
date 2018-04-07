'use strict';

var MainMenu = {
    create: function() {
        
        game.stage.backgroundColor = 0xffffff;

        this.startText = game.add.text(0, 8, 'Tap Anywhere to Start', {
            font: "32px Arial",
            fill: "#000",
            align: "center"
        });
        this.startText.x = (game.width / 2) - (this.startText.width / 2);
        this.startText.y = (game.height / 2) - (this.startText.height / 2);
    },
    update: function() {
        if (game.input.activePointer.justPressed()) {
            game.state.start('Exterior');
        }
    }
};