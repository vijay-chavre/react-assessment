import React, { useContext }  from "react";
import classes from './Assessments.module.scss';
import {Container} from 'react-bootstrap';
import {AccountProvider, AccountContext} from '../../context/account.context'
//todo sara add fontawesome package 
// let the candidate install fontawesome 
// live coding session should give us insight to the candidate's approach to front end coding
//  todo - write task prompts
    // now that you have assessment list, fetch user_assessment and show 2 lists: assessments to start vs assessments completed
// todo - add existing button component
// craig to review code base  & prompts once published
const Assessments = () => {
  const {state, accountInfo} = useContext(AccountContext);

  return (
    <Container>
      <h1>Assessments</h1>
      logged in ? { state }
      { state?.isLoggedIn &&
      <span>
        ?? { state?.isLoggedIn }
      </span>
        
      }
    </Container>
   )
};

export default Assessments;


// UserContext
// - publishes the User name 
// - the task / ask is: update the page to show the name of the logged in user from the UserContext