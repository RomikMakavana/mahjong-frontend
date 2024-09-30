const config = {
    // baseUrl: import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:3034/web/',
    // baseUrl:'http://localhost:3034/web/',
    baseUrl: 'http://localhost:3031/web/',
    endPoints: {
        startGame:() => `game`,
        profile:() => `profile`,
        getGameDetails: (gameId:string) => `game/${gameId}`,
        joinRandomGame: () => `join-random-game`, 
    }

}

export default config;