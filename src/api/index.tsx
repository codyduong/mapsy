import Firebase from '../App.firebase';
import type { Bounds } from '../components/map';

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
        return values;
    }
};

export default api;