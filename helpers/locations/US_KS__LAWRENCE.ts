// https://gis2.lawrenceks.org/traffic/GEN_15th%20&%20Iowa.jpeg?timestamp=1649469419896
// timestamp is optional

import { CAMERA } from '..';
import US_KS_LAWRENCE_UNPARSED from './US_KS__LAWRENCE.data.json';

export const PARSER_LAWRENCE_KS = (str: string): string => {
  return str.replace(/\s/g, '%20');
};

export const US_KS__LAWRENCE: CAMERA[] = US_KS_LAWRENCE_UNPARSED.data.map(
  (v) => {
    return {
      label: v.LABEL,
      image: PARSER_LAWRENCE_KS(v.URL),
      lat: v.lat,
      lng: v.lng,
      COUNTRY_STATE__CITY: 'US_KS__LAWRENCE',
    };
  }
);
