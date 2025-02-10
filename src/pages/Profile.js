import { Skeleton, useMediaQuery } from "@mui/material";
import { Fragment, useContext, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDetails, setReferralDopple } from "../redux/reducers/ModalReducer";
import { categories } from "../config";
import axios from "../utilities/axiosConfig";
import DoppleCard from "../components/DoppleCard";
import { RefContext } from "../contexts/RefContextProvider";
import useWindowDimensions from "../hooks/useDimensions";
import { useCookies } from "react-cookie";
import { shuffle } from "lodash";
import { getFormattedNumbers } from "../utilities/format";
import { setDopples } from "../redux/reducers/ChatReducer";

const Profile = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { key } = useParams()
  const [cookies, setCookies] = useCookies(["userid"])
  const { width: screenWidth } = useWindowDimensions();
  const { setDopple: setDoppleContext, setDoppleName, dopples, setHistory, setLoadedMsgs, setLoadedDopples, setOpenSignModal, setSending } = useContext(RefContext);
  const profile = useSelector(store => store.AuthReducer.profile);
  const matches = useMediaQuery("(min-width:768px)");
  const [loadedAvatar, setLoadedAvatar] = useState(false);
  const [loadedBanner, setLoadedBanner] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [similarDopples, setSimilarDopples] = useState([]);
  const [dopple, setDopple] = useState();
  const [openArrow, setOpenArrow] = useState(false)
  const ref = useRef();

  const openProfile = (data) => {
    if (data._id) {
      document.body.scrollTop = 0;
      setLoadedBanner(false)
      nav("/profile/" + data._id)
    }
  }
  const chat = async (e, dt) => {
    if (!dt.sender) return
    e.stopPropagation()
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid

		setDoppleContext()
    nav("/messages")
    setHistory([])
    setLoadedDopples(false)
    setLoadedMsgs(false)
    setSending(true)

    const { data: { data: dopplesData } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
    if (!profile && userid && (dopplesData.active_chats.length + dopplesData.saved_chats.length >= 1)) {
      setOpenSignModal(true)
      dispatch(setDetails({ openLoginOrSignup: false }))
      return
    }

    try {
      await axios.post(`chat/new_chat_id`, {
        username: profile?.email ?? cookies?.userid,
        dopple_name: dt.sender,
      })

      const { data: { data } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
      dispatch(setDopples({ arr: data }))

      const _dopple = data.active_chats?.find(x => x.dopple_name === dt.sender)
      setDoppleContext(_dopple)
    } catch (e) {
      console.log(e)
    }
  }
  const prev = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft - (screenWidth - 40), behavior: 'smooth' });
  }
  const next = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft + (screenWidth - 40), behavior: 'smooth' });
  }
  useMemo(async () => {
    if (key?.length > 0) {
      try {
        const { data: { data: _dopple } } = await axios.get("/dopple/id/" + key)
        if (_dopple) {
          setDopple(_dopple)
          dispatch(setReferralDopple(_dopple))
          setSimilarDopples(shuffle(dopples.filter(x => x.category === _dopple.category && x.subcategory === _dopple.subcategory && x._id !== _dopple._id)))
        }
        else nav("/error")
      } catch (e) {
        console.log(e)
        nav("/error")
      }
    }
  }, [key, dopples, dispatch])
  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:mt-7 md:px-5 xl:px-[60px]">
        <div className={"md:flex-1 h-[250px] tiny:h-[431.25px] tiny:min-h-[431.25px] relative banner-img-container" + (loadedBanner ? "" : " hidden")}>
          <img className="w-0 h-0 opacity-0 pointer-events-none" src={dopple?.bannerURL} alt="" />
          <div className="flex items-center absolute bottom-5 right-5 bg-menuback border border-[rgba(0,89,25,.25)] rounded-[28px] px-2 h-[37px] font-bold text-[12px] leading-[15px]">
            <div className="relative">
              <div className="absolute top-[1.5px] right-[1px] w-[5px] h-[5px] rounded-full bg-[#00FF47] shadow-lg9" />
              <img src="/images/profile/icons/global.svg" alt="" />
            </div>
            <span className="ml-[5px]">{dopple?.chattingNow ?? 0} Chatting Now</span>
          </div>
          <Fragment key={dopple?._id}>
            <video className="md:rounded-[15px] w-full h-full object-cover" autoPlay loop muted playsInline controls={false} onLoadedData={() => setLoadedBanner(true)}>
              <source src={dopple?.bannerVideoURL} type="video/mp4" />
            </video>
          </Fragment>
        </div>
        <div className={"flex justify-center items-center h-[230px] md:h-[431.25px] bg-black13 md:bg-black5 md:flex-1 md:rounded-[15px]" + (!loadedBanner ? " block" : " hidden")}>
          <img className="w-[100px] md:w-[150px]" src="/images/explore/topcharts/placeholder.svg" alt="" />
        </div>
        <div className="flex flex-col flex-1 z-[1]">
          <div className="flex flex-col px-5 md:pl-[30px] md:pr-0">
            <div className="flex justify-between items-end md:items-start mt-[-50px] md:mt-0">
              <img className={"w-[115px] h-[115px] md:w-[125px] md:h-[125px] rounded-[15px]" + (loadedAvatar ? " block" : " hidden")} src={dopple?.avatarURL + "?tr=w-250,h-250"} alt="" onLoad={() => setLoadedAvatar(true)} />
              {!loadedAvatar &&
                <div className="flex justify-center items-center w-[100px] h-[100px] rounded-[15px] bg-black5">
                  <img className="w-[45.45px]" src="/images/explore/topcharts/placeholder.svg" alt="" />
                </div>
              }
            </div>
            <span className="flex items-center space-x-[5.71px] mt-5 md:mt-[15px]">
              {loadedAvatar && loadedBanner ?
                <>
                  <span className="font-bold text-[24px] leading-[28px]">{dopple?.name}</span>
                  <img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
                </>
                :
                <>
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={115} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={83} height={10} />
                  <Skeleton variant="circular" sx={{ bgcolor: 'rgba(255, 255, 255, 0.10)' }} width={17} height={17} />
                </>
              }
            </span>
            {loadedAvatar && loadedBanner ?
              <span className="font-bold text-[16px] leading-[19px] text-black4">{dopple?.tagLine ?? ""}</span>
              :
              <div className="flex items-center space-x-[5px] mt-[14.5px]">
                <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={49} height={10} />
                <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={49} height={10} />
                <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={49} height={10} />
              </div>
            }
            {loadedAvatar && loadedBanner ?
              <span className="mt-[15px] text-[14px] leading-[17px] text-subtext w-full md:max-w-[600px]">
                {readMore ? dopple?.bio : dopple?.bio.slice(0, 200) + (dopple?.bio.length > 200 ? "..." : "")}
                {(dopple?.bio.length > 200 && !readMore) ? <span className="ml-1 text-blue2 font-bold cursor-pointer" onClick={() => setReadMore(true)}>Read more</span> : null}
              </span>
              :
              <div className="flex flex-col space-y-[5px] mt-[22px] md:w-[400px] lg:w-[600px]">
                <div className="flex space-x-[5px]">
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 2 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 2 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 2 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 2 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 2 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                </div>
                <div className="flex space-x-[5px]">
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                  <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px", flex: 1 }} height={10} />
                </div>
              </div>
            }
            <div className="flex flex-col md:flex-row items-center mt-[15px]">
              <button className="flex justify-center items-center space-x-[5.71px] w-full md:w-[150px] h-[50px] bg-blue2 rounded-[4px] font-bold text-[13.7px] md:text-[12px] md:leading-[14px] transition duration-800 hover:bg-blue3" onClick={e => chat(e, dopple)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.576782 0.5H16.7166V12.5721H6.67889L3.07493 15.5V12.5721H0.576782V0.5ZM11.7419 5.38139H5.55155V4.21352H11.7419V5.38139ZM12.8999 8.05125H4.39355V6.88337H12.8999V8.05125Z" />
                </svg>
                <span>Chat Now</span>
              </button>
              {/* <button className="relative rounded-[4px] overflow-hidden bg-button w-full md:w-[150px] mt-[15px] md:mt-0 md:ml-[15px]" onClick={() => setPreview(!preview)}>
                {preview ?
                  <>
                    <div className={"absolute top-0 left-0 w-full h-[5px]" + (themeID === 0 ? " bg-[rgba(4,141,255,.50)]" : themeID === 1 ? " bg-[rgba(4,141,255,.50)]" : themeID === 2 ? " bg-[rgba(221,87,175,.5)]" : themeID === 3 ? " bg-[rgba(119,71,220,.5)]" : "")}>
                      <div className={"w-[30%] h-full" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-[#7747DC]" : "")} />
                    </div>
                    <div className="flex justify-center items-center space-x-[5.71px] py-[17.69px] md:py-[15.5px] font-bold text-[13.7px] md:text-[12px] md:leading-[14px] transition duration-800 text-blue2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <rect width="6" height="15" />
                        <rect x="9" width="6" height="15" />
                      </svg>
                      <span>Stop Playing</span>
                    </div>
                  </>
                  :
                  <div className="flex justify-center items-center space-x-[5.71px] h-[50px] font-bold text-[13.7px] md:text-[12px] md:leading-[14px] transition duration-800 text-blue2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M15.4116 8L0.411621 15.5L0.411622 0.5L15.4116 8Z" fill="white" />
                    </svg>
                    <span>Preview Voice</span>
                  </div>
                }
              </button> */}
            </div>
            <div className="mt-[15px] mb-[20.73px] w-full h-[1px] bg-black5" />
            <div className="flex justify-between items-start space-x-2">
              <div className="w-[1px] h-[30px] bg-transparent" />
              <div className="flex flex-col items-center space-y-2 text-[10px] md:text-[12px] leading-[150%] md:leading-[18px] text-black4 w-[86.09px] md:w-[100px]">
                {loadedAvatar && loadedBanner ?
                  <>
                    <img src="/images/profile/icons/1.svg" alt="" />
                    <span className="text-center">Verified Dopple</span>
                  </>
                  :
                  <>
                    <Skeleton variant="circular" sx={{ bgcolor: 'rgba(255, 255, 255, 0.10)' }} width={25} height={25} />
                    <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={matches ? 87 : 49} height={8} />
                  </>
                }
              </div>
              <div className="w-[1px] h-[30px] bg-black5" />
              <div className="flex flex-col items-center space-y-2 text-[10px] md:text-[12px] leading-[150%] md:leading-[18px] text-black4 w-[86.09px] md:w-[100px]">
                {loadedAvatar && loadedBanner ?
                  <>
                    <img className="h-[25px]" src={categories[dopple?.category].imageOnProfile} alt="" />
                    <span className="text-center">{categories[dopple?.category].name}</span>
                  </>
                  :
                  <>
                    <Skeleton variant="circular" sx={{ bgcolor: 'rgba(255, 255, 255, 0.10)' }} width={25} height={25} />
                    <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={matches ? 87 : 49} height={8} />
                  </>
                }
              </div>
              <div className="w-[1px] h-[30px] bg-black5" />
              <div className="flex flex-col items-center space-y-2 text-[10px] md:text-[12px] leading-[150%] md:leading-[18px] text-black4 w-[86.09px] md:w-[100px]">
                {loadedAvatar && loadedBanner ?
                  <>
                    <img src="/images/profile/icons/3.svg" alt="" />
                    <span className="max-w-full text-center break-words">{getFormattedNumbers(dopple?.messageCount)} Messages</span>
                  </>
                  :
                  <>
                    <Skeleton variant="circular" sx={{ bgcolor: 'rgba(255, 255, 255, 0.10)' }} width={25} height={25} />
                    <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={matches ? 87 : 49} height={8} />
                  </>
                }
              </div>
              <div className="w-[1px] h-[30px] bg-black5" />
              <div className="flex flex-col items-center space-y-2 text-[10px] md:text-[12px] leading-[150%] md:leading-[18px] text-black4 w-[86.09px] md:w-[100px]">
                {loadedAvatar && loadedBanner ?
                  <>
                    <img src="/images/profile/icons/4.svg" alt="" />
                    <span className="max-w-full text-center break-words">By {dopple?.username}</span>
                  </>
                  :
                  <>
                    <Skeleton variant="circular" sx={{ bgcolor: 'rgba(255, 255, 255, 0.10)' }} width={25} height={25} />
                    <Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={matches ? 87 : 49} height={8} />
                  </>
                }
              </div>
              <div className="w-[1px] h-[30px] bg-transparent" />
            </div>
            <div className="mt-4 mb-[15px] w-full h-[1px] bg-black5" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 xl:px-[60px] md:mt-[30px]">
        <span className="font-bold text-[22px] leading-[22px]">Similar Dopples</span>
      </div>
      <div className="relative" onMouseEnter={() => setOpenArrow(true)} onMouseLeave={() => setOpenArrow(false)}>
        <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref)} aria-label="Prev">
          <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
            <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref)} aria-label="Next">
          <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
            <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref}>
          <div className="flex space-x-[5px] mt-[15px]">
            {similarDopples.map((x, i) =>
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;