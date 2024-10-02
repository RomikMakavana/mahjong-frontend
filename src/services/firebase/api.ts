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


  startGame: async (data:CreateRoomDataType) => {
    const url = `${config.baseUrl}${config.endPoints.startGame()}`;
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
  getProfile: async (hard = false) => {
    if(!APIService.user || hard){
      const res = await APIService.profile();
      // const firebaseUser = null;
      const firebaseUser = await AuthService.getProfile();
      if(res.data && firebaseUser){
        APIService.user = { apiUser: res.data.data, firebaseUser };
      }else{
        APIService.user = null;
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
  }
}

export default APIService;