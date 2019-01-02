import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const prodConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

const devConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.db = app.firestore()
        this.auth = app.auth()
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    doGetList = () =>
        this.db
            .collection("todo")
            .doc("list")
            .get()

    doSubscribe = callback =>
        this.db
            .collection("todo")
            .doc("list")
            .onSnapshot(doc => callback(doc.data().list))

    doAddNewTodo = todo =>
        this.db
            .collection("todo")
            .doc("list")
            .update({
                list: app.firestore.FieldValue.arrayUnion(todo)
            })

    doRemoveTodo = todo =>
        this.db
            .collection("todo")
            .doc("list")
            .update({
                list: app.firestore.FieldValue.arrayRemove(todo)
            })

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // this.user(authUser.uid)
                //     .once("value")
                //     .then(snapshot => {
                //         const dbUser = snapshot.val()

                //         // default empty roles
                //         if (!dbUser.roles) {
                //             dbUser.roles = []
                //         }

                //         // merge auth and db user
                //         authUser = {
                //             uid: authUser.uid,
                //             email: authUser.email,
                //             ...dbUser
                //         }

                //         next(authUser)
                //     })

                next(authUser)
            } else {
                fallback()
            }
        })

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref("users")

    // *** Message API ***

    messages = () => this.db.ref("messages")
}

export default Firebase
