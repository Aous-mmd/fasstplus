import React, { useEffect, useState } from 'react';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { useTranslation } from 'react-i18next';
import { Layout } from './Layout';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { loginAuthProvider } from './api/auth';
import Login from './pages/Login';

function App() {
  const [theme, colorMode] = useMode();
  const { i18n } = useTranslation();
  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
    // eslint-disable-next-line
  }, []);
  const lng = i18n.language;

  return (
    <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void; }}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <div className="app" dir={(lng === 'en' || lng === 'en-US') ? 'ltr' : 'rtl'}>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/401' element={<div>unAuth</div>} />
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <Layout />
                  </RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const signin = (newUser: string, callback: VoidFunction) => {
    return loginAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return loginAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const val = { user, signin, signout };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}