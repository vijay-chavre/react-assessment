import React, { useContext }  from "react";
import classes from './Assessments.module.scss';
import {Container} from 'react-bootstrap';
import {AccountContext} from '../../context/account.context'
const Assessments = () => {
  const {state, accountInfo} = useContext(AccountContext);

  return (
    <Container>
      <h1>Assessments</h1>
      { state?.isLoggedIn &&
      <span>
        Welcome, {accountInfo.first_name} {accountInfo.last_name}!
      </span>
        
      }
    </Container>
   )
};

export default Assessments;