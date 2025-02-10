import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setDetails, setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import axios from "../utilities/axiosConfig";

const CollapsableFooter = () => {
    const nav = useNavigate()
    const loc = useLocation()
    const dispatch = useDispatch()
    const { themeID: _isDark, navCollapsed, setDopple, setOpenSignModal } = useContext(RefContext)
    const profile = useSelector(store => store.AuthReducer.profile);
    const [cookies, setCookies] = useCookies(["profile", "userid"])
    const themeID = loc.pathname === "/messages" ? _isDark : 0

    const color = (path) => {
        if (loc.pathname === path)
            return " font-bold" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")
        else
            return (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtextlight" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")
    }
    const bgColor = (path) => {
        if (loc.pathname === path)
            return (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-[#5200FF]" : "")
        else
            return (themeID === 0 ? " bg-nav" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav" : "")
    }
    const seeChat = async () => {
        nav("/messages")
        let userid = Math.random().toString(36).slice(2);
        if (!cookies?.userid) setCookies("userid", userid)
        else userid = cookies?.userid
        const { data: { success, data: _dopples } } = await axios.post("/firebase/getDopplesDataByUser", {
            user: profile?.email ?? userid
        })
        if (success)
            setDopple(_dopples.sort((a, b) => b.chat_history[b.chat_history.length - 1].timestamp - a.chat_history[a.chat_history.length - 1].timestamp)[0])
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

    return (
        navCollapsed ?
            <nav className={"block md2:hidden w-full transition duration-800 border-t" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
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
            : null
    )
}

export default CollapsableFooter;