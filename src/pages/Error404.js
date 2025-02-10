import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const nav = useNavigate()
  return (
    <div className="max-w-[1440px] mx-auto py-[128px] md:py-[167px] relative">
      <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full object-cover" src="/images/error/back.png" alt="" />
      <div className="flex flex-col items-center relative">
        <span className="font-extrabold text-[100px] md:text-[150px] leading-[119.34px] md:leading-[179px]">404</span>
        <span className="text-[20px] md:text-[30px] leading-[23.87px] md:leading-[35.8px]">Dopple Not Found</span>
        <button className="mt-[30px] px-[45px] h-[40px] gradient-button gradient-button-rounded-sm gradient-button-padding-md font-semibold text-[14px] leading-[16.71px]" onClick={() => nav("/")}>
          Back To Explore
        </button>
      </div>
    </div>
  );
};

export default Error404;
