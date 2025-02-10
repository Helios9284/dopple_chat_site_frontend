import React, { useRef, useContext, useState, useMemo } from "react";
import { Modal } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";

const DuplicateConfirmModal = ({ duplicateConfirm }) => {
	const { openDuplicateConfirmModal: open, setOpenDuplicateConfirmModal, duplicateConfirmContent, dopplesInfo } = useContext(RefContext);
	const [doing, setDoing] = useState(false);
	let container = useRef();
	const _info = dopplesInfo.find(x => x.sender === duplicateConfirmContent?.dopple_name)

	const close = async () => {
		setOpenDuplicateConfirmModal(false);
	};

	const duplicateChat = async () => {
		setDoing(true);
		await duplicateConfirm()
		close()
		setDoing(false);
	}

	useMemo(() => {
		if(open) setDoing(false)
	}, [open])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none rounded-[10px] bg-nav-desktop w-[calc(100vw-40px)] max-w-[388px]"} ref={container}>
					<div className="flex flex-col items-center p-[30px]">
						<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative bg-button text-subtext"}>
							<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 22 23" fill="currentColor">
								<path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z" />
							</svg>
							<img className="rounded-[8.33px] absolute w-full h-full z-[1]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
						</div>
						<div className="flex justify-center items-center space-x-[5px] font-bold text-[24px] leading-[28px] text-white mt-[30px]">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="currentColor">
								<path fillRule="evenodd" clipRule="evenodd" d="M6.95273 2.21265V6.54888H2.77734V22.7873H17.0484V18.4511H21.2238V7.81198L16.276 2.21265H6.95273ZM15.3684 18.4511H6.95273V8.22888H4.45734V21.1073H15.3684V18.4511ZM8.63273 16.7711V3.89265H15.5186L19.5438 8.44788V16.7711H8.63273Z" />
							</svg>
							<span>Duplicate Chat</span>
						</div>
						<span className="mt-[10px] text-[16px] leading-[19px] text-subtext text-center">Are you sure you want to duplicate your chat with {_info?.name}?</span>
						<div className="flex items-center space-x-[10px] mt-[30px] w-full">
							<button className="flex justify-center items-center flex-1 h-[45px] rounded-[5px] font-bold text-[16px] leading-[19px] text-nav-desktop bg-white disabled:opacity-70" onClick={close} disabled={doing}>Cancel</button>
							<button className="flex justify-center items-center flex-1 h-[45px] rounded-[5px] font-bold text-[16px] leading-[19px] text-white bg-blue2 disabled:opacity-70" onClick={duplicateChat} disabled={doing}>Duplicate</button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default DuplicateConfirmModal;
