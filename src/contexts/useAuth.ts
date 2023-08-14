import { app } from '@/configs/firebase/firebase';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  const login = (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    return signInWithRedirect(auth, provider);
  };

  const logout = (): Promise<void> => {
    const auth = getAuth(app);
    return signOut(auth);
  };

  return { isLoading, user, login, logout };
};
