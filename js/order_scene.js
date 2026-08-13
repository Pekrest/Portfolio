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
    this.load.image("Telecen Table Metal", "assets/images/UGCs/TelecenTableMetal.png");
    this.load.image("Telecen Table Wooden", "assets/images/UGCs/TelecenTableWooden.png");
    this.load.image("Television with Glass stand", "assets/images/UGCs/TelevisionwithGlassStand.png"); 
    this.load.image("Television with Metal stand", "assets/images/UGCs/TelevisionwithMetalStand.png"); 
    this.load.image("Television with Wooden stand", "assets/images/UGCs/TelevisionwithWoodenStand.png"); 
    this.load.image("Wall Lamp Blue", "assets/images/UGCs/Wall_Lamp_Blue.png"); 
    this.load.image("Wall Lamp Single", "assets/images/UGCs/Wall_Lamp_Single.png"); 
    this.load.image("wall lamp", "assets/images/UGCs/wall_lamp.png"); 
    this.load.image("Welcome Sign", "assets/images/UGCs/Welcome_Sign.png"); 
    this.load.image("Bechi Fence", "assets/images/UGCs/Bechi_Fence.png"); 
    this.load.image("Bixelnaire Bar", "assets/images/UGCs/Bixelnaire_Bar.png"); 
    this.load.image("Borey Balcony", "assets/images/UGCs/Borey_Balcony.png"); 
    this.load.image("Borey Door", "assets/images/UGCs/Borey_Door.png"); 
    this.load.image("Borey Window", "assets/images/UGCs/Borey_Window.png"); 
    this.load.image("Deer Head", "assets/images/UGCs/Deer_Head.png"); 
    this.load.image("Little Goose", "assets/images/UGCs/Little_Goose.png"); 
    this.load.image("Telecen Couch Black", "assets/images/UGCs/Telecen_Couch_Black.png"); 
    this.load.image("Telecen Couch Purple", "assets/images/UGCs/Telecen_Couch_Purple.png"); 
    this.load.image("Telecen Dining Glass", "assets/images/UGCs/Telecen_Dining_Glass.png"); 
    this.load.image("Telecen Dining Metal", "assets/images/UGCs/Telecen_Dining_Metal.png"); 
    this.load.image("Telecen Dining Wooden", "assets/images/UGCs/Telecen_Dining_Wooden.png"); 
    this.load.image("Telecen Kitchen Glass L", "assets/images/UGCs/Telecen_Kitchen_Glass_L.png");
     this.load.image("Telecen Kitchen Glass R", "assets/images/UGCs/Telecen_Kitchen_Glass_R.png"); 
    this.load.image("Telecen Kitchen Metal L", "assets/images/UGCs/Telecen_Kitchen_Metal_L.png"); 
    this.load.image("Telecen Kitchen Metal M", "assets/images/UGCs/Telecen_Kitchen_Metal_M.png"); 
    this.load.image("Telecen Kitchen Metal R", "assets/images/UGCs/Telecen_Kitchen_Metal_R.png"); 
    this.load.image("Telecen Rug Black", "assets/images/UGCs/Telecen_Rug_Black.png"); 
    this.load.image("Telecen Rug Blue", "assets/images/UGCs/Telecen_Rug_Blue.png"); 
    this.load.image("Telecen Table Glass", "assets/images/UGCs/TelecenTableGlass.png");
  }

  create(data) {
    const assetId = data.assetId || "unknown";

    // Create HTML overlay
    const overlay = document.createElement('div');
    overlay.id = 'order-overlay';
    document.body.appendChild(overlay);

    overlay.innerHTML = `
      <div class="order-container">
        <div class="order-header">
          <h1 class="order-title">ORDER UGCs</h1>
          <button class="order-close-btn" aria-label="Close order dialog">✕</button>
        </div>
        <div class="order-grid">
          <div class="order-item">
            <img src="assets/images/UGCs/Sunflower.png" alt="Sunflower" class="order-item-image">
            <h3 class="order-item-name">Sunflower</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/SAQUARIUM.png" alt="SAQUARIUM" class="order-item-image">
            <h3 class="order-item-name">SAQUARIUM</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Bechi_Fence.png" alt="Bechi Fence" class="order-item-image">
            <h3 class="order-item-name">Bechi Fence</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Little_Goose.png" alt="Little Goose" class="order-item-image">
            <h3 class="order-item-name">Little Goose</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Welcome_Sign.png" alt="Welcome Sign" class="order-item-image">
            <h3 class="order-item-name">Welcome Sign</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Bixelnaire_Bar.png" alt="Bixelnaire Bar" class="order-item-image">
            <h3 class="order-item-name">Bixelnaire Bar</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Deer_Head.png" alt="Deer Head" class="order-item-image">
            <h3 class="order-item-name">Deer Head</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Wall_Lamp_Single.png" alt="Wall Lamp Single" class="order-item-image">
            <h3 class="order-item-name">Wall Lamp Single</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/wall_lamp.png" alt="Wall Lamp" class="order-item-image">
            <h3 class="order-item-name">Wall Lamp</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Wall_Lamp_Blue.png" alt="Wall Lamp Blue" class="order-item-image">
            <h3 class="order-item-name">Wall Lamp Blue</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelecenTableMetal.png" alt="Telecen Table Metal" class="order-item-image">
            <h3 class="order-item-name">Telecen Table Metal</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelecenTableWooden.png" alt="Telecen Table Wooden" class="order-item-image">
            <h3 class="order-item-name">Telecen Table Wooden</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelecenTableGlass.png" alt="Telecen Table Glass" class="order-item-image">
            <h3 class="order-item-name">Telecen Table Glass</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelevisionwithGlassStand.png" alt="Television with Glass stand" class="order-item-image">
            <h3 class="order-item-name">TV - Glass Stand</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelevisionwithMetalStand.png" alt="Television with Metal stand" class="order-item-image">
            <h3 class="order-item-name">TV - Metal Stand</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/TelevisionwithWoodenStand.png" alt="Television with Wooden stand" class="order-item-image">
            <h3 class="order-item-name">TV - Wooden Stand</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Borey_Balcony.png" alt="Borey Balcony" class="order-item-image">
            <h3 class="order-item-name">Borey Balcony</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Borey_Door.png" alt="Borey Door" class="order-item-image">
            <h3 class="order-item-name">Borey Door</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Borey_Window.png" alt="Borey Window" class="order-item-image">
            <h3 class="order-item-name">Borey Window</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Couch_Black.png" alt="Telecen Couch Black" class="order-item-image">
            <h3 class="order-item-name">Telecen Couch Black</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Couch_Purple.png" alt="Telecen Couch Purple" class="order-item-image">
            <h3 class="order-item-name">Telecen Couch Purple</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Dining_Glass.png" alt="Telecen Dining Glass" class="order-item-image">
            <h3 class="order-item-name">Telecen Dining Glass</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Dining_Metal.png" alt="Telecen Dining Metal" class="order-item-image">
            <h3 class="order-item-name">Telecen Dining Metal</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Dining_Wooden.png" alt="Telecen Dining Wooden" class="order-item-image">
            <h3 class="order-item-name">Telecen Dining Wooden</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_L.png" alt="Telecen Kitchen Metal L" class="order-item-image">
            <h3 class="order-item-name">Kitchen Metal L</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_M.png" alt="Telecen Kitchen Metal M" class="order-item-image">
            <h3 class="order-item-name">Kitchen Metal M</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_R.png" alt="Telecen Kitchen Metal R" class="order-item-image">
            <h3 class="order-item-name">Kitchen Metal R</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Glass_L.png" alt="Telecen Kitchen Glass L" class="order-item-image">
            <h3 class="order-item-name">Kitchen Glass L</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Glass_R.png" alt="Telecen Kitchen Glass R" class="order-item-image">
            <h3 class="order-item-name">Kitchen Glass R</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Rug_Black.png" alt="Telecen Rug Black" class="order-item-image">
            <h3 class="order-item-name">Telecen Rug Black</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
          <div class="order-item">
            <img src="assets/images/UGCs/Telecen_Rug_Blue.png" alt="Telecen Rug Blue" class="order-item-image">
            <h3 class="order-item-name">Telecen Rug Blue</h3>
            <div class="order-price-container">
              <img src="assets/pixelCoin.png" alt="Coin" class="order-price-icon">
              <span class="order-price">100</span>
            </div>
            <button class="order-btn">ORDER</button>
          </div>
        </div>
      </div>
    `;

    // Create and append styles with unique ID
    const style = document.createElement('style');
    style.id = 'order-overlay-styles';
    style.textContent = `
      * {
        box-sizing: border-box;
      }

      #order-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 10px;
        overflow-y: auto;
      }

      .order-container {
        background: linear-gradient(135deg, #6626ff 0%, #4a1f99 100%);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1200px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        padding: 16px 24px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        gap: 16px;
      }

      .order-title {
        margin: 0;
        font-size: clamp(20px, 5vw, 36px);
        color: #ffffff;
        font-weight: 700;
        letter-spacing: 1px;
      }

      .order-close-btn {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .order-close-btn:hover {
        background: #c82333;
        transform: scale(1.05);
      }

      .order-close-btn:active {
        transform: scale(0.98);
      }

      .order-grid {
        flex: 1;
        padding: 20px;
        background: #28237d;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
        overflow-y: auto;
        align-content: start;
      }

      .order-item {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .order-item:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(102, 38, 255, 0.3);
      }

      .order-item-image {
        width: 100%;
        height: 120px;
        object-fit: contain;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.2);
      }

      .order-item-name {
        margin: 0;
        font-size: clamp(11px, 2vw, 14px);
        color: #ffffff;
        font-weight: 600;
        text-align: center;
        line-height: 1.3;
        min-height: 32px;
        display: flex;
        align-items: center;
      }

      .order-price-container {
        display: flex;
        align-items: center;
        gap: 6px;
        justify-content: center;
      }

      .order-price-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
      }

      .order-price {
        font-weight: 700;
        color: #dbfa15;
        font-size: clamp(12px, 2.5vw, 16px);
      }

      .order-btn {
        width: 100%;
        padding: 8px 12px;
        background: linear-gradient(135deg, #db742e 0%, #c85920 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: clamp(11px, 2vw, 13px);
        font-weight: 600;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .order-btn:hover {
        background: linear-gradient(135deg, #31f355 0%, #28d946 100%);
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(49, 243, 85, 0.3);
      }

      .order-btn:active {
        transform: scale(0.98);
      }

      /* Scrollbar styling */
      .order-grid::-webkit-scrollbar {
        width: 8px;
      }

      .order-grid::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }

      .order-grid::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }

      .order-grid::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }

      /* Tablet: 768px and up */
      @media (min-width: 768px) {
        .order-grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 18px;
          padding: 24px;
        }

        .order-item {
          padding: 14px;
        }

        .order-item-image {
          height: 140px;
        }
      }

      /* Desktop: 1024px and up */
      @media (min-width: 1024px) {
        .order-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          padding: 28px;
        }

        .order-item {
          padding: 16px;
        }

        .order-item-image {
          height: 160px;
        }

        .order-close-btn {
          width: 44px;
          height: 44px;
          font-size: 26px;
        }
      }

      /* Large desktop: 1440px and up */
      @media (min-width: 1440px) {
        .order-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .order-item-image {
          height: 180px;
        }
      }
    `;
    document.head.appendChild(style);

    // Event delegation for order buttons
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('order-btn')) {
        this.openOrderForm();
      } else if (e.target.classList.contains('order-close-btn')) {
        this.closeOverlay();
      }
    });

    // Close when clicking outside the container
    overlay.addEventListener('click', (e) => {
      if (e.target.id === 'order-overlay') {
        this.closeOverlay();
      }
    });

    // Close on ESC key
    this.input.keyboard.once('keydown-ESC', () => this.closeOverlay());
  }

  openOrderForm() {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSe3S63cCKfrrhqB89MrSPiwZLeyqFARGhVhXcvUJWYaFlfLWg/viewform?usp=dialog';
    const width = 500;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(url, 'buyPopup', `width=${width},height=${height},scrollbars=yes,resizable=yes,left=${left},top=${top}`);
  }

  update() {
    // No update logic needed for this scene
  }

  closeOverlay() {
    const overlay = document.getElementById('order-overlay');
    const style = document.getElementById('order-overlay-styles');
    
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    
    this.scene.stop();
  }
}
