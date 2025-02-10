import { useContext } from "react";
import AsteriskText from "./AsteriskText";
import { RefContext } from "../contexts/RefContextProvider";

const MessageFromYouMobile = ({ themeID, alignment, textSize, x, i, editedIndexes, setEditIndex, isLast }) => {
    const { setOpenDeleteThreadConfirmModal, setDeleteThreadConfirmContent, dopple } = useContext(RefContext);

    const openDeleteMsgModal = async () => {
        setOpenDeleteThreadConfirmModal(true)
        setDeleteThreadConfirmContent(dopple)
    }

    return (
        <div className={"msg-para border rounded-[20px] p-[10px] min-w-[40px]" + (alignment === 0 ? " mr-[10px] rounded-tr-[15px] rounded-br-[0px] br-[0px] " : " ml-[10px] rounded-tl-[15px] rounded-bl-[0px]") + ((themeID === 0 || themeID === 1) ? " bg-chatback3 border-chatback3" + (x?.message?.data.content?.length <= 7 ? " text-center" : "") : (themeID === 2 ? " bg-[#FF8BA0] border-[#FF7A92]" : themeID === 3 ? " bg-[#313B95] border-[#434FB6]" : "")) + (x?.message?.data.content?.length <= 7 ? " text-center" : "") + (x?.message?.data?.url ? " max-w-full" : " max-w-[70%]")} style={{ fontSize: textSize + "px", lineHeight: (textSize + 3) + "px" }}>
            <div className="flex items-end space-x-[5px]">
                <span className="flex-1" style={{ fontSize: textSize + "px", lineHeight: (textSize + 3) + "px" }}>
                    <AsteriskText text={x?.message?.data.content} sender="human" />
                </span>
                {editedIndexes.some(x => x === i) &&
                    <span className="italic" style={{ fontSize: (textSize - 2) + "px", lineHeight: (textSize + 1) + "px" }}>edited</span>
                }
            </div>
            <div className="w-full h-full absolute top-0 left-0">
                {isLast &&
                    <div className={"flex flex-col verytiny:flex-row items-center space-y-[10px] verytiny:space-x-[10px] verytiny:space-y-0 absolute top-1/2 -translate-y-1/2" + (alignment === 0 ? " right-[calc(100%+10px)]" : " left-[calc(100%+10px)]")}>
                        <button className={"flex justify-center items-center" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} onClick={() => setEditIndex(i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 20H19C19.2652 20 19.5196 20.1054 19.7071 20.2929C19.8946 20.4804 20 20.7348 20 21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21C4 20.7348 4.10536 20.4804 4.29289 20.2929C4.48043 20.1054 4.73478 20 5 20ZM4 15L14 5L17 8L7 18H4V15ZM15 4L17 2L20 5L17.999 7.001L15 4Z" />
                            </svg>
                        </button>
                        <button className={"flex justify-center items-center" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} onClick={openDeleteMsgModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z"></path><path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z"></path><path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z"></path></svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageFromYouMobile;