import styles from '../../css/HabitEditor.module.css';

// react
import { useEffect, useState } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// stores
import { useHabitsStore } from '../../stores/habitsStore';

// components
import TitleBlock from './TitleBlock';
import FrequencyBlock from './FrequencyBlock';
import OrderBlock from './OrderBlock';
import ColorBlock from './ColorBlock';
import IconBlock from './IconBlock';
import DifficultyBlock from './DifficultyBlock';
import Button from '../Button';

// utils
import checkHabitTitleExistence from '../../utils/checkHabitTitleExistence';

// icons
import { MdAddToPhotos } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

function HabitEditor() {
	const location = useLocation();
	const navigate = useNavigate();

	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const habitTitle = location.state?.habitTitle;
	const isEditMode = Boolean(habitTitle);
	const filteredHabits = isEditMode ? habits.filter((h) => !h.isArchived) : [];
	const habit = isEditMode ? habits.find((habit) => habit.title === habitTitle) : null;

	const [inputTitle, setInputTitle] = useState(isEditMode ? habit?.title : '');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	useEffect(() => {
		setAlreadyExist(
			checkHabitTitleExistence(habits, habit, inputTitle)
		);
	}, [habit, habits, inputTitle]);

	// action object
	const actionObj = {
		habitTitle: habit?.title
	};

	// on submit form
	const handleSubmitForm = (e) => {
		e.preventDefault();

		if (inputTitle.length) {
			handleUpdate({ ...actionObj, data: e.target, type: isEditMode ? 'editHabit' : 'addHabit' });
		} else {
			setAlreadyExist(true);
		}
	};

	const handleUpdate = (props) => {
		habitsDispatch(props);
		navigate(-1);
	};

	// prevents form submission on Enter key press and hides the virtual keyboard
	const handlePressEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
		}
	};

	// order
	const [currOrder, setCurrOrder] = useState(() => (
		isEditMode ? filteredHabits.indexOf(habit) + 1 : -1
	));

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSubmitForm}
				onKeyDown={handlePressEnter}
			>
				<div className={styles.formSection}>
					<TitleBlock
						input={inputTitle}
						onChange={(newTitle) => setInputTitle(newTitle)}
						alreadyExist={alreadyExist}
					/>
				</div>

				<div className={styles.formSection}>
					<FrequencyBlock
						{...{ currentFrequency: habit?.frequency }}
					/>
				</div>

				<div className={styles.formSection}>
					<DifficultyBlock
						{...{ currentDifficulty: habit?.difficulty }}
					/>
				</div>

				{isEditMode && (
					<div className={styles.formSection}>
						<OrderBlock
							habitsCount={filteredHabits.length}
							currOrder={currOrder}
							setCurrOrder={setCurrOrder}
						/>
					</div>
				)}

				<div className={styles.formSection}>
					<ColorBlock
						{...{ habits, currentColorIndex: habit?.colorIndex }}
					/>
				</div>

				<div className={styles.formSection}>
					<IconBlock
						{...{ habits, currentIconTitle: habit?.iconTitle }}
					/>
				</div>

				<small className={styles.info}>
					'Color' and 'Icon' icons in reduced size indicate that they have been previously used (but can be reused).
				</small>

				<div className={styles.btnsWrapper}>
					{isEditMode && (
						<div className={styles.extraBtnsWrapper}>
							<Button
								icon={<MdDeleteForever />}
								text='Delete Habit'
								color='IndianRed'
								bgColor='var(--bg-color-primary)'
								onClick={() => {
									const msg = 'Are you sure you want to delete this habit? Deleted data cannot be recovered.';
									if (window.confirm(msg)) {
										handleUpdate({ ...actionObj, type: 'deleteHabit' });
									}
								}}
							/>

							<Button
								icon={<HiArchiveBoxArrowDown />}
								text='Archive Habit'
								color='#666'
								bgColor='var(--bg-color-primary)'
								onClick={() => {
									const msg = 'Are you sure you want to archive this habit?';
									if (window.confirm(msg)) {
										handleUpdate({ ...actionObj, type: 'archiveHabit' });
									}
								}}
							/>
						</div>
					)}

					<Button
						icon={<MdAddToPhotos />}
						text={isEditMode ? 'Save Changes' : 'Create Habit'}
						bgColor='#5FE394'
						type="submit"
						disabled={alreadyExist || !inputTitle.length}
					/>
				</div>
			</form>
		</div>
	);
}

export default HabitEditor;