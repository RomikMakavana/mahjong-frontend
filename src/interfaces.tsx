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