
export class BuildingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BuildingScene' });
    this.cursors = null;
    this.player = null;
    this.showDebug = false;
    this.health = 100; // Initialize player health
    this.lifeBar = null;
    this.lifeBarBackground = null;
    this.volume = 0.1; // Initial volume (0 to 1)
    this.bgMusic = null; // Background music reference
    this.settingsButton = null;
    this.settingsPanel = null;
    this.volumeIncreaseButton = null;
    this.volumeDecreaseButton = null;
    this.isSettingsOpen = false; // Track settings panel state

  }

  preload() {
    // Reuse assets from MainScene, load building-specific tilemap
    this.load.image("tiles", "../assets/tilesets/blode-32px.png");
    this.load.tilemapTiledJSON("buildingMap", "../assets/tilemaps/buildingsc.json");
    this.load.audio("bs_Music", "../assets/audio/house_music.mp3");
  }

  create(data) {
     // Set health from data if provided
    this.health = data.health !== undefined ? data.health : 100;
    const map = this.make.tilemap({ key: "buildingMap" });

    const tileset = map.addTilesetImage("blode", "tiles");
    
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const belowLayer2 = map.createLayer("Below Player2", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

    // Initialize animation
    this.animatedTiles = [];
    const tilesetData = map.tilesets[0].tileData; // Assuming single tileset
    for (let tileId in tilesetData) {
      if (tilesetData[tileId].animation) {
        map.layers.forEach(layer => {
          if (layer.tilemapLayer) { // Only dynamic layers
            layer.data.forEach(row => {
              row.forEach(tile => {
                if (tile.index === parseInt(tileId) + map.tilesets[0].firstgid) {
                  this.animatedTiles.push({
                    tile: tile,
                    animation: tilesetData[tileId].animation,
                    firstgid: map.tilesets[0].firstgid,
                    elapsedTime: 0,
                    currentFrame: 0
                  });
                }
              });
            });
          }
        });
      }
    }

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objectsc", (obj) => obj.name === "Home Spawn") || { x: data.playerX, y: data.playerY };
      if (!map.findObject("Objectsc", (obj) => obj.name === "Home Spawn")) {
      }
      this.player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "atlas", data.playerFrame || "misa-front")
        .setSize(30, 20)
        .setOffset(0, 45);
      
    // Enable collision with world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);
    console.log("Physics world bounds set to:", map.widthInPixels, "x", map.heightInPixels);
  
      this.physics.add.collider(this.player, worldLayer);
  
      const door = map.findObject("Objectsc", (obj) => obj.name === "Home Exit");
      if (door) {
        const doorSprite = this.physics.add.staticSprite(door.x, door.y)
          .setSize(32, 32)
          .setVisible(false);
        this.physics.add.overlap(this.player, doorSprite, () => {
          let returnX = 200;
          let returnY = 200;
          try {
            const mainMap = this.make.tilemap({ key: "map" });
            if (!mainMap) {

            } else {
              const exitPoint = mainMap.findObject("Objects", (obj) => obj.name === "Exit");
              if (exitPoint) {
                returnX = exitPoint.x;
                returnY = exitPoint.y;
              } 
            }
          } catch (error) {
            console.error("Error accessing MainScene tilemap:", error);
          }
          this.scene.start('MainScene', { 
            playerX: returnX, 
            playerY: returnY,
            playerFrame: this.player.texture.key === "atlas" ? this.player.frame.name : "misa-front",
            health: this.health // Pass health to MainScene
          });
        });
      }

      
  // Set smaller viewport for BuildingScene (840x600, centered)
    const camera = this.cameras.main;
    const viewportWidth = 800;
    const viewportHeight = 600;
    const offsetX = (this.scale.width - viewportWidth) / 2; // Center horizontally
    const offsetY = (this.scale.height - viewportHeight) / 2; // Center vertically
    camera.setViewport(offsetX, offsetY, viewportWidth, viewportHeight);
    camera.startFollow(this.player, true, 0.1, 0.1);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.centerOn(this.player.x, this.player.y);

     // Initialize cursor keys and W, A, S, D keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      L: Phaser.Input.Keyboard.KeyCodes.L // Key to decrease health for testing
    });

    // Create life bar (background and fill)
    this.lifeBarBackground = this.add.rectangle(100, 23, 100, 20, 0x000000)
      .setScrollFactor(0)
      .setDepth(32);
    this.lifeBar = this.add.rectangle(50, 23, 100 * (this.health / 100), 20, 0x00ff00)
      .setScrollFactor(0)
      .setDepth(32)
      .setOrigin(0, 0.5);

  this.profileImageBorder = this.add.image(5, 5, 'profileImageBorder')
   .setScrollFactor(0)
    .setDepth(31)
    .setOrigin(0, 0);

   this.profileImage = this.add.image(10, 7, 'profile')
      .setScrollFactor(0)
      .setDepth(32)
      .setOrigin(0, 0);
    // Create circular mask for profile image
    const maskShape = this.add.graphics()
      .fillCircle(35, 35, 26)
      .setScrollFactor(0)
      .setDepth(32);
    const mask = maskShape.createGeometryMask();
    this.profileImage.setMask(mask);

     
    this.twitterLinkPressed = false;

    this.twitterLink = this.add.sprite(795, 4, 'xButtonDw')
      .setScrollFactor(0)
      .setDepth(34)
      .setOrigin(1, 0) // Align right edge
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.twitterLinkPressed = true;
        this.twitterLink.setTexture('xButtonUp');
        window.open('https://x.com/Kingkrest_', 'popup', 'width=600,height=400,scrollbars=yes,resizable=yes');
      })
      .on('pointerup', () => {
        this.twitterLinkPressed = false;
        this.twitterLink.setTexture('xButtonDw');
      })
      .on('pointerout', () => {
        if (this.twitterLinkPressed) {
          this.twitterLinkPressed = false;
          this.twitterLink.setTexture('xButtonDw');
        } else {
          this.twitterLink.setTexture('xButtonDw');
        }
      })
      .on('pointerover', () => {
        if (!this.twitterLinkPressed) {
          this.twitterLink.setTexture('xButtonUp');
        }
      });

     /*this.homeButton = this.add.text(32, 82, 'City', {
      font: "18px monospace",
      fontStyle: "bold",
      fill: "#00ff00",
      backgroundColor: "#808080",
      padding: { x: 10, y: 5 }
    })
      .setScrollFactor(0)
      .setDepth(33)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        let spawnX = 100;
        let spawnY = 100;
        try {
          const mainMap = this.make.tilemap({ key: "map" });
          if (mainMap) {
            const spawnPoint = mainMap.findObject("Objects", (obj) => obj.name === "Spawn Point");
            if (spawnPoint) {
              spawnX = spawnPoint.x;
              spawnY = spawnPoint.y;
            }
          }
        } catch (error) {
          console.error("Error accessing MainScene tilemap for spawn point:", error);
        }
        this.scene.start('MainScene', {
          playerX: spawnX,
          playerY: spawnY,
          playerFrame: this.player.texture.key === "atlas" ? this.player.frame.name : "misa-front",
          health: this.health,
          isInitialSpawn: false
        });
      });*/

    // Resume or start background music
    if (!this.bgMusic || !this.bgMusic.isPlaying) {
      this.bgMusic = this.sound.add("bs_Music", { volume: this.volume, loop: true });
      this.bgMusic.play();
    } else {
      this.bgMusic.setVolume(this.volume); // Ensure volume is updated if returning
    }
     this.settingsButtonPressed = false;

    // Add settings button
    this.settingsButton = this.add.sprite(795, 34, 'settingButtonDw')
      .setScrollFactor(0)
      .setDepth(33)
      .setOrigin(1, 0) // Align right edge
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.settingsButtonPressed = true;
        this.settingsButton.setTexture('settingButtonUp');
        this.toggleSettings();
      })
      .on('pointerup', () => {
        this.settingsButtonPressed = false;
        this.settingsButton.setTexture('settingButtonDw');
      })
      .on('pointerout', () => {
        if (this.settingsButtonPressed) {
          this.settingsButtonPressed = false;
          this.settingsButton.setTexture('settingButtonDw');
        } else {
          this.settingsButton.setTexture('settingButtonDw');
        }
      })
      .on('pointerover', () => {
        if (!this.settingsButtonPressed) {
          this.settingsButton.setTexture('settingButtonUp');
        }
      });

    // Create settings panel (initially hidden)
   this.settingsPanel = this.add.container(740, 103);
    const panelImage = this.add.image(0, 8, 'settingsPanel');
    this.settingsPanel.add(panelImage);
    this.settingsPanel.setScrollFactor(0);
    this.settingsPanel.setDepth(33);
    this.settingsPanel.setVisible(false);
    
      
    this.volumeIncreaseButtonPressed = false;
    // Add volume control buttons to settings panel
    this.volumeIncreaseButton = this.add.sprite(0, - 4, 'volUpButtonDw')
       .setScrollFactor(0)
      .setDepth(34)
      .setOrigin(0, 0) // Align right edge
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.volumeIncreaseButtonPressed = true;
        this.volumeIncreaseButton.setTexture('volUpButtonUp')
        this.increaseVolume();
      })
      .on('pointerup', () => {
        this.volumeIncreaseButtonPressed = false;
        this.volumeIncreaseButton.setTexture('volUpButtonDw')
      })
      .on('pointerout', () => {
        if (this.volumeIncreaseButtonPressed){
          this.volumeIncreaseButtonPressed = false;
          this.volumeIncreaseButton.setTexture('volUpButtonDw')
        } else {
          this.volumeIncreaseButton.setTexture('volUpButtonDw')
        }
      })
      .on('pointerover', () => {
        if (!this.volumeIncreaseButtonPressed) {
          this.volumeIncreaseButton.setTexture('volUpButtonUp')
        }
      });
      
        
    this.volumeDecreaseButtonPressed = false;
    this.volumeDecreaseButton = this.add.sprite(- 20, -4, 'volDwButtonDw')
      .setScrollFactor(0)
      .setDepth(34)
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.volumeDecreaseButtonPressed = true;
        this.volumeDecreaseButton.setTexture('volDwButtonUp');
        this.decreaseVolume();
      })
      .on('pointerup', () => {
        this.volumeDecreaseButtonPressed = false;
        this.volumeDecreaseButton.setTexture('volDwButtonDw');
      })
      .on('pointerout', () => {
        if (this.volumeDecreaseButtonPressed) {
          this.volumeDecreaseButtonPressed = false;
          this.volumeDecreaseButton.setTexture('volDwButtonDw');
        } else {
          this.volumeDecreaseButton.setTexture('volDwButtonDw');
        }
      })
      .on('pointerover', () => {
        if (!this.volumeDecreaseButtonPressed) {
          this.volumeDecreaseButton.setTexture('volDwButtonUp');
        }
      });

    this.settingsPanel.add([this.volumeIncreaseButton, this.volumeDecreaseButton]);

    this.input.keyboard.once("keydown-H", () => {
      const playerWall = this.physics.world.createDebugGraphic();
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    })

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors = this.input.keyboard.createCursorKeys();
    // Handle scene shutdown to stop music
    this.events.on('shutdown', this.shutdown, this);
    
  }

  shutdown() {
    // Stop music when leaving the scene
    if (this.bgMusic && this.bgMusic.isPlaying) {
      this.bgMusic.stop();
    }
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    this.settingsPanel.setVisible(this.isSettingsOpen);
    }
 increaseVolume() {
    this.volume = Phaser.Math.Clamp(this.volume + 0.1, 0, 1); // Increase by 0.1, cap at 1
    if (this.bgMusic) {
      this.bgMusic.setVolume(this.volume);
    }
  }

  decreaseVolume() {
    this.volume = Phaser.Math.Clamp(this.volume - 0.1, 0, 1); // Decrease by 0.1, cap at 0
    if (this.bgMusic) {
      this.bgMusic.setVolume(this.volume);
    }
  }


  update(time, delta) {
    const speed = 175;
    const prevVelocity = this.player.body.velocity.clone();

    this.animatedTiles.forEach(animTile => {
      animTile.elapsedTime += delta;
      const frame = animTile.animation[animTile.currentFrame];
      if (animTile.elapsedTime >= frame.duration) {
        animTile.elapsedTime = 0;
        animTile.currentFrame = (animTile.currentFrame + 1) % animTile.animation.length;
        animTile.tile.index = animTile.animation[animTile.currentFrame].tileid + animTile.firstgid;
      }
    });


    this.player.body.setVelocity(0);

    // Handle movement with both cursor keys and W,A,S,D
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.player.body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Handle health decrease (for testing)
    if (Phaser.Input.Keyboard.JustDown(this.keys.L)) {
      this.health = Math.max(0, this.health - 10);
      this.lifeBar.setSize(100 * (this.health / 100), 20);
    }

    this.player.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.player.anims.play("misa-left-walk", true);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.player.anims.play("misa-right-walk", true);
    } else if (this.cursors.up.isDown || this.keys.W.isDown) {
      this.player.anims.play("misa-back-walk", true);
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      this.player.anims.play("misa-front-walk", true);
    } else {
      this.player.anims.stop();
      if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
    }
  }
}