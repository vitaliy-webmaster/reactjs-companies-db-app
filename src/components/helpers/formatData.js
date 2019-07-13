export const collectCheckedCities = (citiesData) => {
	const collectedCities = [];
	Object.keys(citiesData).forEach((elem1) => {
		Object.keys(citiesData[elem1]["data"]).forEach((elem2) => {
			if (citiesData[elem1]["data"][elem2]["isChecked"]) {
				collectedCities.push(elem2);
			}
			Object.keys(citiesData[elem1]["data"][elem2]["data"]).forEach((elem3) => {
				if (citiesData[elem1]["data"][elem2]["data"][elem3]["isChecked"]) {
					collectedCities.push(elem3);
				}
			});
		});
	});
	return collectedCities;
};

export const collectCheckedCategories = (categoriesData) => {
	const collectedCategories = [];
	Object.keys(categoriesData).forEach((elem1) => {
		Object.keys(categoriesData[elem1]["data"]).forEach((elem2) => {
			if (categoriesData[elem1]["data"][elem2]["isChecked"]) {
				collectedCategories.push(elem2);
			}
		});
	});
	return collectedCategories;
};

export const formatCitiesInput = (citiesData) => {
	const formattedCities = {};
	Object.keys(citiesData).forEach((elem1) => {
		formattedCities[elem1] = { isChecked: false, data: {} };
		Object.keys(citiesData[elem1]).forEach((elem2) => {
			formattedCities[elem1]["data"][elem2] = { isChecked: false, data: {} };
			citiesData[elem1][elem2].forEach((elem3) => {
				formattedCities[elem1]["data"][elem2]["data"][elem3] = { isChecked: false, data: {} };
			});
		});
	});
	return formattedCities;
};

export const formatCategoriesInput = (categoriesData) => {
	const formattedCategories = {};
	Object.keys(categoriesData).forEach((elem1) => {
		formattedCategories[elem1] = { isChecked: false, data: {} };
		categoriesData[elem1].forEach((elem2) => {
			formattedCategories[elem1]["data"][elem2] = { isChecked: false, data: {} };
		});
	});
	return formattedCategories;
};

export const calculateInvertedDataset = (dataSet, invertTo) => {
	// console.log(dataSet);
	if (Object.keys(dataSet).length === 0) return {};
	let newDataSet = {};
	Object.keys(dataSet).forEach((key) => {
		newDataSet[key] = {
			isChecked: invertTo,
			data: calculateInvertedDataset(dataSet[key]["data"], invertTo)
		};
	});
	return newDataSet;
};

// const renderSearchDataset = (localDataset, localLevel, localType, localPath) => {
// 	let searchDataset = [];
// 	Object.keys(localDataset).forEach(key => {
// 		const newLocalPath = [...localPath, key];
// 		searchDataset.push(<SelectionListSearchItem type={localType} level={localLevel} path={newLocalPath}
// 																								name={key} key={key}
// 																								isChecked={localDataset[key]["isChecked"]} />);
// 		if (localLevel < 3) {
// 			searchDataset = searchDataset.concat(
// 				renderSearchDataset(localDataset[key]["data"], localLevel + 1, localType, newLocalPath)
// 			);
// 		}
// 	});
// 	return searchDataset;
// };