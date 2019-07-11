import React, { Component } from "react";
import axios from "axios";
import SelectionBlock from "../SelectionBlock";
import preloaderImg from "../../images/preloader.gif";
import { sampleCategories, sampleCities } from "../../sampleData";

class Selector extends Component {

	state = { isLoading: true, cities: {}, categories: {} };

	componentDidMount() {
		const citiesAsync = axios.get("http://5.23.53.17:8025/cities/");
		const categoriesAsync = axios.get("http://5.23.53.17:8025/categories/");
		Promise.all([citiesAsync, categoriesAsync])
			.then(results => {
				console.log(results.data);
				this.setState({ isLoading: false, cities: sampleCities, categories: sampleCategories });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
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
							<SelectionBlock type='cities' data={this.state.cities} />
							<SelectionBlock type='categories' data={this.state.categories} />
						</div>
					)}
				</div>
				<div className="selector-wrapper__results results">
					<div className="results-box">
						<div className="results-box__message-main">
							Выберите хотя бы один вид деятельности
						</div>
						<div className="results-box__message-main">
							Не забудьте выбрать город и вид деятельности
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Selector;