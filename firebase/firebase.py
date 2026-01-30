import os
# Para cargar el archivo .env necesitarías instalar python-dotenv
# pip install python-dotenv

firebase_config = {
  "apiKey": os.environ.get("EXPO_PUBLIC_FIREBASE_API_KEY"),
  "authDomain": os.environ.get("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  "projectId": os.environ.get("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  "storageBucket": os.environ.get("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  "messagingSenderId": os.environ.get("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  "appId": os.environ.get("EXPO_PUBLIC_FIREBASE_APP_ID"),
  "measurementId": os.environ.get("EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID")
}