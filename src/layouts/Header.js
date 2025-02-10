import { useContext, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setDetails, setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { setProfile, setRecentHistory } from "../redux/reducers/AuthReducer";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import axios from "../utilities/axiosConfig";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useCookies } from "react-cookie";
import { RefContext } from "../contexts/RefContextProvider";
import { shuffle } from "lodash";
import { getFormattedNumbers } from "../utilities/format";

const BoldedText = ({ text, shouldBeBold }) => {
  const strColor = text.replace(new RegExp(shouldBeBold, "gi"), match => `<span class="text-white">${match}</span>`);
  return (
    <span dangerouslySetInnerHTML={{ __html: strColor }} />
  );
}

const Header = ({ openSearch, setOpenSearch }) => {
  const themeID = 0;
  const profile = useSelector(store => store.AuthReducer.profile);
  const recentHistory = useSelector(store => store.AuthReducer.recentHistory);
  const { dopples, setDopples, setDoppleName, setDopple, setHistory, setOpenSignModal } = useContext(RefContext);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);
  const [openSearchPanelMobile, setOpenSearchPanelMobile] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [chatsActive, setChatsActive] = useState(false);
  const matches = useMediaQuery('(min-width:900px)');
  const [username, setUsername] = useState("");
  const [filteredDopples, setFilteredDopples] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies(["profile", "userid", "themeid"])
  const dispatch = useDispatch();
  const loc = useLocation();
  const nav = useNavigate();
  let headerRef = useRef();
  let searchRef = useRef();
  let searchMobileRef = useRef();
  let profileMenuRef = useRef();

  const seeChat = async () => {
    nav("/messages")
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid
    setDoppleName()
    setDopple()
    setHistory([])
  }
  const login = () => {
    setOpenSignModal(true);
    dispatch(setDetails({ openLoginOrSignup: true }))
  }
  const logout = () => {
    dispatch(setProfile(undefined))
    localStorage.removeItem('accessToken');
    removeCookies("profile")
    removeCookies("themeid")
    localStorage.removeItem('accessToken');
    nav("/")
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
  const seeProfile = (e, data) => {
    e.stopPropagation();
    setOpenSearchPanel(false)
    setOpenSearch(false)
    if (username.length > 0) dispatch(setRecentHistory({ data, addOrRemove: true }))
    nav("/profile/" + data._id)
  }
  const seeProfileMobile = (e, data) => {
    e.stopPropagation();
    setOpenSearchPanelMobile(false)
    setOpenSearch(false)
    if (username.length > 0) dispatch(setRecentHistory({ data, addOrRemove: true }))
    nav("/profile/" + data._id)
  }
  const removeRecent = (e, data) => {
    e.stopPropagation();
    dispatch(setRecentHistory({ data, addOrRemove: false }))
  }
  useOutsideDetector([headerRef], () => setOpenSearch(false))
  useOutsideDetector([searchRef, searchMobileRef], () => setOpenSearchPanel(false))
  useOutsideDetector([profileMenuRef], () => setOpenProfileMenu(false))
  useMemo(async () => {
    const { data: { data } } = await axios.get("/dopple")
    setDopples(shuffle(data))
    setFilteredDopples(data)
  }, [])
  useMemo(async () => {
    setFilteredDopples(dopples.filter(x => x.name.toLowerCase().includes(username.toLowerCase())).sort((a, b) => a.name.toLowerCase().indexOf(username.toLowerCase()) - b.name.toLowerCase().indexOf(username.toLowerCase())))
  }, [username, dopples])
  useMemo(() => {
    if (openSearch) disableBodyScroll(document.body)
    else enableBodyScroll(document.body)
  }, [openSearch])
  return (
    <header className={"block bg-nav w-full" + ((!openSearch || matches) ? " z-[2]" : " relative z-[999]") + (loc.pathname === "/account" ? " lg:hidden" : "")}>
      <div className="flex justify-between items-center h-[75px] md1:h-[70px] px-5 xl:px-[60px] relative" ref={headerRef}>
        {(!openSearch || matches) ?
          <>
            <Link to="/" aria-label="Explore">
              {loc.pathname.includes("/profile/") ?
                <img className="h-[33px] md1:h-[30px] transition duration-800 origin-left hover:scale-[1.02]" src="/images/logo-header1.svg" alt="" />
                :
                (loc.pathname === "/account" ?
                  <img className="h-[33px] md1:h-[30px] transition duration-800 origin-left hover:scale-[1.02]" src="/images/logo-header2.svg" alt="" />
                  :
                  <img className="w-[222px] h-[33px] md1:w-[207px] md1:h-[30px] transition duration-800 origin-left hover:scale-[1.02]" src="/images/logo-header.svg" alt="" />
                )
              }
            </Link>
            <div className="hidden lg:flex items-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                <div className="relative" onClick={() => setOpenSearchPanel(true)} ref={searchRef}>
                  <div className="flex items-center bg-button rounded-[5px] px-[19px] text-[14px] leading-[17px] text-black4 h-[45px] w-[25vw] xl2:w-[40vw] relative z-[2] transition duration-800 hover:bg-black5 border border-black12 focus-within:border-blue2">
                    <svg className="min-w-[16px] min-h-[16px]" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1167 13.1167L10.2559 10.2508M11.8413 6.42064C11.8413 7.85828 11.2702 9.23704 10.2536 10.2536C9.23704 11.2702 7.85828 11.8413 6.42064 11.8413C4.98299 11.8413 3.60423 11.2702 2.58767 10.2536C1.5711 9.23704 1 7.85828 1 6.42064C1 4.98299 1.5711 3.60423 2.58767 2.58767C3.60423 1.5711 4.98299 1 6.42064 1C7.85828 1 9.23704 1.5711 10.2536 2.58767C11.2702 3.60423 11.8413 4.98299 11.8413 6.42064Z" stroke={(username.length > 0 && openSearchPanel) ? "white" : "#6A7179"} strokeWidth="1.66194" strokeLinecap="round" />
                    </svg>
                    <input className="flex-1 text-white placeholder-black4 caret-blue2 ml-[10.5px]" placeholder="Search Dopples" value={username} onChange={e => setUsername(e.target.value)} />
                    {username?.length > 0 &&
                      <button className={"ml-2" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-[#9277FF]" : "")} onClick={() => setUsername("")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 19" fill="none" stroke="currentColor">
                          <path d="M2 2L17 17M2 17L17 2" strokeWidth="2" strokeLinecap="square" />
                        </svg>
                      </button>
                    }
                  </div>
                  {openSearchPanel && (username.length > 0 ? filteredDopples : recentHistory).length > 0 &&
                    <div className="absolute top-0 left-0 w-full rounded-[10px] border border-black12 bg-[rgba(21,21,24,.9)] backdrop-blur-[25px] pb-[10px] shadow-lg1 z-[1]">
                      <div className="pt-[60px] pb-[10px] px-[20px] text-black4 font-bold text-[12px] leading-[14.32px]">{username.length > 0 ? "RESULTS" : "RECENT"}</div>
                      <div className="flex flex-col max-h-[400px] overflow-auto search-scroll">
                        {(username.length > 0 ? filteredDopples : recentHistory).map((x, i) =>
                          <button key={i} className="flex justify-between items-center py-[10px] px-5 hover:bg-searchhoverback outline-none" onClick={e => seeProfile(e, x)}>
                            <div className="flex items-center space-x-[10px] max-w-full overflow-hidden">
                              <img className="w-[50px] h-[50px] rounded-[10px]" src={x.avatarURL + "?tr=w-50,h-50"} alt="" />
                              <div className="flex flex-col items-start space-y-[5px] flex-1 max-w-full overflow-hidden">
                                <div className="flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] text-black4 flex-1 max-w-full">
                                  <span className="text-left truncate flex-1 max-w-full"><BoldedText text={x.name} shouldBeBold={username} /></span>
                                  <img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
                                </div>
                                <div className="flex items-center space-x-[5px] text-black4 text-[14px] leading-[17px]">
                                  <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.04685 1.23349C1.73689 1.23349 1.43461 1.36332 1.20797 1.6027C0.980578 1.84287 0.849055 2.17332 0.849055 2.52244V7.09172C0.849055 7.44083 0.980578 7.77129 1.20797 8.01146C1.43461 8.25084 1.73689 8.38067 2.04685 8.38067H2.79052C3.02498 8.38067 3.21505 8.57074 3.21505 8.8052V9.99045L5.46952 8.45436C5.54 8.40635 5.62329 8.38067 5.70856 8.38067H8.53612C8.84607 8.38067 9.14835 8.25084 9.37499 8.01146C9.60238 7.77129 9.73391 7.44083 9.73391 7.09172V2.52244C9.73391 2.17332 9.60238 1.84287 9.37499 1.6027C9.14835 1.36332 8.84607 1.23349 8.53612 1.23349H2.04685ZM0.591419 1.01895C0.973261 0.615651 1.49627 0.38443 2.04685 0.38443H8.53612C9.08669 0.38443 9.6097 0.615651 9.99154 1.01895C10.3726 1.42146 10.583 1.96266 10.583 2.52244V3.70508H13.1031C13.6139 3.70508 14.0988 3.91961 14.4525 4.2932C14.8055 4.66601 15 5.16692 15 5.68468V9.83154C15 10.3493 14.8055 10.8502 14.4525 11.223C14.0988 11.5966 13.6139 11.8111 13.1031 11.8111H12.8527V13.191C12.8527 13.3484 12.7657 13.4928 12.6266 13.5663C12.4875 13.6399 12.3192 13.6304 12.1891 13.5418L9.64903 11.8111H7.21376C6.70296 11.8111 6.2181 11.5966 5.86438 11.223C5.51141 10.8502 5.31689 10.3493 5.31689 9.83154V9.58577L3.02956 11.1442C2.89954 11.2328 2.73119 11.2422 2.5921 11.1687C2.45301 11.0952 2.36599 10.9507 2.36599 10.7934V9.22972H2.04685C1.49627 9.22972 0.973262 8.9985 0.591419 8.5952C0.210322 8.19269 0 7.65149 0 7.09172V2.52244C0 1.96266 0.210322 1.42146 0.591419 1.01895ZM6.16595 9.22972H8.53612C9.08669 9.22972 9.6097 8.9985 9.99154 8.5952C10.3726 8.19269 10.583 7.65149 10.583 7.09172V4.55413H13.1031C13.3733 4.55413 13.6374 4.66728 13.8359 4.87695C14.0352 5.08741 14.1509 5.37758 14.1509 5.68468V9.83154C14.1509 10.1386 14.0352 10.4288 13.8359 10.6393C13.6374 10.8489 13.3733 10.9621 13.1031 10.9621H12.4282C12.1937 10.9621 12.0037 11.1522 12.0037 11.3866V12.3881L10.0189 11.0358C9.94848 10.9878 9.86518 10.9621 9.77991 10.9621H7.21376C6.94358 10.9621 6.67945 10.8489 6.48093 10.6393C6.28167 10.4288 6.16595 10.1386 6.16595 9.83154V9.22972Z" />
                                  </svg>
                                  <span>{getFormattedNumbers(x.messageCount)} Messages</span>
                                </div>
                              </div>
                            </div>
                            {username.length === 0 &&
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={e => removeRecent(e, x)}>
                                <path d="M1 1L11 11M1 11L11 1" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button className="flex justify-center items-center space-x-[7.02px] px-[10px] h-[45px] bg-button rounded-[5px] text-[14px] leading-[17px] text-subtext hover:bg-subtext hover:text-white transition duration-800" onClick={create} onMouseEnter={() => setCreateActive(true)} onMouseLeave={() => setCreateActive(false)}>
                <div className="w-[18px] h-[18px] relative">
                  <Fade in={!createActive} timeout={400}>
                    <svg className="absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
                      <rect x="1.02344" y="4.06885" width="12.8831" height="12.8831" rx="3" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M7.46484 7.43994V13.5806" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M10.5352 10.5103L4.39449 10.5103" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M13.9768 13.9312C15.6337 13.9312 16.9768 12.588 16.9768 10.9312V4.0481C16.9768 2.39124 15.6337 1.0481 13.9768 1.0481H7.09375C5.4369 1.0481 4.09375 2.39124 4.09375 4.0481" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </Fade>
                  <Fade in={createActive} timeout={400}>
                    <svg className="absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.373535 7.0687C0.373535 5.05286 2.0077 3.4187 4.02354 3.4187H10.9066C12.9224 3.4187 14.5566 5.05286 14.5566 7.0687V13.9518C14.5566 15.9676 12.9224 17.6018 10.9066 17.6018H4.02354C2.0077 17.6018 0.373535 15.9676 0.373535 13.9518V7.0687ZM7.46474 6.78989C7.82372 6.78989 8.11474 7.08091 8.11474 7.43989V9.86023H10.5353C10.8943 9.86023 11.1853 10.1512 11.1853 10.5102C11.1853 10.8692 10.8943 11.1602 10.5353 11.1602H8.11474V13.5806C8.11474 13.9395 7.82372 14.2306 7.46474 14.2306C7.10575 14.2306 6.81474 13.9395 6.81474 13.5806V11.1602H4.39463C4.03564 11.1602 3.74463 10.8692 3.74463 10.5102C3.74463 10.1512 4.03564 9.86023 4.39463 9.86023H6.81474V7.43989C6.81474 7.08091 7.10575 6.78989 7.46474 6.78989Z" fill="white" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.34375 4.0481C3.34375 1.97703 5.02268 0.298096 7.09375 0.298096H13.9768C16.0479 0.298096 17.7268 1.97703 17.7268 4.0481V10.9312C17.7268 13.0022 16.0479 14.6812 13.9768 14.6812C13.5626 14.6812 13.2268 14.3454 13.2268 13.9312C13.2268 13.5169 13.5626 13.1812 13.9768 13.1812C15.2194 13.1812 16.2268 12.1738 16.2268 10.9312V4.0481C16.2268 2.80546 15.2194 1.7981 13.9768 1.7981H7.09375C5.85111 1.7981 4.84375 2.80546 4.84375 4.0481C4.84375 4.46231 4.50796 4.7981 4.09375 4.7981C3.67954 4.7981 3.34375 4.46231 3.34375 4.0481Z" fill="white" />
                    </svg>
                  </Fade>
                </div>
                <span>Create</span>
              </button>
              <button className="flex justify-center items-center space-x-[7.02px] px-[10px] h-[45px] bg-button rounded-[5px] text-[14px] leading-[17px] text-subtext hover:bg-subtext hover:text-white transition duration-800 ml-[10px]" onMouseEnter={() => setChatsActive(true)} onMouseLeave={() => setChatsActive(false)} onClick={seeChat}>
                <div className="relative">
                  <div className="absolute w-2 h-2 rounded-full top-[-2px] right-[-2px] bg-unread z-[1]" />
                  <div className="w-[18px] h-[18px] relative">
                    <Fade in={!chatsActive} timeout={400}>
                      <svg className="absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M14.5276 14.1381L14.9872 14.5977V14.5977L14.5276 14.1381ZM5.01651 15.3382L5.34812 14.7792C5.21255 14.6988 5.05238 14.6703 4.89742 14.6992L5.01651 15.3382ZM14.5276 3.08387L14.9872 2.62425V2.62425L14.5276 3.08387ZM3.47335 3.08387L3.93297 3.54349L3.47335 3.08387ZM2.27378 12.5959L2.91278 12.7149C2.94166 12.56 2.91323 12.3998 2.83278 12.2642L2.27378 12.5959ZM1.64563 15.9664L1.00663 15.8473C0.967365 16.058 1.03447 16.2745 1.18601 16.4261C1.33754 16.5776 1.55403 16.6447 1.76471 16.6054L1.64563 15.9664ZM14.068 13.6785C11.704 16.0425 8.0979 16.4103 5.34812 14.7792L4.68489 15.8973C7.93324 17.8241 12.193 17.3919 14.9872 14.5977L14.068 13.6785ZM14.068 3.54349C16.8667 6.34219 16.8667 10.8798 14.068 13.6785L14.9872 14.5977C18.2936 11.2913 18.2936 5.93064 14.9872 2.62425L14.068 3.54349ZM3.93297 3.54349C6.73167 0.744788 11.2693 0.744788 14.068 3.54349L14.9872 2.62425C11.6808 -0.682132 6.32012 -0.682132 3.01373 2.62425L3.93297 3.54349ZM2.83278 12.2642C1.20109 9.51428 1.56876 5.9077 3.93297 3.54349L3.01373 2.62425C0.219284 5.4187 -0.212758 9.67908 1.71478 12.9276L2.83278 12.2642ZM2.28462 16.0855L2.91278 12.7149L1.63478 12.4768L1.00663 15.8473L2.28462 16.0855ZM4.89742 14.6992L1.52654 15.3274L1.76471 16.6054L5.13559 15.9772L4.89742 14.6992Z" fill="#848D97" />
                        <path d="M6.12451 7.03418H11.8755" stroke="#848D97" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.12451 10.1875H9.65479" stroke="#848D97" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Fade>
                    <Fade in={chatsActive} timeout={400}>
                      <svg className="absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.47461 7.03428C5.47461 6.67529 5.76562 6.38428 6.12461 6.38428H11.8756C12.2346 6.38428 12.5256 6.67529 12.5256 7.03428C12.5256 7.39326 12.2346 7.68428 11.8756 7.68428H6.12461C5.76562 7.68428 5.47461 7.39326 5.47461 7.03428ZM5.47461 10.1876C5.47461 9.82861 5.76562 9.5376 6.12461 9.5376H9.65488C10.0139 9.5376 10.3049 9.82861 10.3049 10.1876C10.3049 10.5466 10.0139 10.8376 9.65488 10.8376H6.12461C5.76562 10.8376 5.47461 10.5466 5.47461 10.1876ZM5.01616 15.3379C8.01522 17.1169 11.9482 16.7169 14.5272 14.1378C17.5798 11.0853 17.5798 6.13614 14.5272 3.0836C11.4747 0.0310534 6.52555 0.0310534 3.473 3.0836C0.893673 5.66293 0.493817 9.59641 2.27343 12.5956L1.64528 15.9662L5.01616 15.3379Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.0676 3.54331C11.2689 0.744611 6.73134 0.744611 3.93264 3.54331C1.56843 5.90753 1.20076 9.51411 2.83245 12.264C2.9129 12.3996 2.94134 12.5598 2.91245 12.7148L2.45794 15.1536L4.89709 14.699C5.05205 14.6702 5.21222 14.6986 5.34779 14.779C8.09757 16.4101 11.7037 16.0423 14.0676 13.6783C16.8663 10.8796 16.8663 6.34202 14.0676 3.54331ZM3.0134 2.62408C6.31979 -0.682309 11.6805 -0.682309 14.9869 2.62408C18.2933 5.93046 18.2933 11.2912 14.9869 14.5976C12.2542 17.3303 8.11961 17.8038 4.90036 16.0208L1.76438 16.6053C1.55371 16.6445 1.33721 16.5774 1.18568 16.4259C1.03414 16.2743 0.967036 16.0578 1.0063 15.8472L1.59067 12.7115C-0.192935 9.49216 0.28043 5.35705 3.0134 2.62408Z" fill="white" />
                      </svg>
                    </Fade>
                  </div>
                </div>
                <span>Chats</span>
              </button>
              {profile ?
                <button className={"flex justify-center items-center px-[15px] h-[45px] rounded-[5px] relative ml-[10px]" + (themeID === 0 ? " bg-button hover:bg-[#34363C] text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0] text-title" : themeID === 2 ? " bg-candybutton hover:bg-[#DD14D5] text-candytitle" : themeID === 3 ? " bg-galaxybutton hover:bg-[#5200FF] text-white" : "")} onClick={() => setOpenProfileMenu(!openProfileMenu)} ref={profileMenuRef}>
                  <div className="w-[25px] h-[25px] border border-white rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={profile?.pictures[profile?.picture]} alt="" />
                  </div>
                  <span className="ml-[5px] truncate max-w-[80px]">{profile.username}</span>
                  <svg className={"ml-[15px] transition" + (openProfileMenu ? " rotate-[180deg]" : "")} xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor">
                    <path d="M1 1L6 6L11 1" strokeWidth="2" />
                  </svg>
                  {openProfileMenu &&
                    <div className={"flex flex-col space-y-[10px] absolute top-[calc(100%+5px)] right-0 w-full py-[5px] border font-semibold text-[14px] leading-[17px] rounded-[5px] z-[2] backdrop-blur-[25px] min-w-[125px]" + (themeID === 0 ? " bg-[rgba(21,21,24,0.9)] border-button" : themeID === 1 ? " bg-[rgba(255,255,255,0.9)] border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                      <Link to="/account" className={"flex justify-center items-center space-x-[10px] h-[50px] text-[14px] leading-[17px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxybutton" : "")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.39719 3.03031L7.89858 0.431429L9.83599 3.03432C10.6132 2.92104 11.3968 2.92382 12.1619 3.03601L14.1006 0.431396L18.6019 3.03027L17.3159 6.01093C17.5532 6.31219 17.7719 6.63411 17.9693 6.976C18.1667 7.31793 18.3362 7.66834 18.4784 8.02456L21.7028 8.40114V13.5989L18.4776 13.9756C18.1923 14.6942 17.8029 15.3741 17.3162 15.9905L18.6015 18.9695L14.1002 21.5684L12.1629 18.9658C11.3858 19.079 10.6024 19.0763 9.83738 18.9641L7.89898 21.5684L3.39759 18.9695L4.68333 15.9896C4.44586 15.6882 4.22707 15.3661 4.02959 15.0241C3.83214 14.6821 3.66265 14.3316 3.52039 13.9754L0.296875 13.5989L0.296875 8.40113L3.52124 8.02456C3.80661 7.30595 4.19597 6.62601 4.68266 6.0096L3.39719 3.03031ZM12.3432 13.327C13.6285 12.585 14.0688 10.9416 13.3268 9.65636C12.5848 8.37115 10.9414 7.93081 9.65617 8.67282C8.37097 9.41483 7.93062 11.0582 8.67264 12.3434C9.41465 13.6286 11.058 14.069 12.3432 13.327Z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                      <button className="flex justify-center items-center space-x-[10px] h-[50px] text-[14px] leading-[17px] text-[#E93131]" onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
                          <g clip-path="url(#clip0_3485_51654)">
                            <path d="M2.85349 3.16406L11.5961 7.29695V24.2986L2.85303 19.5079L2.85349 3.16406Z" fill="#E93131" stroke="#E93131" strokeWidth="1.37476" strokeLinecap="round" />
                            <path d="M1.99902 2.39624L16.5817 2.39624L16.5817 5.83704M11.2378 18.5087L16.5817 18.5087L16.5817 14.8454" stroke="#E93131" strokeWidth="1.3" />
                            <path d="M15.5625 10.4399L22.5876 10.4399" stroke="#E93131" strokeWidth="1.3" />
                            <path d="M19.668 6.96094L23.1468 10.4398L19.668 13.9187" stroke="#E93131" strokeWidth="1.3" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3485_51654">
                              <rect width="25" height="25" fill="white" transform="translate(0.5 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>Log out</span>
                      </button>
                    </div>
                  }
                </button>
                :
                <button className={"flex justify-center items-center px-5 h-[45px] rounded-[5px] font-bold text-[14px] leading-[17px] ml-[10px]" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2 text-white" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxysubtext" : "")} onClick={login}>Login</button>
              }
            </div>
            <div className="flex lg:hidden space-x-[10px]">
              <button className="flex justify-center items-center w-[45px] h-[45px] bg-black12 rounded-[5px]" onClick={() => setOpenSearch(true)}>
                <svg width="21" height="21" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1167 13.1167L10.2559 10.2508M11.8413 6.42064C11.8413 7.85828 11.2702 9.23704 10.2536 10.2536C9.23704 11.2702 7.85828 11.8413 6.42064 11.8413C4.98299 11.8413 3.60423 11.2702 2.58767 10.2536C1.5711 9.23704 1 7.85828 1 6.42064C1 4.98299 1.5711 3.60423 2.58767 2.58767C3.60423 1.5711 4.98299 1 6.42064 1C7.85828 1 9.23704 1.5711 10.2536 2.58767C11.2702 3.60423 11.8413 4.98299 11.8413 6.42064Z" stroke="#048DFF" strokeWidth="1.66194" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </>
          :
          <>
            <div className="flex items-center bg-black12 rounded-[5px] px-[13px] text-[15px] leading-[18px] text-black4 h-[45px] flex-1 relative transition duration-800 hover:bg-black5 border border-black12 focus-within:border-blue2" onClick={() => setOpenSearchPanelMobile(true)} ref={searchMobileRef}>
              {openSearch && (username.length > 0 ? filteredDopples : recentHistory).length > 0 &&
                <div className="absolute top-[59px] left-[-21px] w-screen bg-black15 backdrop-blur-[25px] pb-[5px]">
                  <div className="px-5 pt-[15px] pb-[5px] font-bold text-black4 text-[16px] leading-[19px]">{username.length > 0 ? "RESULTS" : "RECENT"}</div>
                  <div className="flex flex-col max-h-[calc(100vh-212px)] overflow-auto search-scroll">
                    {(username.length > 0 ? filteredDopples : recentHistory).map((x, i) =>
                      <button key={i} className="flex justify-between items-center px-5 py-[10px] hover:bg-black5 outline-none" onClick={e => seeProfileMobile(e, x)}>
                        <div className="flex items-center space-x-[11.41px] max-w-full overflow-hidden">
                          <img className="w-[50px] h-[50px] rounded-[10px]" src={x.avatarURL + "?tr=w-50,h-50"} alt="" />
                          <div className="flex flex-col space-y-[6.11px] flex-1 max-w-full overflow-hidden">
                            <div className={"flex items-center space-x-[5.71px] flex-1 max-w-full"}>
                              <span className="text-left truncate text-[16px] leading-[19px] text-black4 font-bold max-w-full"><BoldedText text={x.name} shouldBeBold={username} /></span>
                              <img className="w-[17.12px] h-[17.12px]" src="/images/explore/verified.svg" alt="" />
                            </div>
                            <div className="flex items-center space-x-[5.71px] text-black4 text-[14px] leading-[17px]">
                              <svg width="17.12" height="15.1" viewBox="0 0 15 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.04685 1.23349C1.73689 1.23349 1.43461 1.36332 1.20797 1.6027C0.980578 1.84287 0.849055 2.17332 0.849055 2.52244V7.09172C0.849055 7.44083 0.980578 7.77129 1.20797 8.01146C1.43461 8.25084 1.73689 8.38067 2.04685 8.38067H2.79052C3.02498 8.38067 3.21505 8.57074 3.21505 8.8052V9.99045L5.46952 8.45436C5.54 8.40635 5.62329 8.38067 5.70856 8.38067H8.53612C8.84607 8.38067 9.14835 8.25084 9.37499 8.01146C9.60238 7.77129 9.73391 7.44083 9.73391 7.09172V2.52244C9.73391 2.17332 9.60238 1.84287 9.37499 1.6027C9.14835 1.36332 8.84607 1.23349 8.53612 1.23349H2.04685ZM0.591419 1.01895C0.973261 0.615651 1.49627 0.38443 2.04685 0.38443H8.53612C9.08669 0.38443 9.6097 0.615651 9.99154 1.01895C10.3726 1.42146 10.583 1.96266 10.583 2.52244V3.70508H13.1031C13.6139 3.70508 14.0988 3.91961 14.4525 4.2932C14.8055 4.66601 15 5.16692 15 5.68468V9.83154C15 10.3493 14.8055 10.8502 14.4525 11.223C14.0988 11.5966 13.6139 11.8111 13.1031 11.8111H12.8527V13.191C12.8527 13.3484 12.7657 13.4928 12.6266 13.5663C12.4875 13.6399 12.3192 13.6304 12.1891 13.5418L9.64903 11.8111H7.21376C6.70296 11.8111 6.2181 11.5966 5.86438 11.223C5.51141 10.8502 5.31689 10.3493 5.31689 9.83154V9.58577L3.02956 11.1442C2.89954 11.2328 2.73119 11.2422 2.5921 11.1687C2.45301 11.0952 2.36599 10.9507 2.36599 10.7934V9.22972H2.04685C1.49627 9.22972 0.973262 8.9985 0.591419 8.5952C0.210322 8.19269 0 7.65149 0 7.09172V2.52244C0 1.96266 0.210322 1.42146 0.591419 1.01895ZM6.16595 9.22972H8.53612C9.08669 9.22972 9.6097 8.9985 9.99154 8.5952C10.3726 8.19269 10.583 7.65149 10.583 7.09172V4.55413H13.1031C13.3733 4.55413 13.6374 4.66728 13.8359 4.87695C14.0352 5.08741 14.1509 5.37758 14.1509 5.68468V9.83154C14.1509 10.1386 14.0352 10.4288 13.8359 10.6393C13.6374 10.8489 13.3733 10.9621 13.1031 10.9621H12.4282C12.1937 10.9621 12.0037 11.1522 12.0037 11.3866V12.3881L10.0189 11.0358C9.94848 10.9878 9.86518 10.9621 9.77991 10.9621H7.21376C6.94358 10.9621 6.67945 10.8489 6.48093 10.6393C6.28167 10.4288 6.16595 10.1386 6.16595 9.83154V9.22972Z" />
                              </svg>
                              <span>{getFormattedNumbers(x.messageCount)} Messages</span>
                            </div>
                          </div>
                        </div>
                        {username.length === 0 &&
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={e => removeRecent(e, x)}>
                            <path d="M1 1L11 11M1 11L11 1" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        }
                      </button>
                    )}
                  </div>
                </div>
              }
              <svg width="21" height="21" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1167 13.1167L10.2559 10.2508M11.8413 6.42064C11.8413 7.85828 11.2702 9.23704 10.2536 10.2536C9.23704 11.2702 7.85828 11.8413 6.42064 11.8413C4.98299 11.8413 3.60423 11.2702 2.58767 10.2536C1.5711 9.23704 1 7.85828 1 6.42064C1 4.98299 1.5711 3.60423 2.58767 2.58767C3.60423 1.5711 4.98299 1 6.42064 1C7.85828 1 9.23704 1.5711 10.2536 2.58767C11.2702 3.60423 11.8413 4.98299 11.8413 6.42064Z" stroke={(username.length > 0 && openSearchPanelMobile) ? "white" : "#6A7179"} strokeWidth="1.66194" strokeLinecap="round" />
              </svg>
              <input className="flex-1 text-white placeholder-black4 caret-blue2 ml-[15px] w-full" placeholder="Search Dopples" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <button className="flex justify-center items-center w-[45px] h-[45px] bg-black12 rounded-[5px] ml-[10px]" onClick={() => setOpenSearch(false)}>
              <svg width="19" height="19" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.6665 1.16667L13.3332 12.8333M1.6665 12.8333L13.3332 1.16667" stroke="#048DFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        }
      </div>
    </header>
  );
};

export default Header;
