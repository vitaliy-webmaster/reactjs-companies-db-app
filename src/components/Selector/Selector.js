import React, { Component } from "react";
import axios from "axios";
import SelectionBlock from "../SelectionBlock";
import {
	calculateInvertedDataset, collectCheckedCategories,
	collectCheckedCities,
	formatCategoriesInput,
	formatCitiesInput, renderDataObjForRequest
} from "../helpers/formatData";
import ChangeDataContext from "../../context/ChangeDataContext";
import ResultsBlock from "../ResultsBlock";
import FiltersBlock from "../FiltersBlock";

class Selector extends Component {

	state = {
		isLoading: true,
		isCompaniesLoading: false,
		isPaymentLinkLoading: false,
		isAllCitiesChecked: false,
		isAllCategoriesChecked: false,
		isClientPhoneValid: null,
		isClientEmailValid: null,
		phone: "",
		email: "",
		filters: { email: false, phone: false },
		paymentLink: {},
		cities: {},
		categories: {},
		companies: {}
	};


	componentDidMount() {
		const citiesAsync = axios.get("http://5.23.53.17:8025/cities/");
		const categoriesAsync = axios.get("http://5.23.53.17:8025/categories/");

		// const host = "http://5.23.53.17:8025";
		// request({
		// 	method: "POST",
		// 	url: host + "/getlendata/",
		// 	body: {
		// 		"params": {
		// 			"like": { "category": ["Одежда / Обувь", "Охрана / Безопасность"] },
		// 			"in": { "city": ["Днепр", "Подгородное"] }
		// 		}
		// 	},
		// 	json: true
		// }, on_response);
		//
		// function on_response(er, response, body) {
		// 	console.log("Server: ", response, body);
		// }

		// request.post(host + "/getlendata/", , (e, res, body) => {
		// 	console.log(JSON.stringify(body));
		// });

		Promise.all([citiesAsync, categoriesAsync])
			.then(results => {
				// console.log(results[1].data);
				const formattedCities = formatCitiesInput(results[0].data);
				const formattedCategories = formatCategoriesInput(results[1].data);
				// console.log(formattedCategories);
				this.setState({ isLoading: false, cities: formattedCities, categories: formattedCategories },
					() => {
						// console.log(this.state);
					});
			})
			.catch(err => {
				console.log(err);
			});
	}

	toggleCheckbox = (type, level, path) => {
		this.setState(prevState => {
			let newState = {};

			if (level === 1) {
				const prevIsChecked = prevState[type][path[0]]["isChecked"];
				newState = {
					[type]: {
						...prevState[type],
						[path[0]]: {
							isChecked: !prevIsChecked,
							data: calculateInvertedDataset(prevState[type][path[0]]["data"], !prevIsChecked)
						}
					}
				};
			} else if (level === 2) {
				const prevIsChecked = prevState[type][path[0]]["data"][path[1]]["isChecked"];
				newState = {
					[type]: {
						...prevState[type],
						[path[0]]: {
							isChecked: prevState[type][path[0]]["isChecked"],
							data: {
								...prevState[type][path[0]]["data"],
								[path[1]]: {
									isChecked: !prevIsChecked,
									data: calculateInvertedDataset(prevState[type][path[0]]["data"][path[1]]["data"], !prevIsChecked)
								}
							}
						}
					}
				};
			} else if (level === 3) {
				const prevIsChecked = prevState[type][path[0]]["data"][path[1]]["data"][path[2]]["isChecked"];
				newState = {
					[type]: {
						...prevState[type],
						[path[0]]: {
							isChecked: prevState[type][path[0]]["isChecked"],
							data: {
								...prevState[type][path[0]]["data"],
								[path[1]]: {
									isChecked: prevState[type][path[0]]["data"][path[1]]["isChecked"],
									data: {
										...prevState[type][path[0]]["data"][path[1]]["data"],
										[path[2]]: {
											isChecked: !prevIsChecked,
											data: {}
										}
									}
								}
							}
						}
					}
				};
			}
			return newState;
		});
	};


	toggleAllCities = () => {
		// console.log("toggleAllCities");
		this.setState(prevState => {
			const prevIsAllCitiesChecked = prevState.isAllCitiesChecked;
			return {
				isAllCitiesChecked: !prevIsAllCitiesChecked,
				cities: calculateInvertedDataset(prevState["cities"], !prevIsAllCitiesChecked)
			};
		});
	};

