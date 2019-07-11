import React, { Component } from "react";
import searchIcon from "../../images/search-icon.png";
import SelectionListItem from "../SelectionListItem";

class SelectionBlock extends Component {
	render() {
		const { data } = this.props;
		return (
			<div className='selection-block'>
				<div className="selection-block__header selection-header">
					<div className="selection-header__wrapper">
						<div className="selection-header__search selection-search">
							<div className="selection-search__icon">
								<img src={searchIcon} alt="Search Icon" />
							</div>
							<div className="selection-search__input">
								<input type="text" placeholder='Введите наименование' />
							</div>
						</div>
						<div className="selection-header__title selection-title">
							Выберите хотя бы один пункт из списка:
						</div>

					</div>
				</div>
				<div className="selection-block__body selection-body">
					<div className="selection-body__header">
						<input type="checkbox" id='check-all' />
						<label htmlFor="check-all">Выбрать всё</label>
					</div>
					<ul className='selection-body__list selection-list'>
						{
							Object.keys(data).map((key) => {
								return (<SelectionListItem level={1} data={data[key]} name={key} key={key} />);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default SelectionBlock;