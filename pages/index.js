import AdminCard from '../components/admin/ui/AdminCard';
import AdminLayout from '../layouts/AdminLayout';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<AdminLayout>
			<div className={styles.container}>
				<div className='admin-layout__wrap'>
					<div className='admin-layout__item'>
						<AdminCard title='Categories' number={3} bg="green" link="/category"  />
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
