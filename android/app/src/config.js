import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyAlm1U20JLj6BAOgLfkhcCQDehsm80L03A',
  authDomain: 'newworld-f5884.firebaseapp.com',
  databaseURL: 'https://newworld-f5884.firebaseio.com',
  projectId: 'newworld-f5884',
  storageBucket: "newworld-f5884.appspot.com",
  messagingSenderId: "1016024845465",
};
let app = Firebase.initializeApp(config);
export const db = app.database();