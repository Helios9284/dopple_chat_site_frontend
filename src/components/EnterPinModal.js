import React, { useContext, useMemo, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";

const EnterPinModal = () => {
	const [code1, setCode1] = useState("");
	const [code2, setCode2] = useState("");
	const [code3, setCode3] = useState("");
	const [code4, setCode4] = useState("");
	const [code] = useState("1111");
	const { themeID, openPinCodeModal: open, setOpenPinCodeModal } = useContext(RefContext);
	let container = useRef();
	let ref1 = useRef();
	let ref2 = useRef();
	let ref3 = useRef();
	let ref4 = useRef();

	const close = async () => {
		setOpenPinCodeModal(false);
	};

	useMemo(() => { if (code1.length === 1 && ref2?.current) ref2?.current?.focus() }, [code1])
	useMemo(() => { if (code2.length === 1 && ref3?.current) ref3?.current?.focus() }, [code2])
	useMemo(() => { if (code3.length === 1 && ref4?.current) ref4?.current?.focus() }, [code3])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" ref={container}>
					<div className={"outline-none rounded-[10px] shadow-lg" + (themeID === 0 ? " bg-nav-desktop" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-nav-desktop" : "")}>
						<button className={"flex justify-center items-center absolute top-0 right-0 w-[30px] h-[30px] rounded-tr-[10px] rounded-bl-[10px] z-[1]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-subtextlight" : themeID === 2 ? " bg-[#EDEDF0] text-subtextlight" : themeID === 3 ? " bg-button text-subtext" : "")} onClick={close}>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M2 2L12 12M2 12L12 2" stroke="#8A939D" stroke-width="2" stroke-linecap="square" />
							</svg>
						</button>
						<div className="flex flex-col items-center px-[30px] py-5 relative">
							{themeID === 0 && <img src="/images/vault/enterpin-dark.svg" alt="" />}
							{themeID === 1 && <img src="/images/vault/enterpin-light.svg" alt="" />}
							{themeID === 2 && <img src="/images/vault/enterpin-light.svg" alt="" />}
							{themeID === 3 && <img src="/images/vault/enterpin-dark.svg" alt="" />}
							<span className={"mt-[15px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
								Enter Your Pin
							</span>
							{(code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4) ?
								<span className={"mt-[30px] font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-[#E93131]" : themeID === 1 ? " text-[#E93131]" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									Wrong Pincode!
								</span>
								:
								<span className={"mt-[30px] font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									Enter your 4 digit pincode.
								</span>
							}
							<div className="flex space-x-[10px] codebox mt-[15px] mb-[30px]">
								<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative overflow-hidden border" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + ((code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4) ? " border-[#E93131] text-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? "" : ""))}>
									<input className={"w-[31px] h-full font-bold text-[40px] leading-[40px]" + (themeID === 0 ? " placeholder-button" : themeID === 1 ? " placeholder-[#EDEDF0] text-title" : themeID === 2 ? "" : "")} placeholder="0" maxLength={1} value={code1} onChange={e => e.target.value.length <= 1 && setCode1(e.target.value)} ref={ref1} type="number" />
									{code1.length === 1 && document.activeElement !== ref1.current && ref1.current &&
										<div className={"flex justify-center items-center absolute top-0 left-0 w-full h-full font-bold text-[40px] leading-[40px] pointer-events-none" + (themeID === 0 ? " bg-[rgb(20,21,24)]" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + (code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4 ? " text-[#E93131]" : " text-blue2")}>
											<span className="-mt-1">∗</span>
										</div>
									}
								</div>
								<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative overflow-hidden border" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + ((code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4) ? " border-[#E93131] text-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? "" : ""))}>
									<input className={"w-[31px] h-full font-bold text-[40px] leading-[40px]" + (themeID === 0 ? " placeholder-button" : themeID === 1 ? " placeholder-[#EDEDF0] text-title" : themeID === 2 ? "" : "")} placeholder="0" maxLength={1} value={code2} onChange={e => e.target.value.length <= 1 && setCode2(e.target.value)} ref={ref2} type="number" />
									{code2.length === 1 && document.activeElement !== ref2.current && ref2.current &&
										<div className={"flex justify-center items-center absolute top-0 left-0 w-full h-full font-bold text-[40px] leading-[40px] pointer-events-none" + (themeID === 0 ? " bg-[rgb(20,21,24)]" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + (code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4 ? " text-[#E93131]" : " text-blue2")}>
											<span className="-mt-1">∗</span>
										</div>
									}
								</div>
								<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative overflow-hidden border" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + ((code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4) ? " border-[#E93131] text-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? "" : ""))}>
									<input className={"w-[31px] h-full font-bold text-[40px] leading-[40px]" + (themeID === 0 ? " placeholder-button" : themeID === 1 ? " placeholder-[#EDEDF0] text-title" : themeID === 2 ? "" : "")} placeholder="0" maxLength={1} value={code3} onChange={e => e.target.value.length <= 1 && setCode3(e.target.value)} ref={ref3} type="number" />
									{code3.length === 1 && document.activeElement !== ref3.current && ref3.current &&
										<div className={"flex justify-center items-center absolute top-0 left-0 w-full h-full font-bold text-[40px] leading-[40px] pointer-events-none" + (themeID === 0 ? " bg-[rgb(20,21,24)]" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + (code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4 ? " text-[#E93131]" : " text-blue2")}>
											<span className="-mt-1">∗</span>
										</div>
									}
								</div>
								<div className={"flex justify-center items-center w-[75px] h-[75px] rounded-[5px] relative overflow-hidden border" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + ((code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4) ? " border-[#E93131] text-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? "" : ""))}>
									<input className={"w-[31px] h-full font-bold text-[40px] leading-[40px]" + (themeID === 0 ? " placeholder-button" : themeID === 1 ? " placeholder-[#EDEDF0] text-title" : themeID === 2 ? "" : "")} placeholder="0" maxLength={1} value={code4} onChange={e => e.target.value.length <= 1 && setCode4(e.target.value)} ref={ref4} type="number" />
									{code4.length === 1 && document.activeElement !== ref4.current && ref4.current &&
										<div className={"flex justify-center items-center absolute top-0 left-0 w-full h-full font-bold text-[40px] leading-[40px] pointer-events-none" + (themeID === 0 ? " bg-[rgb(20,21,24)]" : themeID === 1 ? " bg-white1" : themeID === 2 ? "" : "") + (code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code !== code1 + code2 + code3 + code4 ? " text-[#E93131]" : " text-blue2")}>
											<span className="-mt-1">∗</span>
										</div>
									}
								</div>
							</div>
							<button className={"flex justify-center items-center space-x-[10px] w-full h-[45px] rounded-[5px] font-bold text-[16px] leading-[19px] transition" + (themeID === 0 ? " bg-blue2 hover:bg-blue3 disabled:bg-subtext disabled:text-white" : themeID === 1 ? " bg-blue2 hover:bg-blue3 disabled:bg-subtextlight disabled:text-white" : themeID === 2 ? "" : "")} disabled={!(code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0 && code === code1 + code2 + code3 + code4)} onClick={() => alert()}>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal >
	)
}

export default EnterPinModal;