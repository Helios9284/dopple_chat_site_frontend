import React, { useContext, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";

const EnterPinMobileModal = () => {
	const [pinCode] = useState("1111");
	const [code, setCode] = useState("");
	const { themeID, openEnterPinMobileModal: open, setOpenEnterPinMobileModal } = useContext(RefContext);
	let container = useRef();

	const close = async () => {
		setOpenEnterPinMobileModal(false);
	};

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full" ref={container}>
					<div className={"flex flex-col outline-none shadow-lg h-full" + (themeID === 0 ? " bg-[#141518]" : themeID === 1 ? " bg-white1" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-nav-desktop" : "")}>
						<header className={"flex justify-center items-center w-full min-h-[85px] relative border-b font-bold text-[20px] leading-[24px]" + (themeID === 0 ? " bg-nav border-button text-white" : themeID === 1 ? " bg-white border-[#EDEDF0] text-title" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-nav-desktop" : "")}>
							<span>Dopple Vault</span>
							<svg className="absolute top-1/2 -translate-y-1/2 left-[22px]" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" stroke="currentColor" onClick={close}>
								<path d="M2 8.5L9.28571 1.5M2 8.5L9.28571 15.5M2 8.5L19 8.5" strokeWidth="2" strokeLinecap="square" />
							</svg>
						</header>
						<div className="flex flex-col items-center px-5 pt-10 pb-[50px] relative flex-1 h-0 overflow-auto">
							{themeID === 0 && <img src="/images/vault/enterpin-dark.svg" alt="" />}
							{themeID === 1 && <img src="/images/vault/enterpin-light.svg" alt="" />}
							{themeID === 2 && <img src="/images/vault/enterpin-light.svg" alt="" />}
							{themeID === 3 && <img src="/images/vault/enterpin-dark.svg" alt="" />}
							<span className={"mt-5 font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
								Enter Your Pin
							</span>
							{code.length === 4 && code !== pinCode ?
								<span className={"mt-10 font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-[#E93131]" : themeID === 1 ? " text-[#E93131]" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									Wrong Pincode!
								</span>
								:
								<span className={"mt-10 font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									Enter your 4 digit pincode.
								</span>
							}
							<div className="flex justify-center items-center space-x-5 mt-5 mb-10">
								{code[0]?.length > 0 ?
									<div className={"w-5 h-5 rounded-full" + (code.length === 4 && code.length === 4 && code !== pinCode ? " bg-[#E93131]" : " bg-blue2")} />
									:
									<div className={"w-5 h-5 rounded-full border" + (themeID === 0 ? " bg-inputback border-button" : themeID === 1 ? " bg-inputback border-subtextlight" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} />

								}
								{code[1]?.length > 0 ?
									<div className={"w-5 h-5 rounded-full" + (code.length === 4 && code.length === 4 && code !== pinCode ? " bg-[#E93131]" : " bg-blue2")} />
									:
									<div className={"w-5 h-5 rounded-full border" + (themeID === 0 ? " bg-inputback border-button" : themeID === 1 ? " bg-inputback border-subtextlight" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} />

								}
								{code[2]?.length > 0 ?
									<div className={"w-5 h-5 rounded-full" + (code.length === 4 && code.length === 4 && code !== pinCode ? " bg-[#E93131]" : " bg-blue2")} />
									:
									<div className={"w-5 h-5 rounded-full border" + (themeID === 0 ? " bg-inputback border-button" : themeID === 1 ? " bg-inputback border-subtextlight" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} />

								}
								{code[3]?.length > 0 ?
									<div className={"w-5 h-5 rounded-full" + (code.length === 4 && code.length === 4 && code !== pinCode ? " bg-[#E93131]" : " bg-blue2")} />
									:
									<div className={"w-5 h-5 rounded-full border" + (themeID === 0 ? " bg-inputback border-button" : themeID === 1 ? " bg-inputback border-subtextlight" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} />

								}
							</div>
							<div className={"grid grid-cols-3 gap-6 text-[24px] leading-[28px] mb-10" + (code.length === 4 && code.length === 4 && code !== pinCode ? " text-[#E93131]" : (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? "" : themeID === 3 ? "" : ""))}>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("1") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 1)}>1</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("2") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 2)}>2</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("3") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 3)}>3</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("4") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 4)}>4</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("5") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 5)}>5</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("6") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 6)}>6</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("7") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 7)}>7</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("8") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 8)}>8</button>
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("9") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 9)}>9</button>
								<div />
								<button className={"flex justify-center items-center w-[75px] h-[75px] transition rounded-full border" + (code.length === 4 && code.length === 4 && code !== pinCode ? " border-[#E93131]" : (themeID === 0 ? " border-white" : " border-title") + (code.includes("0") ? (themeID === 0 ? " bg-button" : " bg-[#EDEDF0]") : ""))} onClick={() => code.length <= 3 && setCode(x => x += 0)}>0</button>
								<button className="flex justify-center items-center w-[75px] h-[75px]" onClick={() => setCode(x => x.slice(0, -1))}>
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="currentColor">
										<path d="M27.5 4.25H8.75C7.8875 4.25 7.2125 4.6875 6.7625 5.35L0 15.5L6.7625 25.6375C7.2125 26.3 7.8875 26.75 8.75 26.75H27.5C28.875 26.75 30 25.625 30 24.25V6.75C30 5.375 28.875 4.25 27.5 4.25ZM27.5 24.25H8.8375L3 15.5L8.825 6.75H27.5V24.25ZM13.0125 21.75L17.5 17.2625L21.9875 21.75L23.75 19.9875L19.2625 15.5L23.75 11.0125L21.9875 9.25L17.5 13.7375L13.0125 9.25L11.25 11.0125L15.7375 15.5L11.25 19.9875L13.0125 21.75Z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal >
	)
}

export default EnterPinMobileModal;