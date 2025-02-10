import React, { useContext, useRef, useState } from "react";
import { Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDetails } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import { languages } from "../config";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { useCookies } from "react-cookie";
import { setToggleTextStream } from "../redux/reducers/ChatReducer";

const ChatSettingsModal = () => {
	const dispatch = useDispatch();
	const profile = useSelector(store => store.AuthReducer.profile);
	const toggleTextStream = false;
	const [cookies, setCookies] = useCookies(["themeid", "voiceCaption", "textStream"])
	const { themeID, setThemeID, language, setLanguage, alignment, setAlignment, textSize, setTextSize, openChatSettingsModal: open, setOpenChatSettingsModal, setOpenDopplePlusModal, setOpenSignModal, sending } = useContext(RefContext);
	const [isLanguageShown, setIsLanguageShown] = useState(false);
	const [languageUnsaved, setLanguageUnsaved] = useState(language);
	const [showMoreThemes, setShowMoreThemes] = useState(false);
	let container = useRef();
	let tooltip = useRef();

	const setTheme = (i) => {
		if (profile) {
			setThemeID(i)
			setCookies("themeid", i)
		} else login()
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
		setOpenSignModal(true);
		dispatch(setDetails({ openLoginOrSignup: true }))
	}

	const apply = () => {
		setIsLanguageShown(false)
		setLanguage(languageUnsaved)
	}

	const close = async () => {
		setOpenChatSettingsModal(false);
	};

	const openDopplePlus = () => {
		setOpenDopplePlusModal(true)
		close()
	}

	const toggleStream = () => {
		if (sending === true) {
			alert("Cannot toggle streaming while answering")
			return
		}
		dispatch(setToggleTextStream())
	}

	useOutsideDetector([container, tooltip], () => open === true && close())

	return (
		<div className={"absolute w-full h-full transition duration-300" + (themeID === 1 ? " dark" : "") + (open ? " bg-menuback z-[1300] backdrop-blur-[5px]" : " pointer-events-none")}>
			<div className="fixed bottom-0 right-0 h-full" ref={container}>
				<Slide direction="left" in={open} timeout={300}>
					<div className={"outline-none w-[360px] h-full" + (themeID === 0 ? " bg-[#17181C]" : themeID === 1 ? " bg-white" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-galaxynav2 border-l border-galaxybutton" : "")}>
						<div className="py-[25px] px-5 relative overflow-auto max-h-full">
							<button className={"flex justify-center items-center absolute top-[13px] right-[20px] w-[45px] h-[45px] rounded-[5px] transition duration-800" + (themeID === 0 ? " bg-button hover:bg-[#34363C]" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]" : themeID === 2 ? " bg-candybutton" : themeID === 3 ? " bg-galaxybutton" : "")} onClick={close}>
								<svg className={themeID === 0 ? "text-blue2" : themeID === 1 ? "text-blue2" : themeID === 2 ? "text-candybuttonmenu" : themeID === 3 ? "text-[#434FB6]" : ""} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23" fill="none" stroke="currentColor">
									<path d="M2 2L21 21M2 21L21 2" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							{isLanguageShown &&
								<button className={"flex items-center space-x-[10px] absolute top-[27px] left-[20px] font-bold text-[14px] leading-[17px]" + (themeID === 0 ? " text-blue2" : themeID === 1 ? " text-blue2" : themeID === 2 ? " text-blue2" : themeID === 3 ? " text-galaxysubtext" : "")} onClick={() => setIsLanguageShown(false)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" stroke="currentColor">
										<path d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							}
							<div className="flex flex-col items-center">
								<span className={"font-bold text-[20px] leading-[24px] mb-[26px]" + (themeID === 0 ? "" : themeID === 1 ? " text-title" : themeID === 2 ? " text-candytitle" : "")}>{isLanguageShown ? "Language" : "Chat Settings"}</span>
								{!isLanguageShown ?
									<>
										<div className="flex flex-col w-full">
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
											<button className={"flex justify-between items-center px-[15px] mt-[10px] h-[60px] border rounded-[5px]" + (themeID === 0 ? " bg-button border-[#DEA430]" : themeID === 1 ? " text-subtext bg-candybutton border-[#DEA430]" : themeID === 2 ? " text-candysubtext bg-candybutton border-transparent" : themeID === 3 ? " text-subtext bg-galaxybutton border-transparent" : "")} onClick={openDopplePlus}>
												<div className="flex items-center space-x-[10px] text-[#35C75A] text-[14px] leading-[17px] text-left">
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
														<path fillRule="evenodd" clipRule="evenodd" d="M6.24219 6.38877C6.24219 4.35509 7.89082 2.70646 9.9245 2.70646C11.9582 2.70646 13.6068 4.35509 13.6068 6.38877V8.33862H6.24219V6.38877ZM3.57552 8.33862V6.38877C3.57552 2.88233 6.41806 0.0397949 9.9245 0.0397949C13.4309 0.0397949 16.2735 2.88233 16.2735 6.38877V8.33862H18.4303V19.9603H1.57031V8.33862H3.57552Z" />
													</svg>
													<span>Protect chats with a passcode.</span>
												</div>
												<img className="h-full" src="/images/messages/vault-rect.png" alt="" />
											</button>
											<span className={"text-[14px] leading-[17px] mt-[15px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candysubtext" : themeID === 3 ? " text-subtext" : "")}>Chat Themes</span>
											<div className={"flex flex-col items-center space-y-5 p-5 mt-[10px] rounded-[5px]" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candybutton text-candytitle" : themeID === 3 ? " bg-galaxybutton text-white" : "")}>
												<div className="grid grid-cols-4 gap-[10px]">
													<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (themeID === 0 ? " text-blue2" : "")} onClick={() => setTheme(0)}>
														<div className={"w-full h-[50px] rounded-[5px] border transition duration-800 overflow-hidden" + (themeID === 0 ? " border-blue2 group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-candysubtext group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
															<img className="w-full h-full object-cover" src="/images/account/darktheme-desktop.svg" alt="" />
														</div>
														<span className="whitespace-nowrap">Dark</span>
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
														<div className={"w-full h-[50px] rounded-[5px] border transition duration-800 overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-blue2 group-hover:border-blue2" : themeID === 2 ? " border-[#8A939D] group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
															<img className="w-full h-full object-cover" src="/images/account/lighttheme-desktop.svg" alt="" />
														</div>
														<span className="whitespace-nowrap">Light</span>
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
														<div className={"w-full h-[50px] rounded-[5px] border transition duration-800 overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-[#8A939D] group-hover:border-candybuttonmenu" : themeID === 3 ? " border-galaxybuttonmenu group-hover:border-galaxybuttonmenu" : "")}>
															<img className="w-full h-full object-cover" src="/images/account/galaxytheme-desktop.svg" alt="" />
														</div>
														<span className="whitespace-nowrap">Galaxy</span>
														{themeID === 3 ?
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
																<rect x="0.125" y="0.25" width="20" height="20" rx="10" fill="#313B95" />
																<path d="M5.125 9.39286L8.725 13.25L15.125 7.25" stroke="white" strokeWidth="2" />
															</svg>
															:
															<div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
														}
													</button>
													<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
														<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
															<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																<img className="w-full h-full object-cover" src="/images/account/piratetheme-desktop.svg" alt="" />
																<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
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
																<div className={"w-full h-[50px] rounded-[5px] border transition duration-800 overflow-hidden" + (themeID === 0 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 1 ? " border-[#8A939D] group-hover:border-blue2" : themeID === 2 ? " border-candybuttonmenu group-hover:border-candybuttonmenu" : themeID === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
																	<img className="w-full h-full object-cover" src="/images/account/candytheme-desktop.svg" alt="" />
																</div>
																<span className="whitespace-nowrap">Candy</span>
																{themeID === 2 ?
																	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
																		<rect x="0.375" y="0.25" width="20" height="20" rx="10" fill="#FF8BA0" />
																		<path d="M5.375 9.39286L8.975 13.25L15.375 7.25" stroke="white" strokeWidth="2" />
																	</svg>
																	:
																	<div className={"w-[20px] h-[20px] rounded-full border" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C6CED8]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxysubtext" : "")} />
																}
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/doppletheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Dopple</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/ninjatheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Ninja</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/wizardtheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Wizard</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/gametheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Game</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/superherotheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Super Hero</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/zombietheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Zombie</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/kingdomtheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
																			<img className="w-5 h-3" src="/images/messages/dplus.png" alt="" />
																		</div>
																	</div>
																</div>
																<span className="whitespace-nowrap">Kingdom</span>
																<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
																	<path fillRule="evenodd" clipRule="evenodd" d="M6.36719 6.63877C6.36719 4.60509 8.01582 2.95646 10.0495 2.95646C12.0832 2.95646 13.7318 4.60509 13.7318 6.63877V8.58862H6.36719V6.63877ZM3.70052 8.58862V6.63877C3.70052 3.13233 6.54306 0.289795 10.0495 0.289795C13.5559 0.289795 16.3985 3.13233 16.3985 6.63877V8.58862H18.5553V20.2103H1.69531V8.58862H3.70052Z" fill="#8A939D" />
																</svg>
															</button>
															<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group text-subtext"} onClick={() => setOpenDopplePlusModal(true)}>
																<div className="w-full h-[50px] rounded-[5px] p-px overflow-hidden bg-sun">
																	<div className={"h-full rounded-[5px] transition duration-800 relative overflow-hidden"}>
																		<img className="w-full h-full object-cover" src="/images/account/alientheme-desktop.svg" alt="" />
																		<div className="flex justify-center items-center px-2 py-1 absolute top-0 right-0 bg-gradient11 rounded-bl-[5.714px]">
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
									</>
									:
									<>
										<div className="flex flex-col w-full bg-[#31333C] rounded-[5px] overflow-hidden">
											{languages.map((x, i) =>
												<button className={"flex justify-between items-center space-x-[10px] p-[15px] text-[16px] leading-[19px] transition duration-800" + (i > 0 ? " border-t" : "") + (themeID === 0 ? " bg-button hover:bg-[#31333C] border-[#31333C] text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#C6CED8] border-[#C6CED8] text-title" : themeID === 2 ? " bg-candybutton hover:bg-candybuttonmenu border-candysubtext text-candytitle hover:text-white" : themeID === 3 ? " bg-galaxybutton hover:bg-[rgba(156,116,243,.5)] border-galaxysubtext text-galaxytitle" : "")} key={i} onClick={() => setLanguageUnsaved(i)}>
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
																	<rect width="30" height="30" rx="15" fill="#FFF" />
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
										<button className={"flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] w-full h-[50px] mt-[30px] disabled:opacity-50" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candybuttonmenu" : themeID === 3 ? " bg-galaxysubtext" : "")} onClick={apply}>Apply</button>
									</>
								}
							</div>
						</div>
					</div>
				</Slide>
			</div >
		</div >
	)
}

export default ChatSettingsModal;