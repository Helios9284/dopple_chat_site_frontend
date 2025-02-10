import React, { useRef, useContext, useState, useMemo } from "react";
import { Modal, Zoom } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import Lottie from "react-lottie";
import * as specAnim from '../animations/Spectrum.json';
import { useCookies } from "react-cookie";

const VoiceCaptionsModal = ({ voiceConfirm }) => {
	const [, setCookies] = useCookies(["voiceCaption"]);
	const { openVoiceCaptionsModal: open, setOpenVoiceCaptionsModal, voiceCaptionConfirmContent, dopplesInfo } = useContext(RefContext);
	const [doing, setDoing] = useState(false);
	const [openGrows, setOpenGrows] = useState(false);
	let container = useRef();

	const _info = dopplesInfo.find(x => x.sender === voiceCaptionConfirmContent?.dopple_name)

	const defaultOption = {
		loop: true,
		autoplay: true,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}
	const option1 = {
		...defaultOption,
		animationData: specAnim,
	}

	const close = async () => {
		setOpenVoiceCaptionsModal(false);
	};

	const keepOn = async () => {
		await voiceConfirm()
		close()
		setCookies("voiceCaption", "on")
	}

	const turnOff = async () => {
		await voiceConfirm()
		close()
		setCookies("voiceCaption", "off")
	}

	useMemo(() => {
		if (open) {
			setTimeout(() => setOpenGrows(true), 250)
			setDoing(false)
		} else {
			setOpenGrows(false)
		}
	}, [open])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none w-[calc(100vw-40px)] max-w-[388px]"} ref={container}>
					<Zoom in timeout={300}>
						<div className={"flex flex-col items-center p-[30px] rounded-[10px] bg-nav-desktop transition-body" + (openGrows ? " grown" : "")}>
							<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative bg-button text-subtext"}>
								<img className="rounded-[8.33px] absolute w-full h-full z-[1]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
							</div>
							<div className="flex items-center space-x-[5px] mt-[5px] h-5 delay-[200ms]">
								<Lottie width={36.95} height={20} options={option1} isClickToPauseDisabled />
							</div>
							<div className="flex justify-center items-center space-x-[5px] font-bold text-[24px] leading-[28px] text-white mt-[15px] delay-[300ms] text-center">
								<span>Voice Captions Enabled</span>
							</div>
							<span className="mt-[10px] text-[16px] leading-[19px] text-subtext text-center delay-[400ms]">Voice captions can be toggled in settings anytime.</span>
							<div className="flex items-center space-x-[10px] mt-[30px] w-full delay-[500ms]">
								<button className="flex justify-center items-center flex-1 h-[45px] rounded-[5px] font-bold text-[16px] leading-[19px] bg-blue2 text-white disabled:opacity-70" onClick={keepOn} disabled={doing}>Keep on</button>
								<button className="flex justify-center items-center flex-1 h-[45px] rounded-[5px] font-semibold text-[16px] leading-[19px] bg-subtext text-white disabled:opacity-70" onClick={turnOff} disabled={doing}>Turn off</button>
							</div>
						</div>
					</Zoom>
				</div>
			</div>
		</Modal>
	)
}

export default VoiceCaptionsModal;
