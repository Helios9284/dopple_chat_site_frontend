import { getLastMsgDate } from "../utilities/format";
import { useContext } from "react";
import { RefContext } from "../contexts/RefContextProvider";

const DoppleRowDesktop = ({ x, contextMenuRef, setOpenContextMenu, setDoppleIndex, loadedMsgs, setLoadedMsgs, sending }) => {
    const { dopple, setDopple, themeID, dopplesInfo, setDoppleName, setOpenVoiceCaptionsModal, setVoiceCaptionConfirmContent } = useContext(RefContext)

    const selectDopple = (e) => {
        e.preventDefault()
        if (e.button === 0) {
            if (x.chat_id !== dopple?.chat_id && loadedMsgs && !sending) {
                // if (cookies?.voiceCaption !== "on" && cookies?.voiceCaption !== "off") {
                //     setVoiceCaptionConfirmContent(x)
                //     setOpenVoiceCaptionsModal(true)
                // } else {
                setDopple(x)
                setDoppleName()
                setLoadedMsgs(false)
                // }
            }
        }
        if (e.button === 2) {
            setDoppleIndex(x.chat_id)
            setOpenContextMenu(true)
            if (contextMenuRef.current) {
                contextMenuRef.current.style.top = e.clientY + "px"
                contextMenuRef.current.style.left = e.clientX + "px"
                if (e.clientY >= window.innerHeight - contextMenuRef.current.clientHeight) contextMenuRef.current.style.transform = "translateY(-100%)"
                else contextMenuRef.current.style.transform = ""
            }
        }
    }

    if (!x) {
        return;
    }

    const _info = dopplesInfo.find(y => y.sender === x.dopple_name)

    return (
        <button className={"justify-between items-center px-5 py-[15px] space-x-2 w-full group fast-transition flex" + (themeID === 0 ? (x.chat_id === dopple?.chat_id ? " bg-button" : " hover:bg-button") : themeID === 1 ? (x.chat_id === dopple?.chat_id ? " bg-[#EDEDF0]" : " hover:bg-[#EDEDF0]") : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " bg-candybuttonmenu" : " hover:bg-candybuttonmenu") : themeID === 3 ? (x.chat_id === dopple?.chat_id ? " bg-galaxybuttonmenu" : " hover:bg-galaxybuttonmenu") : "")} onMouseDown={selectDopple}>
            <div className="flex space-x-[10px] items-center flex-1 w-[0px]">
                <img className="w-[45px] h-[45px] rounded-[5px]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
                <div className="flex flex-col items-start space-y-[8.61px] flex-1 w-[0px]">
                    <div className={"flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] w-full" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-candytitle group-hover:text-white") : themeID === 3 ? " text-galaxytitle" : "")}>
                        <span className="truncate">{_info?.name}</span>
                        <svg className={"min-w-[15px] min-h-[15px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-blue2 group-hover:text-white") : themeID === 3 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-blue2 group-hover:text-white") : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                        </svg>
                    </div>
                    <div className={"flex items-center space-x-[5px] text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-candysubtext group-hover:text-white") : themeID === 3 ? (x.chat_id === dopple?.chat_id ? " text-white " : " text-galaxysubtext group-hover:text-white") : "")}>
                        <span className="truncate flex-1 text-left">{x?.last_message?.message?.data?.content ?? "\u00a0"}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end space-y-[10.55px]">
                <span className={"text-[12px] leading-[14px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-candysubtext group-hover:text-white") : themeID === 3 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-galaxysubtext group-hover:text-white") : "")}>
                    {x?.last_message?.timestamp && getLastMsgDate(x?.last_message?.timestamp * 1000)}
                </span>
                {x?.pinned ?
                    <svg className={(themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-candysubtext group-hover:text-white") : themeID === 3 ? " text-galaxysubtext" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M12.9956 0.995608L18.4287 6.42866L13.9056 10.9517L13.8763 12.9722L12.1218 14.7268L4.69749 7.30251L6.45203 5.54797L8.47252 5.5187L12.9956 0.995608Z" />
                        <path d="M7.07131 11.292L3.37028 14.993L4.43094 16.0537L8.13197 12.3526L7.07131 11.292Z" />
                    </svg>
                    :
                    <span>&nbsp;</span>
                }
            </div>
        </button>
    )
}

export default DoppleRowDesktop;