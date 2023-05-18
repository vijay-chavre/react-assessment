import React, { useState, useEffect } from 'react';
import ODAS from '../../api/odas';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);

  useEffect(() => {
    setAssessments(fetchAssessments({public: true }))
    setUserAssessments(fetchAssessments({public: false }))
  }, [])

  const fetchAssessments = async ({ public }) => {
    const data = await ODAS.get(url, {
      public: public
    });
    return data?.assessments
  }

  return {
    assessments: assessments,
    userAssessments: userAssessments
  };
}

export default useAssessments;