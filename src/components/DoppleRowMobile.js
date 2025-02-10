import { useContext, useMemo, useState } from "react";
import { getLastMsgDate } from "../utilities/format";
import { useSelector } from "react-redux";
import { RefContext } from "../contexts/RefContextProvider";
import { Swiper, SwiperSlide } from 'swiper/react';

const DoppleRowMobile = ({ x, setDoppleIndex, loadedMsgs, setLoadedMsgs, sending }) => {
    const dopples = useSelector(store => store.ChatReducer.dopples)
    const { setOpenPinConfirmModal, setPinConfirmContent, setOpenDuplicateConfirmModal, setDuplicateConfirmContent, setOpenArchiveConfirmModal, setArchiveConfirmContent, setOpenDeleteConfirmModal, setDeleteConfirmContent, setOpenClearConfirmModal, setClearConfirmContent, dopple, setDopple, themeID, dopplesInfo, setDoppleName, setVoiceCaptionConfirmContent, setOpenVoiceCaptionsModal } = useContext(RefContext)
    const [swiper, setSwiper] = useState(null);
    const [enableTransition, setEnableTransition] = useState(null);

    const selectDopple = () => {
        if (x.chat_id !== dopple?.chat_id && loadedMsgs && !sending) {
            // if (cookies?.voiceCaption !== "on" && cookies?.voiceCaption !== "off") {
            //     setOpenVoiceCaptionsModal(true)
            //     setVoiceCaptionConfirmContent(x)
            // } else {
            setDopple(x)
            setDoppleName()
            setLoadedMsgs(false)
            // }
        }
    }

    const pinChat = async () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(y => y.chat_id === x.chat_id)) saved = false
        if (dopples.saved_chats.some(y => y.chat_id === x.chat_id)) saved = true
        setOpenPinConfirmModal(true);
        setPinConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(y => y.chat_id === x.chat_id));
        setDoppleIndex(x.chat_id);
        swiper.slideTo(1);
    }

    const duplicateChat = () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(y => y.chat_id === x.chat_id)) saved = false
        if (dopples.saved_chats.some(y => y.chat_id === x.chat_id)) saved = true
        setOpenDuplicateConfirmModal(true);
        setDuplicateConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(y => y.chat_id === x.chat_id));
        setDoppleIndex(x.chat_id);
        swiper.slideTo(1);
    }

    const archiveChat = () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(y => y.chat_id === x.chat_id)) saved = false
        if (dopples.saved_chats.some(y => y.chat_id === x.chat_id)) saved = true
        setOpenArchiveConfirmModal(true);
        setArchiveConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(y => y.chat_id === x.chat_id));
        setDoppleIndex(x.chat_id);
        swiper.slideTo(1);
    }

    const clearChat = () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(y => y.chat_id === x.chat_id)) saved = false
        if (dopples.saved_chats.some(y => y.chat_id === x.chat_id)) saved = true
        setOpenClearConfirmModal(true);
        setClearConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(y => y.chat_id === x.chat_id));
        setDoppleIndex(x.chat_id);
        swiper.slideTo(1);
    }

    const deleteChat = () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(y => y.chat_id === x.chat_id)) saved = false
        if (dopples.saved_chats.some(y => y.chat_id === x.chat_id)) saved = true
        setOpenDeleteConfirmModal(true);
        setDeleteConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(y => y.chat_id === x.chat_id));
        setDoppleIndex(x.chat_id);
        swiper.slideTo(1);
    }

    useMemo(() => {
        setTimeout(() => setEnableTransition(true), 1)
    }, [])

    if (!x) {
        return;
    }

    const _info = dopplesInfo.find(y => y.sender === x.dopple_name)

    return (
        <div className={"flex" + (enableTransition ? " fast-transition" : " zero-transition")}>
            <Swiper
                onSwiper={setSwiper}
                slidesPerView={'auto'}
                spaceBetween={0}
                initialSlide={1}
                className="dopple-row-mobile"
            >
                <SwiperSlide className="flex ranking-table w-auto h-auto">
                    {!dopples.saved_chats.some(y => y.chat_id === x.chat_id) &&
                        <>
                            <button className={"flex flex-col justify-center items-center space-y-[5px] text-[14px] leading-[17px] min-w-[65px]" + (themeID === 0 ? " bg-subtext" : themeID === 1 ? " bg-subtext" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxysubtext" : "")} onClick={clearChat}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0124 2.3269H15.7485L15.7485 8.82025L21.8767 8.82041V13.9101L23.3616 23.4375H1.63867L3.12358 13.9101V8.8204L10.0124 8.82024L10.0124 2.3269ZM4.6828 14.8152L3.60079 21.7575H8.68722V18.6265H10.3672V21.7575H15.2226V18.6265H16.9026V21.7575H21.3995L20.3175 14.8152H4.6828ZM20.1967 13.1352V10.5004L14.0685 10.5002L14.0685 4.0069H11.6924L11.6924 10.5002L4.80358 10.5004V13.1352H20.1967Z" />
                                </svg>
                                <span>Clear</span>
                            </button>
                            <button className={"flex flex-col justify-center items-center space-y-[5px] text-[14px] leading-[17px] min-w-[65px]" + (x?.pinned ? " bg-[#E88B1E]" : " bg-[#2EB735]")} onClick={pinChat}>
                                {x?.pinned ?
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9297 19.5882L16.6469 23.1322L18.1588 22.3997L8.00271 1.43921L6.49084 2.17176L9.0864 7.52859L8.16777 7.54189L5.52557 10.1841L9.768 14.4265L4.51709 19.6774L5.70503 20.8654L10.9559 15.6145L14.9297 19.5882ZM12.6964 14.9791L9.89483 9.19705L8.8737 9.21185L7.90145 10.1841L12.6964 14.9791Z" />
                                            <path d="M17.8406 17.2147L17.7094 17.3459L16.2035 14.238L16.2057 14.0842L21.1544 9.13553L16.2469 4.22807L12.9505 7.52446L12.1751 5.92404L16.2469 1.85219L23.5303 9.13553L17.8757 14.7901L17.8406 17.2147Z" />
                                        </svg>
                                        <span>Unpin</span>
                                    </>
                                    :
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0946 0.295804L19.378 7.57914L13.7234 13.2337L13.6883 15.6583L11.0461 18.3005L6.80364 14.0581L1.55273 19.309L0.364789 18.121L5.6157 12.8701L1.37327 8.62771L4.01547 5.9855L6.44005 5.95038L12.0946 0.295804ZM12.0946 2.67168L7.14598 7.62034L4.7214 7.65546L3.74915 8.62771L11.0461 15.9246L12.0183 14.9524L12.0534 12.5278L17.0021 7.57914L12.0946 2.67168Z" />
                                        </svg>
                                        <span>Pin</span>
                                    </>
                                }
                            </button>
                        </>
                    }
                </SwiperSlide>
                <SwiperSlide className="ranking-table">
                    <button className={"flex justify-between items-center px-5 h-[75px] space-x-2 group flex-1 min-w-[100vw]" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#E7F2FF]" : themeID === 2 ? " bg-white hover:bg-candybuttonmenu" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={selectDopple}>
                        <div className="flex space-x-[10px] items-center flex-1 w-[0px]">
                            <img className="w-[50px] h-[50px] rounded-[10px]" src={_info?.avatarURL + "?tr=w-500,h-500"} alt="" />
                            <div className="flex flex-col items-start space-y-[8.61px] flex-1 w-[0px]">
                                <div className={"flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] w-full" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle group-hover:text-white" : themeID === 3 ? " text-galaxytitle" : "")}>
                                    <span className="truncate">{_info?.name}</span>
                                    <svg className={"min-w-[15px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? (x.chat_id === dopple?.chat_id ? " text-white" : " text-blue2 group-hover:text-white") : themeID === 3 ? " text-blue2 group-hover:text-white" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                                    </svg>
                                </div>
                                <div className={"flex items-center space-x-[5px] text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext group-hover:text-white" : themeID === 3 ? " text-galaxysubtext group-hover:text-white" : "")}>
                                    <span className="truncate flex-1 text-left">{x?.last_message?.message?.data?.content ?? "\u00a0"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-[10.55px]">
                            <span className={"text-[12px] leading-[14px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext group-hover:text-white" : themeID === 3 ? " text-galaxysubtext group-hover:text-white" : "")}>{x?.last_message?.timestamp && getLastMsgDate(x?.last_message?.timestamp * 1000)}</span>
                            {x?.pinned ?
                                <svg className="text-subtext" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M12.9956 0.995608L18.4287 6.42866L13.9056 10.9517L13.8763 12.9722L12.1218 14.7268L4.69749 7.30251L6.45203 5.54797L8.47252 5.5187L12.9956 0.995608Z" />
                                    <path d="M7.07131 11.292L3.37028 14.993L4.43094 16.0537L8.13197 12.3526L7.07131 11.292Z" />
                                </svg>
                                :
                                <span>&nbsp;</span>
                            }
                        </div>
                    </button>
                </SwiperSlide>
                <SwiperSlide className="flex ranking-table w-auto h-auto">
                    {!dopples.saved_chats.some(y => y.chat_id === x.chat_id) &&
                        <button className={"flex flex-col justify-center items-center space-y-[5px] bg-[#2EB735] text-[14px] leading-[17px] min-w-[118px]"} onClick={archiveChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor">
                                <path d="M14.8161 13.1912L12.8395 15.1679L12.8394 10.2042L11.1594 10.2042L11.1595 15.1678L9.1829 13.1912L7.99496 14.3791L11.9995 18.3837L16.0041 14.3791L14.8161 13.1912Z" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.22005 3.10278L1.85303 7.21485V22.2253H22.1477V7.21485L18.7807 3.10278H5.22005ZM4.4665 6.67488L6.01577 4.78278H17.985L19.5343 6.67488H4.4665ZM3.53303 8.35488H20.4677V20.5453H3.53303V8.35488Z" />
                            </svg>
                            <span>Save & Restart</span>
                        </button>
                    }
                    {!dopples.saved_chats.some(y => y.chat_id === x.chat_id) &&
                        <button className="flex flex-col justify-center items-center space-y-[5px] bg-blue2 text-[14px] leading-[17px] min-w-[80px]" onClick={duplicateChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.95225 2.37671V6.71294H2.77686V22.9514H17.0479V18.6151H21.2233V7.97604L16.2755 2.37671H6.95225ZM15.3679 18.6151H6.95225V8.39294H4.45686V21.2714H15.3679V18.6151ZM8.63225 16.9351V4.05671H15.5181L19.5433 8.61195V16.9351H8.63225Z" />
                            </svg>
                            <span>Duplicate</span>
                        </button>
                    }
                    {dopples.saved_chats.some(y => y.chat_id === x.chat_id) &&
                        <button className={"flex flex-col justify-center items-center space-y-[5px] text-[14px] leading-[17px] min-w-[65px]" + (x?.pinned ? " bg-[#E88B1E]" : " bg-[#2EB735]")} onClick={pinChat}>
                            {x?.pinned ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.9297 19.5882L16.6469 23.1322L18.1588 22.3997L8.00271 1.43921L6.49084 2.17176L9.0864 7.52859L8.16777 7.54189L5.52557 10.1841L9.768 14.4265L4.51709 19.6774L5.70503 20.8654L10.9559 15.6145L14.9297 19.5882ZM12.6964 14.9791L9.89483 9.19705L8.8737 9.21185L7.90145 10.1841L12.6964 14.9791Z" />
                                        <path d="M17.8406 17.2147L17.7094 17.3459L16.2035 14.238L16.2057 14.0842L21.1544 9.13553L16.2469 4.22807L12.9505 7.52446L12.1751 5.92404L16.2469 1.85219L23.5303 9.13553L17.8757 14.7901L17.8406 17.2147Z" />
                                    </svg>
                                    <span>Unpin</span>
                                </>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0946 0.295804L19.378 7.57914L13.7234 13.2337L13.6883 15.6583L11.0461 18.3005L6.80364 14.0581L1.55273 19.309L0.364789 18.121L5.6157 12.8701L1.37327 8.62771L4.01547 5.9855L6.44005 5.95038L12.0946 0.295804ZM12.0946 2.67168L7.14598 7.62034L4.7214 7.65546L3.74915 8.62771L11.0461 15.9246L12.0183 14.9524L12.0534 12.5278L17.0021 7.57914L12.0946 2.67168Z" />
                                    </svg>
                                    <span>Pin</span>
                                </>
                            }
                        </button>
                    }
                    <button className="flex flex-col justify-center items-center space-y-[5px] bg-[#E93131] text-[14px] leading-[17px] min-w-[70px]" onClick={deleteChat}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.18652 6.69345V5.01345H8.65844V1.75244H15.3401V5.01345H21.812V6.69345H2.18652ZM13.6601 5.01345V3.43244H10.3384V5.01345H13.6601Z" />
                            <path d="M9.09203 17.9249V14.2614H10.772V17.9249H9.09203Z" />
                            <path d="M13.2264 14.2614V17.9249H14.9064V14.2614H13.2264Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.58969 8.61052H19.4098V23.5758H4.58969V8.61052ZM6.26969 10.2905V21.8958H17.7298V10.2905H6.26969Z" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default DoppleRowMobile;