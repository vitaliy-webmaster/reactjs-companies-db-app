import React, { Component } from "react";
import ChangeDataContext from "../../context/ChangeDataContext";
import loadingRequest from "../../images/loading-request.gif";

class ResultsBlock extends Component {
	static contextType = ChangeDataContext;

	render() {
		const { collectedCities, collectedCategories } = this.context;
		const { paymentLink, companies, isPaymentLinkLoading, isCompaniesLoading, isClientPhoneValid, isClientEmailValid } = this.props;
		return (
			<div className="results-box">
				<div className="results-box__filters-box filters-box">
					<h3>Фильтр</h3>
					<div className='filters-box__email-box filters-box__item'>
						<span className='filters-box__heading'>
							<span>E-mail:</span>
							<span>В базу будут включены только предприятия с e-mail</span>
						</span>
						<input type="checkbox" name='email-filter' id='email-filter'
									 value={this.props.filters.email}
									 onChange={e => this.props.onChangeFilter(e, "email")} />
					</div>
					<div className='filters-box__phone-box filters-box__item '>
						<span className='filters-box__heading'>
							<span>Телефоны</span>
							<span>В базу будут включены только предприятия с телефонами</span>
						</span>
						<input type="checkbox" name='phone-filter' id='phone-filter'
									 value={this.props.filters.phone}
									 onChange={e => this.props.onChangeFilter(e, "phone")} />
					</div>
				</div>
				<div className='results-box__completion-box'>
					{(collectedCities.length > 0 && collectedCategories.length > 0) ? (
						<>
							<h3>Выбрано: </h3>
							<div className="results-box__cities-count">
								<div><strong>{collectedCities.length}</strong> городов</div>
								<div><strong>{collectedCategories.length}</strong> категорий</div>
							</div>
							<h3>Далее нажмите на кнопку </h3>
							{(isCompaniesLoading) ? (
								<div className="results-box__get-loader-box">
									<img src={loadingRequest} alt="" />
								</div>
							) : (
								<div className="results-box__get-data-box">
									<button onClick={this.props.getLenData}
													disabled={isPaymentLinkLoading || isCompaniesLoading ||
													!(collectedCities.length && collectedCategories.length)}>
										Сформировать базу
									</button>
								</div>
							)}
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


											{(isPaymentLinkLoading) ? (
												<div className="results-box__get-loader-box-2">
													<img src={loadingRequest} alt="" />
												</div>
											) : (
												<div>
													<button type='submit' onClick={this.props.getPaymentLink}
																	disabled={!isClientPhoneValid || !isClientEmailValid || isPaymentLinkLoading || isCompaniesLoading ||
																	!(collectedCities.length && collectedCategories.length)}
													>Создать ссылку на оплату
													</button>
												</div>
											)}

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
								<h3>Выберите хотя бы один город и вид деятельности. Выбрано: </h3>
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