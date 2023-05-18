import React, { useState, useEffect } from 'react';
import ODAS from '../api/odas';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);

  useEffect(() => {
    fetchAssessments({setData: setAssessments, publicAssessments: true })
    fetchAssessments({setData: setUserAssessments, publicAssessments: false })
    console.log(assessments)
  }, [])

  const fetchAssessments = async ({ setData, publicAssessments }) => {
    const data = await ODAS.get('assessments', {
      public: publicAssessments
    });
    console.log(data.assessments)
    setData(data?.assessments);
  }

  return {
    assessments: assessments,
    userAssessments: userAssessments
  };
}

export default useAssessments;