import React, { Component } from "react";
import Switch from "react-switch";

class FiltersBlock extends Component {
	render() {
		return (
			<div className="results-box__filters-box filters-box">
				<h3>Фильтр</h3>
				<div className='filters-box__email-box filters-box__item'>
					<Switch name='email-filter' id='email-filter'
									onChange={(checked, event, id) => this.props.onChangeFilter(event, "email")}
									checked={this.props.filters.email}
									uncheckedIcon={false}
									checkedIcon={false}
									width={30}
									height={18}
									className='filter-switch' />
					<span className='filters-box__heading'>
							<span>Только предприятия с e-mail</span>
					</span>
				</div>
				<div className='filters-box__phone-box filters-box__item '>
					<Switch name='phone-filter' id='phone-filter'
									onChange={(checked, event, id) => this.props.onChangeFilter(event, "phone")}
									checked={this.props.filters.phone}
									uncheckedIcon={false}
									checkedIcon={false}
									width={30}
									height={18}
									className='filter-switch' />
					<span className='filters-box__heading'>
							<span>Только предприятия с телефонами</span>
					</span>
				</div>
			</div>
		);
	}
}

export default FiltersBlock;