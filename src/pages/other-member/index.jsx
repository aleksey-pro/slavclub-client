import React, { useEffect, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Media, BImg, BH5, BDiv } from 'bootstrap-4-react';
import Menu from '../../components/menu';
import { get } from '../../libs/api';
import styles from'./styles.css';

const OtherMemberPage = ({ match }) => {
  const { id } = match.params;
  const [memberData, setMemberData] = useState({});
  useEffect(() => {
    get(`/member/${id}`).then(response => {
      setMemberData(response.data);
    })
  }, []);

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 zapis__jumbo">
            <div className={styles.title}>
              <h3>Анкета участника клуба</h3>
            </div>
            <Media>              
              <Media.Body>
                <BImg src="https://static.npmjs.com/images/avatars/Avatar1.svg" mr="3"/>
                <BH5 mt="0">{memberData.name}</BH5>
                <BDiv display="flex" flex="column" mb="1">
                  <BDiv>Имя - {memberData.name}</BDiv>
                  <BDiv>Ник-нейм - {memberData.nick}</BDiv>
                  <BDiv>Телефон - {memberData.phone}</BDiv>
                  <BDiv>Компетенция - {memberData.competence}</BDiv>

                  <BDiv>Баллов - {memberData.salonClient && memberData.salonClient.bonuses}</BDiv>
                  <BDiv>Рейтинг - {memberData.salonClient && memberData.salonClient.rating}</BDiv>

                  <BDiv>Статус - {memberData.status}</BDiv>
                  <BDiv>Как давно в клубе - {memberData.period}</BDiv>                  
                  <BDiv>Оказанная компетенция - {memberData.madeCompetence}</BDiv>                  
                  <BDiv>Оценка компетенции - {memberData.competenceEstimate}</BDiv>
                </BDiv>
              </Media.Body>
            </Media> 
            <NavLink to="/members">Обратно к списку участников</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(OtherMemberPage);
