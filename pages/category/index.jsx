import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Form from '../../components/admin/form/Form';
import AdminTable from '../../components/admin/form/AdminTable';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Preloader from '../../components/animation/Preloader';

export default function Index() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [sort_field, setSortField] = useState('id');
	const [sort_direction, setSortDirection] = useState('asc');

	const getData = (sort_field = 'id', sort_direction = 'asc') => {
		axios
			.get(
				'https://localhost:8088/api/category?sort_field=' +
					sort_field +
					'&sort_direction=' +
					sort_direction
			)
			.then((res) => {
				setData(res.data.data.reverse());
				setTimeout(() => {
					setLoading(false);
				}, 400);
			})
			.catch((err) => {
				console.log(err.response, 'err.response');
				setLoading(false);
			});
	};
	const deleteItem = (id) => {
		let confirmDelete = window.confirm(
			'Are you sure you want to delete this item?'
		);
		if (confirmDelete) {
			axios
				.delete('https://localhost:8088/api/category/' + id)
				.then((res) => {
					window.location = router.pathname;
				})
				.catch((err) => {
					console.log(err.response, 'err.response');
				});
		}
	};
	const sortTable = (field) => {
		setLoading(true);
		setSortDirection(sort_direction === 'asc' ? 'desc' : 'asc');
		setSortField(field);
		getData(field, sort_direction);
	};
	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	return (
		<AdminLayout>
			<Form label='List Categories'>
				{loading ? (
					<Preloader />
				) : (
					<AdminTable>
						<div>
							<table>
								<thead>
									<tr>
										<th>
											<a
												href='#'
												onClick={() => sortTable('id')}>
												#ID
											</a>
											{sort_direction === 'asc' ? (
												<span>&uarr;</span>
											) : (
												<span>&darr;</span>
											)}
										</th>
										<th>
											<a
												href='#'
												onClick={() =>
													sortTable('name')
												}>
												Name
											</a>
											{sort_direction === 'asc' ? (
												<span>&uarr;</span>
											) : (
												<span>&darr;</span>
											)}
										</th>
										<th>
											<a
												href='#'
												onClick={() =>
													sortTable('status')
												}>
												Status
											</a>
											{sort_direction === 'asc' ? (
												<span>&uarr;</span>
											) : (
												<span>&darr;</span>
											)}
										</th>
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
																item.status ===
																1
																	? 'badge badge--success'
																	: 'badge badge--danger'
															}>
															{item.status}
														</span>
													</td>
													<td>
														<Link
															href={
																`/category/` +
																item.id
															}>
															<a className='btn btn--success'>
																Edit
															</a>
														</Link>
														<button
															className='btn btn--danger'
															onClick={() =>
																deleteItem(
																	item.id
																)
															}>
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
				)}
			</Form>
		</AdminLayout>
	);
}
