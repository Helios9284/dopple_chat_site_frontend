import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RefContext } from "../contexts/RefContextProvider";
import { Fade } from "@mui/material";

const MessageFooter = () => {
  const nav = useNavigate();
  const { themeID } = useContext(RefContext);
  return (
    <footer className={"flex justify-between items-center border-t w-full relative z-[1] px-5 h-[70px] message-footer" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
      <div className="h-[30px]">
        <Fade in={themeID === 0} timeout={300}>
          <img className="cursor-pointer absolute h-[30px]" src="/images/logo-footer.svg" alt="" onClick={() => nav("/")} />
        </Fade>
        <Fade in={themeID === 1} timeout={300}>
          <img className="cursor-pointer absolute h-[30px]" src="/images/logo-footer-light.svg" alt="" onClick={() => nav("/")} />
        </Fade>
        <Fade in={themeID === 2} timeout={300}>
          <img className="cursor-pointer absolute h-[30px]" src="/images/logo-footer-light.svg" alt="" onClick={() => nav("/")} />
        </Fade>
        <Fade in={themeID === 3} timeout={300}>
          <img className="cursor-pointer absolute h-[30px]" src="/images/logo-footer.svg" alt="" onClick={() => nav("/")} />
        </Fade>
      </div>
      <span className={"text-[12px] leading-[14px] max-w-[142px] text-right" + (themeID === 0 ? " text-[#8A939D]" : themeID === 1 ? " text-[#8A939D]" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>© 2023 Dopple Labs Inc.</span>
    </footer>
  );
};

export default MessageFooter;
