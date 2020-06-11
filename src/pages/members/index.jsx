import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/menu';
import { NavLink } from 'react-router-dom';
import { getId } from '../../libs/token';
import { BDiv } from 'bootstrap-4-react';
import styles from './styles.css';
import { get } from '../../libs/api';

const MembersPage = ({ location }) => {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    get('/members').then(response => {
      setMembers(response.data);
    })
  }, []);

  const currMemberId = getId();

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="main__jumbo col-sm-12">
            <h3>Список членов клуба</h3>
            <BDiv display="flex" flex="column" mb="3">
              Имя
              {members.filter(member => member.id !== currMemberId).map(member => ( 
                <BDiv p="2" className={styles.member_item} key={member._id}>
                  <NavLink
                    to={`/otherMember/${member.id}`}
                    className={styles.navItem}
                    activeClassName={styles.active}
                  >{member.name}</NavLink>
                </BDiv>
              )
              )}
            </BDiv>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(MembersPage);
