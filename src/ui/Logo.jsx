function Logo({ size }) {
  return (
    <div className="mb-5 2xl:mb-10 ">
      <img
        src="./images/logo/logo.png"
        alt="Logo"
        className={`w-2h-24 h-24  `}
        // 2xl:h-28 2xl:w-28
      />
    </div>
  );
}

export default Logo;
