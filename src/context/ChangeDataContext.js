import React from "react";

const ChangeDataContext = React.createContext({
	collectedCities: [],
	collectedCategories: [],
	toggleCheckbox: () => {
	}
});

export default ChangeDataContext;