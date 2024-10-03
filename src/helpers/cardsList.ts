import Bamboo1 from '@/assets/images/cards/bamboo/1.png';
import Bamboo2 from '@/assets/images/cards/bamboo/2.png';
import Bamboo3 from '@/assets/images/cards/bamboo/3.png';
import Bamboo4 from '@/assets/images/cards/bamboo/4.png';
import Bamboo5 from '@/assets/images/cards/bamboo/5.png';
import Bamboo6 from '@/assets/images/cards/bamboo/6.png';
import Bamboo7 from '@/assets/images/cards/bamboo/7.png';
import Bamboo8 from '@/assets/images/cards/bamboo/8.png';
import Bamboo9 from '@/assets/images/cards/bamboo/9.png';

import Circle1 from '@/assets/images/cards/circle/1.png';
import Circle2 from '@/assets/images/cards/circle/2.png';
import Circle3 from '@/assets/images/cards/circle/3.png';
import Circle4 from '@/assets/images/cards/circle/4.png';
import Circle5 from '@/assets/images/cards/circle/5.png';
import Circle6 from '@/assets/images/cards/circle/6.png';
import Circle7 from '@/assets/images/cards/circle/7.png';
import Circle8 from '@/assets/images/cards/circle/8.png';
import Circle9 from '@/assets/images/cards/circle/9.png';

import Character1 from '@/assets/images/cards/characters/1.png';
import Character2 from '@/assets/images/cards/characters/2.png';
import Character3 from '@/assets/images/cards/characters/3.png';
import Character4 from '@/assets/images/cards/characters/4.png';
import Character5 from '@/assets/images/cards/characters/5.png';
import Character6 from '@/assets/images/cards/characters/6.png';
import Character7 from '@/assets/images/cards/characters/7.png';
import Character8 from '@/assets/images/cards/characters/8.png';
import Character9 from '@/assets/images/cards/characters/9.png';

import DragonGreen from '@/assets/images/cards/dragons/green.png';
import DragonRed from '@/assets/images/cards/dragons/red.png';
import DragonWhite from '@/assets/images/cards/dragons/white.png';

import WindEast from '@/assets/images/cards/winds/east.png';
import WindWest from '@/assets/images/cards/winds/west.png';
import WindNorth from '@/assets/images/cards/winds/north.png';
import WindSouth from '@/assets/images/cards/winds/south.png';

import Flower1 from '@/assets/images/cards/flowers/flower-1.png';
import Flower2 from '@/assets/images/cards/flowers/flower-2.png';

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
    "flowers-flower-2" : Flower2
}

export default CARDS;

// key suggestion

//characters-1
//circles-1
//winds-south
//dragons-red
//flowers-flower-1