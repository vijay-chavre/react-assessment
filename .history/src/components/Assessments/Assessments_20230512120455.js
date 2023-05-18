import React, { useState, useEffect, useContext } from 'react';
import classes from './Assessments.module.scss';
import ODAS from '../../api/odas';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    fetchAssessments()
  }, []);

  const fetchAssessments = async () => {
    const data = await ODAS.get('assessments', {});
    debugger
    setAssessments(data.assessments || []);
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
