import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {

        if (!disabled && !flipped) handleChoice(card);
    }

    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} />
                <img className='back' src="/img/back.png" onClick={handleClick} />
            </div>
        </div>
    )
}