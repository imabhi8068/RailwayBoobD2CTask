const Button = ({ btnName, type, ...params }) => {
  return (
    <>
      <button
        type={!type ? "" : type}
        {...params}
        className="w-40 py-4 text-white transform shadow from-blue-500 to-blue-800 bg-gradient-to-b hover:scale-98 focus:scale-95 rounded-xl focus:ring focus:ring-offset-2 focus:ring-blue-500"
      >
        {btnName}
      </button>
    </>
  );
};

export default Button;
