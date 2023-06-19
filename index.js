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

const shoes = {
  brand: 'Birkenstock',
  style: 'Arizona',
  color: 'brown',
  size: 46,
  price: 129.99
}

// let's add a shirt to our clothing collection // CREATE:
db.collection('clothing').add(shoes)
  .then(doc => {
    console.log("Clothing added: " + doc.id);
  })
  .catch(console.error);

// now that we have some data, let's READ (get) them // READ (ALL):
db.collection('clothing').get()
  .then(collection => {
    const clothing = collection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.table(clothing);
  })
  .catch(console.error);

// Let's say I want to find all of the clothing items that are >= 79.99 // READ (SOME):
db.collection('clothing').where('price', '>=', 79.99).get()
  .where('style', '==', 'shorts')
  .then(collection => {
    const clothing = collection.docs.map(doc => ({...doc.data(), id: doc.id }));
    console.table(clothing);
  })
  .catch(console.error);

// now let's get a single document by id (we'll use await, just to show) // READ (ONE):
const doc = await db.collection('clothing').doc('gfhU1LsaAWyAIJ1587Ru').get()
              .catch(console.error);
const clothingItem = {...doc.data(), id: doc.id };
console.table(clothingItem);

// let's update a single document: // UPDATE:
db.collection('clothing').doc('gfhU1LsaAWyAIJ1587Ru')
  .update({ color: 'red', rating: 4.9 })
  .then(doc => console.log('Updated doc. '))
  .catch(console.error)

// Even though we SELDOM delete, here's how: // DELETE:
await db.collection('clothing').doc('u43PtL6TvBWdztsl0Ct7')
  .delete()
console.log('DELETED')
