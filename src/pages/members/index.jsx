import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/menu';
import { NavLink } from 'react-router-dom';
import { BDiv } from 'bootstrap-4-react';
import styles from './styles.css';
import { get } from '../../libs/api';

const MembersPage = () => {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    get('/members').then(response => {
      setMembers(response.data);
    })
  }, []);

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className={styles.main__jumbo}>
            <h3>Список членов клуба</h3>
            <BDiv display="flex" flex="column" mb="3">
              {members.map(member => ( 
                <BDiv p="2" key={member.id}>
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
