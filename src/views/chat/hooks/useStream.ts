import {ref,onUnmounted} from 'vue'
export function useStream(){
    const displayContent = ref("")
    let buffer = "";
    let isLooping = false;
}