export class OrderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OrderScene' });
  }

  preload() {
    this.load.image("Sunflower", "../assets/images/UGCs/Sunflower.png");
    this.load.image("SAQUARIUM", "../assets/images/UGCs/SAQUARIUM.png");
    this.load.image("item1", "../assets/item1.png");
    this.load.image("item2", "../assets/item2.png");
    this.load.image("item3", "../assets/item3.png");
    this.load.image("pixelCoin", "../assets/pixelCoin.png");
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
        padding: 2%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        width: min(80%, ${gameWidth}px);
        height: min(80%, ${gameHeight}px);
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #222044;
        padding-bottom: 1%;
        border-bottom: 1px solid #ddd;
        margin-bottom: 1%;
      }
      .header h1 {
        font-size: clamp(16px, 4vw, 24px);
        color: #ffffffff;
      }
      .sidebar {
        flex: 1;
        padding: 1%;
        background: #28237dff;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1%;
        overflow-y: auto;
      }
      .item {
        flex: 1 1 calc(33.33% - 0.67%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        min-width: 80px;
        min-height: 200px;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .item-image {
        margin-top: 1.5%;
        width: 80%;
        height: 150px;
        object-fit: contain;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 5px;
      }
      .item-name {
        margin: 0.5% 0;
        font-weight: bold;
        font-size: clamp(14px, 3vw, 18px);
        color: #ffffff;
      }
      .price-container {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 0.5% 0;
      }
      .price {
        font-weight: bold;
        color: #dbfa15ff;
        font-size: clamp(12px, 2.5vw, 16px);
      }
      .price-icon {
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
      .item button {
        padding: 4px 8px;
        background: #db742e;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: clamp(12px, 2.5vw, 16px);
        margin-top: 0.5%;
        margin-bottom: 1.5%;
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
        font-size: clamp(12px, 2.5vw, 16px);
      }
      .close-btn:hover {
        background: #c82333;
      }
      @media (max-width: 600px) {
        .item {
          flex: 1 1 calc(50% - 0.5%);
          min-width: 120px;
        }
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