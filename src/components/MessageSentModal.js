import React, { useRef, useContext } from "react";
import { Modal } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import { Link } from "react-router-dom";

const MessageSentModal = () => {
	const { openMessageSentModal: open, setOpenMessageSentModal } = useContext(RefContext);
	let container = useRef();

	const close = async () => {
		setOpenMessageSentModal(false);
	};

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none rounded-[10px] bg-nav-desktop w-[calc(100vw-40px)] max-w-[512px]"} ref={container}>
					<div className="flex flex-col items-center px-[48px] py-[51px]">
						<svg width="175" height="116" viewBox="0 0 175 116" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="2.5" y="2.5" width="158.962" height="100" rx="11.6346" stroke="white" strokeWidth="5" />
							<path d="M3.22906 6.46146L69.4779 53.3467C76.397 58.2434 85.6379 58.2975 92.6138 53.482L160.729 6.46146" stroke="white" strokeWidth="5" />
							<path d="M6 98L54 44" stroke="white" strokeWidth="5" />
							<path d="M157 98L109 42" stroke="white" strokeWidth="5" />
							<circle cx="81.5846" cy="52.5865" r="19.5865" fill="white" />
							<path fillRule="evenodd" clipRule="evenodd" d="M77.1986 44.623C77.5646 42.5736 79.3559 41.0179 81.5106 41.0179C87.8791 41.0179 93.0706 46.2839 93.0706 52.6843C93.0706 59.2031 87.7831 64.5669 81.2961 64.5669H72.2969C70.6259 64.5669 69.0452 63.8082 68 62.5045C68 65.3102 70.2745 67.5848 73.0803 67.5848H81.2961C89.4815 67.5848 96.0885 60.8379 96.0885 52.6843C96.0885 44.6491 89.5776 38 81.5106 38C77.4247 38 74.1124 41.3123 74.1124 45.3982V58.0771H72.368C71.6223 58.0771 71.0179 57.4726 71.0179 56.727V44.7193V44.5685C71.0179 41.9896 72.3495 39.5936 74.5394 38.2318C70.9565 38.2318 68 41.1364 68 44.7193V56.727C68 59.1394 69.9556 61.095 72.368 61.095H81.8637C86.4123 61.095 90.0996 57.4076 90.0996 52.859C90.0996 48.3104 86.4123 44.623 81.8637 44.623H77.1986ZM81.8636 58.0771H77.1302V47.6409H81.8636C84.7455 47.6409 87.0817 49.9771 87.0817 52.859C87.0817 55.7409 84.7455 58.0771 81.8636 58.0771Z" fill="url(#paint0_linear_18_14)" />
							<circle cx="150" cy="91" r="22.5" fill="#1B1C20" stroke="#048DFF" strokeWidth="5" />
							<path d="M139 91.1317L147.132 99.2635L163.395 83" stroke="#048DFF" strokeWidth="5" />
							<defs>
								<linearGradient id="paint0_linear_18_14" x1="68" y1="57.6012" x2="97.666" y2="49.615" gradientUnits="userSpaceOnUse">
									<stop stopColor="#141414" />
									<stop offset="0.09375" stopColor="#111111" />
									<stop offset="0.21875" stopColor="#141414" />
									<stop offset="0.453125" stopColor="#1B1B1B" />
									<stop offset="0.524381" stopColor="#171717" />
									<stop offset="0.796875" stopColor="#131313" />
									<stop offset="0.895833" stopColor="#181818" />
									<stop offset="1" stopColor="#0F0F0F" />
								</linearGradient>
							</defs>
						</svg>
						<span className="mt-[46px] font-bold text-[24px] leading-[27px]">Message Sent</span>
						<span className="mt-7 text-[14px] leading-[24px] text-[#CACFD2] text-center">Your message has been delivered successfully. Expect a response within 24 hours.</span>
						<Link to="/" className="mt-7 flex justify-center items-center w-[203px] h-[45px] bg-blue2 rounded-[5px] font-bold text-[14px] leading-[17px]" onClick={close}>Continue</Link>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default MessageSentModal;
