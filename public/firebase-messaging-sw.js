
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
        
const firebaseConfig = {
  apiKey: "AIzaSyBMzML1YX0D4ilEODWUgKzAlcCL77qqvq4",
  authDomain: "fir-basic-d9b19.firebaseapp.com",
  databaseURL: "https://fir-basic-d9b19-default-rtdb.firebaseio.com",
  projectId: "fir-basic-d9b19",
  storageBucket: "fir-basic-d9b19.appspot.com",
  messagingSenderId: "377591484112",
  appId: "1:377591484112:web:6e59879d19e79efaded8d5",
  measurementId: "G-ZSXSTFYZES"
};
    firebase.initializeApp(firebaseConfig);
    const messaging=firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});