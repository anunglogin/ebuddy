import * as admin from 'firebase-admin';

admin.initializeApp()
const firestore = admin.firestore();
firestore.settings({
    host: 'localhost:8080',
    ssl: false,
    projectId: 'ebuddy-1fb94'
})

export const db = firestore;