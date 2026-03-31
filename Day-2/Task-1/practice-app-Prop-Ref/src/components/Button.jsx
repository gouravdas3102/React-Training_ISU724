

// Button Component that accepts label and color as props
function Button({ label ,color}) {
    return(
        <button style={{ backgroundColor: color ,color: 'white',padding: '10px 20px',border: 'none',borderRadius: '5px'}}>
            {label}
        </button>
    );
}

export default Button;