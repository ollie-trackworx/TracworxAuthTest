/* eslint-disable prettier/prettier */
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthLogic } from "../logic/auth_logic";
import { loginReducer } from "../reducers/auth_reducer";

const AuthContext = createContext<any>(null);

export const useAuthcontext = () => {
  return useContext(AuthContext);
};
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user] = useState<any>(null);
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await AuthLogic.login(email, password);
      console.log(user);
      if (user) {
        dispatch(loginReducer(user));
      }

      setLoading(false);
    } catch (error) {
      setError(error?.toString() ?? 'Error Loging in!');
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
