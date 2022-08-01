import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MediaItem from './MediaItem';

function Media() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');

	const getData = () => {
		axios
			.get('/media?search=' + search)
			.then((res) => {
				setData(res.data.data.reverse());
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
		<div className='media'>
			<header className='media__header'>
				<input
					type='text'
					value={search}
					placeholder='Search...'
					onChange={searchHandler}
				/>
			</header>
			<div className='media__body'>
				<div className='media__wrap'>
					{data.map((item, index) => {
						return <MediaItem key={item.id} {...item} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default Media;
