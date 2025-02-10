import { Fragment, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RefContext } from "../contexts/RefContextProvider";
import { ClickAwayListener, Fade, Skeleton, useMediaQuery } from "@mui/material";
import { setDetails } from "../redux/reducers/ModalReducer";
import { useCookies } from "react-cookie";
import { languages, limit } from "../config";
import { threadDate } from "../utilities/format";
import { setDopples, setToggleTextStream } from "../redux/reducers/ChatReducer";
import { shuffle, update } from "lodash";
import axios from "../utilities/axiosConfig";
import HtmlTooltip from "../components/HtmlTooltip";
import MessageFooter from "../layouts/MessageFooter";
import Typing from "../components/Typing";
import MessageLoader from "../components/MessageLoader";
import DoppleRowMobile from "../components/DoppleRowMobile";
import DoppleRowDesktop from "../components/DoppleRowDesktop";
import MessageFromBotMobile from "../components/MessageFromBotMobile";
import MessageFromYouMobile from "../components/MessageFromYouMobile";
import AsteriskText from "../components/AsteriskText";
import AudioPlayer from "../components/AudioPlayer";
import Archived from "../components/Archived";
import PinConfirmModal from "../components/PinConfirmModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ArchiveConfirmModal from "../components/ArchiveConfirmModal";
import DuplicateConfirmModal from "../components/DuplicateConfirmModal";
import ClearConfirmModal from "../components/ClearConfirmModal";
import VoiceCaptionsModal from "../components/VoiceCaptionsModal";
import LLMActivateModal from "../components/LLMActivateModal";
import DeleteThreadConfirmModal from "../components/DeleteThreadConfirmModal";

