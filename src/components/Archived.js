import { useContext } from "react";
import { RefContext } from "../contexts/RefContextProvider";

const Archived = ({ themeID, dopples, setOpenArchivedChats, setOpenContextMenu }) => {
    const { dopplesInfo } = useContext(RefContext);
    const names = dopples.map(x => dopplesInfo.find(y => y.sender === x.dopple_name)?.name)

    const see = () => {
        setOpenArchivedChats(true)
        setOpenContextMenu(false)
    }

    return (
        <button className={"flex justify-between items-center px-5 py-[15px] space-x-2 w-full group fast-transition" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#EDEDF0]" : themeID === 2 ? " hover:bg-candybuttonmenu" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={see}>
            <div className="flex space-x-[10px] items-center flex-1 w-[0px]">
                <div className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px]" + (themeID === 0 ? " bg-subtext" : themeID === 1 ? " bg-subtext" : themeID === 2 ? " bg-subtext" : themeID === 3 ? " bg-galaxysubtext" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.52372 3.25342H23.4746L27.6833 8.3935V27.1566H2.31494V8.3935L6.52372 3.25342ZM7.51837 5.35342L5.58178 7.71854H24.4165L22.4799 5.35342H7.51837Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.0113 14.3993C13.1614 13.5647 13.8966 12.9311 14.7808 12.9311C17.3943 12.9311 19.5248 15.0756 19.5248 17.6821C19.5248 20.3368 17.3549 22.5211 14.6928 22.5211H10.9946C10.3118 22.5211 9.66547 22.2124 9.23633 21.6812C9.23633 22.8239 10.1626 23.7501 11.3052 23.7501H14.6928C18.0519 23.7501 20.7633 21.0026 20.7633 17.6821C20.7633 14.4099 18.0913 11.7021 14.7808 11.7021C13.104 11.7021 11.7447 13.051 11.7447 14.715V19.8783H11.0289C10.7229 19.8783 10.4748 19.6321 10.4748 19.3285V14.4385V14.3865C10.4748 13.331 11.0217 12.3508 11.92 11.7966H11.8782C10.4192 11.7966 9.23633 12.9794 9.23633 14.4385V19.3285C9.23633 20.3109 10.0389 21.1072 11.0289 21.1072H14.9257C16.7923 21.1072 18.3056 19.6056 18.3056 17.7533C18.3056 15.9009 16.7923 14.3993 14.9257 14.3993H13.0113ZM14.9006 19.8512H12.9581V15.6012H14.9006C16.0833 15.6012 17.042 16.5526 17.042 17.7262C17.042 18.8998 16.0833 19.8512 14.9006 19.8512Z" fill="#848D97" />
                    </svg>
                </div>
                <div className="flex flex-col items-start space-y-[8.61px] flex-1 w-[0px]">
                    <div className={"flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] w-full" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle group-hover:text-white" : themeID === 3 ? " text-galaxytitle group-hover:text-white" : "")}>
                        <span className="truncate">Saved Chats</span>
                    </div>
                    <div className={"flex items-center space-x-[5px] text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext group-hover:text-white" : themeID === 3 ? " text-galaxysubtext" : "")}>
                        <span className="truncate flex-1 text-left">{names.join(", ")}</span>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Archived;