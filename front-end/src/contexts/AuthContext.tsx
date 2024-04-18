import axios, { AxiosResponse } from "axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  role: {
    name: string;
  };
}

interface AuthContextProps {
  authenticated: boolean;
  token: string;
  user: IUser | undefined;
  signOut: () => void;
  signIn: (credentials: ILogin) => Promise<boolean>;
}

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string>("");

  const signOut = () => {
    setAuthenticated(false);
    setUser(undefined);
    setToken("");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
  };

  const signIn = async (credentials: ILogin) => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, credentials)
      .then((res: AxiosResponse) => {
        toast.success(`${res.data.message}`, {
          autoClose: 1000,
        });
        localStorage.setItem("ACCESS_TOKEN", `Bearer ${res.data.token}`);
        localStorage.setItem("USER", JSON.stringify(res.data.user));
        setAuthenticated(true);
        setUser(res.data.user);
        setToken(`Bearer ${res.data.token}`);

        return true
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("USER");
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, signIn, signOut, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
