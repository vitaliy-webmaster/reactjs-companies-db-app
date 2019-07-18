import React, { Component } from "react";
import ChangeDataContext from "../../context/ChangeDataContext";
import FiltersBlock from "../FiltersBlock";

class ResultsBlock extends Component {
	static contextType = ChangeDataContext;

	render() {
		const { collectedCities, collectedCategories } = this.context;
		const { filters, onChangeFilter, paymentLink, companies, isPaymentLinkLoading, isCompaniesLoading, isClientPhoneValid, isClientEmailValid } = this.props;

		if (Object.keys(paymentLink).length > 0 && paymentLink.ok) {
			window.location.href = paymentLink.link;
		}

		return (
			<div className="results-box">
				<FiltersBlock filters={filters} onChangeFilter={onChangeFilter} />
				<div className='results-box__completion-box'>
					{(collectedCities.length > 0 && collectedCategories.length > 0) ? (
						<>
							<h3>Выбрано: </h3>
							<div className="results-box__cities-count">
								<div><strong>{collectedCities.length}</strong> городов</div>
								<div><strong>{collectedCategories.length}</strong> категорий</div>
							</div>
							<h3>Далее нажмите на кнопку </h3>
							<div className="results-box__get-data-box">
								<button onClick={this.props.getLenData}
												disabled={isPaymentLinkLoading || isCompaniesLoading ||
												!(collectedCities.length && collectedCategories.length)}>
									{(isCompaniesLoading) ? (
										<>
											<span className="spinner-border spinner-border-sm" />
											<span>Загрузка данных...</span>
										</>
									) : (<span>Сформировать базу</span>)}
								</button>
							</div>

							{
								(Object.keys(companies).length > 0) ? (
									<div className='results-box__companies-results-box'>
										<h3>Вы получите данные {companies.len || 0} компаний:</h3>
										<div><strong>{companies.with_email || 0}</strong> компаний с e-mail</div>
										<div><strong>{companies.with_phone || 0}</strong> компаний c телефоном</div>
										<h3 className='results-box__full-price'>Стоимость: <span>{companies.cost || 0} </span>руб</h3>
										<form noValidate onSubmit={e => e.preventDefault()}>
											<div>
												<label htmlFor="phone">Ваш телефон:</label>
												<br />
												<input type="phone" name='phone' id='phone' value={this.props.phone}
															 className={isClientPhoneValid === false ? "phone-error" : ""}
															 onChange={this.props.onPhoneChange}
															 onKeyPress={(e) => {
																 e.key === "Enter" && e.preventDefault();
															 }}
												/>
											</div>
											<div>
												<label htmlFor="email">Ваш email:</label>
												<br />
												<input type="email" name='email' id='email' value={this.props.email}
															 className={isClientEmailValid === false ? "email-error" : ""}
															 onChange={this.props.onEmailChange}
															 onKeyPress={(e) => {
																 e.key === "Enter" && e.preventDefault();
															 }}
												/>
											</div>


											<div>
												<button type='submit' onClick={this.props.getPaymentLink}
																disabled={!isClientPhoneValid || !isClientEmailValid || isPaymentLinkLoading || isCompaniesLoading ||
																!(collectedCities.length && collectedCategories.length)}
												>
													{(isPaymentLinkLoading) ? (
														<>
															<span className="spinner-border spinner-border-sm" />
															<span>Создание ссылки...</span>
														</>
													) : (<span>Создать ссылку на оплату</span>)}
												</button>
											</div>

										</form>
										{Object.keys(paymentLink).length > 0 ? (
											<div className="results-box__payment-link-box">
												{paymentLink.ok ? (
													<div><a href={paymentLink.link}>Ссылка для оплаты</a></div>
												) : (
													<>
														<div>Ошибка: {paymentLink.desc}</div>
													</>
												)}
											</div>
										) : null}
									</div>
								) : null
							}

						</>
					) : (
						<>
							<div className="results-box__messages-start">
								<h3>Выберите хотя бы один город и вид деятельности. <span>Выбрано: </span></h3>
								<div className="results-box__cities-count">
									<div><strong>{collectedCities.length}</strong> городов</div>
									<div><strong>{collectedCategories.length}</strong> категорий</div>
								</div>
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