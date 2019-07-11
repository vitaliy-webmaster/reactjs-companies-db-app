import React, { Component } from "react";
import minusIcon from "../../images/minus-icon.png";
import plusIcon from "../../images/plus-icon.png";

class SelectionListItem extends Component {
	state = {
		isOpened: false
	};

	toggleIsOpened = (event) => {
		this.setState(prevState => {
			return { isOpened: !prevState.isOpened };
		});
		console.log(this.props.data);
	};

	render() {
		const { level, name, data } = this.props;
		const { isOpened } = this.state;
		return (
			<>
				<li>
					<div className={`selection-list__item list-item level-${level}`}>
						<div className="list-item__marker" onClick={this.toggleIsOpened}>
							<img src={isOpened ? minusIcon : plusIcon} alt="" />
						</div>
						<div className="list-item__checkbox">
							<input type="checkbox" />
						</div>
						<div className="list-item__name">
							L{level}: {name}
						</div>
					</div>
				</li>
				{
					(level === 1) ?
						Object.keys(data).map(key => {
							return (<SelectionListItem level={2} data={data[key]} name={key} key={key} />);
						}) : null
				}
				{
					(level === 2) ? (data.map((item) => {
						return (<SelectionListItem level={3} name={item} key={item} />);
					})) : null
				}
			</>
		);
	}
}

export default SelectionListItem;