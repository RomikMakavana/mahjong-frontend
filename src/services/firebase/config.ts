const config = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL? process.env.NEXT_PUBLIC_API_BASE_URL : 'http://localhost:3031/web/',
    endPoints: {
        createRoom:() => `game`,
        profile:() => `profile`,
        getGameDetails: (gameId:string) => `game/${gameId}`,
        joinRandomGame: () => `join-random-game`,
        login: () => `login`,
        beginGame: (gameId:string) => `game/${gameId}/begin-game`,
        pickCard: (gameId:string) => `game/${gameId}/pick-card`,
        dropCard: (gameId:string) => `game/${gameId}/drop-card`,
    }

}

export default config;