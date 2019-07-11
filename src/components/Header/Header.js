import React, { Component } from "react";

class Header extends Component {
	render() {
		return (
			<div className='app-header'>
				<div className="app-header__inner-top">
					<div className="logo">
						<span className="logo-text">Логотип сайта</span>
					</div>
				</div>
				<div className="app-header__inner-bottom navbar">
					<ul className='navbar-list'>
						<li className='navbar-list__item'>
							Главная
						</li>
						<li className='navbar-list__item'>
							Подбор
						</li>
						<li className='navbar-list__item'>
							О нас
						</li>
						<li className='navbar-list__item'>
							Контакты
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Header;