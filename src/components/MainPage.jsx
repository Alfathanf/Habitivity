import styles from '../css/MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import Header from './Header';
import HabitList from './HabitList';
import Placeholder from './Placeholder';
import GlobalXP from './GlobalXP/GlobalXP';
import BottomNavBar from './BottomNavBar';

// icons
import { ReactComponent as Calendar } from '../img/calendar.svg';
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useHabitsStore } from '../stores/habitsStore';
import useXPStore from '../stores/xpStore';
import { useColorsStore } from '../stores/colorsStore';

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function MainPage() {
	const habits = useHabitsStore((s) => s.habits);
	const filteredHabits = habits.filter((h) => !h.isArchived);
	const { xp, level } = useXPStore();
	const colors = useColorsStore((s) => s.colors);
	const colorPalette = { baseColor: colors[1] }; // Using the 6th color (index 5) for a different look

	return (
		<motion.div className={styles.mainPage} {...mainVariants}>
			<Header />
			<GlobalXP xp={xp} level={level} colorPalette={colorPalette} />

			<HabitList habits={filteredHabits} />

			{filteredHabits.length === 0 && (
				<Placeholder
					image={<Calendar />}
					title="No active habits found"
					desc="Why not create one now?"
					textOnButton="Create First Habit"
					buttonIcon={<MdAdd />}
					to={`${process.env.PUBLIC_URL}/modal/habitEditor`}
					state={{ modalTitle: 'Create new habit' }}
				/>
			)}

			<BottomNavBar />
		</motion.div>
	);
}

export default MainPage;