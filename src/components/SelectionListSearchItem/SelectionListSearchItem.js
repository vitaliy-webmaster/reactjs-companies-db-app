import React, { Component } from "react";
import ChangeDataContext from "../../context/ChangeDataContext";


class SelectionListSearchItem extends Component {
	static contextType = ChangeDataContext;

	toggleIsChecked = (event) => {
		// event.preventDefault();
		const { type, level, path } = this.props;
		this.context.toggleCheckbox(type, level, path);
	};

	render() {
		const { level, path, name, isChecked } = this.props;
		return (
			<li>
				<div className={`selection-list__item list-item level-${level}`}>
					<div className='list-item__marker-replacer' />
					<div className="list-item__checkbox">
						<input type="checkbox" checked={isChecked} onChange={this.toggleIsChecked} />
					</div>
					<div className="list-item__name" onClick={this.toggleIsChecked}>
						L{level}: {name} ({path.join(" - ")})
					</div>
				</div>
			</li>
		);
	}
}

export default SelectionListSearchItem;