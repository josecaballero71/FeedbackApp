import './Thanks.css';

import SurveyCard from '../components/SurveyCard';

import images from '../../utils/images/images'
import requireAuth from '../../utils/use-cases/requireAuth';

import Title from '../../utils/components/Title';

function Thanks() {
    return (
        <>
            <div className="thanks-wrapper">
                <div className="thanks-left">
                    <img src={images.thanksDevices} alt="PC and iPad vector" />
                    <img src={images.ranking} alt="Ranking Icon" className='ranking' />
                </div>

                <div className="thanks-right">
                    <Title blueTitle={' for taking the time to participate in our survey!'} greenTitle={'Thank You'} className='thanks-title' />
                    <p>Your feedback is incredibly valuable to us and will help us improve our products/services to better meet your needs. We appreciate your support and look forward to serving you in the future.</p>
                    <div className='button-container'>
                        <SurveyCard title={'Go Back to Survey'} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default requireAuth(Thanks);