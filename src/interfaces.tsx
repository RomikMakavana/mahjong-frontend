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
    message:string;
    data: T;
    errors: {[key:string]:string} ;
    code: string;
  }

  export interface StartGameAPIResponse {
    game_id: string;
  }