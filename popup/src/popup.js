const MATCHE_URLS = [
  'https://steemit.com/*',
  'https://steemcoinpan.com/*',
  'https://www.steemcoinpan.com/*',
];
function checkMatcheUrl(tabUrl) {
  for (url of MATCHE_URLS) {
    if (new RegExp(url).test(tabUrl)) return true;
  }
  return false;
}

$('.tabular.menu .item').tab();

debugger;
// Firebase Firestore
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCGXZOUeU83Qp0EiOcTqFqOkWRgmPBsJbg',
  authDomain: 'steem-extension.firebaseapp.com',
  databaseURL: 'https://steem-extension.firebaseio.com',
  projectId: 'steem-extension',
  storageBucket: 'steem-extension.appspot.com',
  messagingSenderId: '359390784785',
  appId: '1:359390784785:web:d74212183bdcb983',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//  Cloud Firestore 인스턴스를 초기화합니다.
// firebase.initializeApp({
//   apiKey: '### FIREBASE API KEY ###',
//   authDomain: '### FIREBASE AUTH DOMAIN ###',
//   projectId: '### CLOUD FIRESTORE PROJECT ID ###',
// });

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection('users')
  .add({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  })
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });

// Add a second document with a generated ID.
db.collection('users')
  .add({
    first: 'Alan',
    middle: 'Mathison',
    last: 'Turing',
    born: 1912,
  })
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch(function(error) {
    console.error('Error adding document: ', error);
  });

db.collection('users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });
