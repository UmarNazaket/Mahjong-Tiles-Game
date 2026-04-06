/**
 * Represents an entry in the high scores leaderboard.
 */
export interface LeaderboardEntry {
  /** The name entered by the player */
  playerName: string;
  
  /** The final score achieved */
  score: number;
  
  /** The ISO date string when the score was achieved */
  date: string;
  
  /** Total number of rounds played in the session */
  roundsPlayed: number;
}
