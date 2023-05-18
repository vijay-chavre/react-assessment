import React, { useState, useEffect, useContext } from 'react';
import classes from './Assessments.module.scss';
import Odas from '../../api/odas';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    fetchAssessments()
  }, []);

  const fetchAssessments = async () => {
    const url = "https://www.1degree.org/api/assessments/public"
    const request = await ODAS.get(url, {
      with_status: 'any',
      locale: 'en',
      region: 'la',
    });
    setAssessments(request.data?.assessments || []);
  }

  return (
    <div>
      <h1>Assessments</h1>
      {assessments.map((a) => {
        return (
          <div key={a.id}>
            { a.title }
          </div>
        )
      })}

    </div>
  )
};

export default Assessments;
