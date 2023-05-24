import './Card.css'

export default function FlipCard({ direct, icon, title, message, button }) {
    function redirect() {
        window.location.href = '/' + direct;
    }

    return (
            <div className='card'>
                <img src={icon} alt={title} />
                <div className='card-body'>
                    <h2 className='card-title'>{title}</h2>
                    <p className='card-text'>{message}</p>

                </div>
                <button className='card-button' onClick={redirect}>{button}</button>
            </div>
    )
}