import axios from "axios";
import config from "./config";
import { ApiResponse, GameDetails, StartGameAPIResponse } from "@/interfaces";
import { AuthService } from "./auth";


const APIService = {

    headers: async () => {
        const user = await AuthService.getProfile();
        if (user) {
          return {
            Authorization: await user.getIdToken()
          }
        } else {
          AuthService.logout();
          window.location.reload();
        }
      },


    startGame: async (randomNumber: number) => {
        const url = `${config.baseUrl}${config.endPoints.startGame()}`;
        const res = await axios.request<ApiResponse<StartGameAPIResponse>>({
            method: 'POST',
            url: url,
            data: {
                random_number: randomNumber
            },
            headers: await APIService.headers()
        })
        return res;
    },

    getGameDetails: async (gameId:string) => {
      const url = `${config.baseUrl}${config.endPoints.getGameDetails(gameId)}`;
      const res = await axios.request<ApiResponse<GameDetails>>({
        method: 'GET',
        url: url,
        headers: await APIService.headers()
      })
      return res;
    }
}

export default APIService;