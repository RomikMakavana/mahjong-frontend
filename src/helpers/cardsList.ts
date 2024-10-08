import Bamboo1 from '@/assets/images/cards/bamboo-1/1.png';
import Bamboo2 from '@/assets/images/cards/bamboo-1/2.png';
import Bamboo3 from '@/assets/images/cards/bamboo-1/3.png';
import Bamboo4 from '@/assets/images/cards/bamboo-1/4.png';
import Bamboo5 from '@/assets/images/cards/bamboo-1/5.png';
import Bamboo6 from '@/assets/images/cards/bamboo-1/6.png';
import Bamboo7 from '@/assets/images/cards/bamboo-1/7.png';
import Bamboo8 from '@/assets/images/cards/bamboo-1/8.png';
import Bamboo9 from '@/assets/images/cards/bamboo-1/9.png';

import Circle1 from '@/assets/images/cards/circle-1/1.png';
import Circle2 from '@/assets/images/cards/circle-1/2.png';
import Circle3 from '@/assets/images/cards/circle-1/3.png';
import Circle4 from '@/assets/images/cards/circle-1/4.png';
import Circle5 from '@/assets/images/cards/circle-1/5.png';
import Circle6 from '@/assets/images/cards/circle-1/6.png';
import Circle7 from '@/assets/images/cards/circle-1/circle7.png';
import Circle8 from '@/assets/images/cards/circle-1/circle8.png';
import Circle9 from '@/assets/images/cards/circle-1/9.png';

import Character1 from '@/assets/images/cards/characters-1/1.png';
import Character2 from '@/assets/images/cards/characters-1/2.png';
import Character3 from '@/assets/images/cards/characters-1/3.png';
import Character4 from '@/assets/images/cards/characters-1/4.png';
import Character5 from '@/assets/images/cards/characters-1/5.png';
import Character6 from '@/assets/images/cards/characters-1/6.png';
import Character7 from '@/assets/images/cards/characters-1/7.png';
import Character8 from '@/assets/images/cards/characters-1/8.png';
import Character9 from '@/assets/images/cards/characters-1/9.png';

import DragonGreen from '@/assets/images/cards/dragons-1/green.png';
import DragonRed from '@/assets/images/cards/dragons-1/red.png';
import DragonWhite from '@/assets/images/cards/dragons-1/white.png';

import WindEast from '@/assets/images/cards/winds-1/east.png';
import WindWest from '@/assets/images/cards/winds-1/west.png';
import WindNorth from '@/assets/images/cards/winds-1/north.png';
import WindSouth from '@/assets/images/cards/winds-1/south.png';

import Flower1 from '@/assets/images/cards/flowers-1/flower-1.png';
import Flower2 from '@/assets/images/cards/flowers-1/flower-2.png';

import WaitingCard from '@/assets/images/svg/cards/waiting_card_back_side.png';

import { StaticImageData } from 'next/image';

const CARDS:{[key:string]:StaticImageData} = {
    // Bamboo cards
    "bamboos-1": Bamboo1,
    "bamboos-2": Bamboo2,
    "bamboos-3": Bamboo3,
    "bamboos-4": Bamboo4,
    "bamboos-5": Bamboo5,
    "bamboos-6": Bamboo6,
    "bamboos-7": Bamboo7,
    "bamboos-8": Bamboo8,
    "bamboos-9": Bamboo9,

    // Circle cards
    "circles-1": Circle1,
    "circles-2": Circle2,
    "circles-3": Circle3,
    "circles-4": Circle4,
    "circles-5": Circle5,
    "circles-6": Circle6,
    "circles-7": Circle7,
    "circles-8": Circle8,
    "circles-9": Circle9,

    //character cards
    "characters-1": Character1,
    "characters-2": Character2,
    "characters-3": Character3,
    "characters-4": Character4,
    "characters-5": Character5,
    "characters-6": Character6,
    "characters-7": Character7,
    "characters-8": Character8,
    "characters-9": Character9,

    // Dragon cards
    "dragons-green": DragonGreen,
    "dragons-red": DragonRed,
    "dragons-white": DragonWhite,

    // Wind cards
    "winds-east": WindEast,
    "winds-west": WindWest,
    "winds-north": WindNorth,
    "winds-south": WindSouth,

    // Flower cards
    "flowers-flower-1" : Flower1,
    "flowers-flower-2" : Flower2,

    // Waiting card
    "waiting-card": WaitingCard,
}

export default CARDS;
