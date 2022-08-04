export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
	return (
		<div>
			<input
				type='checkbox'
				id={`checkbox-${index}`}
				checked={isChecked}
				onChange={checkHandler}
			/>
		</div>
	);
};
