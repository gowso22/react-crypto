import { atom } from "recoil";




export const isDarkAtom = atom(
    {   
        // 고유한 키값 설정
        key : "isDark",
        // 기본값
        default: true
    }
);