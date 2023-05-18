import React, { useContext }  from "react";
import classes from './Assessments.module.scss';
import {Container} from 'react-bootstrap';
import Button from '../../components/Button/Button';
const Assessments = () => {

  return (
    <Container>
      <h1>Assessments</h1>
        
      <Button text="button" styles={{type: "primary"}} />
    </Container>
   )
};

export default Assessments;