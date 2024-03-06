import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
};

interface ILogin {
    email: string
    password: string
}

interface IUser {
  id: string;
  email: string;
  name: string;
  role: {
    name: string;
  };
  picture: string;
}

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: IUser | null;
  signIn: (credentials: ILogin) => void;
  signOut: () => void;
  token: string;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  user: null,
  signIn: () => {},
  signOut: () => {},
  token: ""
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("")
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setAuthenticated(false);
    navigate("/login");
  };

  const signIn = async (credentials: ILogin) => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, credentials)
      .then((res: AxiosResponse) => {
        toast.success(`${res.data.message}`, {
          autoClose: 1000,
        });
        localStorage.setItem('ACCESS_TOKEN', res.data.token)
        localStorage.setItem('USER', JSON.stringify(res.data.user))
        setAuthenticated(true)
        setUser(res.data.user)
        navigate('/dashboard');
      })
      .catch((error: Error) => {
        toast.error(`${error.response.data.message}`);
      })
  }

  useEffect(() => {
    const user = localStorage.getItem("USER");
    const token = localStorage.getItem("ACCESS_TOKEN");
    if(token) {
      setToken(`Bearer ${token}`)
    }
    if (user && token) {
      const loggedUser = JSON.parse(user);
      setAuthenticated(true);
      setUser(loggedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user, signOut, signIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
