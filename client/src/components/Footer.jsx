const Footer = () => {
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-full py-2 text-xl font-bold text-black my_footer">
      ©️Railway Booking Portal | {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
