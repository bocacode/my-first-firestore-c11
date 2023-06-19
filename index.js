// import tools we need from firebase-admin library
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// import our credentials from secrets.js
import { creds } from "./secrets.js";

// connect to our Firebase project (need credentials)
initializeApp({
  credential: cert(creds),
});

// connect to the Firestore database (just ask)
const db = getFirestore();

// CRUD

// const shoes = {
//   brand: 'Birkenstock',
//   style: 'Arizona',
//   color: 'brown',
//   size: 46,
//   price: 129.99
// }

// let's add a shirt to our clothing collection
// db.collection('clothing').add(shoes)
//   .then(doc => {
//     console.log("Clothing added: " + doc.id);
//   })
//   .catch(console.error);

// now that we have some data, let's READ (get) them
db.collection('clothing').get()
  .then(collection => {
    const clothing = collection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.table(clothing);
  })
  .catch(console.error);