export class TiledTileAnimator {
  constructor(scene) {
    this.scene = scene;
    this.animatedTiles = [];
  }

  collectFromMap(map) {
    this.animatedTiles = [];

    map.tilesets.forEach((tileset) => {
      const tilesetData = tileset.tileData || {};

      Object.keys(tilesetData).forEach((tileId) => {
        const animationFrames = tilesetData[tileId]?.animation;
        if (!animationFrames || !animationFrames.length) {
          return;
        }

        const targetIndex = Number(tileId) + tileset.firstgid;

        map.layers.forEach((layer) => {
          if (!layer.tilemapLayer) {
            return;
          }

          layer.data.forEach((row) => {
            row.forEach((tile) => {
              if (!tile || tile.index !== targetIndex) {
                return;
              }

              this.animatedTiles.push({
                tile,
                frames: animationFrames,
                firstgid: tileset.firstgid,
                elapsed: 0,
                currentFrame: 0
              });
            });
          });
        });
      });
    });

    return this.animatedTiles;
  }

  update(delta) {
    for (const animTile of this.animatedTiles) {
      const frame = animTile.frames[animTile.currentFrame];
      if (!frame) continue;

      animTile.elapsed += delta;
      if (animTile.elapsed < frame.duration) {
        continue;
      }

      animTile.elapsed = 0;
      animTile.currentFrame = (animTile.currentFrame + 1) % animTile.frames.length;

      const nextFrame = animTile.frames[animTile.currentFrame];
      if (nextFrame) {
        animTile.tile.index = nextFrame.tileid + animTile.firstgid;
      }
    }
  }

  destroy() {
    this.animatedTiles = [];
  }
}
