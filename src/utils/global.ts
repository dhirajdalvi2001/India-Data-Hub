import { atomWithStorage } from 'jotai/utils';

export const authStateAtom = atomWithStorage<boolean>('auth', false);