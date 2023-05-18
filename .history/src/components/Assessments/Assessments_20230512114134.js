import React, { useState, useEffect, useContext } from 'react';
import classes from './Assessments.module.scss';
import Odas from '../api/odas';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {

  }, []);


  return (
    <div>
      <h1>Assessments</h1>
    </div>
  )
};

export default Assessments;
