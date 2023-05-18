import React, { useState, useEffect, useContext } from 'react';
import classes from './Assessments.module.scss';
import Odas from '../../api/odas';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const url = "https://www.1degree.org/api/assessments/public"
    const request = await ODAS.get(url, {
      with_status: 'any',
      locale: 'en',
      region: 'la',
    });
    setData(request.data?.assessments || []);
  }, []);


  return (
    <div>
      <h1>Assessments</h1>
    </div>
  )
};

export default Assessments;
