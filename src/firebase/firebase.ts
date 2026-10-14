import { toast } from 'react-toastify'
import { initializeApp } from 'firebase/app'
import { reportError } from '@/utils/report-error'
import {
  getToken,
  onMessage,
  isSupported,
  getMessaging,
  type MessagePayload,
} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_API_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_API_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

let messaging: ReturnType<typeof getMessaging> | null = null

const initializeMessaging = async () => {
  if ('serviceWorker' in navigator) {
    messaging = getMessaging(firebaseApp)
  } else {
    console.warn('Service workers are not supported in this browser.')
  }
}

void initializeMessaging()

export const requestPermission = async (
  mutate: (token: string, funs: { onSuccess: () => void }) => void,
  message: string,
) => {
  if (!(await isSupported())) {
    console.warn('Firebase Messaging is not supported in this browser.')
    return
  }

  if (!messaging) {
    console.warn('Firebase Messaging was not initialized due to missing service worker support.')
    return
  }

  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    getToken(messaging, {
      vapidKey: import.meta.env.VITE_API_FIREBASE_VAP_ID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    })
      .then(currentToken => {
        if (currentToken && localStorage.getItem('fcmToken') !== currentToken) {
          mutate(currentToken, {
            onSuccess: () => {
              localStorage.setItem('fcmToken', currentToken)
            },
          })
        }
      })
      .catch(error => {
        reportError('fcm:getToken', error)
      })
  } else {
    toast.warning(message)
  }
}

/**
 * Returns the unsubscribe handle so callers can tear the listener down. It used
 * to wrap `onMessage` in a promise that never settled and drop that handle, so
 * every render of the caller stacked another live handler.
 */
export const onMessageListener = (sender: (payload: MessagePayload) => void) => {
  if (!messaging) {
    console.warn('Firebase Messaging is not available.')
    return () => {}
  }

  return onMessage(messaging, sender)
}

export default messaging
