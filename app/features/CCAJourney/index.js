import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { connect } from "react-redux";
import IntroductionScreen from "./screens/IntroductionScreen";
import ContinueAssessment from "./screens/ContinueAssessment";
import AssessmentHistory from "./screens/AssessmentHistory";
import { isEmpty } from "ramda";

import {
    gotoCCAIntroductionScreen,
    gotoCCAContinueAssessment,
    gotoCCAAssessmentHistory,
    getAssessmentStatusAndHistory,
} from "./actions";

class CCAJourney extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static getDerivedStateFromProps = (nextProps) => {
        const { isAssessStarted, isAssessCompleted, isAssessAborted, isResultAvailable,
            getAssessmentStatusAndHistory, memberUuid } = nextProps
        if (isAssessStarted || isAssessAborted ||
            (isAssessCompleted && isResultAvailable)) {
            getAssessmentStatusAndHistory({ memberUuid })
        }
    }

    componentDidMount = () => {
        const { memberUuid } = this.props
        this.props.getAssessmentStatusAndHistory({ memberUuid });
    }

    render() {
        const { assessmentStatus } = this.props
        const statusCheck = !isEmpty(assessmentStatus)
        return (
            <>
                {statusCheck &&
                    <>
                        {
                            assessmentStatus.inProgress
                                ? <ContinueAssessment />
                                : <>
                                    {assessmentStatus.fillTimes > 0
                                        ? <AssessmentHistory />
                                        : <IntroductionScreen />
                                    }
                                </>
                        }
                    </>
                }
            </>
        );
    }
}

const mapsStateToProps = state => ({
    userProfile: state.profile,
    firstName: state.profile.firstName,
    assessmentStatus: state.cca.assessmentStatus,
    memberUuid: state.profile.id,
    isAssessStarted: state.cca.isAssessStarted,
    isAssessCompleted: state.cca.isAssessCompleted,
    isAssessAborted: state.cca.isAssessAborted,
    isResultAvailable: state.cca.isResultAvailable
});

export default connect(mapsStateToProps,
    {
        gotoCCAIntroductionScreen,
        gotoCCAContinueAssessment,
        gotoCCAAssessmentHistory,
        getAssessmentStatusAndHistory,
    }
)(CCAJourney);