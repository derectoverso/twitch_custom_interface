// src/types/twitch.d.ts
declare global {
    interface Window {
      Twitch?: {
        Embed: any;
        Player: any;
      };
    }
  }
  
  export {};