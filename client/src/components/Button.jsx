const Button = ({ text, onClick, type = "button" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className="w-full bg-yellow-600 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300 mt-6"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  