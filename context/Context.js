import React, { createContext, useState } from 'react';

export const CustomContext = createContext();

export const Context = (props) => {
	const [isVisibleSidebar, setIsVisibleSidebar] = useState(true);

	const toggleSidebar = () => {
		setIsVisibleSidebar(!isVisibleSidebar);
	};

	const value = {
		isVisibleSidebar,
		toggleSidebar,
	};

	return (
		<CustomContext.Provider value={value}>
			{props.children}
		</CustomContext.Provider>
	);
};
