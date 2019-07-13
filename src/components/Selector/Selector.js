import React, { Component } from "react";
import axios from "axios";
import SelectionBlock from "../SelectionBlock";
import preloaderImg from "../../images/preloader.gif";
// import request from "browser-request";
import {
	calculateInvertedDataset, collectCheckedCategories,
	collectCheckedCities,
	formatCategoriesInput,
	formatCitiesInput
} from "../helpers/formatData";
import ChangeDataContext from "../../context/ChangeDataContext";
import ResultsBlock from "../ResultsBlock";

class Selector extends Component {

	state = {
		isLoading: true,
		isCompaniesLoading: false,
		isPaymentLinkLoading: false,
		isAllCitiesChecked: false,
		isAllCategoriesChecked: false,
		phone: "",
		email: "",
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
						console.log(this.state);
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
		console.log("toggleAllCities");
		this.setState(prevState => {
			const prevIsAllCitiesChecked = prevState.isAllCitiesChecked;
			return {
				isAllCitiesChecked: !prevIsAllCitiesChecked,
				cities: calculateInvertedDataset(prevState["cities"], !prevIsAllCitiesChecked)
			};
		});
	};

	toggleAllCategories = () => {
		console.log("toggleAllCategories");
		this.setState(prevState => {
			const prevIsAllCategoriesChecked = prevState.isAllCategoriesChecked;
			return {
				isAllCategoriesChecked: !prevIsAllCategoriesChecked,
				categories: calculateInvertedDataset(prevState["categories"], !prevIsAllCategoriesChecked)
			};
		});
	};

	getLenData = (collectedCities, collectedCategories) => {
		this.setState({ isCompaniesLoading: true });
		axios.post(
			"http://5.23.53.17:8025/getlendata/",
			{
				"params": {
					"in": { "city": collectedCities },
					"like": { "subcategory": collectedCategories }
				}
			}
		).then((results) => {
			console.log("collectedCities:", collectedCities);
			console.log("collectedSubcategories:", collectedCategories);
			console.log("results:", results.data);
			this.setState({ isCompaniesLoading: false, companies: results.data });
		});
	};

	onPhoneChange = (event) => {
		event.preventDefault();
		this.setState({ phone: event.target.value });
	};

	onEmailChange = (event) => {
		event.preventDefault();
		this.setState({ email: event.target.value });
	};

	getPaymentLink = (event, collectedCities, collectedCategories) => {
		event.preventDefault();
		this.setState({ isPaymentLinkLoading: true });
		axios.post(
			"http://5.23.53.17:8025/application/",
			{
				"method": "card",
				"phone": this.state.phone,
				"email": this.state.email,
				"params": {
					"in": { "city": collectedCities },
					"like": { "subcategory": collectedCategories }
				}
			}
		).then((results) => {
			console.log("paymentLinkResults:", results.data);
			this.setState({ isPaymentLinkLoading: false, paymentLink: results.data });
		});


	};

	render() {

		const collectedCities = collectCheckedCities(this.state.cities);
		const collectedCategories = collectCheckedCategories(this.state.categories);

		return (
			<ChangeDataContext.Provider
				value={{ collectedCities, collectedCategories, toggleCheckbox: this.toggleCheckbox }}>
				<div className='selector-wrapper'>
					<div className='selector-wrapper__selection'>
						<h1>Создание базы предприятий России и стран СНГ</h1>
						<h3>Наш сервис позволяет легко и быстро создать базу интересующих Вас предприятий.
							Выберите города и уточните свой запрос, используя рубрики.</h3>
						{this.state.isLoading ? (
							<div className="loading-container">
								<img src={preloaderImg} alt="" />
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
					<ResultsBlock companies={this.state.companies}
												getLenData={() => this.getLenData(collectedCities, collectedCategories)}
												onEmailChange={this.onEmailChange}
												phone={this.state.phone}
												email={this.state.email}
												onPhoneChange={this.onPhoneChange}
												getPaymentLink={(event) => this.getPaymentLink(event, collectedCities, collectedCategories)}
												paymentLink={this.state.paymentLink}
					/>

				</div>
			</ChangeDataContext.Provider>
		);
	}
}

export default Selector;