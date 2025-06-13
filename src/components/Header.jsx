import styles from '../css/Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const publicUrl = process.env.PUBLIC_URL;

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const isModalPage = location.pathname.includes('modal');
	const isMainPage = location.pathname === publicUrl + '/';

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<header className={styles.header}>
			<div className={styles.leftSection}>
				{isModalPage && !isMainPage && (
					<button onClick={handleBack} className={styles.backButton}>
						<IoIosArrowBack />
					</button>
				)}
				<div className={styles.logoWrapper}>
					<span className={styles.logo} />
					<h1>Habitivity</h1>
				</div>
			</div>

			{!isModalPage && (
				<div className={styles.navIcons}>
					<Link 
						to={`${publicUrl}/modal/menu`} 
						state={{ modalTitle: 'Menu' }}
						className={location.pathname.includes('menu') ? styles.active : ''}
					>
						<FaCog className={styles.icon} />
					</Link>
				</div>
			)}
		</header>
	);
}

export default Header;