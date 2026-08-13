export class PlayerAnimator {
  static createWalkingAnimations(anims) {
    const directions = [
      { key: 'king-left-walk', prefix: 'king-left-walk.' },
      { key: 'king-right-walk', prefix: 'king-right-walk.' },
      { key: 'king-front-walk', prefix: 'king-front-walk.' },
      { key: 'king-back-walk', prefix: 'king-back-walk.' }
    ];

    directions.forEach(({ key, prefix }) => {
      if (anims.exists(key)) {
        return;
      }

      anims.create({
        key,
        frames: anims.generateFrameNames('atlas', {
          prefix,
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
    });
  }
}
