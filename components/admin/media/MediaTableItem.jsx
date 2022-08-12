import axios from 'axios';
import React from 'react';
import formatDate from '../../../helpers/format-date';
import { useRouter } from 'next/router';

export default function MediaTableItem({
	id,
	name,
	url,
	created_at,
	onDelete,
}) {
	const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

	const deleteItem = (id) => {
		axios
			.delete('/media/' + id)
			.then((res) => {
				onDelete();
			})
			.catch((err) => {
				console.log(err.response, 'err.response');
			});
	};

	return (
		<tr>
			<td>{id}</td>
			<td>
				<img
					src={`${server_url}${url}`}
					width='100'
					height='100'
					alt=''
				/>
			</td>
			<td>{name}</td>
			<td>{url}</td>
			<td>
				<button
					className='btn btn--danger'
					onClick={() => deleteItem(id)}>
					Delete
				</button>
			</td>
		</tr>
	);
}
