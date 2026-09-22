import { useMemo, useSyncExternalStore } from 'react';
import { GAME_EVENT, readGames } from './gameStore';

function subscribe(callback) {
    window.addEventListener(GAME_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(GAME_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}
function snapshot() {
    try { return JSON.stringify({ games: readGames(), error: '' }); }
    catch (error) { return JSON.stringify({ games: [], error: error.message }); }
}
export function useGameState() {
    const value = useSyncExternalStore(subscribe, snapshot, snapshot);
    return useMemo(() => JSON.parse(value), [value]);
}