	toggleAllCategories = () => {
		// console.log("toggleAllCategories");
		this.setState(prevState => {
			const prevIsAllCategoriesChecked = prevState.isAllCategoriesChecked;
			return {
				isAllCategoriesChecked: !prevIsAllCategoriesChecked,
				categories: calculateInvertedDataset(prevState["categories"], !prevIsAllCategoriesChecked)
			};
		});
	};

	getLenData = (collectedCities, collectedCategories) => {
		const { email: emailFilter, phone: phoneFilter } = this.state.filters;
		this.setState({ isCompaniesLoading: true });
		let data = renderDataObjForRequest(emailFilter, phoneFilter, collectedCities, collectedCategories);
		// console.log(data);
		axios.post(
			"http://5.23.53.17:8025/getlendata/",
			{ "params": data }
		).then((results) => {
			// console.log("collectedCities:", collectedCities);
			// console.log("collectedSubcategories:", collectedCategories);
			// console.log("results:", results.data);
			this.setState({ isCompaniesLoading: false, companies: results.data });
		});
	};

	onPhoneChange = (event) => {
		event.preventDefault();
		const phone = event.target.value;
		const regexp = /^[+()\d-]+$/;
		// console.log("match phone:", !!phone.match(regexp));
		this.setState({ phone: event.target.value, isClientPhoneValid: !!phone.match(regexp) });
	};

	onEmailChange = (event) => {
		event.preventDefault();
		const email = event.target.value;
		const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// console.log("match email:", !!email.match(regexp));
		this.setState({ email: event.target.value, isClientEmailValid: !!email.match(regexp) });
	};

	getPaymentLink = (event, collectedCities, collectedCategories) => {
		const { email, phone } = this.state;
		const { email: emailFilter, phone: phoneFilter } = this.state.filters;
		event.preventDefault();

		const data = {
			"method": "card",
			"phone": phone,
			"email": email,
			"params": renderDataObjForRequest(emailFilter, phoneFilter, collectedCities, collectedCategories)
		};
		// console.log(data);

		this.setState({ isPaymentLinkLoading: true });
		axios.post(
			"http://5.23.53.17:8025/application/",
			data
		).then((results) => {
			// console.log("paymentLinkResults:", results.data);
			this.setState({ isPaymentLinkLoading: false, paymentLink: results.data });
		});


	};

	onChangeFilter = (e, filterType) => {
		// e.preventDefault();
		this.setState(prevState => ({
			filters: {
				...prevState.filters,
				[filterType]: !prevState.filters[filterType]
			}
		}));
	};

	render() {
		const { filters } = this.state;
		const collectedCities = collectCheckedCities(this.state.cities);
		const collectedCategories = collectCheckedCategories(this.state.categories);

		return (
			<ChangeDataContext.Provider
				value={{ collectedCities, collectedCategories, toggleCheckbox: this.toggleCheckbox }}>
				<div className='selector-wrapper'>
					<div className='selector-wrapper__selection'>
						<div className="selection-filters-mob-container">
							<FiltersBlock filters={filters} onChangeFilter={this.onChangeFilter} />
						</div>
						{this.state.isLoading ? (
							<div className="spinner-main-loader">
								<div className="spinner-border" role="status" />
							</div>
						) : (
							<div className="selection-container">
								<SelectionBlock type='cities' dataset={this.state.cities}
																isAllChecked={this.state.isAllCitiesChecked}
																toggleAllCities={this.toggleAllCities}
																toggleAllCategories={this.toggleAllCategories} />
								<SelectionBlock type='categories' dataset={this.state.categories}
																isAllChecked={this.state.isAllCategoriesChecked}
																toggleAllCities={this.toggleAllCities}
																toggleAllCategories={this.toggleAllCategories} />
							</div>
						)}
					</div>
					<div className="selector-wrapper__results-placeholder" />
					<div className="selector-wrapper__results results">
						<ResultsBlock isCompaniesLoading={this.state.isCompaniesLoading}
													isPaymentLinkLoading={this.state.isPaymentLinkLoading}
													companies={this.state.companies}
													getLenData={() => this.getLenData(collectedCities, collectedCategories)}
													onEmailChange={this.onEmailChange}
													phone={this.state.phone}
													email={this.state.email}
													isClientPhoneValid={this.state.isClientPhoneValid}
													isClientEmailValid={this.state.isClientEmailValid}
													onPhoneChange={this.onPhoneChange}
													getPaymentLink={(event) => this.getPaymentLink(event, collectedCities, collectedCategories)}
													paymentLink={this.state.paymentLink}
													filters={this.state.filters}
													onChangeFilter={(e, filterType) => this.onChangeFilter(e, filterType)}
						/>
					</div>
				</div>
			</ChangeDataContext.Provider>
		);
	}
}

export default Selector;