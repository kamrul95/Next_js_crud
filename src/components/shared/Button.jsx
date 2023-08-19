const Button = ({ title, url, type="button" }) => {
  return (
    <button
      className="
        p-3 rounded-sm font-bold   
        text-xl bg-gradient-to-r 
        from-green-400 
        to-blue-500
        hover:from-indigo-500 
        hover:to-pink-500 
        hover:transition-all 
        hover:duration-1000"
        type={type}
    >
      {title}
    </button>
  );
};

export default Button;
