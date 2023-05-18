import React, { useState, useEffect, useContext } from 'react';
import ODAS from '../../api/odas';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);
  const account = useContext(AccountContext);
  const locationContext = useContext(LocationContext);

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