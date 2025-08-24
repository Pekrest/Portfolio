class BuildingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BuildingScene' });
    this.cursors = null;
    this.player = null;
    this.showDebug = false;
    this.health = 100; // Initialize player health
    this.lifeBar = null;
    this.lifeBarBackground = null;
    this.doors = []; // Array to store door data
  }

  preload() {
    // Reuse assets from MainScene, load building-specific tilemap
    this.load.image("tiles", "../assets/tilesets/blode-32px.png");
    this.load.tilemapTiledJSON("buildingMap", "../assets/tilemaps/buildingsc.json");
    this.load.image("profile", "../assets/images/profile.png"); // Ensure profile image is loaded
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

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objectsc", (obj) => obj.name === "Home Spawn") || { x: data.playerX, y: data.playerY };
    if (!map.findObject("Objectsc", (obj) => obj.name === "Home Spawn")) {
      console.warn("No Home Spawn found, using fallback coordinates:", spawnPoint.x, spawnPoint.y);
    }
    this.player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas", data.playerFrame || "misa-front")
      .setSize(30, 20)
      .setOffset(0, 43);
    this.player.facing = data.playerFrame && data.playerFrame.includes("left") ? "left" :
                        data.playerFrame && data.playerFrame.includes("right") ? "right" :
                        data.playerFrame && data.playerFrame.includes("back") ? "up" : "down";

    // Enable collision with world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);
    console.log("Physics world bounds set to:", map.widthInPixels, "x", map.heightInPixels);
  
    this.physics.add.collider(this.player, worldLayer);

    // Home Exit door
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
            console.warn("MainScene tilemap not found, using default exit coordinates");
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
          health: this.health
        });
      });
    }

    // Room doors
    const doorObjs = map.getObjectLayer('Objectsc').objects.filter(obj => obj.name === 'Door');
    doorObjs.forEach(doorObj => {
      const direction = doorObj.properties?.find(prop => prop.name === 'direction')?.value || 'north';
      const openIndex = doorObj.properties?.find(prop => prop.name === 'openIndex')?.value || -1;

      // Set trigger offset based on door direction
      let triggerOffsetX = 0;
      let triggerOffsetY = 0;
      let facingRequired;
      switch (direction) {
        case 'north':
          triggerOffsetY = -32; // Trigger below door (player approaches from below)
          facingRequired = 'up';
          break;
        case 'south':
          triggerOffsetY = 32; // Trigger above door
          facingRequired = 'down';
          break;
        case 'west':
          triggerOffsetX = -32; // Trigger to right of door
          facingRequired = 'left';
          break;
        case 'east':
          triggerOffsetX = 32; // Trigger to left of door
          facingRequired = 'right';
          break;
        default:
          console.warn(`Invalid door direction for door at (${doorObj.x}, ${doorObj.y}): ${direction}`);
          return;
      }

      // Create trigger sprite
      const trigger = this.physics.add.staticSprite(doorObj.x + triggerOffsetX, doorObj.y + triggerOffsetY)
        .setSize(32, 32)
        .setVisible(false);

      // Get the door tile from the World layer
      const doorTileX = Math.floor(doorObj.x / map.tileWidth);
      const doorTileY = Math.floor(doorObj.y / map.tileHeight);
      const doorTile = worldLayer.getTileAt(doorTileX, doorTileY);

      if (doorTile) {
        const closedIndex = doorTile.index;
        this.doors.push({
          trigger,
          doorTile,
          closedIndex,
          openIndex,
          facingRequired,
          isOpen: false
        });
      } else {
        console.warn(`No tile found for door at (${doorObj.x}, ${doorObj.y})`);
      }
    });

    // Set smaller viewport for BuildingScene (840x600, centered)
    const camera = this.cameras.main;
    const viewportWidth = 840;
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

    // UI elements
    this.profileImage = this.add.image(27, 35, 'profile')
      .setScrollFactor(0)
      .setDepth(32)
      .setOrigin(0.5, 0.5);
    const maskShape = this.add.graphics()
      .fillCircle(27, 35, 26)
      .setScrollFactor(0)
      .setDepth(32);
    const mask = maskShape.createGeometryMask();
    this.profileImage.setMask(mask);
    
    const profileText = this.add
      .text(41, 32, ' Kingkrest', {
        font: "15px monospace",
        fontStyle: "bold",
        fill: "#000000",
        padding: { x: 5, y: 5 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);

    this.lifeBarBackground = this.add.rectangle(85, 20, 100, 20, 0x000000)
      .setScrollFactor(0)
      .setDepth(30);
    this.lifeBar = this.add.rectangle(85, 20, 100 * (this.health / 100), 20, 0x00ff00)
      .setScrollFactor(0)
      .setDepth(31);

    camera.ignore([this.profileImage, maskShape, profileText, this.lifeBarBackground, this.lifeBar]);

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

    this.input.keyboard.once("keydown-H", () => {
      const playerWall = this.physics.world.createDebugGraphic();
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
      camera.ignore([graphics, playerWall]);
    });
  }

  update(time, delta) {
    const speed = 175;
    const prevVelocity = this.player.body.velocity.clone();

    this.player.body.setVelocity(0);

    // Handle movement with both cursor keys and W,A,S,D
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.facing = 'left';
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.facing = 'right';
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.facing = 'up';
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.facing = 'down';
    }

    // Handle health decrease (for testing)
    if (Phaser.Input.Keyboard.JustDown(this.keys.L)) {
      this.health = Math.max(0, this.health - 10);
      this.lifeBar.setSize(100 * (this.health / 100), 20); // Fixed to 100x20
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
      if (prevVelocity.x < 0) {
        this.player.setTexture("atlas", "misa-left");
        this.player.facing = 'left';
      } else if (prevVelocity.x > 0) {
        this.player.setTexture("atlas", "misa-right");
        this.player.facing = 'right';
      } else if (prevVelocity.y < 0) {
        this.player.setTexture("atlas", "misa-back");
        this.player.facing = 'up';
      } else if (prevVelocity.y > 0) {
        this.player.setTexture("atlas", "misa-front");
        this.player.facing = 'down';
      }
    }

    // Door open/close logic
    this.doors.forEach(door => {
      if (this.physics.overlap(this.player, door.trigger) && this.player.facing === door.facingRequired) {
        if (!door.isOpen) {
          door.doorTile.properties.collides = false;
          if (door.openIndex !== -1) door.doorTile.index = door.openIndex;
          door.isOpen = true;
          this.physics.world.removeCollider(this.physics.world.colliders.getActive().find(c => c.object1 === this.player && c.object2 === door.doorTile));
        }
      } else {
        if (door.isOpen) {
          door.doorTile.properties.collides = true;
          door.doorTile.index = door.closedIndex;
          door.isOpen = false;
          this.physics.add.collider(this.player, worldLayer);
        }
      }
    });
  }
}