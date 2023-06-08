import React, { useState, useEffect, useContext, useCallback } from 'react';
import ODAS from '../api/odas';
import { AccountContext } from '../context/account.context';

export const useAssessments = () => {
  const {state} = useContext(AccountContext)
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);

  // TODO - fetch the data from API

  const fetchAssessments = useCallback(async () => {
     const param = { 
      public: !state.isLoggedIn   // check if user is not loggedIn show public assessments else show user assessments
     }
     try {
         const res = await ODAS.get(param)
          if (state.isLoggedIn) {
            setUserAssessments(res.assessments)
          } else {
            setAssessments(res.assessments)
          }
     } catch (error) {              
        console.log(error)
        setAssessments([])
        setUserAssessments([])
     }
                
  },[state.isLoggedIn])

  useEffect(() => {
     fetchAssessments()
  }, [fetchAssessments])
  
  return {
    assessments: assessments,
    userAssessments: userAssessments
  };
}

export default useAssessments;