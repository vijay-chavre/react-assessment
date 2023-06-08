import React, { useContext, useMemo } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import useAssessments from '../../hooks/useAssessments';
import { AccountContext } from '../../context/account.context';
import AssessmentItem from './AssessmentItem';
import styles from './Assessments.module.scss';
const Assessments = () => {
  const { state } = useContext(AccountContext);
  const { assessments, userAssessments } = useAssessments();

  const assessmentData = useMemo(() => {
    return state.isLoggedIn ? userAssessments : assessments;
  }, [assessments, userAssessments, state.isLoggedIn]);

  return (
    <Container className={[`${styles.assessment_container}`]}>
      <h6>AVAILABLE</h6>
      <ListGroup>
        {assessmentData.map((assessment) => {
          return (
            <ListGroup.Item>
              <AssessmentItem item={assessment} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default Assessments;
