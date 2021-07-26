import { atom } from "recoil";

export const apiKeyState = atom<string>({
    key: 'apiKey',
    default: ''
});