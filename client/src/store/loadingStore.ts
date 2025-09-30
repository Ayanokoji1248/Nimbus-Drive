import { create } from "zustand";

type loadingState = {
    loading: boolean,
    setLoading: (loadValue: boolean) => void,
}

const useLoadingStore = create<loadingState>((set) => ({
    loading: false,
    setLoading: (loadValue) => (set({ loading: loadValue }))
}))

export default useLoadingStore;