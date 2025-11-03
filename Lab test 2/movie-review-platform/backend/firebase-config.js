const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "movie-review-app1",
  "private_key_id": "fa4a3a40fbbc1d10752479a2c7fc0a0ccedd3ca4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDoz6f2By3VVND5\njREQjGIngTagZ7ZLVmpM/XRwA0J6kpiFmPgZEbEWpxIQgFIlKPHmbku5RfrrnXD6\nbr4E8uoqTEEWPbP8GQyVZmXHyCEyjeXYU6RBB7syIvt7yFIpAc+ah+hommAqL78l\nWSGlm1EVA4ONpVLSPsvvK2bJkfZzMYH0/3v+hwC4LN2xHynjub7GCOOEsoBhYQw0\nikjzlHbrUbrME2yfi5t+dgSoYV3L21vNeLEAsO5fCQVXcas7p5oFN2d0rnXv4b/J\nYy8oclShUe31iI/kkuJJcwvRAgFk8CtkabB4XK+hGCGDI303Fil0a5UcL9DE8CM7\neNXP1+oTAgMBAAECggEAJHMZOZHCK/D4OY9L1AAcAKdgUBjXbPrTRck2M7Cu9dXX\nKgOFxGxarNCXfsc4aoz7N+KeLxxfvrKK/7UwQZdum2oOPqyGbg/V7TDM+qHAtijf\n4CX9mhjbHBcSBz1DxRvSzxTm3t8HSKjqZQSMGguJKaBqi6tjSNDVc6qjOyfZIrZE\ndhqeS89VKmjOCrByOfDIVG4020zDrmmII/IJ0GizgTJB4w9JBluKNOftmmog1zBK\n1ctQj5wkGMnurK05flkpUVQs6ALSiaphTdqh+WdDWVNvDrXLGOlde+1FqH6gfxFy\nWvnTIIM4FLClDkbgnpRt5Y+diMRk0wAiQBD2VVOQ4QKBgQD5c+FZs5wVdH+J6Bnt\nlER00ZLkp9bCWlERHlJ/WfygbxvY8vcQ6RxruEeofo8UW45q9JTu0YDbyJKzu9q9\nE460huMDg+3fDLPi3SXar8PAp9C5gTIVMMjGOWQsieL05vioo3bl81sYgLe8wwpN\n7n810p2iLfDecCvT1afISo2ZawKBgQDu6/VbM07TiQ3wDJarT13QFlRDyTUe5xR5\nfqcV5sZDUW+jeXDzuz5rwjPR0T2Bedpa1McOvXMlArnt2AlpYqEhPnRetobPGFlR\nVP8TmfeYXiHN9SxV+bhaK/dYwVFKDwrJSLyMSWa0a2xxOAZRKX4sUWEGVPlDnZRK\n3lfSIiBT+QKBgGEEucOagH0ztxraw6LMRKeujtQRlww19kuTIIDZbdC0Bf+l14Oj\nNmOK44vb1SgUx9o/T+FmaBiS9MOkr1lUTu9Vett2J0DV/uygGEXqkFbQrfRIFEN7\nmsrFrXlJE5Uuc82a7fZXZLmt7kgjD1HqDV3QkXBvL7xDojgcY8oZfOMLAoGAJ+ed\nKUheiBJCE6/mkmJFJvYzyMaYarrpvoka2xuaTbASV1l3Nh42BMWA5jBud2ukvrr/\nLEUEMEBOUZ1dpQ5mHylRQmh2B6znbiAmIl367qX6O24Ro6J72gOx4k8XhqkQgiH1\n6/BuiP/QMvDKjU/C1SAadnZG07ZECGUugdhVUfECgYEAnArY5lb7OBWy7YsIDECS\nPn1ey3j1UEG+6fkGUF71wvHlbXimvB8K1tLePRrOFeHnWz0GKfYb6QJM93QtF3s4\njC3LKNZAf4bTuLCwDeIq7wu5O7t9WkRB5ryg4QIyAVckgSMXUJyprElh5ibZYAsO\nXu04u6b5wICdQHpww8lguHI=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@movie-review-app1.iam.gserviceaccount.com",
  "client_id": "101397003399788050755",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40movie-review-app1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
