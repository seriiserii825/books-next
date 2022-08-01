import axios from 'axios';
import React from 'react';

export default function MediaItem(props) {
	const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
	const { url, id } = props;

	const deleteItem = (id) => {
		let agree = window.confirm(
			'Are you sure you want to delete this item?'
		);
		if (agree) {
			axios
				.delete('/media/' + id)
				.then((res) => {
					window.location = window.location;
				})
				.catch((err) => {
					console.log(err.response, 'err.response');
				});
		}
	};

	return (
		<div className='media__item' key={url} onClick={() => deleteItem(id)}>
			<img
				src={`${server_url}${url}`}
				width={100}
				height={100}
				alt='image'
			/>
			<h4 className='media__title'>{url}</h4>
		</div>
	);
}
