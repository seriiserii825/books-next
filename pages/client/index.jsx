import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Form from '../../components/admin/form/Form';
import AdminTable from '../../components/admin/form/AdminTable';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Preloader from '../../components/animation/Preloader';
import TableHead from '../../components/admin/form/TableHead';

export default function Index() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [sort_field, setSortField] = useState('updated_at');
	const [sort_direction, setSortDirection] = useState('desc');
	const [search, setSearch] = useState('');

	const getData = (
		sort_field = 'updated_at',
		sort_direction = 'asc',
		search = ''
	) => {
		axios
			.get(
				'/client?sort_field=' +
					sort_field +
					'&sort_direction=' +
					sort_direction +
					'&search=' +
					search
			)
			.then((res) => {
				let result = res.data.data.reverse();
				console.log(result, 'result');
				result = result.map((item) => {
					item.checked = false;
					return item;
				});
				setData(result.reverse());
				setLoading(false);
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
				.delete('/client/' + id)
				.then((res) => {
					window.location = router.pathname;
				})
				.catch((err) => {
					console.log(err.response, 'err.response');
				});
		}
	};
	const sortTable = (field, sort_direction) => {
		setSortDirection(sort_direction === 'asc' ? 'desc' : 'asc');
		setSortField(field);
	};

	const formatDate = (date) => {
		let options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false,
		};

		return new Intl.DateTimeFormat('en', options).format(new Date(date));
	};

	const searchHandler = (e) => {
		setSearch(e.target.value);
		setLoading(true);
	};

	function deleteChecked() {
		const ids = data.filter((item) => item.checked).map((item) => item.id);
		axios
			.delete('/client_destroy_many/' + [...ids])
			.then((res) => {
				window.location = router.pathname;
			})
			.catch((err) => {
				console.log(err.response, 'err.response');
			});
	}

	useEffect(() => {
		setLoading(true);
		getData(sort_field, sort_direction, search);
	}, [sort_field, sort_direction, search]);

	return (
		<AdminLayout>
			<Form label='List clients'>
				<AdminTable>
					<div className='search'>
						<label htmlFor='search'>Search:</label>
						<input
							type='text'
							value={search}
							onChange={searchHandler}
						/>
					</div>
					{loading ? (
						<Preloader />
					) : (
						<div>
							<table>
								<thead>
									<tr>
										<TableHead
											label='ID'
											field='id'
											sort_direction={sort_direction}
											sortTable={sortTable}
										/>
										<TableHead
											label='Name'
											field='name'
											sort_direction={sort_direction}
											sortTable={sortTable}
										/>
										<TableHead
											label='Email'
											field='email'
											sort_direction={sort_direction}
											sortTable={sortTable}
										/>
										<TableHead
											label='Status'
											field='status'
											sort_direction={sort_direction}
											sortTable={sortTable}
										/>
										<TableHead
											label='Updated At'
											field='updated_at'
											sort_direction={sort_direction}
											sortTable={sortTable}
										/>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{data.length
										? data.map((item, index) => {
												let updated_at = formatDate(
													item.updated_at
												);
												return (
													<tr key={item.id}>
														<td>{item.id}</td>
														<td>{item.name}</td>
														<td>{item.email}</td>
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
														<td>{updated_at}</td>
														<td>
															<Link
																href={
																	`/client/` +
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
												);
										  })
										: null}
								</tbody>
							</table>
						</div>
					)}
				</AdminTable>
			</Form>
		</AdminLayout>
	);
}
