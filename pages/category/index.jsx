import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Form from '../../components/admin/form/Form';
import AdminTable from '../../components/admin/form/AdminTable';

export default function Index() {
	const [data, setData] = useState([]);

	const getData = () => {
		axios
			.get('https://localhost:8088/api/category')
			.then((res) => {
				setData(res.data.data.reverse());
			})
			.catch((err) => {
				console.log(err.response, 'err.response');
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<AdminLayout>
			<Form label='List Categories'>
				<AdminTable>
					<div>
						<table>
							<thead>
								<tr>
									<th>#ID</th>
									<th>Name</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{data.length
									? data.map((item, index) => (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.name}</td>
												<td>
													<span
														className={
															item.status === 1
																? 'badge badge--success'
																: 'badge badge--danger'
														}>
														{item.status}
													</span>
												</td>
												<td>
													<button className='btn btn--success'>
														Edit
													</button>
													<button className='btn btn--danger'>
														Delete
													</button>
												</td>
											</tr>
									  ))
									: null}
							</tbody>
						</table>
					</div>
				</AdminTable>
			</Form>
		</AdminLayout>
	);
}
