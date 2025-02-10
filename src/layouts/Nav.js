import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setDetails, setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import throttle from 'lodash/throttle'
import { useCookies } from "react-cookie";

const Nav = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();
  const profile = useSelector(store => store.AuthReducer.profile);
  const { themeID: _isDark, navCollapsed, setNavCollapsed, setDoppleName, setDopple, setHistory, setOpenSignModal } = useContext(RefContext);
  const [cookies, setCookies] = useCookies(["profile", "userid"])
  const [scrollY, setScrollY] = useState(0)
  const themeID = loc.pathname === "/messages" ? _isDark : 0

  const color = (path) => {
    if (loc.pathname === path)
      return " font-bold" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")
    else
      return (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtextlight" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")
  }
  const bgColor = (path) => {
    if (loc.pathname === path)
      return (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candybuttonmenu" : themeID === 3 ? " bg-galaxybuttonmenu" : "")
    else
      return (themeID === 0 ? " bg-nav" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav2" : "")
  }
  const seeChat = async () => {
    setDopple()
    nav("/messages")
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid

    setDoppleName()
    setDopple()
    setHistory([])
  }

  const create = () => {
    // nav("/create")
    if (!profile) {
      setOpenSignModal(true);
      dispatch(setDetails({ openLoginOrSignup: false }))
    }
    else {
      dispatch(setOpenWaitlistModal());
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > document.body.scrollTop) setNavCollapsed(false)
      else {
        if (document.body.scrollTop > 0 && loc.pathname !== "/community") setNavCollapsed(true)
        else setNavCollapsed(false)
      }
      setScrollY(document.body.scrollTop)
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    document.body.addEventListener('scroll', throttledHandleScroll);
    return () => {
      document.body.removeEventListener('scroll', throttledHandleScroll);
    };
  });

  return (
    <nav className={"block lg:hidden w-full transition duration-800 border-t z-[10]" + (loc.pathname === "/messages" ? " absolute bottom-0 left-0" : " fixed bottom-0 left-0") + (loc.pathname !== "/messages" && navCollapsed ? " translate-y-[90px]" : "") + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav2 border-galaxybutton" : "")}>
      <div className="flex justify-between items-center py-4 text-[12px] leading-[14px]">
        <div />
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/")} onClick={() => nav("/")}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/")}>
            {loc.pathname === "/" ?
              <img src="/images/nav/explore-selected.svg" alt="" />
              :
              <>
                {themeID === 0 && <img src="/images/nav/explore.svg" alt="" />}
                {themeID === 1 && <img src="/images/nav/explore-light.svg" alt="" />}
                {themeID === 2 && <img src="/images/nav/explore-candy.svg" alt="" />}
                {themeID === 3 && <img src="/images/nav/explore-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Explore</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/community")} onClick={() => nav("/community")}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/community")}>
            {loc.pathname === "/community" ?
              <img src="/images/nav/community-selected.svg" alt="" />
              :
              <>
                {themeID === 0 && <img src="/images/nav/community.svg" alt="" />}
                {themeID === 1 && <img src="/images/nav/community-light.svg" alt="" />}
                {themeID === 2 && <img src="/images/nav/community-candy.svg" alt="" />}
                {themeID === 3 && <img src="/images/nav/community-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Community</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/create")} onClick={create}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/create")}>
            {loc.pathname === "/create" ?
              <img src="/images/nav/create-selected.svg" alt="" />
              :
              <>
                {themeID === 0 && <img src="/images/nav/create.svg" alt="" />}
                {themeID === 1 && <img src="/images/nav/create-light.svg" alt="" />}
                {themeID === 2 && <img src="/images/nav/create-candy.svg" alt="" />}
                {themeID === 3 && <img src="/images/nav/create-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Create</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/messages")} onClick={seeChat}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/messages")}>
            {loc.pathname === "/messages" ?
              <img src="/images/nav/messages-selected.svg" alt="" />
              :
              <>
                {themeID === 0 && <img src="/images/nav/messages.svg" alt="" />}
                {themeID === 1 && <img src="/images/nav/messages-light.svg" alt="" />}
                {themeID === 2 && <img src="/images/nav/messages-candy.svg" alt="" />}
                {themeID === 3 && <img src="/images/nav/messages-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Messages</span>
        </button>
        <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/account")} onClick={() => profile ? nav("/account") : setOpenSignModal(true)}>
          <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/account")}>
            {loc.pathname === "/account" ?
              <img src="/images/nav/account-selected.svg" alt="" />
              :
              <>
                {themeID === 0 && <img src="/images/nav/account.svg" alt="" />}
                {themeID === 1 && <img src="/images/nav/account-light.svg" alt="" />}
                {themeID === 2 && <img src="/images/nav/account-candy.svg" alt="" />}
                {themeID === 3 && <img src="/images/nav/account-galaxy.svg" alt="" />}
              </>
            }
          </div>
          <span>Account</span>
        </button>
        <div />
      </div>
    </nav>
  );
};

export default Nav;
