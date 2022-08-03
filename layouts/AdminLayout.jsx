import React, { useContext } from 'react';
import { CustomContext } from '../context/Context';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AddMedia from '../components/admin/media/AddMedia';

export default function AdminLayout({ children }) {
	let { isVisibleSidebar, isVisibleAdminMedia } =
		useContext(CustomContext);

	let sidebar_class = isVisibleSidebar
		? 'admin-layout__sidebar'
		: 'admin-layout__sidebar admin-layout__sidebar--hidden';

	let body_class = isVisibleSidebar
		? 'admin-layout__body'
		: 'admin-layout__body admin-layout__body--full';

	return (
		<div className='wrapper'>
			<div className='admin-layout'>
				<div className={sidebar_class}>
					<AdminSidebar />
				</div>
				<div className={body_class}>
					<AdminHeader />
					<div className='admin-layout__main'>{children}</div>
				</div>
			</div>
			{isVisibleAdminMedia && <AddMedia />}
		</div>
	);
}
