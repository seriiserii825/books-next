import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MediaTableItem from './MediaTableItem';

function MediaTable() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');

	const getData = () => {
		axios
			.get('/media?search=' + search)
			.then((res) => {
				setData(res.data.data.reverse());
				console.log(res.data.data, 'res.data.data');
			})
			.catch((err) => {
				console.log(err.response, 'err.response');
			});
	};

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getData();
	}, [search]);

	return (
		<div className='media-table'>
			<header className='media__header'>
				<input
					type='text'
					value={search}
					placeholder='Search...'
					onChange={searchHandler}
				/>
			</header>
			<div className='media-table__body'>
				<table>
					<tbody>
						{data.length ? (
							data.map((item, index) => {
								console.log(item, 'item');
								return (
									<MediaTableItem
										key={index}
										{...item}
										onDelete={() => getData()}
									/>
								);
							})
						) : (
							<tr>
								<td>No data...</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MediaTable;
