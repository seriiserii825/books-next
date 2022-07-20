import { Context } from '../context/Context';
import AdminLayout from '../layouts/AdminLayout';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<AdminLayout>
			<div className={styles.container}>
				<h2>Next app</h2>
				<button className='btn'>Button</button>
			</div>
		</AdminLayout>
	);
}
