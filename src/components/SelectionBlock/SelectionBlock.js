import React, { Component } from "react";
import searchIcon from "../../images/search-icon.png";
import crossIcon from "../../images/cross-icon.png";
import SelectionListItem from "../SelectionListItem";
import SelectionListSearchItem from "../SelectionListSearchItem";


class SelectionBlock extends Component {

	state = { search: "" };

	toggleIsChecked = () => {
		console.log("toggleIsChecked");
		const { type } = this.props;
		console.log(type);
		if (type === "cities") {
			this.props.toggleAllCities();
		} else if (type === "categories") {
			this.props.toggleAllCategories();
		}
	};

	handleSearchChange = (event) => {
		event.preventDefault();
		this.setState({ search: event.target.value }, () => {
			console.log(this.state.search);
		});
	};

	clearSearch = (event) => {
		event.preventDefault();
		this.setState({ search: "" });
	};

	render() {
		const { dataset, isAllChecked, type } = this.props;
		const { search } = this.state;
		// console.log("dataset", dataset);

		const renderSearchList = (localDataset, localLevel, localType, localPath) => {
			const searchDataset = renderSearchDataset(localDataset, localLevel, localType, localPath);
			return searchDataset.length > 0 ? searchDataset : (
				<div className='selection-body__nomatch-box'>Совпадений не найдено</div>
			);
		};

		const renderSearchDataset = (localDataset, localLevel, localType, localPath) => {
			let searchDataset = [];
			Object.keys(localDataset).sort().forEach((key) => {
				const searchMatch = key.toLowerCase().indexOf(search.toLowerCase()) + 1;
				const newLocalPath = [...localPath, key];
				if (searchMatch) {
					searchDataset.push(<SelectionListSearchItem type={localType} level={localLevel} path={newLocalPath}
																											name={key} key={`${localPath.join("-")}-` + key}
																											isChecked={localDataset[key]["isChecked"]} />);
				}
				if (localLevel < 3) {
					searchDataset = searchDataset.concat(
						renderSearchDataset(localDataset[key]["data"], localLevel + 1, localType, newLocalPath)
					);
				}
			});
			return searchDataset;
		};

		return (
			<div className='selection-block'>
				<div className="selection-block__header selection-header">
					<div className="selection-header__wrapper">
						<div className="selection-header__search selection-search">
							<div className="selection-search__icon">
								<img src={searchIcon} alt="Search Icon" />
							</div>
							<div className="selection-search__input">
								<input type="text" placeholder='Введите наименование'
											 value={this.state.search}
											 onChange={this.handleSearchChange} />
							</div>
							{this.state.search.length > 0 ? (
								<div className="selection-search__cross-icon" onClick={this.clearSearch}>
									<img src={crossIcon} alt="Cross Icon" />
								</div>
							) : null}
						</div>
						<div className="selection-header__title selection-title">
							Выберите хотя бы один пункт из списка:
						</div>

					</div>
				</div>
				<div className="selection-block__body selection-body">
					<div className="selection-body__header">
						<input type="checkbox" id={`check-all-${type}`} checked={isAllChecked}
									 onChange={(event) => this.toggleIsChecked(event)} />
						<label htmlFor={`check-all-${type}`}>Выбрать всё</label>
					</div>
					<ul className='selection-body__list selection-list'>
						{
							search.length === 0 ?
								Object.keys(dataset).sort().map((key) => {
									return (
										<SelectionListItem type={type} level={1} path={[]} dataset={dataset[key]["data"]} name={key}
																			 key={key}
																			 isChecked={dataset[key]["isChecked"]} />
									);
								}) : null
						}
						{
							search.length > 0 ? renderSearchList(dataset, 1, type, []) : null
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default SelectionBlock;