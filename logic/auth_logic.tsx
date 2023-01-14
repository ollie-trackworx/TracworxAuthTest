/* eslint-disable @typescript-eslint/no-unused-vars */
import FirebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthStatus } from "../enums/auth_state";
import { User } from "../model/user";

export enum AuthSocialProvider {
  Google,
}
interface AuthHandler {
  login(username: string, password: string): Promise<User | null>;
  signOut(): Promise<boolean | null>;
  onAuthStateChanged(listener: (user: User) => {}): any;
  signInWith(service: AuthSocialProvider): Promise<User | null>;
}

const signInWithGoogle = async (): Promise<string> => {
  console.log("Signing in with google");
  try {
    GoogleSignin.configure({
      webClientId:
        "1064352884074-vc3s01cdsccrs59jiren4prsfgh218qu.apps.googleusercontent.com",
    });

    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken);
    return idToken ?? "";
  } catch (e) {
    console.log((e as Error).message, "Error 26");
  }
  return "null";
};
class OAuthHandler implements AuthHandler {
  signInWith(service: AuthSocialProvider): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  signOut(): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }
  onAuthStateChanged(listener: (user: User) => {}): any {
    //check if JWT token exist and log user in with it
  }
  async login(username: string, password: string): Promise<User | null> {
    //TODO: Implement OAuth login
    console.log("OAuth login");
    return { authStatus: AuthStatus.LoggedIn } as User;
  }
}
class FireAuthHandler implements AuthHandler {
  async signInWith(service: AuthSocialProvider): Promise<User | null> {
    try {
      switch (service) {
        case AuthSocialProvider.Google:
          const googleCredential = FirebaseAuth.GoogleAuthProvider.credential(
            await signInWithGoogle()
          );
          let user = (
            await FirebaseAuth().signInWithCredential(googleCredential)
          )?.user;
          if (user) {
            return {
              uid: user.uid,
              authStatus: AuthStatus.LoggedIn,
            } as User;
          }
          break;
      }
    } catch (e) {
      throw e;
    }
    return { authStatus: AuthStatus.Undetermined } as User;
  }
  async signOut(): Promise<boolean | null> {
    try {
      await FirebaseAuth().signOut();
    } catch (e) {
      throw e;
    }
    return true;
  }
  onAuthStateChanged(listener: (user: User) => {}): any {
    FirebaseAuth().onAuthStateChanged((auth) =>
      listener({
        uid: auth?.uid,
        authStatus: auth ? AuthStatus.LoggedIn : AuthStatus.LoggedOut,
      } as User)
    );
  }
  async login(username: string, password: string): Promise<User | null> {
    try {
      console.log("Logging in");
      if (username === "" || password === "") {
        throw new Error("Please Make sure all fields are filled");
      }
      let user = (
        await FirebaseAuth().signInWithEmailAndPassword(username, password)
      ).user;
      return {
        uid: user.uid,
        authStatus: AuthStatus.LoggedIn,
      } as User;
    } catch (e) {
      let message = `${e}`;
      if (message.includes("]")) throw new Error(message.split("]")[1].trim());
      throw e;
    }
  }
}
export const AuthLogic: AuthHandler = new FireAuthHandler();
