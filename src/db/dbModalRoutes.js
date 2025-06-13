import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// components
import Menu from '../components/Menu/Menu';
import Statistics from '../components/Statistics/Statistics';
import HabitEditor from '../components/HabitEditor/HabitEditor';
import Achievements from '../components/Achievements/Achievements';
import Archive from '../components/Archive/Archive';
import DataTransfer from '../components/DataTransfer/DataTransfer';

const modalRoutes = [
	{
		path: '',
		element: <Navigate to="menu" replace />
	},
	{
		path: 'menu',
		element: <Menu />
	},
	{
		path: 'statistics',
		element: <Statistics />
	},
	{
		path: 'habitEditor',
		element: <HabitEditor />
	},
	{
		path: 'achievements',
		element: <Achievements />
	},
	{
		path: 'archive',
		element: <Archive />
	},
	{
		path: 'dataTransfer',
		element: <DataTransfer />
	}
];

export default modalRoutes;