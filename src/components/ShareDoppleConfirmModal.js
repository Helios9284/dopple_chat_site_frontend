import React, { useRef, useContext, useState, useMemo } from "react";
import { Modal, Zoom } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";

const ShareDoppleConfirmModal = ({ shareConfirm }) => {
	const { openShareDoppleConfirmModal: open, setOpenShareDoppleConfirmModal, shareDoppleConfirmContent } = useContext(RefContext);
	const [doing, setDoing] = useState(false);
	let container = useRef();
	const _info = shareDoppleConfirmContent

	const close = async () => {
		setOpenShareDoppleConfirmModal(false);
	};

	const shareDopple = async () => {
		setDoing(true);
		close()
		setDoing(false);
	}

	useMemo(() => {
		if (open) setDoing(false)
	}, [open])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none rounded-[10px] w-[388px] overflow-hidden"} ref={container}>
					<Zoom in timeout={300}>
						<div className="bg-nav-desktop">
							<div className="flex flex-col items-center p-[30px] relative">
								<svg className="absolute top-0 right-0 cursor-pointer" onClick={close} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
									<path d="M0 0H25C27.7614 0 30 2.23858 30 5V30H5C2.23858 30 0 27.7614 0 25V0Z" fill="#23252B" />
									<path d="M10 10L20 20M10 20L20 10" stroke="#8A939D" stroke-width="2" stroke-linecap="square" />
								</svg>
								<div className={"flex justify-center items-center w-[100px] h-[100px] rounded-[5px] relative bg-button text-subtext"}>
									<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 22 23" fill="currentColor">
										<path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M7.57083 5.70961C7.84146 4.18094 9.16599 3.02055 10.7592 3.02055C15.4682 3.02055 19.3069 6.94847 19.3069 11.7225C19.3069 16.5849 15.3972 20.5858 10.6006 20.5858H3.95682C2.7153 20.5858 1.54162 20.0193 0.769165 19.0474C0.769165 21.1402 2.46573 22.8368 4.55856 22.8368H10.6006C16.6531 22.8368 21.5384 17.8043 21.5384 11.7225C21.5384 5.72907 16.7241 0.769531 10.7592 0.769531C7.73797 0.769531 5.28879 3.24017 5.28879 6.28786V15.745H3.99894C3.44759 15.745 3.00064 15.2942 3.00064 14.738V5.78142V5.6496C3.00064 3.73697 3.98431 1.95878 5.60456 0.942458C2.93405 0.942458 0.769165 3.1109 0.769165 5.78142V14.738C0.769165 16.5374 2.21519 17.996 3.99894 17.996H11.0203C14.3836 17.996 17.1101 15.2456 17.1101 11.8528C17.1101 8.46003 14.3836 5.70961 11.0203 5.70961H7.57083ZM10.9748 15.6954H7.4748V7.91098H10.9748C13.1057 7.91098 14.8332 9.65358 14.8332 11.8032C14.8332 13.9528 13.1057 15.6954 10.9748 15.6954Z" />
									</svg>
									<img className="rounded-[8.33px] absolute w-full h-full z-[1]" src={_info?.avatarURL + "?tr=w-200,h-200"} alt="" />
								</div>
								<div className="flex justify-center items-center space-x-[5px] font-bold text-[24px] leading-[28px] text-white mt-[15px]">
									<span>{_info?.name}</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M15.8679 3.71352L14.1824 0.5L10.9483 2.14566L7.69589 0.536559L6.04675 3.76887L2.46967 4.37881L3.0354 7.96315L0.5 10.5592L3.0645 13.1264L2.53921 16.7169L6.12294 17.2865L7.8084 20.5L11.0425 18.8543L14.2949 20.4634L15.9441 17.2311L19.5211 16.6212L18.9554 13.0369L21.4908 10.4408L18.9263 7.87358L19.4516 4.2831L15.8679 3.71352ZM15.1396 9.03512L13.8179 7.71339L10.2271 11.304L8.17271 9.24947L6.851 10.5711L10.2271 13.9473L15.1396 9.03512Z" fill="white" />
									</svg>
								</div>
								<span className="mt-[30px] font-semibold text-[18px] leading-[21px] self-start">Share Dopple Link:</span>
								<div className="flex space-x-[10px] mt-[15px] w-full h-[50px]">
									<div className="flex-1 bg-button rounded-[5px] p-4 text-[14px] leading-[17px]">
										dopple.ai/ruby-rose-245
									</div>
									<button className="flex justify-center items-center space-x-[5px] w-[113px] rounded-[5px] font-semibold text-[14px] leading-[17px] text-white bg-blue2 disabled:opacity-70" onClick={shareDopple} disabled={doing}>
										<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
											<path fillRule="evenodd" clipRule="evenodd" d="M7.61719 0H21.1475V13.5303H16.3816V4.76538H7.61719V0ZM14.3838 6.76514H0.853516V20.2954H14.3838V6.76514ZM10.4468 12.6681H4.86306V11.3681H10.4468V12.6681ZM11.1924 15.4532H4.11719V14.1532H11.1924V15.4532Z" fill="white" />
										</svg>
										<span>Copy link</span>
									</button>
								</div>
							</div>
						</div>
					</Zoom>
				</div>
			</div>
		</Modal>
	)
}

export default ShareDoppleConfirmModal;
