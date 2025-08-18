function Button({ value, type, id, onClick}){
    return(
        <button 
        className={`equals equals-${type}`}
        id={id}
        onClick={onClick}
        >
            {value}
        </button>
    )
}
export default Button;
