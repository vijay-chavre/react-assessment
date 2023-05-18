import React, { useState, useEffect } from 'react';
import ODAS from '../../api/odas';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);

  useEffect(() => {
    setAssessments(fetchAssessments({publicAssessments: true }))
    setUserAssessments(fetchAssessments({publicAssessments: false }))
  }, [])

  const fetchAssessments = async ({ publicAssessments }) => {
    const data = await ODAS.get('assessments', {
      public: publicAssessments
    });
    return data?.assessments
  }

  return {
    assessments: assessments,
    userAssessments: userAssessments
  };
}

export default useAssessments;