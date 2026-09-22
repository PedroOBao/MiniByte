import { createContext, useContext, useSyncExternalStore } from 'react';
import { ACCOUNT_EVENT, changePassword, createAccount, readSession, signIn, signOut, updateAccount } from './localAccounts';

const UserContext = createContext();
function subscribe(callback) {
    window.addEventListener(ACCOUNT_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(ACCOUNT_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}
const snapshot = () => JSON.stringify(readSession());

export function UserProvider({ children }) {
    const session = useSyncExternalStore(subscribe, snapshot, () => 'null');
    const user = JSON.parse(session);
    return <UserContext.Provider value={{ user, loading: false, login: signIn, logout: signOut,
        register: createAccount, updateProfile: updateAccount, changePassword }}>
        {children}
    </UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);