importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js')

const firebaseConfig = Object.fromEntries(new URL(self.location.href).searchParams)

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.type
  const notificationOptions = {
    body: payload.data.body,
    icon: './robo/logo.svg',
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})
