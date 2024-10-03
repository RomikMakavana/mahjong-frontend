import { FIREBASE_CONFIG } from "@/firebase-config";
import { AuthDetails, Profile } from "@/interfaces";
import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
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
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential
} from "firebase/auth";
import APIService from "./api";

const firebase = initializeApp(FIREBASE_CONFIG);
const fauth = getAuth(firebase);
const database = getDatabase(firebase);

interface AuthserviceType {
  database: Database,
  user: User | null,
  googleSignIn: () => Promise<{ status: boolean, message: string, user: AuthDetails | null }>,
  getProfile: () => Promise<User | false>,
  logout: () => Promise<{ status: boolean, message: string }>,
  createUser: (email: string, password: string) => Promise<{ status: boolean, message: string, isVerifiedEmail: boolean, user: null | User }>,
  login: (email: string, password: string) => Promise<{ status: boolean, message: string, isVerifiedEmail: boolean, user: null | User }>,
  sendEmailVerificationLink: () => Promise<{ status: boolean, code: string }>,
  sendResetPasswordLink: (email: string) => Promise<{ status: boolean, message: string }>,
  getAuthDetails: () => User | false
}

const AuthService: AuthserviceType = {
  database,
  user: null,
  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });

    // Sign in process
    return new Promise((resolve) => {
      signInWithPopup(fauth, provider)
        .then((result) => {
          const user = result.user;
          if (user) {
            APIService.login(user.email as string).then((res) => {
              if (!res.status) {
                resolve({
                  status: false,
                  message: "Something went wrong.",
                  user: null
                })
                AuthService.logout();
              } else {

                APIService.profile().then((res) => {
                  if (res.status == 200 && res.data.success === true) {
                    APIService.user = { apiUser: res.data.data, firebaseUser: user };
                    AuthService.user = user;
                    resolve({
                      status: true,
                      message: "Login successfully.",
                      user: {
                        name: user.displayName as string,
                        email: user.email as string,
                        uid: user.uid
                      }
                    })
                  }
                }).catch((error) => {
                  console.log(error);
                  resolve({
                    status: false,
                    message: "Something went wrong.",
                    user: null
                  })
                  AuthService.logout();
                })
              }
            }).catch((error) => {
              console.log(error);
              resolve({
                status: false,
                message: "Something went wrong.",
                user: null
              })
              AuthService.logout();

            })
          } else {
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
          AuthService.user = null;
          APIService.user = null;
          resolve({ status: true, message: "Logged out successfully." });
        })
        .catch((err) => {
          console.log(err);
          resolve({ status: true, message: "Logged out successfully." });
        });
    });
  },

  createUser(email, password) {
    return new Promise((resolve) => {
      const fauth: Auth = getAuth(firebase);
      createUserWithEmailAndPassword(fauth, email, password)
        .then(async (userCredential: UserCredential) => {
          resolve({
            status: true,
            message: "Created Successfully",
            isVerifiedEmail: userCredential.user.emailVerified,
            user: userCredential.user,
          });
        })
        .catch((error) => {
          resolve({
            status: false,
            message: error.code,
            isVerifiedEmail: false,
            user: null,
          });
        });
    });
  },

  getProfile() {
    return new Promise((res) => {
      // res(fauth.currentUser ? fauth.currentUser : false);
      fauth.onAuthStateChanged((user: User | null) => {
        if (user) {
          AuthService.user = user;
          res(user);
        } else {
          res(false);
        }
      });

    });

  },

  login(email, password) {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(fauth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          APIService.login(email).then((res) => {
            if (!res.status) {
              resolve({
                status: false,
                isVerifiedEmail: false,
                message: "Something went wrong",
                user: null,
              });
              AuthService.logout();
            } else {
              APIService.profile().then((res) => {
                if (res.status == 200 && res.data.success === true) {
                  APIService.user = { apiUser: res.data.data, firebaseUser: user };
                  AuthService.user = user;
                  if (user.emailVerified) {
                    resolve({
                      status: true,
                      isVerifiedEmail: true,
                      message: "logging sussessfully",
                      user: user,
                    });
                  } else {
                    resolve({
                      status: true,
                      isVerifiedEmail: false,
                      message: "logging sussessfully",
                      user: user,
                    });
                  }
                }
              }).catch((error) => {
                console.log(error);
                resolve({
                  status: false,
                  isVerifiedEmail: false,
                  message: "Something went wrong",
                  user: null,
                });
                AuthService.logout();
              })
            }
          })
        }).catch((error) => {
          resolve({
            status: false,
            isVerifiedEmail: false,
            message: error.code,
            user: null,
          });
        });
    });
  },

  sendEmailVerificationLink() {
    return new Promise(async (resolve) => {
      AuthService.getProfile().then(async (res) => {
        if (res !== false) {
          await sendEmailVerification(res, {
            url: window.location.origin,
            handleCodeInApp: true
          });
          resolve({ status: true, code: 'success' });
        } else {
          resolve({ status: false, code: 'failed' });
        }
      }).catch((error) => {
        if (error.code == 'auth/too-many-requests') {
          resolve({ status: false, code: 'tooManyAttempts' })
        } else {
          resolve({ status: false, code: 'failed' })
        }
      })
    });
  },

  sendResetPasswordLink(email: string) {
    return new Promise(async (resolve) => {
      try {
        await sendPasswordResetEmail(fauth, email, {
          url: window.location.origin,
          handleCodeInApp: true
        })
        resolve({ status: true, message: 'Password reset email sent! Check your inbox.' })
      } catch (error) {
        resolve({ status: false, message: 'Something went wrong.' })
      }

    })
  },

  getAuthDetails() {
    return fauth.currentUser ? fauth.currentUser : false
  }

}

export { AuthService, firebase }