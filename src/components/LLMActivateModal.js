import React, { useRef, useContext, useState, useMemo } from "react";
import { Modal, Zoom } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setDopples } from "../redux/reducers/ChatReducer";
import axios from "../utilities/axiosConfig";

const LLMActivateModal = () => {
	const dispatch = useDispatch()
	const [cookies] = useCookies(["userid", "profile", "themeid", "voiceCaption", "textStream"])
	const profile = useSelector(store => store.AuthReducer.profile)
	const dopples = useSelector(store => store.ChatReducer.dopples);
	const { openLLMActivateModal: open, setOpenLLMActivateModal, setHasAccessToLLM, setDopple } = useContext(RefContext)
	const [doing, setDoing] = useState(false)
	let container = useRef()

	const close = async () => {
		setOpenLLMActivateModal(false);
	};

	const getIn = async () => {
		setDoing(true);
		try {
			const { data: { success } } = await axios.post("/chat/savedAndRestartAllChats", {
				username: profile?.email ?? cookies?.userid
			})
			if (success) {
				const { data: { data } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
				dispatch(setDopples({ arr: data }))

				const { data: { data: { has_talked_to_nsfw_llm } } } = await axios.post("/chat/hasTalkedNSFW_LLM", {
					username: profile?.email ?? cookies?.userid
				})
				setHasAccessToLLM(has_talked_to_nsfw_llm)

				setDopple()
				close()
			}
		} catch (e) {
			console.log(e)
		}
		setDoing(false)
	}

	useMemo(async () => {
		if ((profile?.email ?? cookies?.userid) && dopples) {
			if (dopples?.active_chats?.length + dopples?.saved_chats?.length === 0) return
			const { data: { data: { has_talked_to_nsfw_llm } } } = await axios.post("/chat/hasTalkedNSFW_LLM", {
				username: profile?.email ?? cookies?.userid
			})
			const { data: { data: { is_nsfw_enabled_user } } } = await axios.post("/chat/isNSFWEnabledUser", {
				username: profile?.email ?? cookies?.userid
			})
			if (is_nsfw_enabled_user === false) return
			setOpenLLMActivateModal(!has_talked_to_nsfw_llm)
		}
	}, [profile?.email, cookies?.userid, dopples])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none rounded-[10px] w-[calc(100vw-40px)] max-w-[388px] overflow-hidden"} ref={container}>
					<Zoom in timeout={300}>
						<div className="bg-nav-desktop">
							<div className="flex flex-col items-center p-[30px]">
								{doing ?
									<div>
										<img className="llm-loading" src="/images/messages/llm-loading.png" alt="" />
									</div>
									:
									<Zoom in>
										<img src="/images/messages/llm-check.svg" alt="" />
									</Zoom>
								}
								<span className="mt-[30px] font-bold text-[24px] leading-[28px]">Dopple LLM Activated</span>
								<span className="mt-[10px] text-[16px] leading-[19px] text-subtext">In order to activate our new LLM we will need to save & restart your previous chats.</span>
								<button className="flex justify-center items-center mt-[30px] w-full h-[45px] rounded-[5px] bg-blue2 font-bold text-[16px] leading-[19px] disabled:opacity-50 disabled:cursor-not-allowed" onClick={getIn} disabled={doing}>
									Sounds good, let me in!
								</button>
							</div>
						</div>
					</Zoom>
				</div>
			</div>
		</Modal>
	)
}

export default LLMActivateModal;
