import { atom } from "recoil";
import { LoadingState } from "../types";

export const loadingState = atom<LoadingState>({
    key: 'loading',
    default: {
        isLoading:false
    }
});