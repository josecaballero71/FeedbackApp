import './Button.css'

export default function Button({content, execution}) {
    return (
        <button onClick={execution} className='general-button'>
            {content}
        </button>
    )

}