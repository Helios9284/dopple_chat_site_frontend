import AsteriskText from "./AsteriskText";
import AudioPlayer from "./AudioPlayer";

const MessageFromBotMobile = ({ themeID, alignment, textSize, x, i, editedIndexes, setEditIndex, isLast, reroll }) => {
    return (
        <div className={"msg-para group border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] " + (alignment === 0 && x?.message?.type === "human" ? "mr-[10px]" : "ml-[10px]") + (x?.message?.data.content?.length <= 7 ? " text-center" : "") + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-[#FFEAF9] border-[#FFCAFA] text-candytitle" : themeID === 3 ? " bg-[#181431] border-[#231C4E]" : "") + (x?.message?.data?.url ? " max-w-full" : " max-w-[70%]")} style={{ fontSize: textSize + "px", lineHeight: (textSize + 3) + "px" }}>
            {x?.message?.data?.url ?
                <AudioPlayer src={x?.message?.data?.url} themeID={themeID} />
                :
                <>
                    <div className="flex items-end space-x-[5px]">
                        <span className="flex-1" style={{ fontSize: textSize + "px", lineHeight: (textSize + 3) + "px" }}>
                            <AsteriskText text={x?.message?.data.content} sender="ai" />
                        </span>
                        {editedIndexes.some(x => x === i) &&
                            <span className="italic" style={{ fontSize: (textSize - 2) + "px", lineHeight: (textSize + 1) + "px" }}>edited</span>
                        }
                    </div>
                    <div className="w-full h-full absolute top-0 left-0">
                        {isLast && i > 0 &&
                            <div className={"flex flex-col verytiny:flex-row items-center space-y-[10px] verytiny:space-x-[10px] verytiny:space-y-0 absolute top-1/2 -translate-y-1/2 left-[calc(100%+10px)]"}>
                                <svg className={"cursor-pointer" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-[#231C4E]" : "")} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor" onClick={() => reroll(i)}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.876 15.6239C7.467 16.5926 8.3205 17.374 9.33752 17.8773C10.3545 18.3806 11.4934 18.5853 12.622 18.4676C13.7507 18.35 14.8228 17.9148 15.7142 17.2125C16.6055 16.5103 17.2795 15.5697 17.658 14.4999H19.748C19.3645 15.9823 18.5638 17.3235 17.441 18.3644C16.3181 19.4054 14.9202 20.1023 13.4131 20.3727C11.906 20.643 10.3531 20.4754 8.9384 19.8896C7.52374 19.3038 6.30682 18.3246 5.432 17.0679L3 19.4999V13.4999H9L6.876 15.6239ZM17.125 9.37494C16.5337 8.40611 15.6799 7.62472 14.6626 7.1214C13.6452 6.61807 12.5061 6.41342 11.3772 6.53118C10.2483 6.64894 9.17589 7.08428 8.28434 7.78672C7.3928 8.48916 6.71863 9.42993 6.34 10.4999H4.25C4.63336 9.01705 5.4341 7.67526 6.55719 6.63381C7.68028 5.59237 9.07858 4.89498 10.5861 4.62442C12.0937 4.35386 13.6472 4.52148 15.0624 5.10739C16.4775 5.6933 17.6949 6.6729 18.57 7.92994L21 5.49994V11.4999H15L17.125 9.37494Z" />
                                </svg>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default MessageFromBotMobile;