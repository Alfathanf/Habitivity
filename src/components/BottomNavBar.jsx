import styles from '../css/BottomNavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaAward } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

const publicUrl = process.env.PUBLIC_URL;

function BottomNavBar() {
  const location = useLocation();
  const isHabitEditor = location.pathname.includes('habitEditor');
  const isDiary = location.pathname.includes('diary');
  const isMenu = location.pathname.includes('menu');
  const isArchive = location.pathname.includes('archive');
  const isDataTransfer = location.pathname.includes('dataTransfer');
  const isAppearance = location.pathname.includes('appearance');
  const isStatistics = location.pathname.includes('statistics');
  
  // Don't show bottom nav on modal pages
  if (isHabitEditor || isDiary || isMenu || isArchive || isDataTransfer || isAppearance || isStatistics) return null;

  const navItems = [
    {
      to: publicUrl + '/',
      icon: <FaHome />, 
      label: 'Home',
      active: location.pathname === publicUrl + '/'
    },
    {
      to: publicUrl + '/modal/habitEditor',
      icon: <MdAdd />, 
      label: 'Add',
      isAdd: true,
      active: location.pathname.includes('habitEditor'),
      state: { modalTitle: 'Create new habit' }
    },
    {
      to: publicUrl + '/modal/achievements',
      icon: <FaAward />, 
      label: 'Achievements',
      active: location.pathname.includes('achievements'),
      state: { modalTitle: 'Achievements' }
    }
  ];

  return (
    <nav className={styles.bottomNavBar}>
      {navItems.map(({ to, icon, label, active, isAdd, state }) => (
        <Link key={label} to={to} state={state} className={active ? styles.active : ''}>
          <div className={isAdd ? styles.addIcon : styles.icon}>{icon}</div>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNavBar; 