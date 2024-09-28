import { User } from "firebase/auth";

export interface TournamentStat {
  icon: string;
  label: string;
  value: string;
}

export interface AuthDetails {
  name: string;
  email: string;
  uid: string;
  loggedInWith?: 'google' | 'password'
}

export interface Notification {
  message: string;
  type: "success" | "error" | "info";
}



// API Responses

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: { [key: string]: string };
  code: string;
}

export interface StartGameAPIResponse {
  game_id: string;
}

export interface GameDetails {
  game_code: string;
  is_game_started: boolean;
  start_with_system_players: boolean;
  is_game_completed: boolean;
  win_details: {
    winner: any;
  };
  current_turn_player: string | null;
  next_player: string;
  discardCard: any | null;
  player: {
    _id: string;
    card_list: string[];
    flower_card_list: string[];
    player_index: number;
    matched_list: string[];
  };
  players: {
    _id: string;
    player_name: string;
    player_index: number;
    user_id: string | null;
  }[];
  private_detail: {
    discard_card_list: any;
  }

}

export interface Profile {
  email: string;
  _id: string;
}

export interface Tournament {
  game_code: string;
  is_game_started: boolean;
  _id: string;
  players: {
    player_name: string;
    user_id: string;
    _id: string
  }[]

}

export interface MahjongUser { firebaseUser: User, apiUser: Profile }