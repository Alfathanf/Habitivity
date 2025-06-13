// utils
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';
import useXPStore from '../stores/xpStore';

function updateHabitProgress(habits, title) {
	const today = getFormattedDate(new Date());
	const { addXP, decreaseXP } = useXPStore.getState();

	// XP values based on difficulty
	const XP_VALUES = {
		easy: 10,
		medium: 25,
		hard: 50
	};

	return habits.map((habit) => {
		habit = { ...habit };

		if (habit.title === title) {
			const isCompleted = checkHabitCompletion(habit.completedDays, habit.frequency, new Date());
			let completedDays = [...habit.completedDays];

			if (isCompleted) {
				completedDays = completedDays.filter(
					(day) => day.date !== today
				);
				// Decrease XP when habit is uncompleted
				decreaseXP(XP_VALUES[habit.difficulty]);
			} else {
				const todayIndex = completedDays.findIndex(
					(day) => day.date === today
				);

				if (todayIndex !== -1) {
					completedDays[todayIndex] = {
						...completedDays[todayIndex],
						progress: completedDays[todayIndex].progress + 1
					};
				} else {
					completedDays.unshift({ date: today, progress: 1 });
				}

				// Add XP when habit is completed
				if (completedDays[0].progress >= habit.frequency) {
					addXP(XP_VALUES[habit.difficulty]); // Add XP based on difficulty
				}
			}

			habit = {
				...habit,
				completedDays
			};
		}

		return habit;
	});
}

export default updateHabitProgress;