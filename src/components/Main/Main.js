import React, { Component } from "react";
import Selector from "../Selector";

class Main extends Component {
	render() {
		return (
			<main>
				<div className="main__inner-wrapper">
					<Selector />
				</div>
			</main>
		);
	}
}

export default Main;