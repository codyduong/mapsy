// https://gis2.lawrenceks.org/traffic/GEN_15th%20&%20Iowa.jpeg?timestamp=1649469419896
// timestamp is optional

import { CAMERA } from '.';
import { CAMERAS_LAWRENCE_KS_UNPARSED } from './LAWRENCE_KS.data';

export const PARSER_LAWRENCE_KS = (str: string): string => {
  return str.replace(/\s/g, '%20');
};

export const CAMERAS_LAWRENCE_KS: CAMERA[] = CAMERAS_LAWRENCE_KS_UNPARSED.map(
  (v) => {
    return {
      label: v.LABEL,
      image: PARSER_LAWRENCE_KS(v.URL),
      lat: v.lat,
      lng: v.lng,
    };
  }
);
