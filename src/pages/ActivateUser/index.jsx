import React, { useState } from 'react';
import queryString from "query-string";
import { Button} from 'bootstrap-4-react';
import { withRouter } from 'react-router-dom';
import { get } from '../../libs/api';
import mainImage from './main.jpg';
import { setToken, isToken, setId, getId } from '../../libs/token';
import styles from "./styles.css";

const ActivateUser = ({ location, history }) => {
    const query = queryString.parse(location.search);
    const [error, setError] = useState(false);

    const verifyNewUser = () => {
        console.log("verifyNewUser -> verifyNewUser", verifyNewUser)
        if(query.id) {
            console.log("verifyNewUser -> query.id", query.id)
            get(`/registerMember/${query.id}`).then(res => {
                const { id, token} = res.data;
                console.log("verifyNewUser ->  id, token",  id, token)
                setId(id);
                setToken(token);
                history.replace(`/member/${id}`);
            });
        }
         else setError(true);
    }

    return (
        <div className="container">
            <div className="row">
                <div className={styles.jumbotron}>
                    <img className={styles.mainImage} src={mainImage} alt=""/>
                    <Button primary mt="2"onClick={verifyNewUser}>Активировать брелок</Button>
                    {error && <p>Произошла ошибка на сервере, либо Ваш ключ неверен.</p>}
                </div>
            </div>
        </div>
    );
}

export default withRouter(ActivateUser);