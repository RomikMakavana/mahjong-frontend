import { User } from "firebase/auth";

export type PickedFrom = 'rest' | 'discarded';

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

export interface GameData {
  is_game_completed: boolean;
  is_game_started: boolean;
  turn_timeout: number;
  game_code: string;
  status: string;
  player_in_sequence: PlayerDetails[];
  will_starts_at: number | null;
}


export interface PlaygroundDetails {
  game_code: string;
  current_turn_completed: boolean;
  current_turn_player: string;
  current_turn_status: string | null;
  last_term_ends_at: number;
  is_game_completed: boolean;
  is_game_started: boolean;
  next_player: string;
  discard_card: string;
  status: string;
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
  usersPlayingOtherGames: string[];
  status: string;
  game_code: string;
  turn_timeout: number;
  is_game_started: boolean;
  start_with_system_players: boolean;
  is_game_completed: boolean;
  not_started_details: {
    begin_in_n_seconds: null | number,
    begin_time: null | number,
  }
  win_details: {
    winner:{
      _id: string;
      card_list: string[];
      flower_card_list: string[];
    }
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
    discard_card_list: string[];
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

export interface PlayerDetails {
  _id: string;
  player_name: string;
  player_index: number;
  user_id: string | null;
  profile_img: string;
}

export interface CreateRoomDataType {
  game_name : string,
  turn_timeout : number,
  min_level_to_win : number,
  bet_amount : number,
  is_game_private: boolean
}

export interface Option {
  value: string | number;
  label: string;
}

export interface MainPlayer {
  card_list: string[];
  flower_card_list: string[];
  matched_list: string[][];
}