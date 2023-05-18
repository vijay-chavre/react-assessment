import React, { useState, useEffect, useContext } from 'react';
import classes from './Assessments.module.scss';
import t from '@/utils/Language/Assessments-translations.js';
import Assessment from './Assessment';
import { AccountContext } from '@/context/account.context';
import { LocationContext } from '@/context/location.context';
import Odas from '@/utils/api/odas';
import Language from '@/utils/Language';
import find from 'lodash/find';
import map from 'lodash/map';
import assign from 'lodash/assign';

const Assessments = () => {
  /**
   * Assessment:
   * @TODO: ng-mouseenter="highlightMapMarker()" ng-mouseleave="unhighlightMapMarker()
   */
  const [assessments, setAssessments] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);
  const [mergedAssessments, setMergedAssessments] = useState([]);
  const account = useContext(AccountContext);
  const locationContext = useContext(LocationContext);

  useEffect(() => {
    const fetchData = async ({ region, locale }) => {
      const request = await Odas.get(`api/assessments/public`, {
        with_status: 'any',
        locale,
        region,
      });
      setAssessments(request.data?.assessments || []);
    }

    const fetchUserData = async ({ region, locale }) => {
      const request = await Odas.get(`api/assessments`, {
        with_status: 'any',
        locale,
        region,
      });
      setUserAssessments(request?.data?.assessments || []);
    }

    const region = account.data?.region || locationContext.region;
    const locale = account.data?.locale || Language.getCurrentLanguage();
    fetchData({ region, locale });
    fetchUserData({ region, locale });

  }, [account.state.isLoggedIn, locationContext.region, account.data?.region]);

  useEffect(() => {
    if(assessments.length > 0 && userAssessments.length > 0) {
      const merged = map(assessments, function(obj) {
        // add the user-specific properties (like status) from userAssessments
        // to the list of all available assessments
        return assign(obj, find(userAssessments, {assessment_id: obj.id}));
      });
      setMergedAssessments(merged);
    }
    else {
      setMergedAssessments(assessments);
    }
  }, [assessments, userAssessments])

  const hasCompletedAny = () => {
    return find(userAssessments, (assessment) => {
      return assessment.status == 'finished';
    });
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {t('available')}
      </h3>

      <ul className={classes.list}>
      {mergedAssessments.map((a) => {
        if (a.status === 'finished') return;
        return (
          <div key={a.id}>
            <Assessment assessment={a} status={a.status} />
          </div>
        )
      })}
      </ul>

      { hasCompletedAny() &&
        <div>
          <h3 className={classes.title}>
            {t('completed')}
          </h3>

          <ul className={classes.list}>
            {mergedAssessments.map((a) => {
              if (a.status !== 'finished') return;
            return (
              <div key={a.id}>
                <Assessment assessment={a} status={a.status} />
              </div>
            )
          })}
          </ul>
        </div>
      }
    </div>
  )
};

export default Assessments;
