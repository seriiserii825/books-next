import React from 'react';

export default function MediaItem(props) {
	const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
	const { url, id, name, onChoose } = props;
	const [isActive, setIsActive] = React.useState(false);
	const full_url = `${server_url}${url}`;

	const toggleActive = () => {
		if (isActive) {
			setIsActive(false);
			onChoose(full_url, true);
		} else {
			setIsActive(true);
			onChoose(full_url, false);
		}
	};

	const activeClass = isActive ? 'media__item active' : 'media__item';

	return (
		<div className={activeClass} key={url} onClick={() => toggleActive()}>
			<img
				src={full_url}
				width={100}
				height={100}
				alt='image'
			/>
			<h4 className='media__title'>{name}</h4>
		</div>
	);
}
