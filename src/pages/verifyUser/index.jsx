import React, { Component, useEffect } from 'react';
import queryString from "query-string";
import { withRouter } from 'react-router-dom';
import { setToken, isToken, setId, getId } from '../../libs/token';

const VerifyUser = ({ location, history }) => {
    const query = queryString.parse(location.search);
    console.log("VerifyUser -> query", query)

    useEffect(() => {
        if(query.token && query.id) {
            setToken(query.token);
            setId(query.id);
            history.replace(`/member/${query.id}`);
        }
    }, []);

    return (
        <>Вы должны перейти на анкету. Если этого не произошло - просьба связаться с тех. проблемой</>
    );
}

export default withRouter(VerifyUser);