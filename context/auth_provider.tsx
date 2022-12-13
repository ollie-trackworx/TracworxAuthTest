/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthLogic, AuthSocialProvider } from "../logic/auth_logic";
import { User } from "../model/user";
import { loginReducer, signOutReducer } from "../reducers/auth_reducer";

const AuthContext = createContext<any>(null);

export const useAuthcontext = () => {
  return useContext(AuthContext);
};
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useState<any>(null);
  const dispatch = useDispatch();

   // Handle user state changes
   function onAuthStateChanged(user:User):any {
    console.log("Is user logged", user.authStatus);
    
    if (user) {
      dispatch(loginReducer(user));
    }else{
      dispatch(signOutReducer());
    }
    setInitializing(false);
  }
useEffect(()=>{
  const subscriber = AuthLogic.onAuthStateChanged(onAuthStateChanged);
  return subscriber;
},[])

  const login = async (email: string, password: string):Promise<boolean>  => {
    setLoading(true);
    try {
      const user = await AuthLogic.login(email, password);
      console.log(user);
      //onAuthStateChanged()

      setLoading(false);
      return true;
    } catch (error) {
      console.log(error,46)
      setError((error as Error)?.message ?? 'Error Loging in!');
      setLoading(false);
      return false;       
    }
  };
  const loginWith = async (service:AuthSocialProvider):Promise<boolean>  => {
    setLoading(true);
    try {
      const user = await AuthLogic.signInWith(service);
      console.log(user);
      //onAuthStateChanged()

      setLoading(false);
      return true;
    } catch (error) {
      console.log(error,46)
      setError((error as Error)?.message ?? 'Error Loging in!');
      setLoading(false);
      return false;       
    }
  };

  const signOut = async ():Promise<boolean> => {
    setLoading(true);
    try {
      const user = await AuthLogic.signOut();
      console.log(user);
      //onAuthStateChanged()

      setLoading(false);
      return true;
    } catch (error) {
      console.log(error,46)
      setError((error as Error)?.message ?? 'Error Loging in!');
      setLoading(false);
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        user,
        initializing,
        login,
        signOut,
        loginWith
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
