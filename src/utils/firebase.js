import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1grh5x3O9oQt5Qa79sbzdeffrKL9qjko",
  authDomain: "bfm-location.firebaseapp.com",
  projectId: "bfm-location",
  storageBucket: "bfm-location.appspot.com",
  messagingSenderId: "756542061451",
  appId: "1:756542061451:web:ade7a95a39bef5a94bcd8e",
  measurementId: "G-9KH2KY1N7K",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
