import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true)
  const isAuthenticated = !!user.token;

  useEffect(() => {
    async function getUser() {
      const getUserInfo = await AsyncStorage.getItem('@pizzariaoliveira');
      if (getUserInfo) {
        const hasSession: UserProps = JSON.parse(getUserInfo);

        if (hasSession.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${hasSession.token}`;
          setUser({
            id: hasSession.id,
            name: hasSession.name,
            email: hasSession.email,
            token: hasSession.token
          });
        }

        setLoading(false)
      }
    }
    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/session", {
        email,
        password
      });

      const { id, name, email: userEmail, token } = response.data;

      const data = {
        id,
        name,
        email: userEmail,
        token
      };

      await AsyncStorage.setItem('@pizzariaoliveira', JSON.stringify(data));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email: userEmail,
        token
      });

      setLoadingAuth(false);
    } catch (err) {
      setLoadingAuth(false);
    }
  }

  async function signOut(){
    await AsyncStorage.clear()
    .then(() => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: ''
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        loadingAuth,
        loading,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
