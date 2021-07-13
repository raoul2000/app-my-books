import { atom } from "recoil";
import { LoadingState } from "../types";

export const loadingState = atom<LoadingState>({
    key: 'loading',
    default: {
        isLoading:true,
        infoMessage: "loading Book List ..."
    }
});