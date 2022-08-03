import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MediaItem from './MediaItem';

function Media({ onClose, onImages }) {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [images, setImages] = useState([]);

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

	const addImage = (full_url, remove) => {
		if (remove) {
			setImages(
				images.filter((image_full_url) => image_full_url !== full_url)
			);
		} else {
			if (!images.includes(full_url)) {
				setImages([...images, full_url]);
			}
		}
	};

	function addImages() {
		onImages(images);
		onClose();
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getData();
	}, [search]);

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				onClose();
			}
		});
	}, []);

	return (
		<div className='media'>
			<div className='media__container'>
				<header className='media__header'>
					<input
						type='text'
						value={search}
						placeholder='Search...'
						onChange={searchHandler}
					/>
					<button
						className='btn btn--danger'
						onClick={() => onClose()}>
						Close
					</button>
				</header>
				<div className='media__body'>
					<div className='media__wrap'>
						{data.map((item, index) => {
							return (
								<MediaItem
									key={item.id}
									{...item}
									onChoose={addImage}
								/>
							);
						})}
					</div>
				</div>
				<footer className='media__footer'>
					<button className='btn btn--success' onClick={addImages}>
						Add images
					</button>
				</footer>
			</div>
		</div>
	);
}

export default Media;
