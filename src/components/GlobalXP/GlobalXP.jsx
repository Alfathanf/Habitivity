import styles from '../../css/GlobalXP.module.css';
import LevelTree from '../Habit/LevelTree';
import { useHabitsStore } from '../../stores/habitsStore';
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function GlobalXP({ xp, level, colorPalette }) {
    const habits = useHabitsStore((s) => s.habits);
    const filteredHabits = habits.filter((h) => !h.isArchived);
    // At least one habit must be completed today
    const isTodayCompleted = filteredHabits.some(
        (habit) => checkHabitCompletion(habit.completedDays, habit.frequency, new Date())
    );

    return (
        <div className={styles.globalXPBox}>
            <LevelTree
                level={level}
                xp={xp}
                colorPalette={colorPalette}
                isTodayCompleted={isTodayCompleted}
            />
            <div className={styles.xpInfo}>
                <div className={styles.xpBar}>
                    <div 
                        className={styles.xpProgress}
                        style={{ 
                            width: `${(xp / 100) * 100}%`,
                            backgroundColor: colorPalette.baseColor 
                        }}
                    />
                    <span className={styles.xpText}>{xp}/100 XP</span>
                </div>
                <p className={styles.xpDescription}>
                    Complete your habits to earn XP and level up!
                </p>
            </div>
        </div>
    );
}

export default GlobalXP; 