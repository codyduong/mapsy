import { US_KS__LAWRENCE, 
  US_KS__OVERLAND_PARK } from './locations/';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'dotenv/config';

if (
  !process.env.apiKey ||
  !process.env.authDomain ||
  !process.env.projectId ||
  !process.env.storageBucket ||
  !process.env.messagingSenderId ||
  !process.env.appId ||
  !process.env.measurementId
) {
  throw new Error('check your .env');
}

const app = firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
});

const main = (async () => {
  const CAMERAS: CAMERA[] = [
    ...US_KS__LAWRENCE,
    ...await US_KS__OVERLAND_PARK,
  ];
  
  const db = app.firestore();
  const batch = db.batch();
  const events = db.collection('cameras');
  
  for (const camera of CAMERAS) {
    batch.set(events.doc(`${camera.COUNTRY_STATE__CITY}_${camera.label}`), camera);
  }
  
  batch.commit();  
});

main();

export type CAMERA = {
  label: string;
  image: string;
  lat: number; //+ is North, - is South
  lng: number; //+ is East,, - is West
  COUNTRY_STATE__CITY: string; //COUNTRY_STATE__CITY
};
