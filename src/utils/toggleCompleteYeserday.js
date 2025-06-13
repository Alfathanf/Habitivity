import getFormattedDate from './getFormattedDate';
import useXPStore from '../stores/xpStore';

function toggleCompleteYeserday(habits, habitTitle, isTodayCompleted, isYesterdayCompleted, todayProgress, frequency) {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const { addXP, decreaseXP } = useXPStore.getState();

	// XP values based on difficulty
	const XP_VALUES = {
		easy: 10,
		medium: 25,
		hard: 50
	};

	return habits.map(
		(habit) => {
			habit = { ...habit };

			if (habit.title === habitTitle) {
				let completedDays = [...habit.completedDays];

				if (isYesterdayCompleted) {
					completedDays = completedDays.filter(
						(day) => day.date !== getFormattedDate(yesterday)
					);
					// Decrease XP when uncompleting yesterday's habit
					decreaseXP(XP_VALUES[habit.difficulty]);
				} else {
					const completedYesterday = {
						date: getFormattedDate(yesterday),
						progress: frequency,
						isCompYdayBtnUsed: true
					};

					isTodayCompleted || todayProgress
						? completedDays.splice(1, 0, completedYesterday)
						: completedDays.unshift(completedYesterday);

					// Add XP when completing yesterday's habit
					addXP(XP_VALUES[habit.difficulty]);
				};

				habit = {
					...habit,
					completedDays
				};
			};

			return habit;
		}
	);
}

export default toggleCompleteYeserday;