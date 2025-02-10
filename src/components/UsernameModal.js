import React, { useContext, useMemo, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Modal, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import originalAxios from 'axios';
import { setOpenUsernameModal } from "../redux/reducers/ModalReducer";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { setProfile } from "../redux/reducers/AuthReducer";
import { RefContext } from "../contexts/RefContextProvider";
import axios from "../utilities/axiosConfig"

const UsernameModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openUsernameModal);
	const email = useSelector(store => store.ModalReducer.details.email);
	const [cookies] = useCookies(["accepted"])
	const [username, setUsername] = useState("");
	const [doing, setDoing] = useState(false);
	const [completed, setCompleted] = useState(false);
	const { themeID, setDopple, allUsers } = useContext(RefContext);
	const [nameExists, setNameExists] = useState(false);
	let container = useRef();

	const close = async () => {
		dispatch(setOpenUsernameModal());
	};

	const confirm = async () => {
		setDoing(true)
		let ip = null;

		try {
			const ipData = await originalAxios.get("https://api.ipify.org/?format=json");
			ip = ipData.data.ip;
		} catch (error) { }

		try {
			const { data } = await axios.post("/user/google", {
				username: username,
				email,
				ip,
				password: "",
				acceptedCookies: cookies?.accepted
			})
			window.fbq("track", "CompleteRegistration")
			window.ttq.track("CompleteRegistration")
			window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/jzdnCIqUrc8YEJ2mi4oq' })
			window.snaptr("track", "SIGN_UP")
			dispatch(setProfile({ type: 1, token: data.token, ...jwtDecode(data.token) }))
			setDopple(undefined)
			setCompleted(true)
		} catch (error) {
			console.log(error)
			alert(error.message);
		}

		setDoing(false)
	}

	useMemo(() => {
		if (email && allUsers.some(x => x.email === email)) {
			dispatch(setProfile({ type: 1, ...allUsers.find(x => x.email === email) }))
			setDopple(undefined)
			close()
		}
	}, [email])

	useMemo(async () => {
		if (!username) {
			return;
		}

		const { data: { exists } } = await axios.get(`/user/username/${username}`)
		setNameExists(exists || false);
	}, [username])

	useOutsideDetector([container], () => open === true && close())

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[388px]" ref={container}>
					<Slide direction="up" in={open} timeout={300}>
						<div className={"border outline-none rounded-[5px] shadow-lg" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-button" : themeID === 2 ? " bg-white border-button" : themeID === 3 ? " bg-nav-desktop border-button" : "")}>
							<div className="flex flex-col items-center px-[15px] md:px-[30px] py-[30px] relative">
								{completed ?
									(themeID === 0 || themeID === 3 ?
										<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
											<g filter="url(#filter0_i_3779_105266)">
												<g clip-path="url(#clip0_3779_105266)">
													<rect width="100" height="100" rx="15" fill="url(#paint0_linear_3779_105266)" />
													<path fill-rule="evenodd" clip-rule="evenodd" d="M43.1691 32.6857C43.8755 28.7602 47.3331 25.7804 51.492 25.7804C63.7845 25.7804 73.8049 35.867 73.8049 48.1262C73.8049 60.6124 63.5991 70.8863 51.0779 70.8863H33.6841C30.4722 70.8863 27.4325 69.4343 25.4141 66.9359C25.4141 72.31 29.7707 76.6667 35.1449 76.6667H51.0779C66.8774 76.6667 79.63 63.7437 79.63 48.1262C79.63 32.7356 67.0628 20 51.492 20C43.6054 20 37.2121 26.3444 37.2121 34.1706V58.4557H33.845C32.4058 58.4557 31.2391 57.2979 31.2391 55.8697V32.8701V32.6255C31.2391 27.661 33.8115 23.051 38.0364 20.4441H37.8401C30.9774 20.4441 25.4141 26.0074 25.4141 32.8701V55.8697C25.4141 60.4903 29.1887 64.2361 33.845 64.2361H52.1735C60.9531 64.2361 68.0705 57.1733 68.0705 48.4609C68.0705 39.7485 60.9531 32.6857 52.1735 32.6857H43.1691ZM52.0544 58.3281H42.918V38.3386H52.0544C57.6169 38.3386 62.1263 42.8134 62.1263 48.3334C62.1263 53.8533 57.6169 58.3281 52.0544 58.3281Z" fill="#1B1C20" />
													<g opacity="0.5" filter="url(#filter1_f_3779_105266)">
														<path d="M100.38 60.7736L-0.419922 35.8006V-0.826416H100.38V60.7736Z" fill="url(#paint1_linear_3779_105266)" />
													</g>
												</g>
												<rect x="1.22197" y="1.22197" width="97.5561" height="97.5561" rx="13.778" stroke="white" stroke-width="2.44394" />
											</g>
											<defs>
												<filter id="filter0_i_3779_105266" x="0" y="0" width="100" height="106.517" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
													<feFlood flood-opacity="0" result="BackgroundImageFix" />
													<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
													<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
													<feOffset dy="6.51717" />
													<feGaussianBlur stdDeviation="3.25859" />
													<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
													<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
													<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3779_105266" />
												</filter>
												<filter id="filter1_f_3779_105266" x="-3.67851" y="-4.085" width="107.318" height="68.1173" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
													<feFlood flood-opacity="0" result="BackgroundImageFix" />
													<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
													<feGaussianBlur stdDeviation="1.62929" result="effect1_foregroundBlur_3779_105266" />
												</filter>
												<linearGradient id="paint0_linear_3779_105266" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
													<stop stop-color="#F2F2F2" />
													<stop offset="1" stop-color="white" />
												</linearGradient>
												<linearGradient id="paint1_linear_3779_105266" x1="13.0201" y1="-9.98317" x2="42.3231" y2="82.4666" gradientUnits="userSpaceOnUse">
													<stop stop-color="white" />
													<stop offset="1" stop-color="white" stop-opacity="0" />
												</linearGradient>
												<clipPath id="clip0_3779_105266">
													<rect width="100" height="100" rx="15" fill="white" />
												</clipPath>
											</defs>
										</svg>
										:
										<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
											<g filter="url(#filter0_i_3779_106436)">
												<g clip-path="url(#clip0_3779_106436)">
													<rect width="100" height="100" rx="15" fill="url(#paint0_linear_3779_106436)" />
													<path fill-rule="evenodd" clip-rule="evenodd" d="M43.1691 32.6857C43.8755 28.7602 47.3331 25.7804 51.492 25.7804C63.7845 25.7804 73.8049 35.867 73.8049 48.1262C73.8049 60.6124 63.5991 70.8863 51.0779 70.8863H33.6841C30.4722 70.8863 27.4325 69.4343 25.4141 66.9359C25.4141 72.31 29.7707 76.6667 35.1449 76.6667H51.0779C66.8774 76.6667 79.63 63.7437 79.63 48.1262C79.63 32.7356 67.0628 20 51.492 20C43.6054 20 37.2121 26.3444 37.2121 34.1706V58.4557H33.845C32.4058 58.4557 31.2391 57.2979 31.2391 55.8697V32.8701V32.6255C31.2391 27.661 33.8115 23.051 38.0364 20.4441H37.8401C30.9774 20.4441 25.4141 26.0074 25.4141 32.8701V55.8697C25.4141 60.4903 29.1887 64.2361 33.845 64.2361H52.1735C60.9531 64.2361 68.0705 57.1733 68.0705 48.4609C68.0705 39.7485 60.9531 32.6857 52.1735 32.6857H43.1691ZM52.0537 58.3282H42.9173V38.3386H52.0537C57.6163 38.3386 62.1256 42.8134 62.1256 48.3334C62.1256 53.8534 57.6163 58.3282 52.0537 58.3282Z" fill="white" />
													<g opacity="0.5" filter="url(#filter1_f_3779_106436)">
														<path d="M97.2556 60L-0.501953 35.6757V0H97.2556V60Z" fill="url(#paint1_linear_3779_106436)" fill-opacity="0.5" />
													</g>
												</g>
												<rect x="1.22197" y="1.22197" width="97.5561" height="97.5561" rx="13.778" stroke="#1E1E1E" stroke-width="2.44394" />
											</g>
											<defs>
												<filter id="filter0_i_3779_106436" x="0" y="0" width="100" height="106.517" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
													<feFlood flood-opacity="0" result="BackgroundImageFix" />
													<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
													<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
													<feOffset dy="6.51717" />
													<feGaussianBlur stdDeviation="3.25859" />
													<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
													<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
													<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3779_106436" />
												</filter>
												<filter id="filter1_f_3779_106436" x="-3.76054" y="-3.25859" width="104.275" height="66.5172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
													<feFlood flood-opacity="0" result="BackgroundImageFix" />
													<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
													<feGaussianBlur stdDeviation="1.62929" result="effect1_foregroundBlur_3779_106436" />
												</filter>
												<linearGradient id="paint0_linear_3779_106436" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
													<stop stop-color="#333333" />
													<stop offset="1" stop-color="#0E0E0E" />
												</linearGradient>
												<linearGradient id="paint1_linear_3779_106436" x1="12.5324" y1="-8.91891" x2="41.1754" y2="81.0581" gradientUnits="userSpaceOnUse">
													<stop stop-color="white" />
													<stop offset="1" stop-color="white" stop-opacity="0" />
												</linearGradient>
												<clipPath id="clip0_3779_106436">
													<rect width="100" height="100" rx="15" fill="white" />
												</clipPath>
											</defs>
										</svg>
									)
									:
									<div className={"flex justify-center items-center w-[100px] h-[100px] rounded-[15px] text-subtext" + (themeID === 0 ? " bg-button" : themeID === 1 ? " bg-[#EDEDF0]" : themeID === 2 ? " bg-[#EDEDF0]" : themeID === 3 ? " bg-button" : "")}>
										<svg xmlns="http://www.w3.org/2000/svg" width="53" height="56" viewBox="0 0 53 56" fill="currentColor">
											<path fillRule="evenodd" clipRule="evenodd" d="M33.4392 10.9928C33.4392 16.8613 28.6819 21.6187 22.8134 21.6187C16.9449 21.6187 12.1875 16.8613 12.1875 10.9928C12.1875 5.1243 16.9449 0.366943 22.8134 0.366943C28.6819 0.366943 33.4392 5.1243 33.4392 10.9928ZM0.746094 35.5793C0.746094 30.0565 5.22325 25.5793 10.7461 25.5793H34.8809C40.3488 25.5793 44.7917 29.9679 44.8795 35.4148L33.2702 46.968L32.5101 50.2131H0.746094V35.5793Z" />
											<path fillRule="evenodd" clipRule="evenodd" d="M46.504 36.6853L52.0588 42.2223L47.9175 46.4048L45.0781 43.5653L42.3346 40.8217L46.504 36.6853ZM41.3586 41.7899L35.2013 47.8985C35.0309 48.0689 34.9113 48.2805 34.8612 48.5002L33.3898 55.2832L40.264 53.8807C40.4773 53.8283 40.6821 53.7105 40.8477 53.5449L46.9502 47.3817L44.106 44.5374L41.3586 41.7899Z" />
										</svg>
									</div>
								}
								<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									{completed ? "Welcome to Dopple!" : "Choose your username"}
								</span>
								<span className={"mt-[10px] text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
									{completed ? "Your AI adventure begins here." : "Your username will be used in chats."}
								</span>
								{!completed &&
									<div className={"flex items-center rounded-[5px] border px-5 h-[50px] relative my-[47px] w-full transition duration-800" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (nameExists || username.length > 15 ? " border-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : ""))}>
										<input className={"w-0 flex-1 text-[14px] leading-[17px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} placeholder="Choose username" value={username} onChange={e => setUsername(e.target.value.replace(/\s/g, ''))} />
										{nameExists || username.length > 15 ?
											<svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setUsername("")}>
												<path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" stroke-width="3" stroke-linejoin="round" />
											</svg>
											:
											(username.length > 0 ?
												<svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
													<path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
												: null)
										}
										{nameExists && username.length > 0 &&
											<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Username is already in use</span>
										}
										{username.length > 15 &&
											<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Max character limit reached</span>
										}
									</div>
								}
								{completed ?
									<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA] mt-[30px]" onClick={close}>
										Continue
									</button>
									:
									<>
										<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:enabled:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" onClick={confirm} disabled={nameExists || username.length === 0 || doing}>
											<span>Confirm</span>
											{doing &&
												<svg className='spinnerInner1' viewBox='0 0 120 120'>
													<circle cx='60' cy='60' r='50' />
												</svg>
											}
										</button>
										<span className={"mt-[30px] text-[14px] leading[17px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>You can change this at any time in settings.</span>
									</>
								}
							</div>
						</div>
					</Slide>
				</div>
			</div>
		</Modal >
	)
}

export default UsernameModal;