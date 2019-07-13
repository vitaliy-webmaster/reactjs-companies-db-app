import React, { Component } from "react";
import ChangeDataContext from "../../context/ChangeDataContext";

class ResultsBlock extends Component {
	static contextType = ChangeDataContext;

	render() {
		const { collectedCities, collectedCategories } = this.context;
		const { paymentLink } = this.props;
		return (
			<div className="selector-wrapper__results results">
				<div className="results-box">
					{(true || collectedCities.length > 0 || collectedCategories.length > 0) ? (
						<>
							<div className="results-box__cities-count">
								<div>Выбрано: {collectedCities.length} городов</div>
								<div>Выбрано: {collectedCategories.length} категорий</div>
							</div>
							<div className="results-box__get-data-box">
								<button onClick={this.props.getLenData}>Сформировать</button>
							</div>
							{
								(Object.keys(this.props.companies).length > 0) ? (
									<div className='results-box__companies-results-box'>
										<div>Вы получите данные {this.props.companies.len || 0} компаний</div>
										<div>Стоимость: {this.props.companies.len || 0} руб</div>
										<form noValidate onSubmit={e => e.preventDefault()}>
											<div>
												<label htmlFor="phone">Ваш телефон</label>
												<br />
												<input type="phone" name='phone' id='phone' value={this.props.phone}
															 onChange={this.props.onPhoneChange}
															 onKeyPress={(e) => {
																 e.key === "Enter" && e.preventDefault();
															 }}
												/>
											</div>
											<div>
												<label htmlFor="email">Ваш email</label>
												<br />
												<input type="email" name='email' id='email' value={this.props.email}
															 onChange={this.props.onEmailChange}
															 onKeyPress={(e) => {
																 e.key === "Enter" && e.preventDefault();
															 }}
												/>
											</div>
											<div>
												<button type='submit' onClick={this.props.getPaymentLink}>Создать ссылку на оплату</button>
											</div>
										</form>
										{Object.keys(paymentLink).length > 0 ? (
											<div className="results-box__payment-link-box">
												{paymentLink.ok ? (
													<div><a href={paymentLink.link}>Ссылка для оплаты</a></div>
												) : (
													<div>Ошибка формирования ссылки</div>
												)}
											</div>
										) : null}
									</div>
								) : null
							}

						</>
					) : (
						<>
							<div className="results-box__message-main">
								Выберите хотя бы один вид деятельности
							</div>
							<div className="results-box__message-main">
								Не забудьте выбрать город и вид деятельности
							</div>
						</>
					)
					}
				</div>
			</div>
		);
	}
}

export default ResultsBlock;