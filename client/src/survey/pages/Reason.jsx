import './Reason.css'


import SurveyCard from "../components/SurveyCard"

import images from '../../utils/images/images'
import requireAuth from '../../utils/use-cases/requireAuth';

import Header from '../../utils/components/Header';
import Title from '../../utils/components/Title';

function Reason() {
    const answer = localStorage.getItem('answer');
    console.log(answer);
    const iconsList = {
        "2": images.excellent,
        "1": images.fair,
        "0": images.poor
    }
    const icon = iconsList[answer];

    const titlesList = {
        "2": 'EXCELLENT',
        "1": 'FAIR',
        "0": 'POOR'
    }
    const title = titlesList[answer];

    return (
        <>
            <div className="reason-wrapper">
                <div className="survey-card-container">
                    <SurveyCard icon={icon} title={title} />
                </div>

                <div className="title-container">
                    <Title
                        greenTitle={'Please select '}
                        blueTitle={'a Reason'} />
                </div>

                <div className="reason-cards-container">
                    <SurveyCard title="DOCTOR" reason={1}/>
                    <SurveyCard title="STAFF" reason={2}/>
                    <SurveyCard title="WAIT TIME" reason={3}/>
                    <SurveyCard title="FRONT DESK" reason={4}/>
                    <SurveyCard title="FACILITY" reason={5}/>
                    <SurveyCard title="ALL" reason={6}/>
                </div>
            </div>
        </>
    )
}

export default requireAuth(Reason);