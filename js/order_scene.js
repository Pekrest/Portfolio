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
    this.load.image("Telecen Table Metal", "..assets/images/UGCs/Telecen_Table_Metal.png"); 
    this.load.image("Telecen Table Wooden", "..assets/images/UGCs/Telecen_Table_Wooden.png"); 
    this.load.image("Television with Glass stand", "..assets/images/UGCs/Television_with_Glass_stand.png"); 
    this.load.image("Television with Metal stand", "..assets/images/UGCs/Television_with_Metal_stand.png"); 
    this.load.image("Television with Wooden stand", "..assets/images/UGCs/Television_with_Wooden_stand.png"); 
    this.load.image("Wall Lamp Blue", "..assets/images/UGCs/Wall_Lamp_Blue.png"); 
    this.load.image("Wall Lamp Single", "..assets/images/UGCs/Wall_Lamp_Single.png"); 
    this.load.image("wall lamp", "..assets/images/UGCs/wall_lamp.png"); 
    this.load.image("Welcome Sign", "..assets/images/UGCs/Welcome_Sign.png"); 
    this.load.image("Bechi Fence", "..assets/images/UGCs/Bechi_Fence.png"); 
    this.load.image("Bixelnaire Bar", "..assets/images/UGCs/Bixelnaire_Bar.png"); 
    this.load.image("Borey Balcony", "..assets/images/UGCs/Borey_Balcony.png"); 
    this.load.image("Borey Door", "..assets/images/UGCs/Borey_Door.png"); 
    this.load.image("Borey Window", "..assets/images/UGCs/Borey_Window.png"); 
    this.load.image("Deer Head", "..assets/images/UGCs/Deer_Head.png"); 
    this.load.image("Little Goose", "..assets/images/UGCs/Little_Goose.png"); 
    this.load.image("Telecen Couch Black", "..assets/images/UGCs/Telecen_Couch_Black.png"); 
    this.load.image("Telecen Couch Purple", "..assets/images/UGCs/Telecen_Couch_Purple.png"); 
    this.load.image("Telecen Dining Glass", "..assets/images/UGCs/Telecen_Dining_Glass.png"); 
    this.load.image("Telecen Dining Metal", "..assets/images/UGCs/Telecen_Dining_Metal.png"); 
    this.load.image("Telecen Dining Wooden", "..assets/images/UGCs/Telecen_Dining_Wooden.png"); 
    this.load.image("Telecen Kitchen Glass L", "..assets/images/UGCs/Telecen_Kitchen_Glass_L.png");
     this.load.image("Telecen Kitchen Glass R", "..assets/images/UGCs/Telecen_Kitchen_Glass_R.png"); 
    this.load.image("Telecen Kitchen Metal L", "..assets/images/UGCs/Telecen_Kitchen_Metal_L.png"); 
    this.load.image("Telecen Kitchen Metal M", "..assets/images/UGCs/Telecen_Kitchen_Metal_M.png"); 
    this.load.image("Telecen Kitchen Metal R", "..assets/images/UGCs/Telecen_Kitchen_Metal_R.png"); 
    this.load.image("Telecen Rug Black", "..assets/images/UGCs/Telecen_Rug_Black.png"); 
    this.load.image("Telecen Rug Blue", "..assets/images/UGCs/Telecen_Rug_Blue.png"); 
    this.load.image("Telecen Table Glass", "..assets/images/UGCs/Telecen_Table_Glass.png");
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
            <img src="assets/images/UGCs/Bechi_Fence.png" alt="Bechi Fence" class="item-image">
            <span class="item-name">Bechi Fence</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Little_Goose.png" alt="Little Goose" class="item-image">
            <span class="item-name">Little Goose</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Welcome_Sign.png" alt="Welcome Sign" class="item-image">
            <span class="item-name">Welcome Sign</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Bixelnaire_Bar.png" alt="Bixelnaire Bar" class="item-image">
            <span class="item-name">Bixelnaire Bar</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Deer_Head.png" alt="Deer Head" class="item-image">
            <span class="item-name">Deer Head</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Wall_Lamp_Single.png" alt="Wall Lamp Single" class="item-image">
            <span class="item-name">Wall Lamp Single</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/wall_lamp.png" alt="Wall Lamp" class="item-image">
            <span class="item-name">wall lamp.png</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Wall_Lamp_Blue.png" alt="Wall Lamp Blue" class="item-image">
            <span class="item-name">Wall Lamp Blue</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Table_Metal.png" alt="Telecen Table Metal" class="item-image">
            <span class="item-name">Telecen Table Metal</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Table_Wooden.png" alt="Telecen Table Wooden" class="item-image">
            <span class="item-name">Telecen Table Wooden</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Table_Glass.png" alt="Telecen Table Glass" class="item-image">
            <span class="item-name">Telecen Table Glass</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Television_with_Glass_stand.png" alt="Television with Glass stand" class="item-image">
            <span class="item-name">Television with Glass stand</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Television_with_Metal_stand.png" alt="Television with Metal stand" class="item-image">
            <span class="item-name">Television with Metal stand</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Television_with_Wooden_stand.png" alt="Television with Wooden stand" class="item-image">
            <span class="item-name">Television with Wooden stand</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Borey_Balcony.png" alt="Borey Balcony" class="item-image">
            <span class="item-name">Borey Balcony</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Borey_Door.png" alt="Borey Door" class="item-image">
            <span class="item-name">Borey Door</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Borey_Window.png" alt="Borey Window" class="item-image">
            <span class="item-name">Borey Window</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Couch_Black.png" alt="Telecen Couch Black" class="item-image">
            <span class="item-name">Telecen Couch Black</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Couch_Purple.png" alt="Telecen Couch Purple" class="item-image">
            <span class="item-name">Telecen Couch Purple</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Dining_Glass.png" alt="Telecen Dining Glass" class="item-image">
            <span class="item-name">Telecen Dining Glass</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Dining_Metal.png" alt="Telecen Dining Metal" class="item-image">
            <span class="item-name">Telecen Dining Metal</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Dining_Wooden.png" alt="Telecen Dining Wooden" class="item-image">
            <span class="item-name">Telecen Dining Wooden</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_L.png" alt="Telecen Kitchen Metal L" class="item-image">
            <span class="item-name">Telecen Kitchen Metal L</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_M.png" alt="Telecen Kitchen Metal M" class="item-image">
            <span class="item-name">Telecen Kitchen Metal M</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Metal_R.png" alt="Telecen Kitchen Metal R" class="item-image">
            <span class="item-name">Telecen Kitchen Metal R</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Glass_L.png" alt="Telecen Kitchen Glass L" class="item-image">
            <span class="item-name">Telecen Kitchen Glass L</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
           <div class="item">
            <img src="assets/images/UGCs/Telecen_Kitchen_Glass_R.png" alt="Telecen Kitchen Glass R" class="item-image">
            <span class="item-name">Telecen Kitchen Glass R</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Rug_Black.png" alt="Telecen Rug Black" class="item-image">
            <span class="item-name">Telecen Rug Black</span>
            <div class="price-container">
              <img src="assets/pixelCoin.png" alt="pixelCoin" class="price-icon">
              <span class="price">100</span>
            </div>
            <button>ORDER</button>
          </div>
          <div class="item">
            <img src="assets/images/UGCs/Telecen_Rug_Blue.png" alt="Telecen Rug Blue" class="item-image">
            <span class="item-name">Telecen Rug Blue</span>
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
        height: 40px;
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