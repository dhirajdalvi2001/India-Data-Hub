import { atomWithStorage } from "jotai/utils";

export const authStateAtom = atomWithStorage("auth", false);