import React, { PureComponent } from "react";
import {
	CSSTransition,
	TransitionGroup
} from "react-transition-group";
import minusIcon from "../../images/minus-icon.png";
import plusIcon from "../../images/plus-icon.png";
import ChangeDataContext from "../../context/ChangeDataContext";


class SelectionListItem extends PureComponent {
	static contextType = ChangeDataContext;
	state = {
		isOpened: false
	};

	toggleIsOpened = (event) => {
		this.setState(prevState => {
			return { isOpened: !prevState.isOpened };
		});
		// console.log(this.props.dataset);
	};

	toggleIsChecked = (event) => {
		// event.preventDefault();
		const { type, level, path, name } = this.props;
		this.context.toggleCheckbox(type, level, [...path, name]);
	};

	render() {
		const { type, level, path, name, dataset, isChecked } = this.props;
		const { isOpened } = this.state;
		const newPath = [...path, name];
		return (
			<>
				<li>
					<div className={`selection-list__item list-item level-${level}`}>
						{Object.keys(dataset).length === 0 ? (
							<div className='list-item__marker-replacer' />
						) : (
							<div className="list-item__marker" onClick={this.toggleIsOpened}>
								<img src={isOpened ? minusIcon : plusIcon} alt="" />
							</div>
						)}
						<div className="list-item__checkbox">
							<input type="checkbox" checked={isChecked} onChange={this.toggleIsChecked} />
						</div>
						<div className="list-item__name" onClick={this.toggleIsChecked}>
							{name}
						</div>
					</div>
				</li>
				<TransitionGroup id="transition-level-1" component={null}>

					{
						(isOpened && level === 1) ?
							Object.keys(dataset).sort().map(key => {
								return (
									<CSSTransition
										key={key}
										timeout={{ enter: 400, exit: 400 }}
										classNames="list-item"
									>
										<SelectionListItem type={type} level={2} path={newPath} dataset={dataset[key]["data"]} name={key}
																			 key={key}
																			 isChecked={dataset[key]["isChecked"]} />
									</CSSTransition>
								);
							}) : null
					}
				</TransitionGroup>

				<TransitionGroup id="transition-level-2" component={null}>
					{
						(isOpened && level === 2 && type === "cities") ?
							Object.keys(dataset).sort().map((key) => {
								return (
									<CSSTransition
										key={key}
										timeout={{ enter: 400, exit: 400 }}
										classNames="list-item"
									>
										<SelectionListItem type={type} level={3} path={newPath} dataset={{}} name={key} key={key}
																			 isChecked={dataset[key]["isChecked"]} />
									</CSSTransition>
								);
							}) : null
					}
				</TransitionGroup>
			</>
		);
	}
}

export default SelectionListItem;