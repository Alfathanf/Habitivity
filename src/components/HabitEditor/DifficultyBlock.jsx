import styles from '../../css/DifficultyBlock.module.css';

// react
import { useState } from 'react';

function DifficultyBlock({ currentDifficulty }) {
    const [difficulty, setDifficulty] = useState(currentDifficulty || 'easy');

    const difficulties = [
        { value: 'easy', label: 'Easy', xp: 10 },
        { value: 'medium', label: 'Medium', xp: 25 },
        { value: 'hard', label: 'Hard', xp: 50 }
    ];

    return (
        <section>
            <div className={styles.header}>
                <h3>Difficulty</h3>
            </div>

            <div className={styles.content}>
                {difficulties.map(({ value, label, xp }) => (
                    <label
                        key={value}
                        className={styles.difficultyOption}
                    >
                        <input
                            type="radio"
                            name="difficulty"
                            value={value}
                            checked={difficulty === value}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <div className={styles.difficultyInfo}>
                            <span className={styles.label}>{label}</span>
                            <span className={styles.xp}>+{xp} XP</span>
                        </div>
                    </label>
                ))}
            </div>
        </section>
    );
}

export default DifficultyBlock; 