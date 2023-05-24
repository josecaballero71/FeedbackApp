import './Survey.css';
import SurveyCard from '../components/SurveyCard';

import images from '../../utils/images/images'
import requireAuth from '../../utils/use-cases/requireAuth';

import Header from '../../utils/components/Header';
import Title from '../../utils/components/Title';

function Survey() {
    return (
        <>
            <div className="survey-wrapper">
                <div className="title-container">
                    <Title className="title"
                        greenTitle={'How did we '}
                        blueTitle={'serve you today?'} />
                </div>

                <div className="cards-container">
                    <SurveyCard icon={images.excellent} title={'EXCELLENT'} answer={2} />
                    <SurveyCard icon={images.fair} title={'FAIR'} answer={1} />
                    <SurveyCard icon={images.poor} title={'POOR'} answer={0} />
                </div>
            </div>
        </>
    );
}

export default requireAuth(Survey);