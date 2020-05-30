import React, { useState, useEffect } from 'react';
import { Form, Button, BDiv } from 'bootstrap-4-react';
import styles from './styles.css';
import { post, update } from '../../libs/api';

const REGEX_PASSWORD = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}", "g");

const clientForm = ({ pathname, params, history, memberData }) => {
  const [formData, setFormData] = useState({});
	const [dataSent, setDataSent] = useState(false);
	const [passDuplicate, setpassDuplicate] = useState('');
	const [formError, setFormError] = useState(false);

  const handleInputChange = label => (event) => {
		setFormError(false);
		setFormData({ ...formData, [label]: event.currentTarget.value });
	}		
		
	const parsePath = path => path.split('/')[1];
	const handleRepeatPassword = (evt) => {
		setFormError(false);
		setpassDuplicate(evt.currentTarget.value);
	}	
	const passValid = (pass) => {
		return REGEX_PASSWORD.test( pass ) && pass === passDuplicate;
	}

  const handleSubmitForm = (evt) => {
		evt.preventDefault();
		if(parsePath(pathname) === 'register') {
			if(!passValid(formData.password)) {
				setFormError(true);
				return;
			};
			post('/registerMember', formData).then(res => {
				const id = res.data.randomId;
				if(id) {
					setDataSent(true);
					setTimeout(() => { history.replace(`/member/${id}`)}, 3000);
				};
			});
		} 
		if(parsePath(pathname) === 'member') {
			const { id } = params;
			update(`/member/${id}`, formData).then(res => {
				if(res.data.id) {
					setDataSent(true);
					setTimeout(() => { setDataSent(false)}, 3000);
				}
			});
		}
	}

	useEffect(() => {
		if(parsePath(pathname) === 'member') {
			setFormData(memberData);
		};
	}, [memberData]);
	
	const { name, phone, mail, location, nick, about, competence} = formData;

	return(
		<>
			<Form mb="3">
				<Form.Group>
					<label htmlFor="nick"><span className={styles.required}>*</span> Ник-нейм</label>
					<Form.Input
						type="text"
						className="form-control"
						placeholder=" "
						id="nick"
						value={nick}
						required
						onChange={handleInputChange('nick')}
					/>
				</Form.Group>
				<Form.Group>
					<label htmlFor="name"><span className={styles.required}>*</span> Имя</label>
					<Form.Input
						type="text"
						id="name"
						placeholder=""
						value={name}
						required
						onChange={handleInputChange('name')}
					/>                  
				</Form.Group>				
				<Form.Group>
					<label htmlFor="phone">Номер телефона</label>
					<Form.Input
						type="phone"
						id="phone"
						placeholder=""
						value={phone}
						onChange={handleInputChange('phone')}
					/>                  
				</Form.Group>
				<Form.Group>
					<label htmlFor="location">Локация (местонахождение)</label>
					<Form.Input
						type="text"
						placeholder=""
						id="location"
						value={location}
						onChange={handleInputChange('location')}
					/>
				</Form.Group>
				<Form.Group>
					<label htmlFor="about">О себе</label>
					<Form.Textarea
						rows="5"
						id="about"
						value={about}
						onChange={handleInputChange('about')}
					></Form.Textarea>
					</Form.Group>
				<Form.Group>
					<label htmlFor="competence">Описание компетенций</label>
					<Form.Textarea
						rows="5"        
						value={competence}   
						onChange={handleInputChange('competence')}
					></Form.Textarea>
				</Form.Group>
				{ parsePath(pathname) === 'register' && (
				<>
					<Form.Group>
						<label htmlFor="password">Задайте пароль</label>
						<Form.Input
							type="password"
							className="form-control"
							placeholder=" "
							id="password"
							onChange={handleInputChange('password')}
						/>
						<small>Пароль должен включать хотя бы одну цифру, заглавную и строчную
							латинскую букву и должен быть длиной не менее 6 символов</small>
					</Form.Group>
					<Form.Group>
						<label htmlFor="competence">Повторите пароль</label>
						<Form.Input
							type="passwordRepeat"
							className="form-control"
							placeholder=" "
							id="passwordRepeat"
							onChange={handleRepeatPassword}
						/>
					</Form.Group>
				</>
				)}	
				{formError &&
					<BDiv className={styles.infoMess}>Неправильно введен пароль или пароли не совпадают!</BDiv>
				}
				{	dataSent &&
					parsePath(pathname) === 'member' &&
					<BDiv className={styles.infoMess}>Анкета успешно обновлнена</BDiv>
				}
				{	dataSent &&
					parsePath(pathname) === 'register' &&
					<BDiv className={styles.infoMess}>Заявка успешно отправлена</BDiv>
				}
				<Button
					onClick={handleSubmitForm}
					primary
					type="submit"
					mt="2"
					disabled={formError}
				>
					{parsePath(pathname) === 'register' ? 'Подать заявку' : 'Обновить анкету'}
				</Button>	
			</Form>
		</>);
};

export default clientForm;
