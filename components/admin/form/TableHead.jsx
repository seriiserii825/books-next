import React from 'react';

export default function TableHead(field, sort_direction, sortTable, label) {
	function clickHandler(e) {
		e.preventDefault();
    sortTable(field, sort_direction);
	}

	return (
		<th>
			<a href='#' onClick={() => clickHandler()}>
				{label}
			</a>
			{sort_direction === 'asc' ? (
				<span>&uarr;</span>
			) : (
				<span>&darr;</span>
			)}
		</th>
	);
}
