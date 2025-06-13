import { useEffect, useRef, useCallback } from 'react';

import { useAchievementsStore } from '../stores/achievementsStore';
import { useHabitsStore } from '../stores/habitsStore';
import { useMainDiaryStore } from '../stores/mainDiaryStore';
import { useDialogStore } from '../stores/dialogStore';

import useIsInitialRender from './useIsInitialRender';

function useAchievementsCheck() {
	const isInitialRender = useIsInitialRender();
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const achievements = useAchievementsStore((s) => s.achievements);
	const habits = useHabitsStore((s) => s.habits);
	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const openDialog = useDialogStore((s) => s.open);

	// Track previously unlocked achievements
	const prevUnlockedRef = useRef(achievements.filter(a => a.isUnlocked).map(a => a.id));

	// Memoize the dispatch action to prevent unnecessary re-renders
	const dispatchAchievements = useCallback(() => {
		achievementsDispatch({
			habits,
			mainDiary,
			isInitialRender: isInitialRender.current
		});
	}, [achievementsDispatch, habits, mainDiary, isInitialRender]);

	// Only run the achievements check when habits or mainDiary actually change
	useEffect(() => {
		dispatchAchievements();
	}, [dispatchAchievements]);

	// Handle newly unlocked achievements
	useEffect(() => {
		const prevUnlocked = prevUnlockedRef.current;
		const currentUnlocked = achievements.filter(a => a.isUnlocked).map(a => a.id);
		const newlyUnlocked = currentUnlocked.filter(id => !prevUnlocked.includes(id));

		if (newlyUnlocked.length > 0) {
			// Show dialog for the first newly unlocked achievement
			const achievement = achievements.find(a => a.id === newlyUnlocked[0]);
			openDialog({
				title: 'Achievement Unlocked!',
				imgSrc: `${process.env.PUBLIC_URL}/img/achievements/${achievement.id}.svg`,
				text: `"${achievement.title}"
${achievement.desc}`
			});
		}
		prevUnlockedRef.current = currentUnlocked;
	}, [achievements, openDialog]);
}

export default useAchievementsCheck;