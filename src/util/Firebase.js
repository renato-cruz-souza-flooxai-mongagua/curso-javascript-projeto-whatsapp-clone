const firebase = require('firebase');
require('firebase/firestore');


export class Firebase {
    constructor() {
        this._config = {
            apiKey: "AIzaSyAK_Bye_XNY3mWNQvx7tO93k8skNhfLRM4",
            authDomain: "whatsapp-clone-c058d.firebaseapp.com",
            projectId: "whatsapp-clone-c058d",
            storageBucket: "whatsapp-clone-c058d.firebasestorage.app",
            messagingSenderId: "526524279554",
            appId: "1:526524279554:web:4501dac49a03186590701b"
        };

        this.init();
    }

    init() {
        if(!window._initalizedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true,
              });

            window._initalizedFirebase = true;
        }
        
    }

    static db() {
        return firebase.firestore();
      }
    
      static hd() {
        return firebase.storage();
      }

      
    initAuth() {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider()

            firebase.auth().signInWithPopup(provider)
            .then(result => {

                let token = result.credential.acessToken
                let user = result.user

                s({
                    user,
                    token
                });

            })
            .catch(err =>{
                f(err);
            })

        })

    }
}