const Messages = ({ streamText }) => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["userid", "profile", "themeid", "voiceCaption", "textStream"])
    const profile = useSelector(store => store.AuthReducer.profile);
    const toggleTextStream = false;
    const dopples = useSelector(store => store.ChatReducer.dopples);
    const matches = useMediaQuery('(min-width:1024px)');
    const { joinedWaitlist, setOpenChatSettingsModal, doppleName, setDoppleName, voiceCaptionConfirmContent, setOpenDopplePlusModal,
        setOpenDeleteThreadConfirmModal, setDeleteThreadConfirmContent,
        setOpenPinConfirmModal, setPinConfirmContent,
        setOpenClearConfirmModal, setClearConfirmContent,
        setOpenDuplicateConfirmModal, setDuplicateConfirmContent,
        setOpenArchiveConfirmModal, setArchiveConfirmContent,
        setOpenDeleteConfirmModal, setDeleteConfirmContent, setOpenSignModal,
        setIsTyping, themeID, setThemeID, language, setLanguage, dopple, setDopple, openChatSettings, setOpenChatSettings, alignment, setAlignment, textSize, setTextSize, history, setHistory, dopplesInfo, setDopplesInfo,
        sending, setSending, hasAccessToLLM, loadedMsgs, setLoadedMsgs, loadedDopples, setLoadedDopples
    } = useContext(RefContext);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [isLanguageShown, setIsLanguageShown] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const [editing, setEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [editedIndexes, setEditedIndexes] = useState([]);
    const [msg, setMsg] = useState("");
    const [msgLimit, setMsgLimit] = useState(limit);
    const [, setAddingHistoryNow] = useState(false);
    const [filteredDopples, setFilteredDopples] = useState([]);
    const [languageUnsaved, setLanguageUnsaved] = useState(language);
    const [openContextMenu, setOpenContextMenu] = useState(false);
    const [doppleIndex, setDoppleIndex] = useState(0);
    const [openArchivedChats, setOpenArchivedChats] = useState(false);
    const [openMobileEncryptedTooltip, setOpenMobileEncryptedTooltip] = useState(false);
    const messageContainer = useRef();
    const sendRef = useRef();
    const typeRef = useRef();
    const msgRef = useRef();
    const inputRef = useRef();
    const contextMenuRef = useRef()

    const [openAvatarDetailMobile, setOpenAvatarDetailMobile] = useState(false);
    const [showMoreThemes, setShowMoreThemes] = useState(false);

    const _info = dopplesInfo.find(y => y.sender === dopple?.dopple_name)

    const reloadChats = async () => {
        const { data: { data } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
        dispatch(setDopples({ arr: data }))
        return data
    }

    const pinChat = async () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        setOpenPinConfirmModal(true)
        setPinConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex))
    }

    const pinConfirm = async () => {
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        const _dopple = (saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex)

        await axios.post("/chat/" + _dopple.chat_id + "/pin", { username: profile?.email || cookies?.userid, dopple_name: _dopple.dopple_name, folder: saved ? 'saved_chats' : '' })
        reloadChats()
    }

    const archiveChat = () => {
        if (sending) return
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        setOpenArchiveConfirmModal(true)
        setArchiveConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex))
    }

    const archiveConfirm = async () => {
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        const _dopple = (saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex)
        const { data } = await axios.post("/chat/" + doppleIndex + "/save", { username: profile?.email || cookies?.userid, dopple_name: _dopple.dopple_name })
        const db = await reloadChats()
        setDopple((saved ? db.saved_chats : db.active_chats).find(x => x.chat_id === data.data.chat_id))
    }

    const duplicateChat = () => {
        if (sending) return
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        setOpenDuplicateConfirmModal(true)
        setDuplicateConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex))
    }

    const duplicateConfirm = async () => {
        if (sending) return
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        const _dopple = (saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex)

        await axios.post("/chat/" + doppleIndex + "/duplicate", { username: profile?.email || cookies?.userid, dopple_name: _dopple.dopple_name, chat_id: doppleIndex, folder: saved ? 'saved_chats' : '' })
        await reloadChats()
    }

    const clearChat = () => {
        if (sending) return
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        setOpenClearConfirmModal(true)
        setClearConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex))
    }

    const clearConfirm = async () => {
        let _id
        if (dopple) _id = dopple?.chat_id
        if (sending) return
        const _dopple = dopples.active_chats.find(x => x.chat_id === doppleIndex) ?? dopples.saved_chats.find(x => x.chat_id === doppleIndex)
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        await axios.delete("/chat/" + doppleIndex + "/clear_history", { data: { username: profile?.email || cookies?.userid, dopple_name: _dopple.dopple_name, folder: saved ? 'saved_chats' : '' } })
        await reloadChats()
        if (doppleIndex === _id) {
            setHistory([])
        }
    }

    const deleteChat = () => {
        if (sending) return;
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        setOpenDeleteConfirmModal(true)
        setDeleteConfirmContent((saved ? dopples.saved_chats : dopples.active_chats).find(x => x.chat_id === doppleIndex))
    }

    const deleteConfirm = async () => {
        let _id = dopple?.chat_id
        const _dopple = dopples.active_chats.find(x => x.chat_id === doppleIndex) ?? dopples.saved_chats.find(x => x.chat_id === doppleIndex)
        let saved
        if (dopples.active_chats.some(x => x.chat_id === doppleIndex)) saved = false
        if (dopples.saved_chats.some(x => x.chat_id === doppleIndex)) saved = true
        await axios.delete("/chat/" + doppleIndex, { data: { username: profile?.email || cookies?.userid, dopple_name: _dopple.dopple_name, folder: saved ? 'saved_chats' : '' } })
        await reloadChats()
        if (doppleIndex === _id) {
            setHistory([])
            if (dopples.active_chats.length + dopples.saved_chats.length > 0) {
                if (dopples.active_chats.length + dopples.saved_chats.length === 1) setDopple()
                else setDopple(saved ? dopples.saved_chats[0] : dopples.active_chats[0])
            }
            else
                setDopple()
        }
    }

    const voiceConfirm = async () => {
        setDopple(voiceCaptionConfirmContent)
        setDoppleName()
        setLoadedMsgs(false)
        setMsgLimit(limit)
    }

    const setTheme = (i) => {
        if (profile) {
            setThemeID(i)
            setCookies("themeid", i)
        }
        else login()
    }

    const setNewAlignment = (i) => {
        if (profile) setAlignment(i)
        else login()
    }

    const _setIsLanguageShown = () => {
        if (profile) setIsLanguageShown(true)
        else login()
    }

    const login = () => {
        setOpenSignModal(true)
        dispatch(setDetails({ openLoginOrSignup: true }))
    }

    const apply = () => {
        setIsLanguageShown(false)
        setLanguage(languageUnsaved)
    }

    const openProfile = (data) => {
        if (_info._id) {
            document.body.scrollTop = 0;
            nav("/profile/" + _info._id)
        }
    }

    const toggleStream = () => {
        if (sending === true) {
            alert("Cannot toggle streaming while answering")
            return
        }
        dispatch(setToggleTextStream())
    }

    const scrollByY = async (y, time) => {
        const start = performance.now()
        const startY = messageContainer?.current.offsetTop
        const endY = startY + y
        while (performance.now() < start + time && document.getElementById("message-container")) {
            const progress = (performance.now() - start) / time
            document.getElementById("message-container")?.scrollTo(0, startY + y * progress)
            // wait for the next frame
            await new Promise(requestAnimationFrame)
        }
        document.getElementById("message-container")?.scrollTo(0, endY)
    }

    const pinnedChats = (id) => {
        let saved
        if (dopples?.active_chats.some(x => x.chat_id === id)) saved = false
        if (dopples?.saved_chats.some(x => x.chat_id === id)) saved = true
        return saved ? dopples?.saved_chats : dopples?.active_chats
    }

    const fillLastMessage = async (content, type) => {
        let tmpDopples = { ...dopples }
        let greeting
        try {
            const { data: { data: { chat_id } } } = await axios.post(`chat/new_chat_id`, {
                username: profile?.email ?? cookies?.userid,
                dopple_name: _info.sender,
            })

            if (!chat_id) {
                if (dopple) {
                    if (dopples.saved_chats.some(x => x?.chat_id === dopple.chat_id)) {
                        let tmp1 = [...tmpDopples.saved_chats]
                        let tmp2 = { ...tmp1[tmp1.findIndex(x => x.chat_id === dopple.chat_id)] }
                        let tmp3 = { ...tmp2.last_message }
                        let tmp4 = { ...tmp3.message }
                        let tmp5 = { ...tmp4.data }
                        tmp5.content = content
                        tmp4.data = tmp5
                        tmp4.type = type
                        tmp3.message = tmp4
                        tmp2.last_message = tmp3
                        tmp1[tmp1.findIndex(x => x.chat_id === dopple.chat_id)] = tmp2
                        tmpDopples.saved_chats = tmp1
                    }
                    else {
                        let tmp1 = [...tmpDopples.active_chats]
                        let tmp2 = { ...tmp1[tmp1.findIndex(x => x.chat_id === dopple.chat_id)] }
                        let tmp3 = { ...tmp2.last_message }
                        let tmp4 = { ...tmp3.message }
                        let tmp5 = { ...tmp4.data }
                        tmp5.content = content
                        tmp4.data = tmp5
                        tmp4.type = type
                        tmp3.message = tmp4
                        tmp2.last_message = tmp3
                        tmp1[tmp1.findIndex(x => x.chat_id === dopple.chat_id)] = tmp2
                        tmpDopples.active_chats = tmp1
                    }
                    dispatch(setDopples({ arr: tmpDopples }))
                }
            } else {
                if (type === "human") {
                    const { data: { data: { paginated_chat_history } } } = await axios.get("/chat/" + chat_id, { params: { username: profile?.email || cookies?.userid, dopple_name: _info.sender, folder: '', skip: 0, limit: 10000 } })
                    greeting = paginated_chat_history[0]

                    let tmp1 = [...tmpDopples.active_chats]
                    if (tmp1.some(x => x.dopple_name === _info.sender)) {
                        tmp1[tmp1.findIndex(x => x.dopple_name === _info.sender)] = {
                            chat_id: chat_id,
                            dopple_displayname: _info.name,
                            dopple_name: _info.sender,
                            last_message: {
                                message: {
                                    data: {
                                        additional_kwargs: {},
                                        content: content,
                                        example: false,
                                        url: ""
                                    },
                                    type: "human"
                                },
                                timestamp: new Date() / 1000 + 6,
                            },
                            last_updated: new Date() / 1000 + 6,
                            pinned: false,
                        }
                    }
                    else {
                        tmp1.splice(tmp1.filter(x => x.pinned === true).length, 0, {
                            chat_id: chat_id,
                            dopple_displayname: _info.name,
                            dopple_name: _info.sender,
                            last_message: {
                                message: {
                                    data: {
                                        additional_kwargs: {},
                                        content: content,
                                        example: false,
                                        url: ""
                                    },
                                    type: "human"
                                },
                                timestamp: new Date() / 1000 + 6,
                            },
                            last_updated: new Date() / 1000 + 6,
                            pinned: false,
                        })
                    }
                    tmpDopples.active_chats = tmp1
                    dispatch(setDopples({ arr: tmpDopples }))
                }
            }
            return { greeting, chat_id }
        } catch (e) {
            console.log(e)
        }
    }

    const edit = async () => {
        setSending(true)
        if (dopple) {
            setEditing(true)
            let tmp = [...history]
            let _history = tmp.map((x, i) => i === editIndex ?
                {
                    ...x,
                    message: {
                        ...x.message,
                        data: {
                            ...x.message.data,
                            content: msg
                        }
                    }
                }
                : x)
            let lastContent = { ..._history[_history.length - 1] }
            _history.pop()

            setHistory(_history)
            setMsg("")
            setEditIndex(-1)
            setEditing(false)

            let tmp1 = [...editedIndexes]
            tmp1.push(editIndex)
            setEditedIndexes(tmp1)

            try {
                const { data: { data: { new_ai_response } } } = await axios.put("/chat/" + dopple.chat_id, {
                    username: profile?.email || cookies?.userid,
                    dopple_name: dopple.dopple_name,
                    user_query: msg,
                    folder: dopples.saved_chats.some(y => y.chat_id === dopple.chat_id) ? "saved_chats" : ""
                })
                let tmp1 = [..._history]
                lastContent.message.data.content = new_ai_response
                tmp1.push(lastContent)
                setHistory(tmp1)
                await reloadChats()
            } catch (e) {
                console.log(e)
            }
        }
        setSending(false)
    }

    const send = async () => {
        if (!_info) return;
        if (sending) return;

        let userid = Math.random().toString(36).slice(2);
        if (!cookies?.userid) setCookies("userid", userid)
        else userid = cookies?.userid

        if (!profile && userid && (!dopple && dopples.active_chats.length + dopples.saved_chats.length >= 1)) {
            setOpenSignModal(true)
            dispatch(setDetails({ openLoginOrSignup: false }))
            return
        }

        if (msg.length > 500) {
            return alert("Message can not exceed 500 characters");
        }

        setSending(true);
        setMsg("");
        try {
            let saved
            if (dopple) {
                if (dopples.active_chats.some(x => x.chat_id === dopple.chat_id)) saved = false
                if (dopples.saved_chats.some(x => x.chat_id === dopple.chat_id)) {
                    saved = true
                    setOpenArchivedChats(false)
                }
            }

            let tmpChats1 = [...history]
            tmpChats1.push({
                message: {
                    data: {
                        url: "",
                        additional_kwargs: {},
                        content: msg,
                        example: false
                    },
                    type: "human"
                },
                timestamp: new Date() / 1000 + 6,
                new: true
            })
            setHistory(tmpChats1)

            if (history.length <= 3 && inputRef?.current) {
                inputRef.current.blur();
                window.scrollTo(0, -10000);
            }

            const { greeting, chat_id: new_chat_id } = await fillLastMessage(msg, "human")
            if (greeting) tmpChats1.unshift(greeting)
            let params = {
                username: profile?.email ?? cookies?.userid,
                dopple_name: doppleName || dopple.dopple_name,
                user_query: msg,
                folder: dopple?.chat_id ? (saved ? "saved_chats" : "") : "",
                chat_id: new_chat_id ? new_chat_id : dopple.chat_id
            }
            // console.log("params", params)
            const { data: { data: { response } } } = await axios.post("/chat/messages", params)

            let tmpChats2 = [...tmpChats1]
            tmpChats2.push({
                message: {
                    data: {
                        url: "",
                        additional_kwargs: {},
                        content: response,
                        example: false
                    },
                    type: "ai"
                },
                timestamp: new Date() / 1000 + 6,
                new: true
            })
            setHistory(tmpChats2)
            if (history.length <= 3 && inputRef?.current) {
                inputRef.current.blur();
                window.scrollTo(0, -10000);
            }
            reloadChats()
            // await fillLastMessage(response, "ai")

            if (tmpChats2.length === 2) {
                window.fbq("track", "InitiateChat")
                window.ttq.track("Contact")
                window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/CohrCI2Urc8YEJ2mi4oq' });
                window.snaptr("track", "COMPLETE_TUTORIAL")
            }
            if (tmpChats2.length === 100) {
                window.fbq("track", "ProUser")
                window.ttq.track("Subscribe")
                window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/N5hFCJCUrc8YEJ2mi4oq' });
                window.snaptr("track", "SUBSCRIBE")
            }
            if (tmpChats2.length === 200) {
                window.fbq("track", "PowerUser")
                window.ttq.track("AddPaymentInfo")
                window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/eYwgCJOUrc8YEJ2mi4oq' });
                window.snaptr("track", "ADD_BILLING")
            }
        } catch (e) {
            console.log(e)
        }
        setSending(false);
    }

    const sendStreamText = async () => {
        send();
    }

    const keyDown = async (e) => {
        if (e.key === 'Enter' && e.target.value.length > 0 && !sending && _info) {
            sendRef?.current.click()
        }
    }

    const reroll = async () => {
        if (sending) return

        setAddingHistoryNow(false)
        setSending(true)
        if (inputRef.current) inputRef.current.focus()
        let chats = [...history]
        let chatsFromHuman = history.filter(x => x.message.type === "human")
        let lastContent = chatsFromHuman[chatsFromHuman.length - 1].message.data.content
        chats.pop()
        setHistory(chats)
        try {
            let saved
            if (dopples.active_chats.some(x => x.chat_id === dopple.chat_id)) saved = false
            if (dopples.saved_chats.some(x => x.chat_id === dopple.chat_id)) saved = true

            const { data: { data: { new_ai_response } } } = await axios.put("/chat/" + dopple.chat_id + "/reroll", {
                username: profile?.email ?? cookies?.userid,
                dopple_name: dopple.dopple_name,
                user_query: lastContent,
                folder: saved ? "saved_chats" : ""
            })

            let chats1 = [...chats]
            let updatedChat = {
                message: {
                    data: {
                        additional_kwargs: {},
                        content: new_ai_response,
                        url: "",
                        example: false
                    },
                    type: "ai"
                },
                timestamp: new Date() / 1000 + 6,
                new: true
            }
            chats1.push(updatedChat)
            setHistory(chats1)
            fillLastMessage(new_ai_response, "ai")
        } catch (e) {
            console.log(e)
        }
        setSending(false)
    }

    const openDeleteMsgModal = async () => {
        setOpenDeleteThreadConfirmModal(true)
        setDeleteThreadConfirmContent(dopple)
    }

    const deleteThreadConfirm = async () => {
        try {
            let saved
            if (dopples.active_chats.some(x => x.chat_id === dopple.chat_id)) saved = false
            if (dopples.saved_chats.some(x => x.chat_id === dopple.chat_id)) saved = true

            await axios.put("/chat/" + dopple.chat_id + "/deleteLastUserMsg", {
                username: profile?.email ?? cookies?.userid,
                dopple_name: dopple.dopple_name,
                folder: saved ? "saved_chats" : ""
            })
            await reloadChats()

            let chats = [...history]
            chats.pop()
            chats.pop()
            setHistory(chats)
        } catch (e) {
            console.log(e)
        }
    }

    const handleScroll = async (e) => {
        // if (e.target.scrollTop > 0) return
        // if (history?.length === 0) return
        // setMsgLimit(x => x += limit)
        // setAddingHistoryNow(true)
    }

    useMemo(async () => {
        if (profile?.email || cookies?.userid) {
            const { data: { data } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
            dispatch(setDopples({ arr: data }))
            setLoadedDopples(true)
        } else setLoadedDopples(true)
    }, [cookies?.userid, profile?.email])

    useMemo(() => {
        if (profile?.email) setDopple()
    }, [profile?.email])

    useEffect(() => {
        if (openArchivedChats === true && dopples.saved_chats.length === 0) setOpenArchivedChats(false)
    }, [openArchivedChats, dopples])

    useMemo(async () => {
        setFilteredDopples(dopples?.active_chats?.filter(x => x.dopple_name.toLowerCase().includes(searchTxt.toLowerCase())))
    }, [searchTxt, dopples])

    useMemo(async () => {
        const { data: { data } } = await axios.get("/dopple")
        setDopplesInfo(shuffle(data))
    }, [])

    useEffect(() => {
        if (/iPhone|iPad|iPod/.test(window.navigator.userAgent) && history.length <= 3) return
        else {
            if (messageContainer?.current && !openChatSettings) messageContainer?.current.scrollIntoView({ behavior: "instant" })
        }
    }, [history.length, messageContainer?.current, openChatSettings])

    useMemo(async () => {
        if (dopple !== undefined) {
            let saved
            if (dopples.active_chats.some(x => x.chat_id === dopple.chat_id)) saved = false
            if (dopples.saved_chats.some(x => x.chat_id === dopple.chat_id)) saved = true
            const { data: { data: { paginated_chat_history } } } = await axios.get("/chat/" + dopple.chat_id, { params: { username: profile?.email || cookies?.userid, dopple_name: dopple.dopple_name, folder: saved ? 'saved_chats' : '', skip: 0, limit: 10000 } })
            setHistory(paginated_chat_history.reverse())
            setLoadedDopples(true)
            setLoadedMsgs(true)
            setSending(false)

            if (document.getElementById("message-container") && !openChatSettings) {
                document.getElementById("message-container").scrollTop = document.getElementById("message-container")?.scrollHeight
            }
        }
    }, [dopple])

    useMemo(() => {
        if (editIndex >= 0)
            setMsg(history[editIndex]?.message?.data?.content)
    }, [editIndex])

    useEffect(() => {
        if (document.getElementById("message-container") && sending) {
            scrollByY(messageContainer?.current.offsetTop, 100)
        }
    }, [streamText, dopple, messageContainer?.current, document.getElementById("message-container")])

    return (
        <div className="flex flex-col lg:flex-row overflow-hidden relative h-full messages">
            {!matches ?
                <>
                    <header className={"absolute w-full z-[3] border-b" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav2 border-galaxybutton" : "")}>
                        {!_info ?
                            <div className={"flex items-center px-5 h-[75px]" + (openArchivedChats ? " space-x-5" : " space-x-[10px]")}>
                                {openArchivedChats ?
                                    <>
                                        <svg className={"cursor-pointer" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? "" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" onClick={() => setOpenArchivedChats(false)}>
                                            <path d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9" strokeWidth="2" strokeLinecap="square" />
                                        </svg>
                                        <span className={"text-[18px] leading-[22px] font-bold" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? "" : "")}>Saved Chats</span>
                                    </>
                                    :
                                    <div className={"flex items-center space-x-[10px] h-[45px] px-[10px] flex-1 rounded-[5px] w-0" + (themeID === 0 ? " bg-button hover:bg-black5 text-subtext focus-within:text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DDD] text-subtext focus-within:text-title" : themeID === 2 ? " bg-candybutton text-candysubtext focus-within:text-candytitle" : themeID === 3 ? " bg-galaxybutton text-galaxysubtext focus-within:text-white" : "")}>
                                        <svg className="min-w-[21px]" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
                                            <path d="M20.1714 18.5942L16.3949 14.8287C17.6134 13.2764 18.2745 11.3595 18.2721 9.38603C18.2721 7.62854 17.7509 5.91052 16.7745 4.44922C15.7981 2.98792 14.4103 1.84897 12.7866 1.17641C11.1629 0.50385 9.37617 0.327877 7.65245 0.670746C5.92873 1.01362 4.34539 1.85993 3.10266 3.10266C1.85993 4.34539 1.01362 5.92873 0.670746 7.65245C0.327877 9.37617 0.50385 11.1629 1.17641 12.7866C1.84897 14.4103 2.98792 15.7981 4.44922 16.7745C5.91052 17.7509 7.62854 18.272 9.38603 18.272C11.3595 18.2745 13.2764 17.6134 14.8287 16.3949L18.5942 20.1714C18.6974 20.2755 18.8203 20.3582 18.9556 20.4146C19.091 20.471 19.2362 20.5 19.3828 20.5C19.5294 20.5 19.6746 20.471 19.81 20.4146C19.9453 20.3582 20.0682 20.2755 20.1714 20.1714C20.2755 20.0682 20.3582 19.9453 20.4146 19.81C20.471 19.6746 20.5 19.5294 20.5 19.3828C20.5 19.2362 20.471 19.091 20.4146 18.9556C20.3582 18.8203 20.2755 18.6974 20.1714 18.5942ZM2.72151 9.38603C2.72151 8.06791 3.11238 6.77939 3.84468 5.68342C4.57699 4.58745 5.61785 3.73324 6.83563 3.22882C8.05341 2.72439 9.39342 2.59241 10.6862 2.84957C11.979 3.10672 13.1665 3.74145 14.0986 4.6735C15.0306 5.60555 15.6653 6.79305 15.9225 8.08584C16.1796 9.37863 16.0477 10.7186 15.5432 11.9364C15.0388 13.1542 14.1846 14.1951 13.0886 14.9274C11.9927 15.6597 10.7041 16.0505 9.38603 16.0505C7.61849 16.0505 5.92334 15.3484 4.6735 14.0986C3.42366 12.8487 2.72151 11.1536 2.72151 9.38603Z" />
                                        </svg>
                                        <input className={"text-[14px] leading-[17px] dark:text-black caret-blue2 flex-1 w-0" + (themeID === 0 ? " placeholder-subtext" : themeID === 1 ? " placeholder-subtext" : themeID === 2 ? " placeholder-candysubtext" : themeID === 3 ? " placeholder-galaxysubtext" : "")} placeholder="Search message..." value={searchTxt} onChange={e => setSearchTxt(e.target.value)} disabled={dopples.length === 0} />
                                        {searchTxt?.length > 0 &&
                                            <button className={"ml-2" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-[#9277FF]" : "")} onClick={() => setSearchTxt("")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor">
                                                    <path d="M2 2L17 17M2 17L17 2" strokeWidth="2" strokeLinecap="square" />
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                            :
                            openChatSettings ?
                                <div className={"fixed top-0 left-0 w-full h-[75px] z-[3] border-b" + (themeID === 0 ? " bg-nav border-button text-white" : themeID === 1 ? " bg-white border-candybuttonhighlight text-title" : themeID === 2 ? " bg-candynav border-candybuttonhighlight text-candytitle" : themeID === 3 ? " bg-galaxynav2 border-galaxybutton text-white" : "")}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[18px] leading-[21px]">
                                        Chat Settings
                                    </span>
                                    <button className="flex items-center space-x-[10px] absolute top-1/2 left-[22px] -translate-y-1/2 font-bold text-[14px] leading-[17px]" onClick={() => {
                                        // console.log(messageContainer?.current)
                                        // messageContainer?.current.scrollIntoView({ behavior: "instant" })
                                        setOpenChatSettings(false)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none" stroke="currentColor">
                                            <path d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                :
                                <div className="flex justify-between items-center space-x-5 px-5 h-[75px]" id="topnav">
                                    <div className="flex items-center space-x-5 flex-1">
                                        <svg className={"cursor-pointer" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? "" : "")} xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none" stroke="currentColor" onClick={() => { if (!sending) { setDopple(); setDoppleName(); reloadChats(); setLoadedMsgs(true); } else alert("Please wait for the response to finish before switching Dopples.") }}>
                                            <path d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex space-x-[10px] items-center flex-1">
                                            <ClickAwayListener onClickAway={() => setOpenAvatarDetailMobile(false)}>
                                                <div>
                                                    <HtmlTooltip
                                                        className={"pfp-tooltip"}
                                                        placement="bottom-start"
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        onClose={() => setOpenAvatarDetailMobile(false)}
                                                        open={openAvatarDetailMobile}
                                                        disableFocusListener
                                                        disableHoverListener
                                                        disableTouchListener
                                                        title={
                                                            <Fragment>
                                                                <div className={"flex flex-col items-center space-y-[15px] relative z-[999999] p-5 dopple-tooltip w-[343px] rounded-[10px]" + (themeID === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : themeID === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : themeID === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : themeID === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
                                                                    <img className="w-[100px] h-[100px] rounded-[15px]" src={_info?.avatarURL + "?tr=w-400,h-400"} alt="" />
                                                                    <div className="flex flex-col items-center space-y-[5px]">
                                                                        <div className="flex items-center space-x-[5px]">
                                                                            <span className={"font-bold text-[18px] leading-[21px]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>{_info?.name}</span>
                                                                            <svg className={(themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className={"flex justify-center items-center space-x-[10px] font-bold text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>
                                                                            <span className="truncate leading-[120%]">{_info?.tagLine}</span>
                                                                        </div>
                                                                        <span className={"text-[12px] leading-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>{_info?.bio?.length > 120 ? _info?.bio?.slice(0, 120) + "..." : dopple?.bio}</span>
                                                                    </div>
                                                                    <div className="flex space-x-[10px] w-full">
                                                                        <button className={"flex justify-center items-center space-x-[5px] h-[45px] flex-1 rounded-[5px] font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candybuttonmenu" : themeID === 3 ? " bg-[#313B95]" : "")} onClick={() => openProfile(dopple)}>View Profile</button>
                                                                        <button className="relative flex-1 rounded-[5px] overflow-hidden opacity-0 pointer-events-none">
                                                                            <div className={"absolute top-0 left-0 w-full h-[5px]" + (themeID === 0 ? " bg-[rgba(4,141,255,.50)]" : themeID === 1 ? " bg-[rgba(4,141,255,.50)]" : themeID === 2 ? " bg-[rgba(221,87,175,.5)]" : themeID === 3 ? " bg-[rgba(119,71,220,.5)]" : "")}>
                                                                                <div className={"w-[30%] h-full" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-[#7747DC]" : "")} />
                                                                            </div>
                                                                            <div className={"flex justify-center items-center space-x-[5px] h-[45px] w-full font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " bg-button text-blue2" : themeID === 1 ? " bg-[#EDEDF0] text-subtextlight" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-galaxytitle" : "")}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="currentColor">
                                                                                    <rect x="0.75" width="6" height="15" />
                                                                                    <rect x="9.75" width="6" height="15" />
                                                                                </svg>
                                                                                <span>Stop Playing</span>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Fragment>
                                                        }
                                                    >
                                                        <img className="w-[45px] h-[45px] rounded-[5px]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" onClick={() => setOpenAvatarDetailMobile(true)} />
                                                    </HtmlTooltip>
                                                </div>
                                            </ClickAwayListener>
                                            <div className="flex flex-col items-start space-y-[5px] flex-1 w-0">
                                                <div className="flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] w-full">
                                                    <span className={"truncate leading-[120%]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>{_info.name}</span>
                                                    <svg className={"min-w-[15px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                                                    </svg>
                                                    <ClickAwayListener onClickAway={() => setOpenMobileEncryptedTooltip(false)}>
                                                        <HtmlTooltip
                                                            className={"encrypted-tooltip"}
                                                            placement="bottom-start"
                                                            PopperProps={{ disablePortal: true }}
                                                            onClose={() => setOpenMobileEncryptedTooltip(false)}
                                                            open={openMobileEncryptedTooltip}
                                                            title={
                                                                <Fragment>
                                                                    <div className={"flex flex-col items-start space-y-3 relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (themeID === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : themeID === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : themeID === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : themeID === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
                                                                        <div className={"flex items-center space-x-[5px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="currentColor">
                                                                                <path d="M3.79927 6.81818H9.20154V4.77273C9.20154 4.01989 8.93776 3.37713 8.41019 2.84446C7.88263 2.31179 7.24603 2.04545 6.5004 2.04545C5.75478 2.04545 5.11818 2.31179 4.59062 2.84446C4.06305 3.37713 3.79927 4.01989 3.79927 4.77273V6.81818ZM12.578 7.84091V13.9773C12.578 14.2614 12.4795 14.5028 12.2825 14.7017C12.0856 14.9006 11.8464 15 11.565 15H1.43578C1.15441 15 0.915246 14.9006 0.718288 14.7017C0.52133 14.5028 0.422852 14.2614 0.422852 13.9773V7.84091C0.422852 7.55682 0.52133 7.31534 0.718288 7.11648C0.915246 6.91761 1.15441 6.81818 1.43578 6.81818H1.77342V4.77273C1.77342 3.46591 2.23768 2.34375 3.16619 1.40625C4.09471 0.46875 5.20611 0 6.5004 0C7.7947 0 8.9061 0.46875 9.83462 1.40625C10.7631 2.34375 11.2274 3.46591 11.2274 4.77273V6.81818H11.565C11.8464 6.81818 12.0856 6.91761 12.2825 7.11648C12.4795 7.31534 12.578 7.55682 12.578 7.84091Z" />
                                                                            </svg>
                                                                            <span className="font-Inter font-bold text-[18px] leading-[22px]">Encrypted Chat</span>
                                                                        </div>
                                                                        <div className="flex items-start space-x-[10px]">
                                                                            <span className={"font-Inter text-[14px] leading-[17px] max-w-[258px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>
                                                                                Dopple chats are secured with AES 256-bit end-to-end encryption.<br />
                                                                                <Link to="/terms" className={"font-bold" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")}>Learn more.</Link>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </Fragment>
                                                            }
                                                        >
                                                            <img className="w-[15px] h-[15px]" src="/images/explore/lock-green.svg" alt="" onClick={() => setOpenMobileEncryptedTooltip(true)} />
                                                        </HtmlTooltip>
                                                    </ClickAwayListener>
                                                </div>
                                                <div className={"flex items-center space-x-[10px] text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>
                                                    <span className="truncate leading-[120%]">{_info.tagLine}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-[10px]">
                                        <button className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px]" + (themeID === 0 ? " bg-button hover:bg-[#34363C]" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]" : themeID === 2 ? " bg-candybutton hover:bg-[#DD14D5]" : themeID === 3 ? " bg-galaxybutton hover:bg-[#5200FF]" : "")} onClick={() => setOpenChatSettings(true)}>
                                            {themeID === 0 && <img className="w-[25px] h-[25px]" src="/images/messages/settings/settings-dark.svg" alt="" />}
                                            {themeID === 1 && <img className="w-[25px] h-[25px]" src="/images/messages/settings/settings-light.svg" alt="" />}
                                            {themeID === 2 && <img className="w-[25px] h-[25px]" src="/images/messages/settings/settings-candy.svg" alt="" />}
                                            {themeID === 3 && <img className="w-[25px] h-[25px]" src="/images/messages/settings/settings-galaxy.svg" alt="" />}
                                        </button>
                                        <ClickAwayListener onClickAway={() => setOpenProfileMenu(false)}>
                                            <div className={"flex justify-center items-center px-[10px] h-[45px] rounded-[5px] cursor-pointer relative" + (themeID === 0 ? " bg-button hover:bg-[#34363C]" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]" : themeID === 2 ? " bg-candybutton hover:bg-[#DD14D5]" : themeID === 3 ? " bg-galaxybutton hover:bg-[#5200FF]" : "")} onClick={() => {
                                                setOpenProfileMenu(!openProfileMenu)
                                                if (dopple) setDoppleIndex(dopple.chat_id)
                                            }}
                                            >
                                                <svg className={(themeID === 0 ? " text-blue2 group-hover:text-white" : themeID === 1 ? " text-subtextlight group-hover:text-title" : themeID === 2 ? " text-candysubtext group-hover:text-candytitle" : themeID === 3 ? " text-galaxybuttonmenu group-hover:text-white" : "")} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor" stroke="currentColor">
                                                    <path d="M10.9841 5.96824C12.0799 5.96824 12.9683 5.07992 12.9683 3.98412C12.9683 2.88832 12.0799 2 10.9841 2C9.88832 2 9 2.88832 9 3.98412C9 5.07992 9.88832 5.96824 10.9841 5.96824Z" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.0159 12.9365C9.92007 12.9365 9.03175 12.0482 9.03175 10.9524C9.03175 9.85658 9.92007 8.96826 11.0159 8.96826C12.1117 8.96826 13 9.85658 13 10.9524C13 12.0482 12.1117 12.9365 11.0159 12.9365Z" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M10.9841 19.9048C12.0799 19.9048 12.9683 19.0164 12.9683 17.9206C12.9683 16.8248 12.0799 15.9365 10.9841 15.9365C9.88832 15.9365 9 16.8248 9 17.9206C9 19.0164 9.88832 19.9048 10.9841 19.9048Z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {openProfileMenu &&
                                                    <div className={"flex flex-col items-start absolute top-[calc(100%+5px)] right-0 min-w-[193px] border font-semibold text-[14px] leading-[17px] rounded-[5px] z-[2] backdrop-blur-[25px] shadow-lg4 whitespace-nowrap overflow-hidden" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#C6CED8]" : themeID === 2 ? " bg-white border-[#FFEAF9]" : themeID === 3 ? " bg-galaxynav3 border-galaxybutton" : "")}>
                                                        {profile ?
                                                            <Link to="/account" className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")}>
                                                                <div className="w-5 h-5 border border-white rounded-full overflow-hidden">
                                                                    <img className="w-full h-full object-cover" src={profile?.pictures[profile?.picture] ?? "/images/blank-profile.svg"} alt="" />
                                                                </div>
                                                                <span>View Profile</span>
                                                            </Link>
                                                            :
                                                            <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={login}>
                                                                <img src="/images/nav/account.svg" alt="" />
                                                                <span>Login</span>
                                                            </button>
                                                        }
                                                        <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && archiveChat()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M14.8166 12.5271L12.84 14.5038L12.8399 9.5401L11.1599 9.54013L11.16 14.5037L9.18339 12.5271L7.99545 13.7151L12 17.7196L16.0046 13.7151L14.8166 12.5271Z" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.22053 2.43872L1.85352 6.55079V21.5612H22.1482V6.55079L18.7812 2.43872H5.22053ZM4.46699 6.01082L6.01626 4.11872H17.9855L19.5348 6.01082H4.46699ZM3.53352 7.69082H20.4682V19.8812H3.53352V7.69082Z" />
                                                            </svg>
                                                            <span>Save & Restart Chat</span>
                                                        </button>
                                                        <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && duplicateChat()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.95273 1.71265V6.04888H2.77734V22.2873H17.0484V17.9511H21.2238V7.31198L16.276 1.71265H6.95273ZM15.3684 17.9511H6.95273V7.72888H4.45734V20.6073H15.3684V17.9511ZM8.63273 16.2711V3.39265H15.5186L19.5438 7.94788V16.2711H8.63273Z" />
                                                            </svg>
                                                            <span>Duplicate Chat</span>
                                                        </button>
                                                        <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && pinChat()}>
                                                            {pinnedChats(dopple?.chat_id)?.find(x => x.chat_id === dopple?.chat_id)?.pinned ?
                                                                <>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                                    </svg>
                                                                    <span>Unpin Chat</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                                    </svg>
                                                                    <span>Pin Chat</span>
                                                                </>
                                                            }
                                                        </button>
                                                        <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && clearChat()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.51236 1.44434H15.2485L15.2485 7.93768L21.3767 7.93784V13.0275L22.8616 22.5549H1.13867L2.62358 13.0275V7.93784L9.51236 7.93768L9.51236 1.44434ZM4.1828 13.9326L3.10079 20.8749H8.18722V17.7439H9.86722V20.8749H14.7226V17.7439H16.4026V20.8749H20.8995L19.8175 13.9326H4.1828ZM19.6967 12.2526V9.61779L13.5685 9.61763L13.5685 3.12434H11.1924L11.1924 9.61764L4.30358 9.6178V12.2526H19.6967Z" />
                                                            </svg>
                                                            <span>Clear Messages</span>
                                                        </button>
                                                        <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full text-[#E93131]" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#EDEDF0]" : themeID === 2 ? " hover:bg-candybuttonmenu hover:text-white" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && deleteChat()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z" />
                                                                <path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z" />
                                                                <path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z" />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z" />
                                                            </svg>
                                                            <span>Delete Chat</span>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </ClickAwayListener>
                                    </div>
                                </div>
                        }
                    </header>
                    {!openChatSettings ?
                        <div className={"overflow-x-hidden overflow-y-auto flex-1 relative" + (_info ? "" : (joinedWaitlist && (hasAccessToLLM === false || hasAccessToLLM === null) ? " max-h-[calc(100svh-118px)]" : " max-h-[calc(100svh-88px)]")) + (themeID === 3 ? " bg-galaxynav" : "")} ref={msgRef}>
                            {loadedDopples && filteredDopples?.length === 0 &&
                                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6 w-max" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candynav text-candytitle" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle" : "")}>
                                    No chats yet
                                </div>
                            }
                            {!_info ?
                                <div className="flex flex-col w-full pt-[75px]">
                                    {(loadedDopples ?
                                        <>
                                            {openArchivedChats ?
                                                <>
                                                    {dopples.saved_chats.map((x, i) => <DoppleRowMobile key={i}
                                                        x={x}
                                                        setDoppleIndex={setDoppleIndex} sending={sending}
                                                        loadedMsgs={loadedMsgs} setLoadedMsgs={setLoadedMsgs}
                                                    />)}
                                                </>
                                                :
                                                <>
                                                    {dopples.saved_chats.length > 0 && <Archived themeID={themeID} dopples={dopples.saved_chats} setOpenArchivedChats={setOpenArchivedChats} setOpenContextMenu={setOpenContextMenu} />}
                                                    {filteredDopples.map((x, i) => <DoppleRowMobile key={i}
                                                        x={x}
                                                        setDoppleIndex={setDoppleIndex} sending={sending}
                                                        loadedMsgs={loadedMsgs} setLoadedMsgs={setLoadedMsgs}
                                                    />)}
                                                </>
                                            }
                                        </>
                                        :
                                        Array(10).fill("").map((x, i) =>
                                            <div className="flex justify-between items-center px-5 py-[15px] space-x-2 w-full group" key={i}>
                                                <div className="flex space-x-[10px] items-center flex-1 w-[0px]">
                                                    <div className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candysubtext border-[#FF71CE]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="currentColor">
                                                            <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col space-y-3">
                                                        <div className="flex items-center space-x-[5px]">
                                                            <Skeleton variant="rounded" width={74} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                            <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                        </div>
                                                        <Skeleton variant="rounded" width={166} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end space-y-[10.55px]">
                                                    <Skeleton variant="rounded" width={74} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                    <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                :
                                <>
                                    <div className="relative flex-1 h-full">
                                        {themeID === 2 && <img className="absolute w-full h-full object-cover" src="/images/messages/backs/candy.webp" alt="" />}
                                        {themeID === 3 && <img className="absolute w-full h-full object-cover" src="/images/messages/backs/galaxy.webp" alt="" />}
                                        {loadedMsgs && history?.length === 0 &&
                                            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6 z-[1] w-max" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candynav text-candytitle" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle" : "")}>
                                                No messages here yet
                                            </div>
                                        }
                                        <div className="flex flex-col space-y-[15px] px-5 pt-[90px] pb-[75px] h-full overflow-auto z-[1] relative" id="message-container" onScroll={handleScroll}>
                                            {loadedMsgs ?
                                                (history.length > 0 && _info &&
                                                    <>
                                                        {history.map((x, i) =>
                                                            <Fragment>
                                                                {i === 0 &&
                                                                    <>
                                                                        <div className={"mx-auto px-[10px] py-[5px] rounded-[10px] w-fit text-[12px] leading-[14px] text-center max-w-[80%]" + (themeID === 0 ? " bg-nav-desktop text-subtext shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                            Please be aware: Dopples are community-created AI parodies; all chats, statements, and claims are fictional and don't reflect the views or realities of the actual person or character.
                                                                        </div>
                                                                        <div className={"mx-auto px-[10px] py-[5px] rounded-[20px] w-fit text-[14px] leading-[17px]" + (themeID === 0 ? " bg-nav-desktop shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                            {threadDate(new Date(history[0].timestamp * 1000))}
                                                                        </div>
                                                                    </>
                                                                }
                                                                {(i > 0 && (new Date(history[i].timestamp * 1000).getTime() - new Date(history[i - 1].timestamp * 1000).getTime()) / (1000 * 3600 * 24) >= 1) &&
                                                                    <div className={"mx-auto px-[10px] py-[5px] rounded-[20px] w-fit text-[14px] leading-[17px]" + (themeID === 0 ? " bg-nav-desktop shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                        {threadDate(new Date(history[i].timestamp * 1000))}
                                                                    </div>
                                                                }
                                                                <div className={"flex items-end group" + (x?.new ? " bubble" : "") + (alignment === 0 && x?.message?.type === "human" ? " flex-row-reverse" : "")}>
                                                                    {x?.message?.type === "ai" &&
                                                                        <>
                                                                            <img className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
                                                                            <MessageFromBotMobile themeID={themeID} alignment={alignment} textSize={textSize} x={x} i={i} editedIndexes={editedIndexes} setEditIndex={setEditIndex} isLast={i === history.length - 1} reroll={() => !sending && reroll()} />
                                                                        </>
                                                                    }
                                                                    {x?.message?.type === "human" &&
                                                                        <>
                                                                            <img className={"min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" + (history[i + 1]?.message?.type === history[i]?.message?.type ? " opacity-0" : " opacity-1")} src={profile?.pictures[profile?.picture] ?? "/images/blank-profile.svg"} alt="" />
                                                                            <MessageFromYouMobile themeID={themeID} alignment={alignment} textSize={textSize} x={x} i={i} editedIndexes={editedIndexes} setEditIndex={setEditIndex} isLast={i === history.length - 2} />
                                                                        </>
                                                                    }
                                                                </div>
                                                            </Fragment>
                                                        )}
                                                        {history[history.length - 1]?.message?.type === "human" &&
                                                            <div className="flex items-end bubble">
                                                                <img className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" src={_info?.avatarURL + "?tr=w-100,h-100"} alt="" />
                                                                <div className={"rounded-[10px] rounded-bl-[0px] px-[10px] py-4 text-[16px] leading-[19px] ml-[10px] border" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candysubtext border-[#FF71CE]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                                                                    <Typing themeID={themeID} />
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                                )
                                                :
                                                <MessageLoader themeID={themeID} alignment={alignment} />
                                            }
                                            <div ref={messageContainer} />
                                        </div>
                                    </div>
                                    <div className="bottom-0 left-0 w-full transition duration-800 absolute z-[999]" ref={typeRef}>
                                        {editIndex >= 0 &&
                                            <div className={"flex items-center space-x-[10px] px-5 h-[60px] border-b" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#C4C7CB]" : themeID === 2 ? " bg-candynav border-[#EDEDF0]" : themeID === 3 ? " bg-galaxynav backdrop-blur-[25px] border-galaxybutton" : "")}>
                                                <div className="flex items-center flex-1 w-0">
                                                    <svg className={"text-blue2"} xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.25 23H18.75C19.0815 23 19.3995 23.1317 19.6339 23.3661C19.8683 23.6005 20 23.9185 20 24.25C20 24.5815 19.8683 24.8995 19.6339 25.1339C19.3995 25.3683 19.0815 25.5 18.75 25.5H1.25C0.918479 25.5 0.600537 25.3683 0.366117 25.1339C0.131696 24.8995 0 24.5815 0 24.25C0 23.9185 0.131696 23.6005 0.366117 23.3661C0.600537 23.1317 0.918479 23 1.25 23ZM0 16.75L12.5 4.25L16.25 8L3.75 20.5H0V16.75ZM13.75 3L16.25 0.5L20 4.25L17.4988 6.75125L13.75 3Z" />
                                                    </svg>
                                                    <div className={"w-[2px] h-10 ml-[15px] bg-blue2"} />
                                                    <div className="flex flex-col space-y-[5px] ml-[10px] flex-1 w-0">
                                                        <span className={"font-bold text-[14px] leading-[17px] text-blue2"}>Edit Message</span>
                                                        <span className={"text-[16px] leading-[19px] truncate" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")}>{history[editIndex]?.message?.data?.content}</span>
                                                    </div>
                                                </div>
                                                <button className={"flex justify-center items-center w-10 h-10 rounded-[5px] transition duration-800" + (themeID === 0 ? " bg-button hover:bg-[#34363C] text-blue2" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0] text-blue2" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-galaxybuttonmenu" : "")} onClick={() => { setEditIndex(-1); setMsg("") }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" stroke="currentColor">
                                                        <path d="M3 2.5L18 17.5M3 17.5L18 2.5" strokeWidth="3" strokeLinecap="square" />
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                        <div className={"flex space-x-[10px] px-[30px] py-[10px]" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav" : "")}>
                                            <input className={"h-10 caret-blue2 flex-1 w-0 text-[16px] leading-[19px]" + (themeID === 0 ? " text-white placeholder-subtext" : themeID === 1 ? " text-title placeholder-subtext" : themeID === 2 ? " text-candytitle placeholder-candysubtext" : themeID === 3 ? " text-white placeholder-subtext" : "")} placeholder={"Message " + _info?.name + "..."}
                                                value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => keyDown(e)} ref={inputRef} disabled={!_info}
                                            />
                                            {editIndex >= 0 ?
                                                <button className={"flex justify-center items-center w-10 h-10 rounded-[5px] disabled:bg-subtext disabled:cursor-not-allowed" + (themeID === 0 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 1 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 2 ? " bg-[#FFEAF9] disabled:bg-[#FFCAFA] hover:enabled:bg-[#FFEAF9]" : themeID === 3 ? " bg-galaxybuttonmenu disabled:bg-galaxybutton hover:enabled:bg-galaxybuttonmenu" : "")} disabled={msg?.trim()?.length === 0 || editing || history[editIndex]?.message?.data?.content === msg} onClick={edit} ref={sendRef} onTouchStart={/iPhone|iPad|iPod/.test(window.navigator.userAgent) && msg?.trim()?.length > 0 ? edit : null}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                                                        <path d="M1.5 9.66667L8.16667 16.3333L21.5 3" stroke="white" strokeWidth="3" />
                                                    </svg>
                                                </button>
                                                :
                                                <button className={"flex justify-center items-center w-10 h-10 rounded-[5px] disabled:bg-subtext disabled:cursor-not-allowed" + (themeID === 0 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 1 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 2 ? " bg-[#FFEAF9] disabled:bg-[#FFCAFA] hover:enabled:bg-[#FFEAF9]" : themeID === 3 ? " bg-galaxybuttonmenu disabled:bg-galaxybutton hover:enabled:bg-galaxybuttonmenu" : "")} disabled={msg?.trim()?.length === 0 || sending || !_info || !loadedMsgs || !loadedDopples} onClick={() => toggleTextStream ? sendStreamText() : send()} ref={sendRef} onTouchStart={() => /iPhone|iPad|iPod/.test(window.navigator.userAgent) && msg?.trim()?.length > 0 ? toggleTextStream ? sendStreamText() : send() : null}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                                        <path d="M19.6334 11.2445L1.00718 21.0566C0.506231 21.3205 -0.0808646 20.8988 0.00922768 20.3399L0.923452 14.6674C1.03761 13.959 1.53668 13.3732 2.21786 13.1479L9.88014 10.6135L2.27321 8.43817C1.56187 8.23475 1.03035 7.64121 0.906362 6.91181L0.0145865 1.66581C-0.079124 1.11455 0.490114 0.688399 0.99265 0.933604L19.6144 10.0198C20.1197 10.2664 20.1308 10.9825 19.6334 11.2445Z" fill="white" />
                                                    </svg>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        :
                        (
                            isLanguageShown ?
                                <>
                                    <div className={"fixed top-0 left-0 w-full h-[75px] z-[3] border-b" + (themeID === 0 ? " bg-[#17181C] border-transparent" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav2 border-galaxybutton" : "")}>
                                        <span className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[18px] leading-[21px]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : "")}>
                                            Language
                                        </span>
                                        <button className={"flex items-center space-x-[10px] absolute top-1/2 left-[22px] -translate-y-1/2 font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-[#FFEAF9]" : themeID === 3 ? " text-[#434FB6]" : "")} onClick={() => setIsLanguageShown(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none" stroke="currentColor">
                                                <path d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className={"flex flex-col items-center h-full p-5 pt-[105px] max-h-screen overflow-auto" + (themeID === 0 ? " bg-[#141518]" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav" : "")}>
                                        <div className="flex flex-col w-full rounded-[5px] langlist">
                                            {languages.map((x, i) =>
                                                <button className={"flex justify-between items-center space-x-[10px] p-[15px] text-[16px] leading-[19px] transition duration-800" + (i > 0 ? " border-t" : "") + (themeID === 0 ? " bg-button hover:bg-[#31333C] border-[#31333C] text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#C6CED8] border-[#C6CED8] text-title" : themeID === 2 ? " bg-candybutton hover:bg-candybuttonmenu border-candysubtext text-candytitle" : themeID === 3 ? " bg-galaxybutton hover:bg-galaxybuttonmenu border-galaxysubtext text-galaxytitle" : "")} key={i} onClick={() => setLanguageUnsaved(i)}>
                                                    <div className="flex items-center space-x-[10px] w-0 flex-1">
                                                        <img src={x.flag} alt="" />
                                                        <span className="w-0 flex-1 truncate text-left">{x.name}</span>
                                                    </div>
                                                    {i === languageUnsaved ?
                                                        <>
                                                            {(themeID === 0 || themeID === 1) &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                    <rect width="30" height="30" rx="15" fill="#048DFF" />
                                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            }
                                                            {themeID === 2 &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                    <rect width="30" height="30" rx="15" fill="white" />
                                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="#FF8BA0" strokeWidth="3" />
                                                                </svg>
                                                            }
                                                            {themeID === 3 &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                    <rect width="30" height="30" rx="15" fill="white" />
                                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="#313B95" strokeWidth="3" />
                                                                </svg>
                                                            }
                                                        </>
                                                        :
                                                        <div className={"w-[30px] h-[30px] border rounded-full" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C4C7CB]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                                    }
                                                </button>
                                            )}
                                        </div>
                                        <button className={"flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] w-full min-h-[50px] mt-[30px] disabled:opacity-50" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candybuttonmenu" : themeID === 3 ? " bg-galaxybuttonmenu" : "")} onClick={apply}>Apply</button>
                                    </div>
                                </>
                                :
                                <div className={"flex flex-col p-5 pt-[95px] overflow-auto max-h-screen" + (themeID === 0 ? " bg-[#141518]" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav2" : "")}>
                                    {/* <span className={"text-[14px] leading-[17px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>My Description</span>
                                    <div className={"mt-[10px] p-[15px] border rounded-[5px]" + (themeID === 0 ? " bg-inputback border-button" : themeID === 1 ? " bg-candybuttonhighlight border-[#C6CED8]" : themeID === 2 ? " bg-candybuttonhighlight border-[#D9D9D9]" : themeID === 3 ? " bg-inputback border-galaxybutton" : "")}>
                                        <textarea className={"w-full text-[16px] leading-[19px] resize-none" + (themeID === 0 ? " placeholder-subtext" : themeID === 1 ? " text-title placeholder-subtextlight" : themeID === 2 ? " text-title placeholder-candysubtext" : themeID === 3 ? " placeholder-galaxybutton" : "")} placeholder="A 23 year old male named Jason with green eyes and blonde hair." />
                                    </div>
                                    <span className="mt-[10px] mb-[15px] text-[#8A939D] text-[14px] leading-[17px]">Introduce yourself to the Dopple in a line or two. This helps personalize your chat experience!</span> */}
                                    <span className={"text-[14px] leading-[17px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Chat Preferences</span>
                                    <div className={"flex flex-col space-y-3 rounded-[5px] px-[15px] py-3 mt-[10px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candybutton text-candytitle" : themeID === 3 ? " bg-galaxybutton text-white" : "")}>
                                        <div className="flex justify-between items-center space-x-[10px]">
                                            <div className={"flex items-center space-x-[5px] text-[14px] leading-[17px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")}>
                                                <span>Voice Captioning</span>
                                            </div>
                                            <button className={"w-[50px] h-[30px] relative rounded-[22px] transition duration-800 group" + (cookies?.voiceCaption === "on" ? (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxybuttonmenu" : "") : (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-inputback" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-inputback" : ""))} disabled>
                                                <div className={"absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full transition-all duration-800" + (cookies?.voiceCaption === "on" ? " left-[22px] bg-white group-hover:bg-subtext" : " left-[2px]" + (themeID === 0 ? " bg-subtext group-hover:bg-white" : themeID === 1 ? " bg-subtext group-hover:bg-white" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxybuttonmenu" : ""))} />
                                            </button>
                                        </div>
                                        <div className={"w-full h-[1px]" + (themeID === 0 ? " bg-[#31333C]" : themeID === 1 ? " bg-[#C4C7CB]" : themeID === 2 ? " bg-[#C4C7CB]" : themeID === 3 ? " bg-[#31333C]" : "")} />
                                        <div className="flex justify-between items-center space-x-[10px]">
                                            <div className={"flex items-center space-x-[5px] text-[14px] leading-[17px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")}>
                                                <span>Text Streaming</span>
                                            </div>
                                            <button className={"w-[50px] h-[30px] relative rounded-[22px] transition duration-800 group" + (toggleTextStream ? (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxybuttonmenu" : "") : (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-inputback" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-inputback" : ""))} onClick={toggleStream} disabled>
                                                <div className={"absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full transition-all duration-800" + (toggleTextStream ? " left-[22px] bg-white group-hover:bg-subtext" : " left-[2px]" + (themeID === 0 ? " bg-subtext group-hover:bg-white" : themeID === 1 ? " bg-subtext group-hover:bg-white" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxybuttonmenu" : ""))} />
                                            </button>
                                        </div>
                                    </div>
                                    <span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Dopple Vault</span>
                                    <button className={"flex justify-between items-center px-[15px] mt-[10px] h-[60px] border rounded-[5px]" + (themeID === 0 ? " bg-button border-[#DEA430]" : themeID === 1 ? " text-subtext bg-candybutton border-[#DEA430]" : themeID === 2 ? " text-candysubtext bg-candybutton border-transparent" : themeID === 3 ? " text-subtext bg-galaxybutton border-transparent" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                        <div className="flex items-center space-x-[10px] text-[#35C75A] text-[12px] leading-[14px] text-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.24219 6.38877C6.24219 4.35509 7.89082 2.70646 9.9245 2.70646C11.9582 2.70646 13.6068 4.35509 13.6068 6.38877V8.33862H6.24219V6.38877ZM3.57552 8.33862V6.38877C3.57552 2.88233 6.41806 0.0397949 9.9245 0.0397949C13.4309 0.0397949 16.2735 2.88233 16.2735 6.38877V8.33862H18.4303V19.9603H1.57031V8.33862H3.57552Z" />
                                            </svg>
                                            <span>Protect chats with a passcode.</span>
                                        </div>
                                        <img className="h-full" src="/images/messages/vault-rect.png" alt="" />
                                    </button>
                                    <span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Chat Themes</span>
                                    <div className={"flex flex-col items-center space-y-5 p-5 mt-[10px] rounded-[5px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candybutton text-candytitle" : themeID === 3 ? " bg-galaxybutton text-white" : "")}>
                                        <div className="grid grid-cols-4 gap-10">
                                            <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-blue2" : "")} onClick={() => setTheme(0)}>
                                                <div className={"w-full rounded-[5px] border transition duration-800 relative overflow-hidden" + (themeID === 0 ? " border-blue2 group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-candysubtext group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
                                                    <img className="w-full" src="/images/account/darktheme.svg" alt="" />
                                                </div>
                                                <span>Dark</span>
                                                {themeID === 0 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                                        <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                                                        <path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                                }
                                            </button>
                                            <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 1 ? " text-blue2" : "")} onClick={() => setTheme(1)}>
                                                <div className={"w-full rounded-[5px] border transition duration-800 relative overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-blue2 group-hover:border-blue2" : themeID === 2 ? " border-[#8A939D] group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
                                                    <img className="w-full" src="/images/account/lighttheme.svg" alt="" />
                                                </div>
                                                <span>Light</span>
                                                {themeID === 1 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                                        <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                                                        <path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                                }
                                            </button>
                                            <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 3 ? " text-galaxybuttonmenu" : "")} onClick={() => setTheme(3)}>
                                                <div className={"w-full rounded-[5px] border transition duration-800 relative overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-[#8A939D] group-hover:border-candybuttonmenu" : themeID === 3 ? " border-galaxybuttonmenu group-hover:border-galaxybuttonmenu" : "")}>
                                                    <img className="w-full" src="/images/account/galaxytheme.svg" alt="" />
                                                </div>
                                                <span>Galaxy</span>
                                                {themeID === 3 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                                                        <rect x="0.125" y="0.25" width="20" height="20" rx="10" fill="#313B95" />
                                                        <path d="M5.125 9.39286L8.725 13.25L15.125 7.25" stroke="white" strokeWidth="2" />
                                                    </svg>
                                                    :
                                                    <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
                                                }
                                            </button>
                                            <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                    <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                        <img className="w-full" src="/images/account/piratetheme.svg" alt="" />
                                                        <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                            <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="whitespace-nowrap">Pirate</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                </svg>
                                            </button>
                                            {showMoreThemes &&
                                                <>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 2 ? " text-candybuttonmenu" : "")} onClick={() => setTheme(2)}>
                                                        <div className={"w-full rounded-[5px] border transition duration-800 relative overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-candybuttonmenu group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
                                                            <img className="w-full" src="/images/account/candytheme.svg" alt="" />
                                                        </div>
                                                        <span>Candy</span>
                                                        {themeID === 2 ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                                                                <rect x="0.375" y="0.25" width="20" height="20" rx="10" fill="#FF8BA0" />
                                                                <path d="M5.375 9.39286L8.975 13.25L15.375 7.25" stroke="white" strokeWidth="2" />
                                                            </svg>
                                                            :
                                                            <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                                        }
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/doppletheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Dopple</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/ninjatheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Ninja</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/wizardtheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Wizard</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/gametheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Game</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/superherotheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Super Hero</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/zombietheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Zombie</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/kingdomtheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Kingdom</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                    <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : "")} onClick={() => setOpenDopplePlusModal(true)}>
                                                        <div className="w-full rounded-[5px] p-px overflow-hidden bg-sun">
                                                            <div className={"rounded-[5px] transition duration-800 relative overflow-hidden"}>
                                                                <img className="w-full" src="/images/account/alientheme.svg" alt="" />
                                                                <div className="flex justify-center items-center px-1 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
                                                                    <img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">Alien</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
                                                        </svg>
                                                    </button>
                                                </>
                                            }
                                        </div>
                                        <button className={"flex items-center space-x-[10px]" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxybuttonmenu" : "")} onClick={() => setShowMoreThemes(!showMoreThemes)}>
                                            <span className="text-[14px] leading-[17px]">{showMoreThemes ? "Less Themes" : "See All Themes"}</span>
                                            <svg className={"transition" + (!showMoreThemes ? " rotate-[180deg]" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor">
                                                <path d="M1.66797 7.5022L7.50391 1.49768L13.3346 7.5022" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Chat Alignment</span>
                                    <div className={"flex justify-between items-center p-5 mt-[10px] rounded-[5px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candybutton text-candytitle" : themeID === 3 ? " bg-galaxybutton text-white" : "")}>
                                        <div />
                                        <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (alignment === 1 ? (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxybuttonmenu" : "") : "")} onClick={() => setNewAlignment(1)}>
                                            <div className={"overflow-hidden rounded-[5px] border transition duration-800" + (alignment === 1 ? (themeID === 0 ? " border-blue2 group-hover:border-blue2" : themeID === 1 ? " border-blue2 group-hover:border-blue2" : themeID === 2 ? " border-[#FF8BA0] group-hover:border-[#FF8BA0]" : themeID === 3 ? " border-galaxybuttonmenu group-hover:border-galaxybuttonmenu" : "") : (themeID === 0 ? " border-subtext" : themeID === 1 ? " border-subtext" : themeID === 2 ? " border-transparent" : themeID === 3 ? " border-galaxysubtext" : ""))}>
                                                {themeID === 0 && <img src="/images/messages/alignments/left.svg" alt="" />}
                                                {themeID === 1 && <img src="/images/messages/alignments/left-light.svg" alt="" />}
                                                {themeID === 2 && <img src="/images/messages/alignments/left-candy.svg" alt="" />}
                                                {themeID === 3 && <img src="/images/messages/alignments/left-galaxy.svg" alt="" />}
                                            </div>
                                            <span>Left Aligned</span>
                                            {alignment === 1 ?
                                                (themeID === 0 || themeID === 1 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                                        <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                                                        <path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    themeID === 2 ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                            <rect y="0.25" width="20" height="20" rx="10" fill="#FF8BA0" />
                                                            <path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" strokeWidth="2" />
                                                        </svg>
                                                        :
                                                        themeID === 3 ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                                <rect y="0.25" width="20" height="20" rx="10" fill="#313B95" />
                                                                <path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" strokeWidth="2" />
                                                            </svg>
                                                            :
                                                            null
                                                )
                                                :
                                                <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                            }
                                        </button>
                                        <button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (alignment === 0 ? (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxybuttonmenu" : "") : "")} onClick={() => setNewAlignment(0)}>
                                            <div className={"overflow-hidden rounded-[5px] border transition duration-800" + (alignment === 0 ? (themeID === 0 ? " border-blue2 group-hover:border-blue2" : themeID === 1 ? " border-blue2 group-hover:border-blue2" : themeID === 2 ? " border-[#FF8BA0] group-hover:border-[#FF8BA0]" : themeID === 3 ? " border-galaxybuttonmenu group-hover:border-galaxybuttonmenu" : "") : (themeID === 0 ? " border-subtext" : themeID === 1 ? " border-subtext" : themeID === 2 ? " border-transparent" : themeID === 3 ? " border-galaxysubtext" : ""))}>
                                                {themeID === 0 && <img src="/images/messages/alignments/left and right.svg" alt="" />}
                                                {themeID === 1 && <img src="/images/messages/alignments/left and right-light.svg" alt="" />}
                                                {themeID === 2 && <img src="/images/messages/alignments/left and right-candy.svg" alt="" />}
                                                {themeID === 3 && <img src="/images/messages/alignments/left and right-galaxy.svg" alt="" />}
                                            </div>
                                            <span>Left and Right</span>
                                            {alignment === 0 ?
                                                (themeID === 0 || themeID === 1 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                                        <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                                                        <path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    themeID === 2 ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                            <rect y="0.25" width="20" height="20" rx="10" fill="#FF8BA0" />
                                                            <path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" strokeWidth="2" />
                                                        </svg>
                                                        :
                                                        themeID === 3 ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                                <rect y="0.25" width="20" height="20" rx="10" fill="#313B95" />
                                                                <path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" strokeWidth="2" />
                                                            </svg>
                                                            :
                                                            null
                                                )
                                                :
                                                <div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
                                            }
                                        </button>
                                        <div />
                                    </div>
                                    <span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Text Size</span>
                                    <div className={"flex items-center space-x-[10px] rounded-[5px] px-[15px] pt-[30px] pb-[25px] mt-[10px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candybutton text-candytitle" : themeID === 3 ? " bg-galaxybutton text-white" : "")}>
                                        <span className={"text-[16px] leading-[19px]" + (themeID === 1 ? " text-title" : "")}>A</span>
                                        <div className="relative flex-1">
                                            <div className="flex items-center space-x-0.5">
                                                <div className={"w-1 h-1 rounded-full " + (textSize >= 16 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : "bg-galaxybuttonmenu") : (themeID === 0 ? "bg-candysubtext" : themeID === 1 ? "bg-subtextlight" : themeID === 2 ? "bg-candysubtext" : "bg-galaxysubtext"))} />
                                                <div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 16 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : themeID === 3 ? "bg-[#313B95]" : "") : (themeID === 0 ? "bg-blue2 opacity-50" : themeID === 1 ? "bg-[#8FCCFF]" : themeID === 2 ? "bg-candybuttonmenu opacity-50" : themeID === 3 ? "bg-galaxybuttonmenu opacity-50" : ""))} />
                                                <div className={"w-1 h-1 rounded-full " + (textSize >= 18 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : "bg-galaxybuttonmenu") : (themeID === 0 ? "bg-candysubtext" : themeID === 1 ? "bg-subtextlight" : themeID === 2 ? "bg-candysubtext" : "bg-galaxysubtext"))} />
                                                <div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 18 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : themeID === 3 ? "bg-[#313B95]" : "") : (themeID === 0 ? "bg-blue2 opacity-50" : themeID === 1 ? "bg-[#8FCCFF]" : themeID === 2 ? "bg-candybuttonmenu opacity-50" : themeID === 3 ? "bg-galaxybuttonmenu opacity-50" : ""))} />
                                                <div className={"w-1 h-1 rounded-full " + (textSize >= 20 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : "bg-galaxybuttonmenu") : (themeID === 0 ? "bg-candysubtext" : themeID === 1 ? "bg-subtextlight" : themeID === 2 ? "bg-candysubtext" : "bg-galaxysubtext"))} />
                                                <div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 20 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : themeID === 3 ? "bg-[#313B95]" : "") : (themeID === 0 ? "bg-blue2 opacity-50" : themeID === 1 ? "bg-[#8FCCFF]" : themeID === 2 ? "bg-candybuttonmenu opacity-50" : themeID === 3 ? "bg-galaxybuttonmenu opacity-50" : ""))} />
                                                <div className={"w-1 h-1 rounded-full " + (textSize >= 20 ? (themeID === 0 ? "bg-blue2" : themeID === 1 ? "bg-blue2" : themeID === 2 ? "bg-candybuttonmenu" : "bg-galaxybuttonmenu") : (themeID === 0 ? "bg-candysubtext" : themeID === 1 ? "bg-subtextlight" : themeID === 2 ? "bg-candysubtext" : "bg-galaxysubtext"))} />
                                            </div>
                                            <input type="range" min="14" max="20" step="2" className={"absolute top-1/2 left-0 -translate-y-1/2 w-full h-[30px] rounded-full" + (themeID === 0 ? " range-desktop-dark" : themeID === 1 ? " range-desktop-light" : themeID === 2 ? " range-desktop-candy" : themeID === 3 ? " range-desktop-galaxy" : "")} value={textSize} onChange={e => profile && setTextSize(parseInt(e.target.value))} onClick={() => !profile && setOpenSignModal(true)} />
                                        </div>
                                        <span className={"text-[24px] leading-[28px]" + (themeID === 1 ? " text-title" : "")}>A</span>
                                    </div>
                                    <span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Language</span>
                                    <button className={"flex items-center space-x-[10px] rounded-[5px] transition duration-800 p-[15px] relative mt-[5px]" + (themeID === 0 ? " bg-button hover:bg-black5" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DDD]" : themeID === 2 ? " bg-candybutton hover:bg-candybuttonmenu text-candytitle" : themeID === 3 ? " bg-galaxybutton hover:bg-galaxybuttonmenu text-white" : "")} onClick={_setIsLanguageShown}>
                                        <div className="flex items-center space-x-[10px] w-0 flex-1">
                                            {language === -1 ?
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9972 7.34869 18.9427 4.80678 17.068 2.93202C15.1932 1.05727 12.6513 0.00279983 10 0ZM7.46443 13.8462H12.5356C12.0192 15.6096 11.1538 17.199 10 18.451C8.84616 17.199 7.98077 15.6096 7.46443 13.8462ZM7.11539 12.3077C6.86026 10.7798 6.86026 9.22019 7.11539 7.69231H12.8846C13.1397 9.22019 13.1397 10.7798 12.8846 12.3077H7.11539ZM1.53847 10C1.5378 9.21965 1.64556 8.44299 1.85866 7.69231H5.55673C5.32725 9.22221 5.32725 10.7778 5.55673 12.3077H1.85866C1.64556 11.557 1.5378 10.7803 1.53847 10ZM12.5356 6.15384H7.46443C7.98077 4.39038 8.84616 2.80096 10 1.54904C11.1538 2.80096 12.0192 4.39038 12.5356 6.15384ZM14.4433 7.69231H18.1413C18.5683 9.20115 18.5683 10.7988 18.1413 12.3077H14.4433C14.6728 10.7778 14.6728 9.22221 14.4433 7.69231ZM17.5356 6.15384H14.1288C13.7363 4.60914 13.077 3.14485 12.1808 1.82692C13.3258 2.13463 14.3938 2.67858 15.316 3.42378C16.2382 4.16898 16.9943 5.09893 17.5356 6.15384ZM7.81923 1.82692C6.92298 3.14485 6.26372 4.60914 5.87116 6.15384H2.46443C3.0057 5.09893 3.76176 4.16898 4.68399 3.42378C5.60621 2.67858 6.67419 2.13463 7.81923 1.82692ZM2.46443 13.8462H5.87116C6.26372 15.3909 6.92298 16.8551 7.81923 18.1731C6.67419 17.8654 5.60621 17.3214 4.68399 16.5762C3.76176 15.831 3.0057 14.9011 2.46443 13.8462ZM12.1808 18.1731C13.077 16.8551 13.7363 15.3909 14.1288 13.8462H17.5356C16.9943 14.9011 16.2382 15.831 15.316 16.5762C14.3938 17.3214 13.3258 17.8654 12.1808 18.1731Z" />
                                                    </svg>
                                                    <span className={"w-0 flex-1 truncate text-left text-[14px] leading-[17px]" + (themeID === 1 ? " text-title" : "")}>Auto-Detect</span>
                                                </>
                                                :
                                                <>
                                                    <img className="w-5 h-5" src={languages[language].flag} alt="" />
                                                    <span className={"w-0 flex-1 truncate text-left text-[14px] leading-[17px]" + (themeID === 1 ? " text-title" : "")}>{languages[language].name}</span>
                                                </>
                                            }
                                        </div>
                                    </button>
                                </div>
                        )
                    }
                </>
                :
                <>
                    <div className={"flex flex-col w-[360px] border-r" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] border-galaxybutton" : "")}>
                        <div className={"flex items-center space-x-5 px-5 min-h-[70px] border-b" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                            {openArchivedChats ?
                                <>
                                    <svg className={"cursor-pointer" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? "" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" onClick={() => setOpenArchivedChats(false)}>
                                        <path d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9" strokeWidth="2" strokeLinecap="square" />
                                    </svg>
                                    <span className={"text-[18px] leading-[22px] font-bold" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")}>Saved Chats</span>
                                </>
                                :
                                <>
                                    <Link to="/">
                                        <svg className={"cursor-pointer" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? "" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor">
                                            <path d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9" strokeWidth="2" strokeLinecap="square" />
                                        </svg>
                                    </Link>
                                    <div className={"flex items-center space-x-[10px] h-[45px] px-[15px] flex-1 rounded-[5px] w-0 transition duration-800 border border-transparent focus-within:border-blue2" + (themeID === 0 ? " bg-button hover:bg-black5 text-subtext focus-within:text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DDD] text-subtext focus-within:text-title" : themeID === 2 ? " bg-candybutton text-candysubtext focus-within:text-candytitle" : themeID === 3 ? " bg-galaxybutton text-galaxysubtext focus-within:text-white" : "")}>
                                        <svg className="min-w-[15px]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21 21" fill="currentColor">
                                            <path d="M20.1714 18.5942L16.3949 14.8287C17.6134 13.2764 18.2745 11.3595 18.2721 9.38603C18.2721 7.62854 17.7509 5.91052 16.7745 4.44922C15.7981 2.98792 14.4103 1.84897 12.7866 1.17641C11.1629 0.50385 9.37617 0.327877 7.65245 0.670746C5.92873 1.01362 4.34539 1.85993 3.10266 3.10266C1.85993 4.34539 1.01362 5.92873 0.670746 7.65245C0.327877 9.37617 0.50385 11.1629 1.17641 12.7866C1.84897 14.4103 2.98792 15.7981 4.44922 16.7745C5.91052 17.7509 7.62854 18.272 9.38603 18.272C11.3595 18.2745 13.2764 17.6134 14.8287 16.3949L18.5942 20.1714C18.6974 20.2755 18.8203 20.3582 18.9556 20.4146C19.091 20.471 19.2362 20.5 19.3828 20.5C19.5294 20.5 19.6746 20.471 19.81 20.4146C19.9453 20.3582 20.0682 20.2755 20.1714 20.1714C20.2755 20.0682 20.3582 19.9453 20.4146 19.81C20.471 19.6746 20.5 19.5294 20.5 19.3828C20.5 19.2362 20.471 19.091 20.4146 18.9556C20.3582 18.8203 20.2755 18.6974 20.1714 18.5942ZM2.72151 9.38603C2.72151 8.06791 3.11238 6.77939 3.84468 5.68342C4.57699 4.58745 5.61785 3.73324 6.83563 3.22882C8.05341 2.72439 9.39342 2.59241 10.6862 2.84957C11.979 3.10672 13.1665 3.74145 14.0986 4.6735C15.0306 5.60555 15.6653 6.79305 15.9225 8.08584C16.1796 9.37863 16.0477 10.7186 15.5432 11.9364C15.0388 13.1542 14.1846 14.1951 13.0886 14.9274C11.9927 15.6597 10.7041 16.0505 9.38603 16.0505C7.61849 16.0505 5.92334 15.3484 4.6735 14.0986C3.42366 12.8487 2.72151 11.1536 2.72151 9.38603Z" />
                                        </svg>
                                        <input className={"text-[14px] leading-[17px] caret-blue2 flex-1 w-0" + (themeID === 0 ? " placeholder-subtext" : themeID === 1 ? " placeholder-subtext text-black" : themeID === 2 ? " placeholder-candysubtext text-black" : themeID === 3 ? " placeholder-galaxysubtext text-white" : "")} placeholder="Search Message" value={searchTxt} onChange={e => setSearchTxt(e.target.value)} disabled={dopples.length === 0} />
                                        {searchTxt?.length > 0 &&
                                            <button className={"ml-2" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-[#9277FF]" : "")} onClick={() => setSearchTxt("")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 19" fill="none" stroke="currentColor">
                                                    <path d="M2 2L17 17M2 17L17 2" strokeWidth="2" strokeLinecap="square" />
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        <div className="flex flex-col flex-1 h-0 relative">
                            {(loadedDopples && filteredDopples?.length === 0) &&
                                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6 w-max" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candynav text-candytitle" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle" : "")}>
                                    {matches ? "No matches for that search" : "No chats yet"}
                                </div>
                            }
                            <div className={"h-full overflow-auto" + (themeID === 0 ? " bg-[#141518]" : themeID === 1 ? " bg-white1" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-galaxynav" : "")} onContextMenu={e => e.preventDefault()}>
                                {loadedDopples ?
                                    <>
                                        {openArchivedChats ?
                                            <>
                                                {dopples.saved_chats.map((x, i) => <DoppleRowDesktop key={i}
                                                    x={x}
                                                    contextMenuRef={contextMenuRef} setOpenContextMenu={setOpenContextMenu}
                                                    setDoppleIndex={setDoppleIndex} sending={sending}
                                                    loadedMsgs={loadedMsgs} setLoadedMsgs={setLoadedMsgs}
                                                />)}

                                                <ClickAwayListener onClickAway={() => setOpenContextMenu(false)}>
                                                    <Fade in={openContextMenu}>
                                                        <div className="fixed z-[2] fast-transition" ref={contextMenuRef}>
                                                            <div className={"flex flex-col border rounded-[5px] overflow-hidden" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#C6CED8]" : themeID === 2 ? " bg-white border-[#FFEAF9] shadow-lg10" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={archiveChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M14.8166 12.5271L12.84 14.5038L12.8399 9.5401L11.1599 9.54013L11.16 14.5037L9.18339 12.5271L7.99545 13.7151L12 17.7196L16.0046 13.7151L14.8166 12.5271Z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.22053 2.43872L1.85352 6.55079V21.5612H22.1482V6.55079L18.7812 2.43872H5.22053ZM4.46699 6.01082L6.01626 4.11872H17.9855L19.5348 6.01082H4.46699ZM3.53352 7.69082H20.4682V19.8812H3.53352V7.69082Z" />
                                                                    </svg>
                                                                    <span>Save & Restart Chat</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={pinChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                                    </svg>
                                                                    {pinnedChats(doppleIndex)?.find(x => x.chat_id === doppleIndex)?.pinned ?
                                                                        <span>Unpin Chat</span>
                                                                        :
                                                                        <span>Pin Chat</span>
                                                                    }
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={duplicateChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.95273 1.71265V6.04888H2.77734V22.2873H17.0484V17.9511H21.2238V7.31198L16.276 1.71265H6.95273ZM15.3684 17.9511H6.95273V7.72888H4.45734V20.6073H15.3684V17.9511ZM8.63273 16.2711V3.39265H15.5186L19.5438 7.94788V16.2711H8.63273Z" />
                                                                    </svg>
                                                                    <span>Duplicate Chat</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candysubtext" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybutton" : "")} onClick={clearChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.51236 1.44434H15.2485L15.2485 7.93768L21.3767 7.93784V13.0275L22.8616 22.5549H1.13867L2.62358 13.0275V7.93784L9.51236 7.93768L9.51236 1.44434ZM4.1828 13.9326L3.10079 20.8749H8.18722V17.7439H9.86722V20.8749H14.7226V17.7439H16.4026V20.8749H20.8995L19.8175 13.9326H4.1828ZM19.6967 12.2526V9.61779L13.5685 9.61763L13.5685 3.12434H11.1924L11.1924 9.61764L4.30358 9.6178V12.2526H19.6967Z" />
                                                                    </svg>
                                                                    <span>Clear Messages</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px] text-[#E93131]" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#EDEDF0]" : themeID === 2 ? " hover:bg-candybuttonmenu hover:text-white" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={deleteChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z" />
                                                                        <path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z" />
                                                                        <path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z" />
                                                                    </svg>
                                                                    <span>Delete Chat</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                </ClickAwayListener>
                                            </>
                                            :
                                            <>
                                                {dopples.saved_chats.length > 0 && <Archived themeID={themeID} dopples={dopples.saved_chats} setOpenArchivedChats={setOpenArchivedChats} setOpenContextMenu={setOpenContextMenu} />}
                                                {filteredDopples.map((x, i) => <DoppleRowDesktop key={i}
                                                    x={x}
                                                    contextMenuRef={contextMenuRef} setOpenContextMenu={setOpenContextMenu}
                                                    setDoppleIndex={setDoppleIndex} sending={sending}
                                                    loadedMsgs={loadedMsgs} setLoadedMsgs={setLoadedMsgs}
                                                />)}

                                                <ClickAwayListener onClickAway={() => setOpenContextMenu(false)}>
                                                    <Fade in={openContextMenu}>
                                                        <div className="fixed z-[2] fast-transition" ref={contextMenuRef}>
                                                            <div className={"flex flex-col border rounded-[5px] overflow-hidden" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#C6CED8]" : themeID === 2 ? " bg-white border-[#FFEAF9] shadow-lg10" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={pinChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                                    </svg>
                                                                    {(dopples.active_chats ?? dopples.saved_chats).find(x => x.chat_id === doppleIndex)?.pinned ?
                                                                        <span>Unpin Chat</span>
                                                                        :
                                                                        <span>Pin Chat</span>
                                                                    }
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={archiveChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M14.8166 12.5271L12.84 14.5038L12.8399 9.5401L11.1599 9.54013L11.16 14.5037L9.18339 12.5271L7.99545 13.7151L12 17.7196L16.0046 13.7151L14.8166 12.5271Z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.22053 2.43872L1.85352 6.55079V21.5612H22.1482V6.55079L18.7812 2.43872H5.22053ZM4.46699 6.01082L6.01626 4.11872H17.9855L19.5348 6.01082H4.46699ZM3.53352 7.69082H20.4682V19.8812H3.53352V7.69082Z" />
                                                                    </svg>
                                                                    <span>Save & Restart Chat</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={duplicateChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.95273 1.71265V6.04888H2.77734V22.2873H17.0484V17.9511H21.2238V7.31198L16.276 1.71265H6.95273ZM15.3684 17.9511H6.95273V7.72888H4.45734V20.6073H15.3684V17.9511ZM8.63273 16.2711V3.39265H15.5186L19.5438 7.94788V16.2711H8.63273Z" />
                                                                    </svg>
                                                                    <span>Duplicate Chat</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px]" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candysubtext" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybutton" : "")} onClick={clearChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.51236 1.44434H15.2485L15.2485 7.93768L21.3767 7.93784V13.0275L22.8616 22.5549H1.13867L2.62358 13.0275V7.93784L9.51236 7.93768L9.51236 1.44434ZM4.1828 13.9326L3.10079 20.8749H8.18722V17.7439H9.86722V20.8749H14.7226V17.7439H16.4026V20.8749H20.8995L19.8175 13.9326H4.1828ZM19.6967 12.2526V9.61779L13.5685 9.61763L13.5685 3.12434H11.1924L11.1924 9.61764L4.30358 9.6178V12.2526H19.6967Z" />
                                                                    </svg>
                                                                    <span>Clear Messages</span>
                                                                </button>
                                                                <button className={"flex items-center space-x-[10px] px-5 h-[54px] text-[#E93131]" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#EDEDF0]" : themeID === 2 ? " hover:bg-candybuttonmenu hover:text-white" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={deleteChat}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z" />
                                                                        <path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z" />
                                                                        <path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z" />
                                                                    </svg>
                                                                    <span>Delete Chat</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                </ClickAwayListener>
                                            </>
                                        }
                                    </>
                                    :
                                    Array(10).fill("").map((x, i) =>
                                        <div className="flex justify-between items-center px-5 py-[15px] space-x-2 w-full group" key={i}>
                                            <div className="flex space-x-[10px] items-center flex-1 w-[0px]">
                                                <div className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candysubtext border-[#FF71CE]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="currentColor">
                                                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col space-y-3">
                                                    <div className="flex items-center space-x-[5px]">
                                                        <Skeleton variant="rounded" width={74} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                        <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                    </div>
                                                    <Skeleton variant="rounded" width={166} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-[10.55px]">
                                                <Skeleton variant="rounded" width={74} height={10} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                                <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: 'rgb(200,200,200,0.2)' }} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <MessageFooter />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className={"flex justify-between space-x-2 items-center px-5 min-h-[70px] border-b" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                            <div className="flex space-x-[10px] items-center flex-1">
                                {_info ?
                                    <HtmlTooltip
                                        className={"pfp-tooltip"}
                                        placement="bottom-start"
                                        title={
                                            <Fragment>
                                                <div className={"flex flex-col items-start space-y-[15px] relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (themeID === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : themeID === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : themeID === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : themeID === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
                                                    <div className="flex items-center space-x-[15px]">
                                                        <img className="w-[100px] h-[100px] rounded-[15px]" src={_info?.avatarURL + "?tr=w-400,h-400"} alt="" />
                                                        <div className="flex flex-col space-y-[5px]">
                                                            <div className="flex items-center space-x-[5px]">
                                                                <span className={"font-bold text-[18px] leading-[21px]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>{_info?.name}</span>
                                                                <svg className={(themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                                                                </svg>
                                                            </div>
                                                            <div className={"flex items-center space-x-[10px] font-bold text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>
                                                                <span className="truncate leading-[120%]">{_info?.tagLine}</span>
                                                            </div>
                                                            <span className={"text-[12px] leading-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>{_info?.bio?.length > 120 ? _info?.bio?.slice(0, 120) + "..." : _info?.bio}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-[10px] w-full">
                                                        <button className={"flex justify-center items-center space-x-[5px] h-[45px] flex-1 rounded-[5px] font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candybuttonmenu" : themeID === 3 ? " bg-[#313B95]" : "")} onClick={() => openProfile(dopple)}>View Profile</button>
                                                        <button className="relative flex-1 rounded-[5px] overflow-hidden opacity-0 pointer-events-none">
                                                            <div className={"absolute top-0 left-0 w-full h-[5px]" + (themeID === 0 ? " bg-[rgba(4,141,255,.50)]" : themeID === 1 ? " bg-[rgba(4,141,255,.50)]" : themeID === 2 ? " bg-[rgba(221,87,175,.5)]" : themeID === 3 ? " bg-[rgba(119,71,220,.5)]" : "")}>
                                                                <div className={"w-[30%] h-full" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-[#7747DC]" : "")} />
                                                            </div>
                                                            <div className={"flex justify-center items-center space-x-[5px] h-[45px] w-full font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " bg-button text-blue2" : themeID === 1 ? " bg-[#EDEDF0] text-subtextlight" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-galaxytitle" : "")}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="currentColor">
                                                                    <rect x="0.75" width="6" height="15" />
                                                                    <rect x="9.75" width="6" height="15" />
                                                                </svg>
                                                                <span>Stop Playing</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        }
                                    >
                                        <img className="w-[45px] h-[45px] rounded-[5px]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
                                    </HtmlTooltip>
                                    :
                                    <div className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="currentColor">
                                            <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z" />
                                        </svg>
                                    </div>
                                }
                                {_info &&
                                    <div className="flex flex-col items-start space-y-[5px] flex-1 w-0">
                                        <div className="flex items-center space-x-[5px] font-bold text-[18px] leading-[22px] w-full">
                                            <span className={"truncate leading-[120%]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>
                                                {_info?.name}
                                            </span>
                                            <svg className={(themeID === 0 ? " text-white" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z" />
                                            </svg>
                                            <HtmlTooltip
                                                className={"encrypted-tooltip"}
                                                placement="bottom-start"
                                                title={
                                                    <Fragment>
                                                        <div className={"flex flex-col items-start space-y-3 relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (themeID === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : themeID === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : themeID === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : themeID === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
                                                            <div className={"flex items-center space-x-[5px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-galaxytitle" : "")}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="currentColor">
                                                                    <path d="M3.79927 6.81818H9.20154V4.77273C9.20154 4.01989 8.93776 3.37713 8.41019 2.84446C7.88263 2.31179 7.24603 2.04545 6.5004 2.04545C5.75478 2.04545 5.11818 2.31179 4.59062 2.84446C4.06305 3.37713 3.79927 4.01989 3.79927 4.77273V6.81818ZM12.578 7.84091V13.9773C12.578 14.2614 12.4795 14.5028 12.2825 14.7017C12.0856 14.9006 11.8464 15 11.565 15H1.43578C1.15441 15 0.915246 14.9006 0.718288 14.7017C0.52133 14.5028 0.422852 14.2614 0.422852 13.9773V7.84091C0.422852 7.55682 0.52133 7.31534 0.718288 7.11648C0.915246 6.91761 1.15441 6.81818 1.43578 6.81818H1.77342V4.77273C1.77342 3.46591 2.23768 2.34375 3.16619 1.40625C4.09471 0.46875 5.20611 0 6.5004 0C7.7947 0 8.9061 0.46875 9.83462 1.40625C10.7631 2.34375 11.2274 3.46591 11.2274 4.77273V6.81818H11.565C11.8464 6.81818 12.0856 6.91761 12.2825 7.11648C12.4795 7.31534 12.578 7.55682 12.578 7.84091Z" />
                                                                </svg>
                                                                <span className="font-Inter font-bold text-[18px] leading-[22px]">Encrypted Chat</span>
                                                            </div>
                                                            <div className="flex items-start space-x-[10px]">
                                                                <span className={"font-Inter text-[14px] leading-[17px] max-w-[258px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>
                                                                    Dopple chats are secured with AES 256-bit end-to-end encryption.<br />
                                                                    <Link to="/terms" className={"font-bold" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-blue2" : "")}>Learn more.</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                }
                                            >
                                                <img className="w-[15px] h-[15px]" src="/images/explore/lock-green.svg" alt="" />
                                            </HtmlTooltip>
                                        </div>
                                        <div className={"flex items-center space-x-[10px] text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-galaxysubtext" : "")}>
                                            <span className="truncate leading-[120%]">
                                                {_info?.tagLine}
                                            </span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="flex items-center space-x-[10px]">
                                <button className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px] transition duration-800" + (themeID === 0 ? " bg-button hover:bg-[#34363C]" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]" : themeID === 2 ? " bg-candybutton hover:bg-candybuttonmenu" : themeID === 3 ? " bg-galaxybutton hover:bg-white" : "")} onClick={() => setOpenChatSettingsModal(true)}>
                                    {themeID === 0 && <img className="" src="/images/messages/settings/settings-dark.svg" alt="" />}
                                    {themeID === 1 && <img className="" src="/images/messages/settings/settings-light.svg" alt="" />}
                                    {themeID === 2 && <img className="" src="/images/messages/settings/settings-candy.svg" alt="" />}
                                    {themeID === 3 && <img className="" src="/images/messages/settings/settings-galaxy.svg" alt="" />}
                                </button>
                                <ClickAwayListener onClickAway={() => setOpenProfileMenu(false)}>
                                    <div className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px] cursor-pointer relative group" + (themeID === 0 ? " bg-button hover:bg-[#34363C] text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0] text-title" : themeID === 2 ? " bg-candybutton hover:bg-candybuttonmenu text-candytitle" : themeID === 3 ? " bg-galaxybutton hover:bg-galaxybuttonmenu text-white" : "")}
                                        onClick={() => {
                                            setOpenProfileMenu(!openProfileMenu)
                                            if (dopple) setDoppleIndex(dopple.chat_id)
                                        }}
                                    >
                                        <svg className={(themeID === 0 ? " text-blue2 group-hover:text-white" : themeID === 1 ? " text-subtextlight group-hover:text-title" : themeID === 2 ? " text-candysubtext group-hover:text-candytitle" : themeID === 3 ? " text-galaxybuttonmenu group-hover:text-white" : "")} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor" stroke="currentColor">
                                            <path d="M10.9841 5.96824C12.0799 5.96824 12.9683 5.07992 12.9683 3.98412C12.9683 2.88832 12.0799 2 10.9841 2C9.88832 2 9 2.88832 9 3.98412C9 5.07992 9.88832 5.96824 10.9841 5.96824Z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.0159 12.9365C9.92007 12.9365 9.03175 12.0482 9.03175 10.9524C9.03175 9.85658 9.92007 8.96826 11.0159 8.96826C12.1117 8.96826 13 9.85658 13 10.9524C13 12.0482 12.1117 12.9365 11.0159 12.9365Z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.9841 19.9048C12.0799 19.9048 12.9683 19.0164 12.9683 17.9206C12.9683 16.8248 12.0799 15.9365 10.9841 15.9365C9.88832 15.9365 9 16.8248 9 17.9206C9 19.0164 9.88832 19.9048 10.9841 19.9048Z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {openProfileMenu &&
                                            <div className={"flex flex-col items-start absolute top-[calc(100%+5px)] right-0 min-w-[193px] border font-semibold text-[14px] leading-[17px] rounded-[5px] z-[2] backdrop-blur-[25px] shadow-lg4 whitespace-nowrap overflow-hidden" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#C6CED8]" : themeID === 2 ? " bg-white border-[#FFEAF9]" : themeID === 3 ? " bg-galaxynav3 border-galaxybutton" : "")}>
                                                {profile ?
                                                    <Link to="/account" className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")}>
                                                        <div className="w-5 h-5 border border-white rounded-full overflow-hidden">
                                                            <img className="w-full h-full object-cover" src={profile?.pictures[profile?.picture] ?? "/images/blank-profile.svg"} alt="" />
                                                        </div>
                                                        <span>View Profile</span>
                                                    </Link>
                                                    :
                                                    <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={login}>
                                                        <img src="/images/nav/account.svg" alt="" />
                                                        <span>Login</span>
                                                    </button>
                                                }
                                                <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && archiveChat()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14.8166 12.5271L12.84 14.5038L12.8399 9.5401L11.1599 9.54013L11.16 14.5037L9.18339 12.5271L7.99545 13.7151L12 17.7196L16.0046 13.7151L14.8166 12.5271Z" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.22053 2.43872L1.85352 6.55079V21.5612H22.1482V6.55079L18.7812 2.43872H5.22053ZM4.46699 6.01082L6.01626 4.11872H17.9855L19.5348 6.01082H4.46699ZM3.53352 7.69082H20.4682V19.8812H3.53352V7.69082Z" />
                                                    </svg>
                                                    <span>Save & Restart Chat</span>
                                                </button>
                                                <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && duplicateChat()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.95273 1.71265V6.04888H2.77734V22.2873H17.0484V17.9511H21.2238V7.31198L16.276 1.71265H6.95273ZM15.3684 17.9511H6.95273V7.72888H4.45734V20.6073H15.3684V17.9511ZM8.63273 16.2711V3.39265H15.5186L19.5438 7.94788V16.2711H8.63273Z" />
                                                    </svg>
                                                    <span>Duplicate Chat</span>
                                                </button>
                                                <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && pinChat()}>
                                                    {pinnedChats(dopple?.chat_id)?.find(x => x.chat_id === dopple?.chat_id)?.pinned ?
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                            </svg>
                                                            <span>Unpin Chat</span>
                                                        </>
                                                        :
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M15.5951 1.19473L22.8785 8.47807L17.2239 14.1326L17.1888 16.5572L14.5466 19.1994L10.3041 14.957L5.05322 20.2079L3.86528 19.02L9.11619 13.7691L4.87376 9.52663L7.51596 6.88443L9.94054 6.84931L15.5951 1.19473ZM15.5951 3.57061L10.6465 8.51926L8.22189 8.55438L7.24964 9.52663L14.5466 16.8236L15.5188 15.8513L15.5539 13.4267L20.5026 8.47807L15.5951 3.57061Z" />
                                                            </svg>
                                                            <span>Pin Chat</span>
                                                        </>
                                                    }
                                                </button>
                                                <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full" + (themeID === 0 ? " text-white hover:bg-button" : themeID === 1 ? " text-title hover:bg-[#EDEDF0]" : themeID === 2 ? " text-candytitle hover:text-white hover:bg-candybuttonmenu" : themeID === 3 ? " text-galaxytitle hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && clearChat()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.51236 1.44434H15.2485L15.2485 7.93768L21.3767 7.93784V13.0275L22.8616 22.5549H1.13867L2.62358 13.0275V7.93784L9.51236 7.93768L9.51236 1.44434ZM4.1828 13.9326L3.10079 20.8749H8.18722V17.7439H9.86722V20.8749H14.7226V17.7439H16.4026V20.8749H20.8995L19.8175 13.9326H4.1828ZM19.6967 12.2526V9.61779L13.5685 9.61763L13.5685 3.12434H11.1924L11.1924 9.61764L4.30358 9.6178V12.2526H19.6967Z" />
                                                    </svg>
                                                    <span>Clear Messages</span>
                                                </button>
                                                <button className={"flex items-center space-x-[10px] px-5 h-10 font-normal text-[14px] leading-[17px] w-full text-[#E93131]" + (themeID === 0 ? " hover:bg-button" : themeID === 1 ? " hover:bg-[#EDEDF0]" : themeID === 2 ? " hover:bg-candybuttonmenu hover:text-white" : themeID === 3 ? " hover:bg-galaxybuttonmenu" : "")} onClick={() => dopple && deleteChat()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z" />
                                                        <path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z" />
                                                        <path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z" />
                                                    </svg>
                                                    <span>Delete Chat</span>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 h-0 relative">
                            {themeID === 2 && <img className="absolute w-full h-full object-cover" src="/images/messages/backs/candy.webp" alt="" />}
                            {themeID === 3 && <img className="absolute w-full h-full object-cover" src="/images/messages/backs/galaxy.webp" alt="" />}
                            {history.length === 0 && loadedMsgs &&
                                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] px-[15px] py-[10px] text-[16px] leading-[19px] shadow-lg6 w-max" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candynav text-candytitle" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle" : "")}>
                                    No messages here yet
                                </div>
                            }
                            <div className="flex-1 h-0 px-5 relative">
                                <div className="flex flex-col space-y-[10px] h-full overflow-auto pt-5" id="message-container" onScroll={handleScroll}>
                                    {loadedMsgs ?
                                        (history.length > 0 && _info &&
                                            <>
                                                {history.map((x, i) =>
                                                    <Fragment key={i}>
                                                        {i === 0 &&
                                                            <>
                                                                <div className={"mx-auto px-[10px] py-[5px] rounded-[10px] w-fit text-[12px] leading-[14px] text-center max-w-[80%]" + (themeID === 0 ? " bg-nav-desktop text-subtext shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                    Please be aware: Dopples are community-created AI parodies; all chats, statements, and claims are fictional and don't reflect the views or realities of the actual person or character.
                                                                </div>
                                                                <div className={"mx-auto px-[10px] py-[5px] rounded-[20px] w-fit text-[14px] leading-[17px]" + (themeID === 0 ? " bg-nav-desktop shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                    {threadDate(new Date(history[0].timestamp * 1000))}
                                                                </div>
                                                            </>
                                                        }
                                                        {(i > 0 && (new Date(history[i].timestamp * 1000).getTime() - new Date(history[i - 1].timestamp * 1000).getTime()) / (1000 * 3600 * 24) >= 1) &&
                                                            <div className={"mx-auto px-[10px] py-[5px] rounded-[20px] w-fit text-[14px] leading-[17px]" + (themeID === 0 ? " bg-nav-desktop shadow-lg6" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-[rgba(69,25,80,.35)] text-white" : themeID === 3 ? " bg-[rgba(11,3,16,.75)] text-galaxytitle shadow-lg6" : "")}>
                                                                {threadDate(new Date(history[i].timestamp * 1000))}
                                                            </div>
                                                        }
                                                        <div className={"flex items-end group" + (x?.new ? " bubble" : "") + (alignment === 0 && x?.message?.type === "human" ? " flex-row-reverse" : "")}>
                                                            {x?.message?.type === "ai" &&
                                                                <>
                                                                    <img className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" src={_info.avatarURL + "?tr=w-100,h-100"} alt="" />
                                                                    <div className={"msg-para max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] " + (alignment === 0 && x?.message?.type === "human" ? "mr-[10px]" : "ml-[10px]") + (x?.message?.data.content?.length <= 7 ? " text-center" : "") + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-[#FFEAF9] border-[#FFCAFA] text-candytitle" : themeID === 3 ? " bg-[#181431] border-[#231C4E]" : "")}>
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
                                                                                <div className={"absolute top-1/2 -translate-y-1/2" + (alignment === 1 ? " pl-[10px] left-full" : (x?.message?.type === "ai" ? " pl-[10px] left-full" : " left-[-65px]"))}>
                                                                                    <div className="flex items-center">
                                                                                        {i === history.length - 1 && i > 0 &&
                                                                                            <svg className={"cursor-pointer mr-[5px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor" onClick={() => !sending && reroll()}>
                                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.876 15.6239C7.467 16.5926 8.3205 17.374 9.33752 17.8773C10.3545 18.3806 11.4934 18.5853 12.622 18.4676C13.7507 18.35 14.8228 17.9148 15.7142 17.2125C16.6055 16.5103 17.2795 15.5697 17.658 14.4999H19.748C19.3645 15.9823 18.5638 17.3235 17.441 18.3644C16.3181 19.4054 14.9202 20.1023 13.4131 20.3727C11.906 20.643 10.3531 20.4754 8.9384 19.8896C7.52374 19.3038 6.30682 18.3246 5.432 17.0679L3 19.4999V13.4999H9L6.876 15.6239ZM17.125 9.37494C16.5337 8.40611 15.6799 7.62472 14.6626 7.1214C13.6452 6.61807 12.5061 6.41342 11.3772 6.53118C10.2483 6.64894 9.17589 7.08428 8.28434 7.78672C7.3928 8.48916 6.71863 9.42993 6.34 10.4999H4.25C4.63336 9.01705 5.4341 7.67526 6.55719 6.63381C7.68028 5.59237 9.07858 4.89498 10.5861 4.62442C12.0937 4.35386 13.6472 4.52148 15.0624 5.10739C16.4775 5.6933 17.6949 6.6729 18.57 7.92994L21 5.49994V11.4999H15L17.125 9.37494Z" />
                                                                                            </svg>
                                                                                        }
                                                                                        {/* <CopyButtonDesktop txt={x?.message?.data?.content} themeID={themeID} /> */}
                                                                                        {/* {i === history.length - 1 &&
                                                                                            <svg className={"ml-[5px] invisible group-hover:visible cursor-pointer" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" onClick={openDeleteMsgModal}><path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z"></path><path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z"></path><path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z"></path></svg>
                                                                                        } */}
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </>
                                                            }
                                                            {x?.message?.type === "human" &&
                                                                <>
                                                                    <img className={"min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" + (history[i + 1]?.message?.type === history[i]?.message?.type ? " opacity-0" : " opacity-1")} src={profile?.pictures[profile?.picture] ?? "/images/blank-profile.svg"} alt="" />
                                                                    <div className={"msg-para max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FF8BA0] border-[#FF7A92]" : themeID === 3 ? "bg-[#313B95] border-[#434FB6]" : "")) + (x?.message?.data.content?.length <= 7 ? " text-center" : "")}>
                                                                        <div className="flex items-end space-x-[5px]">
                                                                            <span className="flex-1" style={{ fontSize: textSize + "px", lineHeight: (textSize + 3) + "px" }}>
                                                                                <AsteriskText text={x?.message?.data.content} sender="human" />
                                                                            </span>
                                                                            {editedIndexes.some(x => x === i) &&
                                                                                <span className="italic" style={{ fontSize: (textSize - 2) + "px", lineHeight: (textSize + 1) + "px" }}>edited</span>
                                                                            }
                                                                        </div>
                                                                        <div className={"absolute top-1/2 -translate-y-1/2" + (alignment === 1 ? " pl-[10px] left-full" : (x?.message?.type === "ai" ? " pl-[10px] left-full" : " left-[-65px]"))}>
                                                                            <div className="flex items-center space-x-[5px]">
                                                                                {/* <CopyButtonDesktop txt={x?.message?.data?.content} themeID={themeID} /> */}
                                                                                {i === history.length - 2 &&
                                                                                    <>
                                                                                        <button className={"flex justify-center items-center w-[25px] h-[25px] rounded-[5px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} onClick={() => setEditIndex(i)}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
                                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.30892 17.5229H15.9756C16.1966 17.5229 16.4086 17.6107 16.5648 17.767C16.7211 17.9233 16.8089 18.1352 16.8089 18.3563C16.8089 18.5773 16.7211 18.7892 16.5648 18.9455C16.4086 19.1018 16.1966 19.1896 15.9756 19.1896H4.30892C4.08791 19.1896 3.87594 19.1018 3.71966 18.9455C3.56338 18.7892 3.47559 18.5773 3.47559 18.3563C3.47559 18.1352 3.56338 17.9233 3.71966 17.767C3.87594 17.6107 4.08791 17.5229 4.30892 17.5229ZM3.47559 13.3562L11.8089 5.02274L14.3089 7.52278L5.97559 15.8562H3.47559V13.3562ZM12.6423 4.1894L14.3089 2.52271L16.8089 5.02274L15.1414 6.69026L12.6423 4.1894Z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                        <svg className={"cursor-pointer" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" onClick={openDeleteMsgModal}><path fillRule="evenodd" clipRule="evenodd" d="M2.1875 6.02938V4.34938H8.65941V1.08838H15.341V4.34938H21.8129V6.02938H2.1875ZM13.661 4.34938V2.76838H10.3394V4.34938H13.661Z"></path><path d="M9.09301 17.2609V13.5973H10.773V17.2609H9.09301Z"></path><path d="M13.2274 13.5973V17.2609H14.9074V13.5973H13.2274Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.59066 7.94645H19.4108V22.9117H4.59066V7.94645ZM6.27066 9.62645V21.2317H17.7308V9.62645H6.27066Z"></path></svg>
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                    </Fragment>
                                                )}
                                                {history[history.length - 1]?.message?.type === "human" &&
                                                    <div className="flex items-end bubble">
                                                        <img className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-[5px]" src={_info.avatarURL + "?tr=w-100,h-100"} alt="" />
                                                        <div className={"rounded-[10px] rounded-bl-[0px] px-[10px] py-4 text-[16px] leading-[19px] ml-[10px] border" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candysubtext border-[#FF71CE]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                                                            <Typing themeID={themeID} />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        )
                                        :
                                        <MessageLoader themeID={themeID} />
                                    }
                                    <div ref={messageContainer} />
                                </div>
                            </div>
                            <div className={"relative" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-candynav" : themeID === 3 ? " bg-galaxynav" : "")}>
                                {editIndex >= 0 &&
                                    <div className={"flex items-center space-x-[10px] pl-[30px] pr-5 h-[70px] border-t" + (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? " border-[#EDEDF0]" : themeID === 3 ? " border-galaxybutton" : "")}>
                                        <div className="flex items-center flex-1 w-0">
                                            <svg className={"text-blue2"} xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.25 23H18.75C19.0815 23 19.3995 23.1317 19.6339 23.3661C19.8683 23.6005 20 23.9185 20 24.25C20 24.5815 19.8683 24.8995 19.6339 25.1339C19.3995 25.3683 19.0815 25.5 18.75 25.5H1.25C0.918479 25.5 0.600537 25.3683 0.366117 25.1339C0.131696 24.8995 0 24.5815 0 24.25C0 23.9185 0.131696 23.6005 0.366117 23.3661C0.600537 23.1317 0.918479 23 1.25 23ZM0 16.75L12.5 4.25L16.25 8L3.75 20.5H0V16.75ZM13.75 3L16.25 0.5L20 4.25L17.4988 6.75125L13.75 3Z" />
                                            </svg>
                                            <div className={"w-[2px] h-[45px] ml-[15px] bg-blue2"} />
                                            <div className="flex flex-col space-y-[5px] flex-1 w-0 ml-[10px]">
                                                <span className={"font-bold text-[14px] leading-[17px] text-blue2"}>Edit Message</span>
                                                <span className={"text-[16px] leading-[19px] truncate" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : themeID === 3 ? " text-white" : "")}>{history[editIndex]?.message?.data?.content}</span>
                                            </div>
                                        </div>
                                        <button className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px] transition duration-800" + (themeID === 0 ? " bg-button hover:bg-[#34363C] text-blue2" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0] text-blue2" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-galaxybuttonmenu" : "")} onClick={() => { setEditIndex(-1); setMsg("") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" stroke="currentColor">
                                                <path d="M3 2.5L18 17.5M3 17.5L18 2.5" strokeWidth="3" strokeLinecap="square" />
                                            </svg>
                                        </button>
                                    </div>
                                }
                                <div className={"flex items-center space-x-[10px] pl-[10px] pr-5 h-[70px] border-t" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav border-candybuttonhighlight" : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
                                    <input className={"px-5 h-[45px] rounded-[5px] caret-blue2 flex-1 w-0 text-[18px] leading-[21.48px]" + (themeID === 0 ? " placeholder-subtext" : themeID === 1 ? " text-title placeholder-subtext" : themeID === 2 ? " text-candytitle placeholder-candysubtext" : themeID === 3 ? " text-galaxytitle placeholder-galaxysubtext" : "")} placeholder={"Message " + (_info ? _info.name : "") + "..."} value={msg} onChange={e => setMsg(e.target.value)} autoFocus onKeyDown={e => keyDown(e)} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} disabled={!(dopple || _info)} />
                                    {editIndex >= 0 ?
                                        <button className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px] disabled:cursor-not-allowed" + (themeID === 0 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 1 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 2 ? " bg-candybuttonmenu disabled:bg-[#FFE4F8]" : themeID === 3 ? " bg-blue2 disabled:bg-galaxybuttonmenu hover:enabled:bg-blue3" : "")} disabled={msg?.trim()?.length === 0 || editing || history[editIndex]?.message?.data?.content === msg} onClick={edit} ref={sendRef}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                                                <path d="M1.5 9.66667L8.16667 16.3333L21.5 3" stroke="white" strokeWidth="3" />
                                            </svg>
                                        </button>
                                        :
                                        <button className={"flex justify-center items-center w-[45px] h-[45px] rounded-[5px] disabled:cursor-not-allowed" + (themeID === 0 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 1 ? " bg-blue2 disabled:bg-subtext hover:enabled:bg-blue3" : themeID === 2 ? " bg-candybuttonmenu disabled:bg-[#FFE4F8]" : themeID === 3 ? " bg-blue2 disabled:bg-galaxybuttonmenu hover:enabled:bg-blue3" : "")} disabled={msg?.trim()?.length === 0 || sending || !_info || !loadedMsgs || !loadedDopples} onClick={() => toggleTextStream ? sendStreamText() : send()} ref={sendRef}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                                <path d="M20.1334 11.2445L1.50718 21.0566C1.00623 21.3205 0.419135 20.8988 0.509228 20.3399L1.42345 14.6674C1.53761 13.959 2.03668 13.3732 2.71786 13.1479L10.3801 10.6135L2.77321 8.43817C2.06187 8.23475 1.53035 7.64121 1.40636 6.91181L0.514586 1.66581C0.420876 1.11455 0.990114 0.688399 1.49265 0.933604L20.1144 10.0198C20.6197 10.2664 20.6308 10.9825 20.1334 11.2445Z" fill="white" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <DeleteThreadConfirmModal deleteConfirm={deleteThreadConfirm} />
            <DeleteConfirmModal deleteConfirm={deleteConfirm} />
            <PinConfirmModal pinConfirm={pinConfirm} />
            <ArchiveConfirmModal archiveConfirm={archiveConfirm} />
            <DuplicateConfirmModal duplicateConfirm={duplicateConfirm} />
            <ClearConfirmModal clearConfirm={clearConfirm} />
            <VoiceCaptionsModal voiceConfirm={voiceConfirm} />
            <LLMActivateModal />
        </div>
    )
}

export default Messages;
