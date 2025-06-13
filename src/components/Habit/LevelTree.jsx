import styles from '../../css/LevelTree.module.css';

function LevelTree({ level, xp, colorPalette, isTodayCompleted }) {
    const { baseColor } = colorPalette;
    // Use the correct tree image based on today's completion
    const treeImg = isTodayCompleted
        ? process.env.PUBLIC_URL + '/icons/tree.png'
        : process.env.PUBLIC_URL + '/icons/withered-tree.png';

    return (
        <div className={styles.levelTree}>
            <div className={styles.treeContainer}>
                <img
                    src={treeImg}
                    alt={isTodayCompleted ? 'Healthy Tree' : 'Withered Tree'}
                    className={styles.treeIcon}
                    style={{ background: 'none' }}
                />
                <div className={styles.levelBadge} style={{ backgroundColor: baseColor }}>
                    {level}
                </div>
            </div>
        </div>
    );
}

export default LevelTree; 