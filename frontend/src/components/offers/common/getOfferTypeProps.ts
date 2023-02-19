import { StandardOfferTypes } from 'src/types/OfferType';
import { IconKeys } from 'src/components/icon';

import blue from 'src/assets/offer-cards/b-blue.png';
import blueBig from 'src/assets/offer-cards/b-blue-big.png';
import green from 'src/assets/offer-cards/b-green.png';
import greenBig from 'src/assets/offer-cards/b-green-big.png';
import purple from 'src/assets/offer-cards/b-purple.png';
import purpleBig from 'src/assets/offer-cards/b-purple-big.png';
import yellow from 'src/assets/offer-cards/b-yellow.png';
import yellowBig from 'src/assets/offer-cards/b-yellow-big.png';
import pastele from 'src/assets/offer-cards/b-pastel.png';
import pasteleBig from 'src/assets/offer-cards/b-pastel-big.png';
import red from 'src/assets/offer-cards/b-red.png';
import redBig from 'src/assets/offer-cards/b-red-big.png';


export const getOfferTypeProps = (type: StandardOfferTypes | string) => {
    switch(type) {
        case StandardOfferTypes.beer:
            return {
                background: yellow,
                backgroundBig: yellowBig,
                icon: IconKeys.beer
            };
        case StandardOfferTypes.drink:
            return {
                background: purple,
                backgroundBig: purpleBig,
                icon: IconKeys.drink
            };
        case StandardOfferTypes.food:
            return {
                background: green,
                backgroundBig: greenBig,
                icon: IconKeys.food
            };
        case StandardOfferTypes.shots:
            return {
                background: blue,
                backgroundBig: blueBig,
                icon: IconKeys.shots
            };
        case StandardOfferTypes.wine:
            return {
                background: red,
                backgroundBig: redBig,
                icon: IconKeys.wine
            };
        case StandardOfferTypes.other:
        default:
            return {
                background: pastele,
                backgroundBig: pasteleBig,
                icon: IconKeys.other
            };
    }
};