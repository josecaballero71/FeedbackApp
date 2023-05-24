import './Title.css'

export default function Title({ greenTitle, blueTitle }) {
    return (
        <div className="title">
            <h1>
                <span className="green-title">{greenTitle}</span><span className="blue-title">{blueTitle}</span>
            </h1>
        </div>
    )
}