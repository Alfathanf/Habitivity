import styles from '../css/Modal.module.css';

// react
import { useState } from 'react';

// router
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// framer
import { motion } from 'framer-motion'

// icons
import { IoIosArrowBack } from 'react-icons/io';

// components
import BottomNavBar from './BottomNavBar';

// variants
const modalVariants = {
	initial: { opacity: 0, x: '50%' },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: '10%' },
	transition: { duration: .2, ease: 'easeOut' }
};

function Modal() {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClose = () => navigate(-1);

	const [title] = useState(location.state?.modalTitle);

	return (
		<motion.div
			className={styles.modal}
			{...modalVariants}
		>
			<motion.header className={styles.header}>
				<button onClick={handleClose} className={styles.backButton}>
					<IoIosArrowBack />
				</button>
				<h2 className={styles.title}>
					{title ?? ''}
				</h2>
			</motion.header>

			<Outlet />

			<BottomNavBar />
		</motion.div>
	);
}

export default Modal;