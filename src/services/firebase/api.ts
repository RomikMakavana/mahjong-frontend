import axios from "axios";
import config from "./config";
import { ApiResponse, CreateRoomDataType, GameDetails, MahjongUser, Profile, StartGameAPIResponse } from "@/interfaces";
import { AuthService } from "./auth";
import { User } from "firebase/auth";


const APIService = {
  user: null as null | MahjongUser,

  headers: async () => {
    const user = AuthService.getAuthDetails();

    if (user) {
      return {
        Authorization: await user.getIdToken()
      }
    } else {
      AuthService.logout();
      // window.location.reload();
    }
  },


  createRoom: async (data: CreateRoomDataType) => {
    const url = `${config.baseUrl}${config.endPoints.createRoom()}`;
    const res = await axios.request<ApiResponse<StartGameAPIResponse>>({
      method: 'POST',
      url: url,
      data: data,
      headers: await APIService.headers()
    })
    return res;
  },

  getGameDetails: async (gameId: string) => {
    const url = `${config.baseUrl}${config.endPoints.getGameDetails(gameId)}`;
    const res = await axios.request<ApiResponse<GameDetails>>({
      method: 'GET',
      url: url,
      headers: await APIService.headers()
    })
    return res;
  },
  profile: async () => {
    const url = `${config.baseUrl}${config.endPoints.profile()}`;
    const res = await axios.request<ApiResponse<Profile>>({
      method: 'GET',
      url: url,
      headers: await APIService.headers()
    })
    return res;
  },
  // getProfile: async (hard = false) => {
  //   if(!APIService.user || hard){
  //     const res = await APIService.profile();
  //     const firebaseUser = await AuthService.getProfile();
  //     if(res.status == 200 && res.data.success === true && firebaseUser){
  //       APIService.user = { apiUser: res.data.data, firebaseUser };
  //     }else{
  //       APIService.user = null;
  //       AuthService.user = null;
  //       AuthService.logout();
  //     }
  //   }
  //   return APIService.user;
  // },


  getProfile: async (hard = false) => {
    if (!APIService.user || hard) {
      const firebaseUser = await AuthService.getProfile();      
      if (firebaseUser) {
        try {
          const res = await APIService.profile();
          if (res.status == 200 && res.data.success === true) {
            APIService.user = { apiUser: res.data.data, firebaseUser };
          } else {
            AuthService.logout();
            APIService.user = null;
            AuthService.user = null;
          }
        } catch (error) {
          console.log(error);
          AuthService.logout();
          APIService.user = null;
          AuthService.user = null;
        }
      } else {
        APIService.user = null;
        AuthService.user = null;
        AuthService.logout();
      }
    }
    return APIService.user;
  },

  joinRandomGame: async () => {
    const url = `${config.baseUrl}${config.endPoints.joinRandomGame()}`;
    const res = await axios.request<ApiResponse<any>>({
      method: 'GET',
      url: url,
      headers: await APIService.headers()
    })
    return res;
  },
  login: async (email: string) => {
    const user = AuthService.getAuthDetails();
    if (user) {
      const authToken = await user.getIdToken();
      if (authToken) {
        const url = `${config.baseUrl}${config.endPoints.login()}`;
        const res = await axios.request<ApiResponse<{ token: string }>>({
          method: 'POST',
          url: url,
          data: {
            email, authToken: authToken
          }
        })
        return { res: res.data.data, status: true };
      } else {
        return { res: null, status: false }
      }
    } else {
      return { res: null, status: false }
    }
  },
  beginGame: async (gameId: string, start_with_system_players: boolean) => {
    const url = `${config.baseUrl}${config.endPoints.beginGame(gameId)}`;
    const res = await axios.request<ApiResponse<{}>>({
      method: 'POST',
      url: url,
      data: {
        start_with_system_players
      },
      headers: await APIService.headers()
    })
    return res;
  },

  pickCard: async (playerId: string, pickFrom:'rest' | 'discarded') => {
    const url = `${config.baseUrl}${config.endPoints.pickCard(playerId)}`;
    const res = await axios.request<ApiResponse<{pick_card: string}>>({
      method: 'POST',
      url: url,
      data: {
        player_id: playerId,
        pick_from: pickFrom
      },
      headers: await APIService.headers()
    })
    return res;
  },

  dropcard: async (playerId:string, dropedCard:string) => {
    const url = `${config.baseUrl}${config.endPoints.dropCard(playerId)}`;
    const res = await axios.request<ApiResponse<{}>>({
      method: 'POST',
      url: url,
      data: {
        player_id: playerId,
        drop_card: dropedCard
      },
      headers: await APIService.headers()
    })
    return res;
  }
}

export default APIService;