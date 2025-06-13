import { create } from 'zustand';
import getColors from '../utils/getColors';

export const useColorsStore = create(
	(set) => ({
		colors: getColors(),
		update: (newColors) => set({ colors: newColors })
	})
);