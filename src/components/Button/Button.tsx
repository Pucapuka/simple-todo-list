import './Button.css';

interface ButtonProps{
    name: 'delete' | 'edit' | 'add' | 'save' | 'cancel'
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({name, onClick} : ButtonProps){

    return(
        <button className={`btn btn-${name}`} onClick={onClick}>
            {name === 'delete' && '🗑️'}
            {name === 'edit' && '✏️'}
            {name === 'add' && '➕'}
            {name === 'save' && '💾'}
            {name === 'cancel' && '❌'}
        </button>
    );
}