## 🀄 Mahjong Hand Betting Game

A high-quality web game built with Angular. It features smooth 3D tile animations, a smart scoring system, and a layout that works perfectly on phones, tablets, and computers.

---

## 🚀 How to Run the Game

1. **Go to the project folder:**
   ```bash
   cd Mahjong-Tiles-Game/game-frontend
   ```
2. **Install the needed tools:**
   ```bash
   npm install
   ```
   *(Note: If you encounter dependency errors, run `npm install --legacy-peer-deps` instead)*
3. **Start the game:**
   ```bash
   ng serve
   ```
4. **Play:**
   Open `http://localhost:4200/` in your browser.

---

## 🏗 Why the Code is Built Well

This project wasn't just "thrown together." It was built to be professional and easy to grow.

* **Easy to Add Features:** The game rules and the visual design are kept separate. This means adding things like some new features is easy and won't break the rest of the game.
* **Mathematical Accuracy:** The system carefully tracks every tile. When tiles are reshuffled, none are lost, ensuring the game stays fair and mathematically perfect.
* **Fast & Smooth:** Sounds play instantly without lag, and the 3D tile flips are optimized to run on the device's graphics processor. This keeps the game running at 60 frames per second, even on older phones.

---

## 🤖 How It Was Built (Human + AI)

This app is a result of **Human-AI Collaboration**. While I used AI to quickly build parts of the design and basic structures, I acted as the **Lead Engineer** to ensure everything was high-quality.

**My specific fixes and decisions:**

1. **Architecture:** I actively architected the project layout myself, mandating a strict separation of concerns into distinct `core`, `features`, and `store` modules so the app scales professionally. I also chose the latest Angular standalone components and Signals to keep the app modern and fast.
2. **Bug Fixing:** I fixed issues in the "Reshuffle" logic where tiles were accidentally disappearing in the AI-generated code.
3. **Technical Accuracy:** I created a custom ID system to make sure the game doesn't get confused when tracking many tiles at once.
4. **Mobile Fixes:** I forced the game to fit perfectly on mobile screens so the layout never breaks or scrolls sideways.

---

## 📂 Project Organization (Simple View)

* **Core:** The "brain" of the game. It handles the rules, scoring, sounds, and tile shuffling.
* **Store:** Remembers the current score, the tiles in your hand, and the game history.
* **Features:** The actual screens you see, like the game board, the betting buttons, and the leaderboard.
* **Shared:** Common pieces used everywhere, like the header and the "pop and flip" animations.

**Directory Tree Breakdown:**
```text
Mahjong-Tiles-Game/frontend/src/app/
├── core/                           # Business logic, Models, and Configurations
│   ├── config/
│   │   └── game.config.ts          
│   ├── enums/
│   │   └── game.enums.ts           
│   ├── models/
│   │   ├── game.model.ts           
│   │   ├── leaderboard.model.ts    
│   │   └── tile.model.ts           
│   ├── services/
│   │   ├── confetti.service.ts     
│   │   ├── deck.service.ts         
│   │   ├── game.service.ts         
│   │   ├── leaderboard.service.ts  
│   │   ├── scoring.service.ts      
│   │   ├── sound.service.ts        
│   │   └── storage.service.ts      
│   └── index.ts                    
│
├── store/                          # State Management (NgRx Signal Store)
│   ├── game/
│   │   ├── game.models.ts          
│   │   └── game.store.ts           
│   ├── leaderboard/
│   │   ├── leaderboard.models.ts
│   │   └── leaderboard.store.ts
│   └── index.ts
│
├── features/                       # Lazy-loaded Feature Modules
│   ├── game/
│   │   ├── components/
│   │   │   ├── betting-controls/   
│   │   │   ├── deck-status/        
│   │   │   ├── game-board/         
│   │   │   ├── game-over/          
│   │   │   ├── hand-display/       
│   │   │   ├── hand-history/       
│   │   │   ├── market-tracker/     
│   │   │   └── tile/               
│   │   └── game.routes.ts          
│   │
│   └── landing/
│       ├── components/
│       │   ├── landing-page/       
│       │   └── leaderboard/        
│       └── landing.routes.ts       
│
├── shared/                         # Reusable UI Plumbing
│   ├── animations/
│   │   └── game.animations.ts      
│   ├── components/
│   │   ├── header/                 
│   │   └── score-display/          
│   ├── pipes/
│   │   └── tile-icon.pipe.ts       
│   └── index.ts
│
├── layouts/                        
│   └── game-layout/                
│
├── app.config.ts                   
├── app.routes.ts                   
└── app.ts                          
```

**In short:** The code is organized so that if you want to change how a tile looks, you only change one file. If you want to change the rules, you only change one file. This makes it "Scalable"—ready for any new ideas!
