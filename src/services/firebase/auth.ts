import { FIREBASE_CONFIG } from "@/firebase-config";
import { AuthDetails } from "@/interfaces";
import { initializeApp } from "firebase/app";
import {
    Auth,
    User,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    UserCredential,
    EmailAuthProvider,
    updatePassword,
    reauthenticateWithCredential
  } from "firebase/auth";

  const firebase = initializeApp(FIREBASE_CONFIG);
  const fauth = getAuth();

  interface AuthserviceType {
    googleSignIn: () => Promise<{ status: boolean, message: string, user: AuthDetails | null }>,
    getProfile: () => Promise<User | false>,
    logout: () => Promise<{ status: boolean, message: string }>
  }

  const AuthService: AuthserviceType = {
     googleSignIn(){
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account"
        });

        // Sign in process
        return new Promise((resolve) => {
            signInWithPopup(fauth, provider)
            .then((result) => {
                const user = result.user;
                if(user){
                    resolve({
                        status: true,
                        message: "Login successfully.",
                        user:{
                            name: user.displayName as string,
                            email: user.email as string,
                            uid: user.uid
                        }
                    })
                }else {
                    resolve({
                        status: false,
                        message: "Something went wrong.",
                        user: null
                    })
                }
            }).catch((error) => {
                console.log(error);
                resolve({
                    status: false,
                    message: "Something went wrong.",
                    user: null
                })
                
            })
        })
     },
     logout() {
        return new Promise((resolve) => {
          fauth
            .signOut()
            .then(() => {
              resolve({ status: true, message: "Logged out successfully." });
            })
            .catch((err) => {
              console.log(err);
              resolve({ status: true, message: "Logged out successfully." });
            });
        });
      },

     getProfile(){
        return new Promise((res) => {
            fauth.onAuthStateChanged((user: User | null) => {
              if (user) {
                res(user);
              } else {
                res(false);
              }
            });
          });
     }
  }

  export {AuthService, firebase}