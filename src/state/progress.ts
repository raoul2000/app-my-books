import { atom } from "recoil";

export const progressState = atom<boolean>({
    key: 'progress',
    default: false
});