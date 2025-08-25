export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.cursors = null;
    this.player = null;
    this.showDebug = false;
    this.minimap = null;
    this.playerIcon = null;
    this.health = 100; // Initialize player health
    this.lifeBar = null;
    this.lifeBarBackground = null;
    this.dialogueGroup = null;
    this.dialogueBox = null;
    this.dialogueText = null;
    this.enterButton = null;
    this.fullDialogueText = "";
    this.currentTextIndex = 0;
    this.isTypewriterComplete = false; // Track typewriter effect completion
    this.volume = 0.2; // Initial volume (0 to 1)
    this.bgMusic = null; // Background music reference
    this.settingsButton = null;
    this.settingsPanel = null;
    this.volumeIncreaseButton = null;
    this.volumeDecreaseButton = null;
    this.isSettingsOpen = false; // Track settings panel state
    this.joystick = null; // Virtual joystick reference
    
  }

  preload() {
   this.load.image("tiles", "../assets/tilesets/blode-32px.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/blode.json");
    this.load.image("art1", "assets/art1.png");
    this.load.image("art2", "assets/art2.png");
    this.load.atlas("atlas", "../assets/atlas/atlas.png", "../assets/atlas/atlas.json");
    this.load.image("profile", "../assets/images/profile.png"); // Load the profile image
    this.load.image("dialogueImage", "../assets/images/dialogueImage.png");
    this.load.image("settingButtonDw", "../assets/images/buttons/settingsButton1.png");
    this.load.image("settingButtonUp", "../assets/images/buttons/settingsButton2.png");
    this.load.image("xButtonDw", "../assets/images/buttons/xButton1.png");
    this.load.image("xButtonUp", "../assets/images/buttons/xButton2.png");
    this.load.image("enterButtonId", "../assets/images/buttons/enterButton1.png");
    this.load.image("enterButtonDw", "../assets/images/buttons/enterButton2.png");
    this.load.image("enterButtonUp", "../assets/images/buttons/enterButton3.png");
    this.load.image("volDwButtonDw", "../assets/images/buttons/volDwButton1.png");
    this.load.image("volDwButtonUp", "../assets/images/buttons/volDwButton2.png");
    this.load.image("volUpButtonDw", "../assets/images/buttons/volUpButton1.png");
    this.load.image("volUpButtonUp", "../assets/images/buttons/volUpButton2.png");
    this.load.image("minimapBorder", "../assets/images/minimapBorder.png");
    this.load.image("settingsPanel", "../assets/images/settingsPanel.png");
    this.load.image("profileImageBorder", "../assets/images/profileImageBorder.png");
    this.load.audio("ms_Music", "assets/audio/ms_Music.mp3");
    this.load.audio("ms_Music", "assets/audio/ms_Music.mp3");
    // Load rexVirtualJoystick plugin
   this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    // Load joystick assets (optional, for visual joystick)
    this.load.image('joystickBase', '../assets/images/joystick_base.png');
    this.load.image('joystickThumb', '../assets/images/joystick_thumb.png');
  }
  create(data = {}) {
     // Set health from data if provided
    this.health = data.health !== undefined ? data.health : 100;

    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("blode", "tiles");
    
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const belowLayer2 = map.createLayer("Below Player2", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
    const worldLayer2 = map.createLayer("World2", tileset, 0, 0);
    const aboveLayer2 = map.createLayer("Above Player2", tileset, 0, 0);

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
    worldLayer2.setCollisionByProperty({ collides: true });
    //worldLayer.setCollisionByProperty({ collideSmall: true });

    aboveLayer.setDepth(10);
    aboveLayer2.setDepth(10);
 // Use incoming coordinates if provided, otherwise use Spawn Point
    let spawnX = 100;
    let spawnY = 100;
    let spawnFrame = "misa-front";
    let isInitialSpawn = !data.playerX && !data.playerY; // Check if this is the initial spawn
    if (data && data.playerX !== undefined && data.playerY !== undefined) {
      spawnX = data.playerX;
      spawnY = data.playerY;
      spawnFrame = data.playerFrame || "misa-front";
    } else {
      const spawnPoint = map.findObject("Objects", (obj) => obj.name === "Spawn Point");
      if (spawnPoint) {
        spawnX = spawnPoint.x;
        spawnY = spawnPoint.y;
      } else {
      }
    }

    this.player = this.physics.add
      .sprite(spawnX, spawnY, "atlas", spawnFrame)
      .setSize(30, 20)
      .setOffset(0, 45);
    
    // Enable collision with world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);
    console.log("Physics world bounds set to:", map.widthInPixels, "x", map.heightInPixels);
  

    this.physics.add.collider(this.player,([ worldLayer, worldLayer2]));

    // Handle all doors in the "Home" layer dynamically
    const doors = map.filterObjects("entranceDoors", (obj) => obj.type === "Door");
    doors.forEach((door) => {
      const targetScene = door.properties?.find(prop => prop.name === "targetScene")?.value || "MainScene"; // Default to MainScene if no targetScene
      if (door && targetScene !== "MainScene") { // Prevent self-transition
        const doorSprite = this.physics.add.staticSprite(door.x, door.y)
          .setSize(32, 32)
          .setVisible(false);
        this.physics.add.overlap(this.player, doorSprite, () => {
          this.scene.start(targetScene, { 
            playerX: this.player.x, 
            playerY: this.player.y,
            playerFrame: this.player.texture.key === "atlas" ? this.player.frame.name : "misa-front",
            health: this.health // Pass health to target scene
          });
        });
      }
    });

    this.input.keyboard.on('keydown-F', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    // Create animations only if they don't exist
    const anims = this.anims;
    if (!anims.exists("misa-left-walk")) {
      anims.create({
        key: "misa-left-walk",
        frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists("misa-right-walk")) {
      anims.create({
        key: "misa-right-walk",
        frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists("misa-front-walk")) {
      anims.create({
        key: "misa-front-walk",
        frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists("misa-back-walk")) {
      anims.create({
        key: "misa-back-walk",
        frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    const camera = this.cameras.main;
    camera.startFollow(this.player, true, 0.1, 0.1);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.centerOn(this.player.x, this.player.y);

    console.log("Camera bounds:", camera.getBounds());
    console.log("Player position:", this.player.x, this.player.y);
    console.log("Map dimensions:", map.widthInPixels, map.heightInPixels);
    console.log("Camera zoom:", camera.zoom);
    console.log("Canvas size:", this.scale.width, this.scale.height);

    this.minimap = this.cameras.add(
      this.scale.width - 240 - 10,
      10,
      240,
      150
    ).setZoom(0.125);
    this.minimap.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.minimap.setBackgroundColor('#000000');
    this.minimap.ignore(this.children.list.filter(child => child.type === 'Text' || child.type === 'Graphics'));
    this.minimap.ignore(this.player);

    this.playerIcon = this.add.circle(this.player.x, this.player.y, 30, 0xff0000, 1).setOrigin(0, -1);
    camera.ignore(this.playerIcon);
    this.minimap.startFollow(this.playerIcon, true, 1, 1);
    
    const homeIcon = map.findObject("HomeIcon", (obj) => obj.name === "HomeIcon");
    const storeIcon = map.findObject("HomeIcon", (obj) => obj.name === "StoreIcon");

    // Create the original blue circle
    this.doorHomeIcon = this.add.circle(homeIcon.x, homeIcon.y, 30, 0x0000ff, 1).setOrigin(0.25, 0);
    this.doorHomeIcon.setDepth(30);

    // Create red blinking circle slightly larger than the blue one
    const hredCircle = this.add.circle(homeIcon.x, homeIcon.y, 35, 0xff0000, 0.5).setOrigin(0.4, 0.3);

    this.doorstoreIcon = this.add.circle(storeIcon.x, storeIcon.y, 30, 0x0000ff, 1).setOrigin(0.25, 0);
    this.doorstoreIcon.setDepth(30);

    // Create red blinking circle slightly larger than the blue one
    const sredCircle = this.add.circle(storeIcon.x, storeIcon.y, 35, 0xff0000, 0.5).setOrigin(0.4, 0.3);

    // Add tween for growing/shrinking and blinking effect
    this.tweens.add({
        targets: hredCircle,
        scale: { from: 1, to: 2.5 },
        alpha: { from: 0.5, to: 0.25 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });
        this.tweens.add({
        targets: sredCircle,
        scale: { from: 1, to: 2.5 },
        alpha: { from: 0.5, to: 0.25 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    camera.ignore([this.doorHomeIcon, this.doorstoreIcon, hredCircle, sredCircle]);

    this.minimapBorder = this.add.image(
      this.scale.width - 240 - 9 + 120,
      84,
      'minimapBorder'
    ).setScrollFactor(0).setDepth(20);
    camera.ignore(this.minimapBorder);
    this.minimap.ignore(this.minimapBorder);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      L: Phaser.Input.Keyboard.KeyCodes.L, // Key to decrease health for testing
      ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER // Add Enter key for dialogue
    });

    const uiCamera = this.cameras.add(0, 0, this.scale.width, this.scale.height);
    uiCamera.setScroll(0, 0);
    uiCamera.setZoom(1);
    uiCamera.ignore([this.player, belowLayer, belowLayer2, worldLayer, worldLayer2, aboveLayer, aboveLayer2, this.playerIcon, this.doorHomeIcon, hredCircle, sredCircle]);

     // Create life bar (background and fill)
    this.lifeBarBackground = this.add.rectangle(100, 23, 100, 20, 0x000000)
      .setScrollFactor(0)
      .setDepth(32);
    this.lifeBar = this.add.rectangle(50, 23, 100 * (this.health / 100), 20, 0x00ff00)
      .setScrollFactor(0)
      .setDepth(32)
      .setOrigin(0, 0.5);
    camera.ignore([this.lifeBarBackground, this.lifeBar]);
    this.minimap.ignore([this.lifeBarBackground, this.lifeBar]);

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

    this.minimap.ignore([this.profileImage, this.profileImageBorder, maskShape]);

    
    
    this.twitterLinkPressed = false;

    this.twitterLink = this.add.sprite(this.scale.width - 10, 170, 'xButtonDw')
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

  this.minimap.ignore([this.twitterLink]);

     // Create dialogue box for initial spawn
    if (isInitialSpawn) {
      this.physics.pause(); // Pause physics to prevent movement
      this.dialogueGroup = this.add.group();

      // Center dialogue elements
      const centerX = this.scale.width / 2;
      const centerY = this.scale.height / 2;
      
      this.dialogueBox = this.add.image(centerX, centerY + 180, 'dialogueImage')
      .setScrollFactor(0)
      .setDepth(32)
      .setOrigin(0.5, 0.5);

      this.fullDialogueText = "HELLO!! I'M KINGKREST\nWelcome to my Pixel Art Portfolio!\nExplore my creations and enjoy!";
      this.dialogueText = this.add.text(centerX - 185, centerY + 140, "", {
        font: "20px monospace",
        fontStyle: "bold",
        fill: "#FFFFFF",
        wordWrap: { width: 380 }
      })
        .setScrollFactor(0)
        .setDepth(33)
        .setAlpha(0); // Initially invisible

      this.enterButtonPressed = false; // Add this if not already defined

      this.enterButton = this.add.sprite(centerX , centerY + 225, 'enterButtonId')
        .setScrollFactor(0)
        .setDepth(33);

      this.dialogueGroup.addMultiple([this.dialogueBox, this.dialogueText, this.enterButton]);
      camera.ignore(this.dialogueGroup.getChildren());
      this.minimap.ignore(this.dialogueGroup.getChildren());
      
      // Explicitly enable pointer input
      this.input.mouse.enabled = false;

      // Start typewriter effect
      this.currentTextIndex = 0;
      this.isTypewriterComplete = false;
      this.time.addEvent({
        delay: 20, // 20ms per character
        callback: () => {
          if (this.currentTextIndex < this.fullDialogueText.length) {
            this.currentTextIndex++;
            this.dialogueText.setText(this.fullDialogueText.substring(0, this.currentTextIndex));
            this.dialogueText.setAlpha(1); // Make visible text fully opaque
          }
          if (this.currentTextIndex >= this.fullDialogueText.length && !this.isTypewriterComplete) {
            this.enterButton.setTexture('enterButtonDw');
            this.enterButton.setInteractive({ useHandCursor: true })
              .on('pointerdown', () => {
                this.enterButtonPressed = true;
                this.enterButton.setTexture('enterButtonUp');
                this.closeDialogue();
              })
              .on('pointerup', () => {
                this.enterButtonPressed = false;
                this.enterButton.setTexture('enterButtonDw');
              })
              .on('pointerout', () => {
                if (this.enterButtonPressed) {
                  this.enterButtonPressed = false;
                  this.enterButton.setTexture('enterButtonDw');
                } else {
                  this.enterButton.setTexture('enterButtonDw');
                }
              })
              .on('pointerover', () => {
                if (!this.enterButtonPressed) {
                  this.enterButton.setTexture('enterButtonUp');
                }
              });
            this.input.mouse.enabled = true; // Enable mouse input
            this.isTypewriterComplete = true;
          }
        },
        callbackScope: this,
        loop: true
      });
        
           // Allow Enter key to dismiss dialogue
      this.input.keyboard.on('keydown-ENTER', () => {
        if (this.isTypewriterComplete && this.dialogueGroup && this.keys.ENTER.isDown) {
          this.closeDialogue();
        }
      });
    }

    // Initialize virtual joystick for mobile devices
    if (!this.sys.game.device.os.desktop) {
      this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,
        y: this.scale.height - 100,
        radius: 50,
        base: this.add.image(0, 0, 'joystickBase').setDepth(35).setScrollFactor(0),
        thumb: this.add.image(0, 0, 'joystickThumb').setDepth(36).setScrollFactor(0),
        dir: '8dir', // Allow 8-directional movement
        forceMin: 10, // Minimum force required to register movement
      });
      this.minimap.ignore([this.joystick.base, this.joystick.thumb]);
    }

    // Resume or start background music
    if (!this.bgMusic || !this.bgMusic.isPlaying) {
      this.bgMusic = this.sound.add("ms_Music", { volume: this.volume, loop: true });
      this.bgMusic.play();
    } else {
      this.bgMusic.setVolume(this.volume); // Ensure volume is updated if returning
    }

    this.settingsButtonPressed = false;

    // Add settings button
    this.settingsButton = this.add.sprite(this.scale.width - 10, 205, 'settingButtonDw')
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
   this.settingsPanel = this.add.container(this.scale.width - 65, 273);
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

    this.minimap.ignore([this.settingsButton, this.settingsPanel]);

    this.input.keyboard.once("keydown-H", () => {
      const playerWall = this.physics.world.createDebugGraphic();
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
      uiCamera.ignore(graphics);
      this.minimap.ignore(graphics);
      uiCamera.ignore(playerWall);
      this.minimap.ignore(playerWall);
    });
    // Handle scene shutdown to stop music
    this.events.on('shutdown', this.shutdown, this);
  }

  shutdown() {
    // Stop music when leaving the scene
    if (this.bgMusic && this.bgMusic.isPlaying) {
      this.bgMusic.stop();
    }
  }
   closeDialogue() {
    if (this.dialogueGroup) {
      this.dialogueGroup.destroy(true);
      this.dialogueGroup = null;
      this.physics.resume();
      this.input.keyboard.enabled = true;
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
    this.playerIcon.setPosition(this.player.x, this.player.y);
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

    if (this.cursors.space.isDown) {
      this.cameras.main.zoom += 0.01;
    } else if (this.cursors.shift.isDown) {
      this.cameras.main.zoom -= 0.01;
    }
    this.cameras.main.zoom = Phaser.Math.Clamp(this.cameras.main.zoom, 1, 3);

    // Handle movement with both cursor keys, W,A,S,D, and joystick
    let velocityX = 0;
    let velocityY = 0;

    // Keyboard controls
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      velocityY = speed;
    }

    // Joystick controls (only on mobile)
    if (this.joystick && !this.sys.game.device.os.desktop) {
      const force = this.joystick.force;
      const angle = this.joystick.angle;
      if (force > this.joystick.forceMin) {
        velocityX = speed * Math.cos(angle * Math.PI / 180);
        velocityY = speed * Math.sin(angle * Math.PI / 180);
      }
    }

    this.player.body.setVelocity(velocityX, velocityY);
    this.player.body.velocity.normalize().scale(speed);

    // Handle health decrease (for testing)
    if (Phaser.Input.Keyboard.JustDown(this.keys.L)) {
      this.health = Math.max(0, this.health - 10);
      this.lifeBar.setSize(100 * (this.health / 100), 20);
    }

    // Update animations based on movement
    if (velocityX < 0) {
      this.player.anims.play("misa-left-walk", true);
    } else if (velocityX > 0) {
      this.player.anims.play("misa-right-walk", true);
    } else if (velocityY < 0) {
      this.player.anims.play("misa-back-walk", true);
    } else if (velocityY > 0) {
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