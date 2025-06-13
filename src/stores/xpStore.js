import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useXPStore = create(
    persist(
        (set) => ({
            xp: 0,
            level: 1,
            addXP: (amount) => set((state) => {
                const newXP = state.xp + amount;
                if (newXP >= 100) {
                    return {
                        xp: newXP - 100,
                        level: state.level + 1
                    };
                }
                return { xp: newXP };
            }),
            decreaseXP: (amount) => set((state) => {
                const newXP = state.xp - amount;
                if (newXP < 0 && state.level > 1) {
                    return {
                        xp: 100 + newXP, // newXP is negative
                        level: state.level - 1
                    };
                }
                return {
                    xp: Math.max(0, newXP),
                    level: state.level
                };
            })
        }),
        {
            name: 'xp-storage'
        }
    )
);

export default useXPStore; 