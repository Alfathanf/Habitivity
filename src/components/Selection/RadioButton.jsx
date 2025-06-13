import styles from '../../css/RadioButton.module.css';

function RadioButton({ label, isSelected, onClick }) {
	return (
		<button
			className={`${styles.radioButton} ${isSelected ? styles.selected : ''}`}
			onClick={onClick}
		>
			<div className={styles.indicator} />
			<span>{label}</span>
		</button>
	);
}

export default RadioButton; 