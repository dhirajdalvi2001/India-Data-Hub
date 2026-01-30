import { atomWithStorage } from 'jotai/utils';

export const authStateAtom = atomWithStorage<boolean | null>('auth', null);