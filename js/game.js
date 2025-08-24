import { MainScene } from './main_scene.js';
import { BuildingScene } from './building_scene.js';
import { UgcStoreScene } from './ugc_store_scene.js';
import { OrderScene } from './order_scene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#333333',
  parent: 'game-container',
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.EXPAND,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MainScene, BuildingScene, UgcStoreScene, OrderScene]
};

const game = new Phaser.Game(config);