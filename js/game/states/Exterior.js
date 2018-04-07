'use strict';

var Exterior = {
    preload: function() {
        game.world.setBounds(0, 0, 1024, 512);
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.5, 0.2);
        this.cursors = game.input.keyboard.createCursorKeys();
    },
    create: function() {

        game.stage.backgroundColor = 0x42944a;
        game.camera.flash('#000000', 1000);

        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        this.floorGroup = game.add.group();
        this.doorGroup = game.add.group();

        // create grass tile
        var grassTile;
        for (var x = 0; x < 512; x += 36) {
            for (var y = 0; y < 512; y += 36) {
                grassTile = game.add.isoSprite(x, y, 0, 'grass', 0, this.floorGroup);
                grassTile.anchor.set(0.5);
            }
        }

        this.door = game.add.isoSprite(256, 0, 0, 'door', 0, this.doorGroup);
        this.door.anchor.set(0.5);

        game.physics.isoArcade.enable(this.door);
        this.door.body.collideWorldBounds = true;
        this.door.body.immovable = true;

        this.player = game.add.isoSprite(256, 20, 0, 'player', 0, this.obstacleGroup);
        this.player.tint = 0x86bfda;
        this.player.scale.setTo(0.5);
        this.player.anchor.set(0.5);

        game.physics.isoArcade.enable(this.player);
        this.player.body.collideWorldBounds = true;

        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        game.camera.follow(this.player);
        
        console.log('Exterior loaded');

    },
    update: function() {

        var speed = 200;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.x = -speed;
            this.player.body.velocity.y = -speed;

        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.x = speed;
            this.player.body.velocity.y = speed;

        } else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -speed;
            this.player.body.velocity.y = speed;

        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = speed;
            this.player.body.velocity.y = -speed;

        } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.player.body.velocity.x = speed;
            this.player.body.velocity.y = 0;

        } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = speed;

        } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.player.body.velocity.x = -speed;
            this.player.body.velocity.y = 0;

        } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -speed;

        } else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        game.physics.isoArcade.overlap(this.door, this.player, this.loadState);
        game.iso.topologicalSort(this.doorGroup);

    },
    loadState: function() {
        game.state.start('Interior');
    }
};