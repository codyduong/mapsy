import { CAMERA } from '..';
import fetch from 'node-fetch';

type OP_DATA_TYPE = {
    datecreated: `${number}-${number}-${number} ${number}:${number}:${number}.${number}`//"2008-01-08 08:07:24.000"
    height: number
    id: number //Increments from 1 to last camera
    imageurl: string //"https://www.opkansas.org/apps/images/traffic-cameras/151st_Conser_W.jpeg" //Url used to access image
    lat: number
    lng: number
    location: string //"151st & Conser"
    rotationangle: string //"90", not sure what this does
    videourl: string //
    width: number //resolution width, typically 1920
    x: number //alternate unknown form of lat/lng
    y: number
  }[]


// https://www2.opkansas.org/data/winter-storm/cameras.json?_c=1650925207

export const US_KS__OVERLAND_PARK: Promise<CAMERA[]> = (async () => {
  const OP_DATA: OP_DATA_TYPE = (await (await fetch('https://www2.opkansas.org/data/winter-storm/cameras.json')).json()) as OP_DATA_TYPE;

  return OP_DATA.map(
    (v) => {
      const imageurlSplit = v.imageurl.split('/');
      const imageurlParam = imageurlSplit[imageurlSplit.length - 1];

      return {
        label: v.location,
        // This url is not valid? It is transformed somewhere to a proper url, do the same...
        image: `https://www.opkansas.org/external-files/traffic-cameras/${imageurlParam}`,
        lat: v.lat,
        lng: v.lng,
        COUNTRY_STATE__CITY: 'US_KS__OVERLAND_PARK',
      };
    }
  );
})();
