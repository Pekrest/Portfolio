export class OrderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OrderScene' });
  }

  preload() {
    this.load.image("Sunflower", "assets/images/UGCs/Sunflower.png");
    this.load.image("SAQUARIUM", "assets/images/UGCs/SAQUARIUM.png");
    this.load.image("item1", "assets/item1.png");
    this.load.image("item2", "assets/item2.png");
    this.load.image("item3", "assets/item3.png");
    this.load.image("pixelCoin", "assets/pixelCoin.png");
  }

  create(data) {
    const assetId = data.assetId || "unknown";
    const gameWidth = this.sys.game.canvas.width;
    const gameHeight = this.sys.game.canvas.height;

    // Create HTML overlay
    const overlay = document.createElement('div');
    overlay.id = 'order-overlay';
    document.body.appendChild(overlay);

   overlay.innerHTML = `
      <div class="order-container">
        <div class="header">
          <h1>ORDER UGCs: ${assetId}</h1>
          <button class="close-btn">Close</button>
        </div>
        <div class="sidebar">
          <div class="item">
            <img src="assets/images/UGCs/Sunflower.png" alt="Sunflower" class="item-image">
            <span class="item-name">Sunflower</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/SAQUARIUM.png" alt="SAQUARIUM" class="item-image">
            <span class="item-name">SAQUARIUM</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item3.png" alt="Item 3" class="item-image">
            <span class="item-name">Item 3</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item1.png" alt="Item 4" class="item-image">
            <span class="item-name">Item 4</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item2.png" alt="Item 5" class="item-image">
            <span class="item-name">Item 5</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item3.png" alt="Item 6" class="item-image">
            <span class="item-name">Item 6</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item1.png" alt="Item 7" class="item-image">
            <span class="item-name">Item 4</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item2.png" alt="Item 8" class="item-image">
            <span class="item-name">Item 5</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item3.png" alt="Item 9" class="item-image">
            <span class="item-name">Item 6</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item1.png" alt="Item 10" class="item-image">
            <span class="item-name">Item 10</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item2.png" alt="Item 11" class="item-image">
            <span class="item-name">Item 11</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/item3.png" alt="Item 12" class="item-image">
            <span class="item-name">Item 12</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
        </div>
      </div>
    `;

    // Style the overlay
    const style = document.createElement('style');
    style.textContent = `
      #order-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .order-container {
        background: #6626ff;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        width: 1024px;
        height: 1152px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #222044;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
      }
      .header h1 {
        font-size: 40px;
        color: #ffffffff;
      }
      .sidebar {
        flex: 1;
        padding: 10px;
        background: #28237dff;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        overflow-y: auto;
      }
     .item {
        flex: 1 1 calc(33.33% - 6.67px);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        background: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
        border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle white border */
        border-radius: 5px;
        min-width: 100px;
        min-height: 250px;
        box-sizing: border-box;
        backdrop-filter: blur(10px); /* Blur effect for glassmorphism */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
      }
      .item-image {
        margin-top: 15px;
        width: 80%;
        height: 200px; /* Fixed height for consistency */
        object-fit: contain; /* Maintain aspect ratio without stretching */
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 5px;
      }
      .item-name {
        margin: 5px 0;
        font-weight: bold;
        font-size: 30px;
        color: #ffffff;
      }
      .price-container {
        display: flex;
        align-items: center;
        gap: 5px; 
        margin: 5px 0;
      }
      .price {
        margin: 5px 0;
        font-weight: bold;
        color: #dbfa15ff;
        font-size: 25px;
      }
      .price-icon {
        width: 32px; 
        height: 32px;
        vertical-align: middle;
      }
      .item button {
        padding: 4px 8px;
        background: #db742e;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 25px;
        margin-top: 5px;
        margin-bottom: 15px;
        width: 80%;
      }
      .item button:hover {
        background: #31f355ff;
      }
      .close-btn {
        margin-left: auto;
        padding: 5px 10px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .close-btn:hover {
        background: #c82333;
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    overlay.querySelector('.order-container').addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('close-btn')) {
        console.log('Item purchased:', e.target.parentElement.textContent);
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSe3S63cCKfrrhqB89MrSPiwZLeyqFARGhVhXcvUJWYaFlfLWg/viewform?usp=dialog`; // Buy form URL
        const width = 450;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(url, 'buyPopup', `width=${width},height=${height},scrollbars=yes,resizable=yes,left=${left},top=${top}`);
      } else if (e.target.classList.contains('close-btn')) {
        this.closeOverlay();
      }
    });

    // Allow closing by clicking outside or pressing ESC
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeOverlay();
      }
    });
    this.input.keyboard.once('keydown-ESC', () => this.closeOverlay());
  }

  update() {
    // No update logic needed for this scene
  }

  closeOverlay() {
    const overlay = document.getElementById('order-overlay');
    if (overlay) {
      document.body.removeChild(overlay);
      const style = document.querySelector('style');
      if (style) document.head.removeChild(style);
      this.scene.stop();
    }
  }
}