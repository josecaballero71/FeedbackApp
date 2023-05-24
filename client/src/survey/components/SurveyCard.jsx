import './SurveyCard.css'

export default function SurveyCard({ icon, title, answer, reason }) {
    function pickAnswer(answerValue, reasonValue) {
        if (answerValue !== undefined) {
            localStorage.setItem('answer', (answerValue));
            window.location.href = '/reason';
        } else if (reasonValue !== undefined) {
            localStorage.setItem('reason', (reasonValue));


            const answer = localStorage.getItem('answer');
            const reason = localStorage.getItem('reason');
            const token = localStorage.getItem('token');

            fetch('http://localhost:4000/survey', {
                method: 'POST',
                body: JSON.stringify({ answer, reason, token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(error => console.error(error));

            window.location.href = '/thanks';
        } else {
            window.location.href = '/survey';
        }

        localStorage.setItem('reason', JSON.stringify(reasonValue));
    }

    if (icon == undefined) {
        return (
            <button onClick={() => pickAnswer(answer, reason)} className='survey-card'>
                <h3 className='card-title'>{title}</h3>
            </button>
        )
    } else {
        return (
            <button onClick={() => pickAnswer(answer, reason)} className='survey-card'>
                <img src={icon} alt={title} />
                <h3 className='card-title'>{title}</h3>
            </button>
        )
    }
}