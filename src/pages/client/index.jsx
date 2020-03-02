import React, {useEffect} from 'react';
import { get } from '../../libs/api';

//cart to view client info and edit
const ClientPage = (props) => {
  const clientId = props.match.params.id;


  useEffect(() => {
    get(`/client/${clientId}`).then(({ data }) => {
      setData(data);
    });
  }, []);


  return (
    <p>Client #{clientId} Card</p>
  );
}

export default ClientPage;
