import React, { Component } from "react";
import Switch from "react-switch";

class FiltersBlock extends Component {
	render() {
		return (
			<div className="results-box__filters-box filters-box">
				<h3>Фильтр</h3>
				<div className='filters-box__email-box filters-box__item'>
						<span className='filters-box__heading'>
							<span>E-mail:</span>
							<span>В базу будут включены только предприятия с e-mail</span>
						</span>
					{/*<input type="checkbox" name='email-filter' id='email-filter' />*/}
					<Switch name='email-filter' id='email-filter'

									uncheckedIcon={false}
									checkedIcon={false}
									width={50}
									className='filter-switch' />
				</div>
				<div className='filters-box__phone-box filters-box__item '>
						<span className='filters-box__heading'>
							<span>Телефоны</span>
							<span>В базу будут включены только предприятия с телефонами</span>
						</span>
					{/*<input type="checkbox" name='phone-filter' id='phone-filter' />*/}
					<Switch name='phone-filter' id='phone-filter'
									uncheckedIcon={false}
									checkedIcon={false}
									width={50}
									className='filter-switch' />
				</div>
			</div>
		);
	}
}

export default FiltersBlock;