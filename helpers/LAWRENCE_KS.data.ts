type CAMERA_LAWRENCE_KS = {
  LABEL: string //Street name/intersection
  URL: string //Url to jpeg, without timestamp will return most recent
  x: number //Not in lat
  y: number //Not in long
  lat: number
  lng: number
}

/** Multiline cursor copy template
LABEL:
URL:
x:
y:
lat:
lng:
*/

// Had to manually create this >:(

export const CAMERAS_LAWRENCE_KS_UNPARSED: CAMERA_LAWRENCE_KS[] = [
    {
        LABEL: '6TH & GEORGE WILLIAMS',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & George Williams.jpeg',
        x: -10611614.989980001,
        y: 4717588.224440064,
        lat: 38.971488,
        lng: -95.325759,
    },
    {
        LABEL: '6TH & STONERIDGE',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th &  Stoneridge.jpeg',
        x: -10611091.148970738,
        y: 4717590.297981989,
        lat: 38.971502,
        lng: -95.321054,
    },
    {
        LABEL: '6TH & CONGRESSIONAL',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & Congressional.jpeg',
        x: -10609988.618575674,
        y: 4717593.300963223,
        lat: 38.971523,
        lng: -95.311149
    },
    {
        LABEL: '6TH & WAKARUSA',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & Wakarusa.jpeg',
        x: -10609524.538548615,
        y: 4717594.043081373,
        lat: 38.971528,
        lng: -95.306981
    },
    {
        LABEL: '6TH & CHAMPION',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & Champion.jpeg',
        x: -10609078.16495119,
        y: 4717594.846822124,
        lat: 38.971534,
        lng: -95.302971
    },
    {
        LABEL: '6TH & FOLKS',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & Folks.jpeg',
        x: -10608482.44695786,
        y: 4717595.887673164,
        lat: 38.971541,
        lng: -95.297619,
    },
    {
        LABEL: '6TH & MONTEREY',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_6th & Monterey Way.jpeg',
        x: -10607447.425194876, 
        y: 4717596.282856306,
        lat: 38.971544,
        lng: -95.288321
    },
    {
        LABEL: '23RD & O\'CONNELL',
        URL: 'https://gis2.lawrenceks.org/traffic/GEN_23rd & O\'Connell.jpeg',
        x: -10598163.445255246,
        y: 4713464.3947114805,
        lat: 38.942681,
        lng: -95.204922
    }
];