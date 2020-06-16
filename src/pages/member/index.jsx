import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu';
import { withRouter } from 'react-router-dom';
import { get } from '../../libs/api';
import ClientForm from '../../components/clientForm';
import { getId } from '../../libs/token';
import styles from'./styles.css';

const MemberPage = ({ location, match }) => {
  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    const id = getId();
    get(`/member/${id}`).then(res => {
      setMemberData(res.data);
    });
  }, []);

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 zapis__jumbo">
            <div className={styles.title}>
              <h3>Анкета участника клуба Slavclub</h3>
            </div>
            <ClientForm {...location} {...match} memberData={memberData}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(MemberPage);
