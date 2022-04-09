import Firebase from '../App.firebase';
import type { Bounds } from '../components/map';

type LatNLng = {
    lat: number,
    lng: number
}

type Conditions = {
    temperature: number;
    unit: string;
    weather: string;
}

export type Camera = {
    label: string,
    image: string,
    lat: number, //+ is North, - is South
    lng: number, //+ is East,, - is West
}

const api = {
    getCamerasInBounds: async (bounds: Bounds) => {
        const db = Firebase.firestore();
        const cameras = db.collection('cameras');
        const matching_lat = await cameras.where('lat', '>=', bounds.lat.lower).where('lat', '<=', bounds.lat.upper).get();
        const matching_lng = await cameras.where('lng', '>=', bounds.lng.lower).where('lng', '<=', bounds.lng.upper).get();

        const associative_array_lat = matching_lat.docs.reduce((previousValue, currentValue) => {
            const data: any = currentValue.data();
            const obj: any = previousValue;
            if (data) {
                obj[data.label] = data;
            }
            return obj;
        }, {} as any);
        const associate_array_lng = matching_lng.docs.reduce((previousValue, currentValue) => {
            const data: any = currentValue.data();
            const obj: any = previousValue;
            if (data) {
                obj[data.label] = data;
            }
            return obj;
        }, {} as any);
        const values = [];
        for (const [key, value] of Object.entries(associative_array_lat)) {
            if (associate_array_lng[key]) {
                values.push(value);
            }
        }
        return values as Camera[];
    },
    getWeather: async(latNLng: LatNLng) => {
        const url = `https://api.weather.gov/points/${latNLng.lat},${latNLng.lng}`;
        const weatherhourly = await (await fetch(url)).json();
        console.log(weatherhourly);
        const weather = await (await fetch(weatherhourly.properties.forecastHourly)).json();
        const conditions = {temperature: weather.properties.periods[0].temperature, unit: weather.properties.periods[0].temperatureUnit, weather: weather.properties.periods[0].shortForecast};
        return conditions as Conditions;
    }
};

export default api;