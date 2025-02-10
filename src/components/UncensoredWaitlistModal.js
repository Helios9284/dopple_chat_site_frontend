import React, { useState, useMemo, useRef, useContext } from "react";
import { Fade, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "../utilities/axiosConfig"
import originalAxios from 'axios';
import { setProfile } from "../redux/reducers/AuthReducer";
import jwtDecode from "jwt-decode";
import { commafy, validateEmail } from "../utilities/format";
import { Link, useNavigate } from "react-router-dom";
import { RefContext } from "../contexts/RefContextProvider";
import { useCookies } from "react-cookie";

const UncensoredWaitlistModal = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const themeID = 0;
	const { count, setCount, setOpenUncensoredWaitlistModalStep3, setJoinedWaitlist } = useContext(RefContext)
	const [cookies] = useCookies(["accepted"])
	const [doing, setDoing] = useState(false);
	const [step, setStep] = useState(1);
	const [googleUser, setGoogleUser] = useState();
	const [type, setType] = useState("");
	const [username, setUsername] = useState();
	const [emailError, setEmailError] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [validUsername, setValidUsername] = useState(-1);
	const [validEmail, setValidEmail] = useState(-1);
	const [validPassword, setValidPassword] = useState(-1);
	const [loaded, setLoaded] = useState(false);
	const [nameExists, setNameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [emailRegistered, setEmailRegistered] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	let container = useRef();

	const loginGG = useGoogleLogin({
		onSuccess: (codeResponse) => setGoogleUser(codeResponse),
		onError: (error) => console.log('Login Failed:', error)
	})

	useMemo(async () => {
		if (googleUser) {
			axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
				headers: {
					Authorization: `Bearer ${googleUser.access_token}`,
					Accept: 'application/json'
				}
			})
				.then(async (res) => {
					const email = res.data?.email;
					setEmail(res.data.email)
					const { data } = await axios.put("/waitlist/exists", { email: res.data.email })
					console.log(data.data)

					if (data.data.registered) {
						if (!data.data.exists) {
							const { data: { success, data } } = await axios.post("/waitlist", { email: res.data.email, type: "google" })
							if (success) {
								setCount(data.orderId)
								setOpenUncensoredWaitlistModalStep3(true)
								setJoinedWaitlist(true)
								signin(email)
								close()
							}
						} else {
							setOpenUncensoredWaitlistModalStep3(true)
							setJoinedWaitlist(true)
							signin(email)
							close()
						}
					}
					else {
						// if (data.data.exists) {
						// 	alert()
						// 	setJoinedWaitlist(true)
						// 	signin(email)
						// 	close()
						// }
						// else {
						setType("google");
						setStep(2);
						// }
					}
				})
				.catch((err) => console.log(err))
		}
	}, [googleUser, dispatch, loaded])

	const close = async () => nav("/")

	const continueToNext = async () => {
		if (emailRegistered) {
			if (!emailExists) {
				const { data: { success, data } } = await axios.post("/waitlist", { email, type: "email" })

				if (success) {
					setJoinedWaitlist(true)
					setOpenUncensoredWaitlistModalStep3(true)
					signin(email)
					close()
					setCount(data.orderId)
				}
			} else {
				// setJoinedWaitlist(true)
				// signin(email)
				// close()
				setType("email");
				setStep(2);
			}
		}
		else {
			setType("email");
			setStep(2);
		}
	}

	const join = async () => {
		if (!emailRegistered) {
			if (!email) {
				return;
			}

			setDoing(true);

			let ip = null;
			try {
				const ipData = await originalAxios.get("https://api.ipify.org/?format=json");
				ip = ipData.data.ip;
			} catch (error) { }

			try {
				if (username?.length > 0 && email?.length > 0 && validateEmail(email) && ip?.length > 0) {
					try {
						const { data: { exists } } = await axios.get("/user/email/" + email)
						if (exists) {
							return alert("Account already exists");
						}

						const { data } = await axios.post(type === "email" ? "/user" : "/user/google", {
							username, email, ip, password: type === "email" ? password : "", acceptedCookies: cookies?.accepted
						})

						if (data.success) {
							signin(email)
							close()
							window.fbq("track", "CompleteRegistration")
							window.ttq.track("CompleteRegistration")
							window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/jzdnCIqUrc8YEJ2mi4oq' })
							window.snaptr("track", "SIGN_UP")
						}
					} catch (e) {
						setValidEmail(1);
					}
				} else {
					setValidEmail((email?.length > 0 && validateEmail(email)) ? 1 : 0)
					setValidUsername(username?.length > 0 ? 1 : 0)
					setValidPassword(password?.length > 0 ? 1 : 0)
				}

				const { data: { success, data } } = await axios.post("/waitlist", { email, type })

				if (success) {
					setOpenUncensoredWaitlistModalStep3(true)
					signin(email)
					setJoinedWaitlist(true)
					close()
					setCount(data.orderId)
				}
			} catch (e) {
				console.log(e)
				alert(e.response.data.message)
			}
			setDoing(false);
		}
	}

	const joinExistingUser = async () => {
		setDoing(true);
		try {
			const { data } = await axios.post("/user/signin", {
				emailUsername: email, password, acceptedCookies: cookies?.accepted
			})
			if (data.success) {
				dispatch(setProfile({ type: 2, token: data.token, ...jwtDecode(data.token) }))
				nav("/")
			}
		} catch (e) {
			console.log(e)
			setValidPassword(0);
		}
		setDoing(false);
	}

	useMemo(() => {
		if (username?.length > 0) setValidUsername(1)
		if (email?.length > 0) setValidEmail(1)
		if (password?.length > 0) setValidPassword(1)
	}, [username, email, password])

	useMemo(async () => {
		if (!username) {
			return;
		}

		try {
			const { data: { exists } } = await axios.get(`/user/username/${username}`)
			setNameExists(exists || false);
		} catch (e) {
			console.log(e)
		}
	}, [username])

	useMemo(async () => {

		if (!email) {
			return;
		}

		try {
			const { data } = await axios.put("/waitlist/exists", { email: email })
			setEmailRegistered(data.data.registered || false);
			setEmailExists(data.data.exists || false);
			setLoaded(true);

			setEmailError(false)
		} catch (e) {
			console.log(e)
			setEmailError(true)
		}
	}, [email])

	const signin = async (email) => {
		if (!email) {
			return;
		}

		try {
			const { data: { token } } = await axios.get("/user/email/" + email)
			dispatch(setProfile({ type: type === "google" ? 1 : type === "email", token, ...jwtDecode(token) }))
			window.fbq("track", "JoinWaitlist")
			window.ttq.track("Download")
			window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/06SUCLm91uMYEJ2mi4oq' });
			window.snaptr("track", "START_TRIAL")
		} catch (e) {
			console.log(e)
		}
	}

	useMemo(async () => {
		const { data: { data: { total } } } = await axios.get("/waitlist")
		setCount(total)
	}, [])

	return (
		<>
			<div className="flex md:hidden items-center px-5 w-full h-[85px] bg-nav border-b border-black5 fixed top-0 left-0 z-[1301]">
				<button aria-label="Explore" onClick={() => { nav("/"); close(); }}>
					<img className="w-[222px] h-[33px] md1:w-[207px] md1:h-[30px] transition duration-800 origin-left hover:scale-[1.02]" src="/images/logo-header.svg" alt="" />
				</button>
			</div>
			<Modal open onClose={close}>
				<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px]">
					<div className={"flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"} ref={container}>
						<Fade in timeout={500}>
							<div className={"flex flex-col md:border outline-none md:rounded-[5px] shadow-lg w-[100svw] login-modal overflow-x-hidden overflow-y-auto h-[100svh] md:h-auto md:max-h-[90%]" + (themeID === 0 ? " bg-black15 md:bg-[#17181C] border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav " : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
								<button className={"hidden md:flex justify-center items-center w-[30px] h-[30px] absolute top-0 right-0 z-[1] rounded-tr-[5px] rounded-bl-[5px] rounded-tr-0 transition duration-800" + (themeID === 0 ? " bg-button text-subtext hover:text-blue2" : themeID === 1 ? " bg-[#EDEDF0] text-blue2 hover:text-subtext" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-[#9277FF]" : "")} onClick={close}>
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
										<path d="M2 2L12 12M2 12L12 2" stroke="#8A939D" strokeWidth="2" strokeLinecap="square" />
									</svg>
								</button>

								<div className="flex flex-col items-center pt-[115px] md:pt-[30px] pb-[61px] md:pb-[30px] px-5 md:px-[30px] relative">
									{step !== 3 ?
										<>
											<img className="h-[81px]" src="/images/uncensored-waitlist/logo.svg" alt="" />
											<span className="mt-[15px] font-bold text-[20px] leading-[125%] text-center">No Filters. No Cost. No Limits.</span>
											{step === 1 &&
												<>
													<img className="my-[30px]" src="/images/uncensored-waitlist/chat.png" alt="" />
													<div className="flex flex-col w-full">
														<button className="bg-button h-[45px] md:h-[50px] rounded-[5px] font-bold text-[14px] leading-[17px] relative outline-none transition duration-800 hover:bg-white hover:text-[#191A1E]" onClick={loginGG}>
															Continue with Google
															<img className="absolute top-1/2 left-5 md:left-[15px] -translate-y-1/2 w-[23.17px] h-[23.17px] md:w-5 md:h-5" src="/images/google.svg" alt="" />
														</button>
													</div>
													<div className="mt-[18.5px] h-[1px] bg-button relative w-full">
														<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-[11.58px] md:px-[10px] font-bold text-[14px] leading-[17px] text-button bg-black15 md:bg-[#17181C]">OR</div>
													</div>
												</>
											}
											<div className={"flex flex-col w-full" + (step === 1 ? " mt-[16.5px]" : " mt-[30px]")}>
												{step === 1 &&
													<>
														<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (emailExists ? " border-[#E93131]" : (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "")) + ((email === "" || validEmail === 0 || emailError) ? " border-red1" : " border-black5")}>
															<input className={"w-0 flex-1 placeholder-black4" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} />
															{emailError && email?.length > 0 ?
																<svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setEmail("")}>
																	<path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" strokeWidth="3" strokeLinejoin="round" />
																</svg>
																:
																(email?.length > 0 ?
																	<svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
																		<path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																	: null)
															}
														</div>
													</>
												}

												{step === 2 &&
													<>
														{!emailRegistered ?
															<>
																{nameExists && username?.length > 0 &&
																	<span className="mb-[5px] text-right text-[14px] leading-[17px] text-[#E93131]">Username is already in use</span>
																}
																{username?.length > 15 &&
																	<span className="mb-[5px] text-right text-[14px] leading-[17px] text-[#E93131]">Max character limit reached</span>
																}
																{emailExists && type === "email" &&
																	<span className="mb-[5px] text-right text-[14px] leading-[17px] text-[#E93131]">This email already exists</span>
																}
																<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (nameExists ? " border-[#E93131]" : (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "")) + ((username === "" || validUsername === 0 || username?.length > 15) ? " border-red1" : " border-black5")}>
																	<input className={"w-0 flex-1 placeholder-black4" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value.replace(/\s/g, ''))} />
																	{username?.length > 0 &&
																		(nameExists || username?.length > 15 ?
																			<svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setUsername("")}>
																				<path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" strokeWidth="3" strokeLinejoin="round" />
																			</svg>
																			:
																			(username?.length > 0 ?
																				<svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
																					<path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
																				</svg>
																				: null)
																		)
																	}
																</div>
																{type === "email" &&
																	<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D] mt-[15px]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "") + ((password === "" || validPassword === 0) ? " border-red1" : " border-black5")}>
																		<input className={"w-0 flex-1 placeholder-black4" + (validPassword === 0 ? " text-red1" : (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")) + ((!password || password?.length === 0 || showPassword === true) ? "" : " passinput")} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
																		<button className="text-subtext" onClick={() => setShowPassword(!showPassword)}>
																			{showPassword ?
																				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
																					<path d="M10.0001 15.8333C10.7884 15.8333 11.5084 15.7474 12.1651 15.5991L10.7009 14.1349C10.4734 14.1524 10.2426 14.1666 10.0001 14.1666C5.54094 14.1666 3.81344 10.9616 3.3951 9.99993C3.70923 9.29894 4.13348 8.65272 4.65177 8.08577L3.48677 6.92077C2.2051 8.30993 1.71927 9.7091 1.7101 9.7366C1.65262 9.90774 1.65262 10.093 1.7101 10.2641C1.7276 10.3191 3.63927 15.8333 10.0001 15.8333ZM10.0001 4.1666C8.46927 4.1666 7.21177 4.4966 6.16344 4.9841L3.08927 1.91077L1.91094 3.0891L16.9109 18.0891L18.0893 16.9108L15.3234 14.1449C17.5018 12.5191 18.2793 10.2991 18.2909 10.2641C18.3484 10.093 18.3484 9.90774 18.2909 9.7366C18.2726 9.68077 16.3609 4.1666 10.0001 4.1666ZM14.1434 12.9649L12.2434 11.0649C12.4018 10.7399 12.5001 10.3824 12.5001 9.99993C12.5001 8.63243 11.3676 7.49993 10.0001 7.49993C9.6176 7.49993 9.2601 7.59827 8.93594 7.75743L7.42927 6.25077C8.25637 5.96694 9.12569 5.82577 10.0001 5.83327C14.4593 5.83327 16.1868 9.03827 16.6051 9.99993C16.3534 10.5766 15.6334 11.9516 14.1434 12.9649Z" />
																				</svg>
																				:
																				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
																					<path d="M9.99967 7.5C10.6627 7.5 11.2986 7.76339 11.7674 8.23223C12.2363 8.70107 12.4997 9.33696 12.4997 10C12.4997 10.663 12.2363 11.2989 11.7674 11.7678C11.2986 12.2366 10.6627 12.5 9.99967 12.5C9.33663 12.5 8.70075 12.2366 8.23191 11.7678C7.76307 11.2989 7.49967 10.663 7.49967 10C7.49967 9.33696 7.76307 8.70107 8.23191 8.23223C8.70075 7.76339 9.33663 7.5 9.99967 7.5ZM9.99967 3.75C14.1663 3.75 17.7247 6.34167 19.1663 10C17.7247 13.6583 14.1663 16.25 9.99967 16.25C5.83301 16.25 2.27467 13.6583 0.833008 10C2.27467 6.34167 5.83301 3.75 9.99967 3.75ZM2.64967 10C3.32322 11.3753 4.3691 12.534 5.66841 13.3444C6.96772 14.1548 8.46834 14.5844 9.99967 14.5844C11.531 14.5844 13.0316 14.1548 14.3309 13.3444C15.6303 12.534 16.6761 11.3753 17.3497 10C16.6761 8.62474 15.6303 7.46604 14.3309 6.65562C13.0316 5.8452 11.531 5.41557 9.99967 5.41557C8.46834 5.41557 6.96772 5.8452 5.66841 6.65562C4.3691 7.46604 3.32322 8.62474 2.64967 10Z" />
																				</svg>
																			}
																		</button>
																		{validPassword === 0 &&
																			<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-red2">Password are incorrect</span>
																		}
																	</div>
																}
															</>
															:
															<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D] mt-[15px]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "") + ((password === "" || validPassword === 0) ? " border-red1" : " border-black5")}>
																<input className={"w-0 flex-1 placeholder-black4" + (validPassword === 0 ? " text-red1" : (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")) + ((!password || password?.length === 0 || showPassword === true) ? "" : " passinput")} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
																<button className="text-subtext" onClick={() => setShowPassword(!showPassword)}>
																	{showPassword ?
																		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
																			<path d="M10.0001 15.8333C10.7884 15.8333 11.5084 15.7474 12.1651 15.5991L10.7009 14.1349C10.4734 14.1524 10.2426 14.1666 10.0001 14.1666C5.54094 14.1666 3.81344 10.9616 3.3951 9.99993C3.70923 9.29894 4.13348 8.65272 4.65177 8.08577L3.48677 6.92077C2.2051 8.30993 1.71927 9.7091 1.7101 9.7366C1.65262 9.90774 1.65262 10.093 1.7101 10.2641C1.7276 10.3191 3.63927 15.8333 10.0001 15.8333ZM10.0001 4.1666C8.46927 4.1666 7.21177 4.4966 6.16344 4.9841L3.08927 1.91077L1.91094 3.0891L16.9109 18.0891L18.0893 16.9108L15.3234 14.1449C17.5018 12.5191 18.2793 10.2991 18.2909 10.2641C18.3484 10.093 18.3484 9.90774 18.2909 9.7366C18.2726 9.68077 16.3609 4.1666 10.0001 4.1666ZM14.1434 12.9649L12.2434 11.0649C12.4018 10.7399 12.5001 10.3824 12.5001 9.99993C12.5001 8.63243 11.3676 7.49993 10.0001 7.49993C9.6176 7.49993 9.2601 7.59827 8.93594 7.75743L7.42927 6.25077C8.25637 5.96694 9.12569 5.82577 10.0001 5.83327C14.4593 5.83327 16.1868 9.03827 16.6051 9.99993C16.3534 10.5766 15.6334 11.9516 14.1434 12.9649Z" />
																		</svg>
																		:
																		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
																			<path d="M9.99967 7.5C10.6627 7.5 11.2986 7.76339 11.7674 8.23223C12.2363 8.70107 12.4997 9.33696 12.4997 10C12.4997 10.663 12.2363 11.2989 11.7674 11.7678C11.2986 12.2366 10.6627 12.5 9.99967 12.5C9.33663 12.5 8.70075 12.2366 8.23191 11.7678C7.76307 11.2989 7.49967 10.663 7.49967 10C7.49967 9.33696 7.76307 8.70107 8.23191 8.23223C8.70075 7.76339 9.33663 7.5 9.99967 7.5ZM9.99967 3.75C14.1663 3.75 17.7247 6.34167 19.1663 10C17.7247 13.6583 14.1663 16.25 9.99967 16.25C5.83301 16.25 2.27467 13.6583 0.833008 10C2.27467 6.34167 5.83301 3.75 9.99967 3.75ZM2.64967 10C3.32322 11.3753 4.3691 12.534 5.66841 13.3444C6.96772 14.1548 8.46834 14.5844 9.99967 14.5844C11.531 14.5844 13.0316 14.1548 14.3309 13.3444C15.6303 12.534 16.6761 11.3753 17.3497 10C16.6761 8.62474 15.6303 7.46604 14.3309 6.65562C13.0316 5.8452 11.531 5.41557 9.99967 5.41557C8.46834 5.41557 6.96772 5.8452 5.66841 6.65562C4.3691 7.46604 3.32322 8.62474 2.64967 10Z" />
																		</svg>
																	}
																</button>
																{validPassword === 0 &&
																	<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-red2">Password are incorrect</span>
																}
															</div>
														}
													</>
												}
												<div className={"flex justify-center items-center space-x-[5px] font-medium text-[14px] leading-[17px] tracking-[0.2px]" + (step === 1 ? " mt-[62px] md:mt-[30px]" : step === 2 ? " mt-[190px] md:mt-[30px]" : "")}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
														<path d="M7.98171 3.64248C8.45043 2.37579 10.242 2.37579 10.7107 3.64248L11.5155 5.81734C11.6629 6.21559 11.9769 6.52958 12.3751 6.67694L14.55 7.48171C15.8167 7.95043 15.8167 9.74203 14.55 10.2107L12.3751 11.0155C11.9769 11.1629 11.6629 11.4769 11.5155 11.8751L10.7107 14.05C10.242 15.3167 8.45043 15.3167 7.98171 14.05L7.17694 11.8751C7.02958 11.4769 6.71559 11.1629 6.31734 11.0155L4.14248 10.2107C2.87579 9.74203 2.87579 7.95043 4.14248 7.48171L6.31734 6.67694C6.71559 6.52958 7.02958 6.21559 7.17694 5.81734L7.98171 3.64248Z" fill="white" />
														<path d="M2.85937 0.464456C3.08853 -0.154818 3.96442 -0.154819 4.19357 0.464455L4.59186 1.54083C4.66391 1.73553 4.81741 1.88903 5.01211 1.96108L6.08849 2.35937C6.70776 2.58853 6.70776 3.46442 6.08849 3.69357L5.01211 4.09186C4.81741 4.16391 4.66391 4.31741 4.59186 4.51211L4.19357 5.58849C3.96442 6.20776 3.08853 6.20776 2.85937 5.58849L2.46108 4.51211C2.38903 4.31741 2.23553 4.16391 2.04083 4.09186L0.964456 3.69357C0.345182 3.46442 0.345181 2.58853 0.964455 2.35937L2.04083 1.96108C2.23553 1.88903 2.38903 1.73553 2.46108 1.54083L2.85937 0.464456Z" fill="white" />
													</svg>
													<span>Join {commafy(count)} others on the waitlist</span>
												</div>
												{step === 1 &&
													<button className="mt-[10px] rounded-[5px] bg-blue2 w-full h-[50px] font-bold text-[16px] leading-[19px] transition duration-800 disabled:opacity-50 hover:enabled:bg-white hover:enabled:text-blue2" onClick={continueToNext} disabled={email?.length === 0 || email === undefined || emailError || !loaded}>
														Continue
													</button>
												}
												{step === 2 &&
													(emailRegistered ?
														<button className="mt-[10px] rounded-[5px] bg-blue2 w-full h-[50px] font-bold text-[16px] leading-[19px] transition duration-800 disabled:opacity-50 hover:enabled:bg-white hover:enabled:text-blue2" onClick={joinExistingUser} disabled={nameExists || email?.length === 0 || email === undefined || password?.length === 0 || password === undefined || doing}>
															Join Waitlist
														</button>
														:
														<button className="mt-[10px] rounded-[5px] bg-blue2 w-full h-[50px] font-bold text-[16px] leading-[19px] transition duration-800 disabled:opacity-50 hover:enabled:bg-white hover:enabled:text-blue2" onClick={join} disabled={nameExists || email?.length === 0 || email === undefined || username?.length === 0 || username === undefined || (type === "google" ? false : (password?.length === 0 || password === undefined)) || doing}>
															Join Waitlist
														</button>
													)
												}
											</div>
											<span className="text-[14px] leading-[17px] text-center mt-[30px]">
												By joining, I agree to the
												<Link to="/terms" className="font-bold text-blue2"> Terms and Conditions</Link>
											</span>
										</>
										:
										<>
											<img className="w-[100px] h-[100px]" src="/images/uncensored-waitlist/logo-with-check.svg" alt="" />
											<span className="mt-[15px] font-bold text-[24px] leading-[125%] text-center">Welcome to The<br />#NoFilter Movement.</span>
											<span className="mt-[15px] text-[14px] leading-[125%] text-center text-[#B5C2D1]">
												We will email you when its your turn to experience<br />Dopple Uncensored.
											</span>
											<div className="flex justify-center items-center space-x-[5px] mt-[15px] w-full min-h-[50px] bg-inputback border border-blue2 rounded-[5px] font-medium text-[16px] leading-[19px] tracking-[0.2px]">
												<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
													<path d="M7.48171 3.64248C7.95043 2.37579 9.74203 2.37579 10.2107 3.64248L11.0155 5.81734C11.1629 6.21559 11.4769 6.52958 11.8751 6.67694L14.05 7.48171C15.3167 7.95043 15.3167 9.74203 14.05 10.2107L11.8751 11.0155C11.4769 11.1629 11.1629 11.4769 11.0155 11.8751L10.2107 14.05C9.74203 15.3167 7.95043 15.3167 7.48171 14.05L6.67694 11.8751C6.52958 11.4769 6.21559 11.1629 5.81734 11.0155L3.64248 10.2107C2.37579 9.74203 2.37579 7.95043 3.64248 7.48171L5.81734 6.67694C6.21559 6.52958 6.52958 6.21559 6.67694 5.81734L7.48171 3.64248Z" fill="white" />
													<path d="M2.35937 0.464456C2.58853 -0.154818 3.46442 -0.154819 3.69357 0.464455L4.09186 1.54083C4.16391 1.73553 4.31741 1.88903 4.51211 1.96108L5.58849 2.35937C6.20776 2.58853 6.20776 3.46442 5.58849 3.69357L4.51211 4.09186C4.31741 4.16391 4.16391 4.31741 4.09186 4.51211L3.69357 5.58849C3.46442 6.20776 2.58853 6.20776 2.35937 5.58849L1.96108 4.51211C1.88903 4.31741 1.73553 4.16391 1.54083 4.09186L0.464456 3.69357C-0.154818 3.46442 -0.154819 2.58853 0.464455 2.35937L1.54083 1.96108C1.73553 1.88903 1.88903 1.73553 1.96108 1.54083L2.35937 0.464456Z" fill="white" />
												</svg>
												<span>You are number #{commafy(count)} on the waitlist</span>
											</div>
											<img className="my-7" src="/images/uncensored-waitlist/discord-confetti.svg" alt="" />
											<a className="flex justify-center items-center space-x-[9px] w-full min-h-[50px] rounded-[5px] bg-[#414FF1] font-bold text-[16px] leading-[19px]" href="https://discord.gg/dopple" target="_blank" rel="noreferrer">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
													<path d="M21.6532 2.0569C20.0698 1.31879 18.3554 0.783065 16.5697 0.473535C16.554 0.473034 16.5384 0.475973 16.524 0.482143C16.5097 0.488314 16.4968 0.497567 16.4863 0.50925C16.2721 0.902116 16.022 1.41403 15.8554 1.8069C13.9613 1.52118 12.035 1.52118 10.1409 1.8069C9.97426 1.40213 9.72426 0.902116 9.49806 0.50925C9.48616 0.48544 9.45044 0.473535 9.41472 0.473535C7.62896 0.783065 5.92653 1.31879 4.33125 2.0569C4.31935 2.0569 4.30744 2.06881 4.29554 2.08071C1.05735 6.92606 0.164472 11.6404 0.60496 16.3072C0.60496 16.331 0.616865 16.3548 0.640675 16.3667C2.78359 17.9382 4.84317 18.8906 6.87894 19.5216C6.91466 19.5335 6.95037 19.5216 6.96228 19.4978C7.43848 18.843 7.86706 18.1525 8.23612 17.4263C8.25993 17.3787 8.23612 17.331 8.1885 17.3191C7.50991 17.0572 6.86704 16.7477 6.23607 16.3905C6.18845 16.3667 6.18845 16.2953 6.22416 16.2596C6.35512 16.1644 6.48607 16.0572 6.61703 15.962C6.64084 15.9382 6.67655 15.9382 6.70037 15.9501C10.7957 17.8191 15.2125 17.8191 19.2602 15.9501C19.284 15.9382 19.3198 15.9382 19.3436 15.962C19.4745 16.0691 19.6055 16.1644 19.7364 16.2715C19.7841 16.3072 19.7841 16.3786 19.7245 16.4025C19.1055 16.7715 18.4507 17.0691 17.7721 17.331C17.7245 17.3429 17.7126 17.4025 17.7245 17.4382C18.1054 18.1644 18.534 18.8549 18.9983 19.5097C19.034 19.5216 19.0697 19.5335 19.1055 19.5216C21.1531 18.8906 23.2127 17.9382 25.3556 16.3667C25.3794 16.3548 25.3913 16.331 25.3913 16.3072C25.9152 10.9142 24.5223 6.23556 21.7008 2.08071C21.6889 2.06881 21.677 2.0569 21.6532 2.0569ZM8.85519 13.4619C7.62896 13.4619 6.60512 12.3309 6.60512 10.938C6.60512 9.54516 7.60515 8.41418 8.85519 8.41418C10.1171 8.41418 11.1172 9.55707 11.1052 10.938C11.1052 12.3309 10.1052 13.4619 8.85519 13.4619ZM17.153 13.4619C15.9268 13.4619 14.903 12.3309 14.903 10.938C14.903 9.54516 15.903 8.41418 17.153 8.41418C18.415 8.41418 19.415 9.55707 19.4031 10.938C19.4031 12.3309 18.415 13.4619 17.153 13.4619Z" fill="white" />
												</svg>
												<span>Get Early Access</span>
											</a>
											<Link className="flex justify-center items-center space-x-[9px] w-full min-h-[50px] rounded-[5px] bg-blue2 font-bold text-[16px] leading-[19px] mt-[10px]" to="/">
												<span>Explore Dopple.ai</span>
											</Link>
										</>
									}
								</div>
								<div className="flex md:hidden flex-col items-center py-[30px] bg-nav w-[100svw]">
									<div className="flex items-center space-x-[22.83px]">
										<a className="flex justify-center items-center w-[45.65px] h-[45.65px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 active:bg-blue2 md:hover:bg-blue2" href="https://twitter.com/DoppleAi" target="_blank" rel="noreferrer" aria-label="twitter">
											<svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
												<path d="M0.480716 0.2995L11.0564 14.4828L0.414062 26.0144H2.80943L12.127 15.9181L19.6551 26.0144H27.8061L16.6351 11.0335L26.541 0.2995H24.1457L15.5649 9.59778L8.63166 0.2995H0.480716ZM4.0032 2.06906H7.74771L24.2831 24.2449H20.5386L4.0032 2.06906Z" fill="#111112" />
											</svg>
										</a>
										<a className="flex justify-center items-center w-[45.65px] h-[45.65px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 active:bg-blue2 md:hover:bg-blue2" href="https://instagram.com/Dopple_ai" target="_blank" rel="noreferrer" aria-label="instagram">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path d="M13.1931 0.414795C14.0259 0.4116 14.8587 0.41997 15.6913 0.439903L15.9127 0.447892C16.1684 0.457023 16.4206 0.468435 16.7253 0.482131C17.9396 0.539194 18.7682 0.730929 19.4952 1.01282C20.2484 1.30271 20.883 1.69531 21.5175 2.32985C22.0977 2.90004 22.5468 3.58976 22.8334 4.35105C23.1153 5.07804 23.3071 5.90775 23.3641 7.12207C23.3778 7.42565 23.3892 7.67901 23.3984 7.93466L23.4052 8.15606C23.4255 8.98827 23.4342 9.82072 23.4315 10.6532L23.4326 11.5046V12.9996C23.4354 13.8325 23.4267 14.6653 23.4064 15.4979L23.3995 15.7193C23.3904 15.9749 23.379 16.2272 23.3653 16.5319C23.3082 17.7462 23.1142 18.5748 22.8334 19.3018C22.5477 20.0639 22.0986 20.7541 21.5175 21.3241C20.9469 21.9042 20.2568 22.3532 19.4952 22.64C18.7682 22.9219 17.9396 23.1136 16.7253 23.1707C16.4206 23.1844 16.1684 23.1958 15.9127 23.2049L15.6913 23.2118C14.8587 23.232 14.0259 23.2408 13.1931 23.238L12.3417 23.2392H10.8478C10.0149 23.242 9.1821 23.2332 8.34951 23.2129L8.12811 23.2061C7.85718 23.1962 7.58631 23.1848 7.31552 23.1718C6.1012 23.1148 5.27263 22.9207 4.5445 22.64C3.78291 22.3539 3.09307 21.9048 2.5233 21.3241C1.94245 20.7538 1.49299 20.0636 1.20627 19.3018C0.924378 18.5748 0.732644 17.7462 0.67558 16.5319C0.66287 16.2611 0.651457 15.9902 0.641342 15.7193L0.635636 15.4979C0.614595 14.6653 0.605083 13.8325 0.607104 12.9996V10.6532C0.603919 9.82073 0.612289 8.98828 0.632212 8.15606L0.640201 7.93466C0.649331 7.67901 0.660744 7.42565 0.674439 7.12207C0.731503 5.90661 0.923237 5.07919 1.20513 4.35105C1.49202 3.58939 1.94235 2.89986 2.52445 2.331C3.09382 1.7498 3.78323 1.29994 4.5445 1.01282C5.27263 0.730929 6.10006 0.539194 7.31552 0.482131L8.12811 0.447892L8.34951 0.442186C9.18171 0.421156 10.0142 0.411644 10.8466 0.413654L13.1931 0.414795ZM12.0199 6.12117C11.2638 6.11048 10.5131 6.25016 9.81146 6.53211C9.10983 6.81405 8.47123 7.23263 7.93277 7.76353C7.39431 8.29442 6.96674 8.92704 6.6749 9.62461C6.38307 10.3222 6.23278 11.0708 6.23278 11.827C6.23278 12.5831 6.38307 13.3318 6.6749 14.0293C6.96674 14.7269 7.39431 15.3595 7.93277 15.8904C8.47123 16.4213 9.10983 16.8399 9.81146 17.1218C10.5131 17.4038 11.2638 17.5435 12.0199 17.5328C13.5333 17.5328 14.9847 16.9316 16.0549 15.8614C17.125 14.7913 17.7262 13.3398 17.7262 11.8264C17.7262 10.313 17.125 8.86154 16.0549 7.79139C14.9847 6.72123 13.5333 6.12117 12.0199 6.12117ZM12.0199 8.40372C12.4747 8.39534 12.9266 8.47767 13.3492 8.64591C13.7718 8.81414 14.1567 9.06491 14.4813 9.38355C14.806 9.7022 15.0638 10.0823 15.2399 10.5018C15.416 10.9212 15.5067 11.3715 15.5068 11.8264C15.5068 12.2813 15.4163 12.7316 15.2403 13.1511C15.0644 13.5706 14.8067 13.9508 14.4821 14.2696C14.1576 14.5883 13.7728 14.8392 13.3503 15.0076C12.9277 15.176 12.4758 15.2585 12.021 15.2502C11.1129 15.2502 10.2421 14.8895 9.59998 14.2474C8.95789 13.6053 8.59717 12.7345 8.59717 11.8264C8.59717 10.9183 8.95789 10.0475 9.59998 9.40539C10.2421 8.7633 11.1129 8.40258 12.021 8.40258L12.0199 8.40372ZM18.0115 4.40926C17.6434 4.42399 17.2952 4.58062 17.0399 4.84633C16.7846 5.11205 16.642 5.46623 16.642 5.83471C16.642 6.20319 16.7846 6.55737 17.0399 6.82309C17.2952 7.0888 17.6434 7.24543 18.0115 7.26016C18.3899 7.26016 18.7528 7.10986 19.0203 6.84232C19.2878 6.57478 19.4381 6.21192 19.4381 5.83357C19.4381 5.45521 19.2878 5.09235 19.0203 4.82481C18.7528 4.55728 18.3899 4.40697 18.0115 4.40697V4.40926Z" fill="#1B1C21" />
											</svg>
										</a>
										<a className="flex justify-center items-center w-[45.65px] h-[45.65px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 active:bg-blue2 md:hover:bg-blue2" href="https://dopple.ai" target="_blank" rel="noreferrer" aria-label="website">
											<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
												<path d="M20.4712 16.5659C20.5807 15.6619 20.6629 14.758 20.6629 13.8267C20.6629 12.8953 20.5807 11.9914 20.4712 11.0875H25.1004C25.3196 11.964 25.4565 12.8817 25.4565 13.8267C25.4565 14.7717 25.3196 15.6893 25.1004 16.5659M18.047 24.1809C18.8687 22.6606 19.4988 21.0171 19.937 19.3051H23.9773C22.6504 21.5899 20.5453 23.3207 18.047 24.1809ZM17.7046 16.5659H11.2948C11.1579 15.6619 11.0757 14.758 11.0757 13.8267C11.0757 12.8953 11.1579 11.9777 11.2948 11.0875H17.7046C17.8278 11.9777 17.9237 12.8953 17.9237 13.8267C17.9237 14.758 17.8278 15.6619 17.7046 16.5659ZM14.4997 24.7287C13.3629 23.0852 12.4453 21.2636 11.8838 19.3051H17.1156C16.5541 21.2636 15.6365 23.0852 14.4997 24.7287ZM9.02131 8.34828H5.02208C6.33533 6.05723 8.43895 4.32369 10.9388 3.4725C10.117 4.99276 9.50067 6.63628 9.02131 8.34828ZM5.02208 19.3051H9.02131C9.50067 21.0171 10.117 22.6606 10.9388 24.1809C8.44419 23.3203 6.34353 21.5892 5.02208 19.3051ZM3.89901 16.5659C3.67987 15.6893 3.54291 14.7717 3.54291 13.8267C3.54291 12.8817 3.67987 11.964 3.89901 11.0875H8.52825C8.41869 11.9914 8.33651 12.8953 8.33651 13.8267C8.33651 14.758 8.41869 15.6619 8.52825 16.5659M14.4997 2.91096C15.6365 4.55448 16.5541 6.38975 17.1156 8.34828H11.8838C12.4453 6.38975 13.3629 4.55448 14.4997 2.91096ZM23.9773 8.34828H19.937C19.5084 6.65197 18.8736 5.01453 18.047 3.4725C20.567 4.33535 22.6625 6.07474 23.9773 8.34828ZM14.4997 0.130676C6.92582 0.130676 0.803711 6.29388 0.803711 13.8267C0.803711 17.4591 2.24668 20.9427 4.81518 23.5112C6.08697 24.783 7.5968 25.7918 9.25848 26.4801C10.9202 27.1684 12.7011 27.5227 14.4997 27.5227C18.1321 27.5227 21.6157 26.0797 24.1842 23.5112C26.7527 20.9427 28.1957 17.4591 28.1957 13.8267C28.1957 12.0281 27.8415 10.2471 27.1532 8.58544C26.4649 6.92377 25.456 5.41393 24.1842 4.14214C22.9125 2.87035 21.4026 1.86151 19.7409 1.17322C18.0793 0.484934 16.2983 0.130676 14.4997 0.130676Z" fill="#1B1C21" />
											</svg>
										</a>
										<a className="flex justify-center items-center w-[45.65px] h-[45.65px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 active:bg-blue2 md:hover:bg-blue2" href="https://www.reddit.com/r/DoppleAI/" target="_blank" rel="noreferrer" aria-label="website">
											<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
												<path d="M29.2462 14.3872V14.4209C29.2462 15.0303 29.0711 15.5993 28.7692 16.0808L28.7771 16.0674C28.4751 16.5574 28.0431 16.9541 27.529 17.2133L27.5111 17.2211C27.6323 17.6734 27.7019 18.1919 27.7019 18.7284V18.7486C27.6937 20.4285 27.09 22.05 25.9982 23.3267L26.006 23.3166C24.7865 24.7747 23.2238 25.9071 21.4583 26.6118L21.3808 26.6387C19.5458 27.4086 17.4134 27.8564 15.1754 27.8564L15.0037 27.8553H15.0127L14.8488 27.8564C12.6142 27.8564 10.4851 27.4086 8.54461 26.5983L8.65236 26.6387C6.86687 25.9378 5.28473 24.8021 4.04963 23.3345L4.03504 23.3166C2.94807 22.0425 2.34764 20.4245 2.3403 18.7498V18.7419C2.3403 18.2144 2.40315 17.7004 2.521 17.2088L2.51202 17.2537C1.98169 16.9952 1.5328 16.5956 1.21459 16.0988L1.20673 16.0864C0.882594 15.5799 0.711154 14.9908 0.712904 14.3894C0.712904 13.5174 1.06532 12.7273 1.63659 12.1549C1.92012 11.8599 2.26036 11.6254 2.63684 11.4653C3.01333 11.3052 3.4183 11.2229 3.8274 11.2233H3.88352H3.88015H3.92393C4.82068 11.2233 5.62877 11.6083 6.18994 12.2211L6.19218 12.2233C8.60545 10.5704 11.4558 9.6726 14.3808 9.64418H14.3898L16.2371 1.35006C16.2693 1.21246 16.3544 1.09308 16.474 1.01785L16.4762 1.01672C16.5362 0.97457 16.6044 0.945661 16.6764 0.931922C16.7484 0.918182 16.8225 0.919926 16.8937 0.937038L16.8904 0.935916L22.7647 2.22549C22.96 1.8293 23.2529 1.50831 23.6143 1.28496L23.6244 1.27935C23.9824 1.05488 24.4179 0.921326 24.8848 0.921326C25.5414 0.921326 26.1373 1.18508 26.5694 1.61381C27.0015 2.02796 27.2698 2.61045 27.2698 3.2558V3.2962V3.29396V3.32763C27.2698 3.97634 27.0015 4.56221 26.5694 4.97972L26.5683 4.98084C26.3472 5.20337 26.0842 5.37984 25.7944 5.50006C25.5047 5.62027 25.194 5.68183 24.8803 5.68118C24.2507 5.68174 23.6465 5.43273 23.2002 4.9887C22.9807 4.77576 22.8063 4.52087 22.6873 4.23917C22.5684 3.95748 22.5073 3.65474 22.5077 3.34895V3.30631V3.30855L17.19 2.13009L15.5346 9.64306C18.6176 9.6655 21.4751 10.6139 23.8478 12.2244L23.795 12.1908C24.0897 11.8833 24.4436 11.6388 24.8353 11.472C25.2271 11.3051 25.6486 11.2194 26.0745 11.2199C26.9499 11.2199 27.7423 11.5757 28.3158 12.1515C28.8871 12.7082 29.2417 13.486 29.2417 14.3457V14.3894V14.3872H29.2462ZM7.37289 17.5545V17.5904C7.37289 18.2368 7.63776 18.8216 8.06537 19.2413C8.27743 19.4631 8.53229 19.6395 8.81453 19.7599C9.09678 19.8803 9.40052 19.9421 9.70736 19.9417H9.74776H9.74552C10.3788 19.9411 10.9859 19.6893 11.4337 19.2415C11.8814 18.7937 12.1333 18.1866 12.1339 17.5533V17.5152C12.1339 16.8698 11.8656 16.2873 11.4335 15.8743L11.4324 15.8732C11.2173 15.6535 10.9604 15.4791 10.6768 15.3602C10.3933 15.2413 10.0889 15.1803 9.78143 15.1807H9.74327H9.74552C9.11808 15.186 8.51782 15.4375 8.07404 15.8811C7.63025 16.3246 7.37846 16.9248 7.37289 17.5522V17.5545ZM20.2675 23.2066C20.3231 23.1529 20.3673 23.0885 20.3975 23.0174C20.4277 22.9462 20.4433 22.8697 20.4433 22.7924C20.4433 22.7151 20.4277 22.6386 20.3975 22.5675C20.3673 22.4963 20.3231 22.432 20.2675 22.3783C20.2175 22.3276 20.1579 22.2873 20.0922 22.26C20.0265 22.2326 19.956 22.2186 19.8848 22.2189H19.869H19.8612C19.7108 22.2187 19.566 22.2757 19.456 22.3783C18.9241 22.8737 18.2665 23.2138 17.5548 23.3615L17.529 23.3659C15.8327 23.796 14.0553 23.7906 12.3617 23.3502L12.4335 23.3659C11.7105 23.2211 11.0418 22.8784 10.502 22.376L10.5042 22.3783C10.3944 22.2755 10.2495 22.2185 10.0991 22.2189H10.0777C10.0066 22.2188 9.93606 22.2328 9.87035 22.2601C9.80465 22.2875 9.74504 22.3277 9.69501 22.3783C9.63866 22.4275 9.59349 22.4883 9.56252 22.5564C9.53155 22.6245 9.5155 22.6985 9.51544 22.7734V22.7891C9.51544 22.9529 9.5839 23.1011 9.69501 23.2066C10.2214 23.7024 10.8551 24.07 11.5469 24.2807L11.5805 24.2896C12.1959 24.5131 12.8338 24.6689 13.4829 24.7543L13.5312 24.7599C14.0295 24.8078 14.5121 24.8317 14.979 24.8317C15.4459 24.8317 15.9285 24.8078 16.4268 24.7599C17.1148 24.6712 17.7908 24.5067 18.4426 24.2694L18.3775 24.2908C19.0837 24.0816 19.7312 23.7103 20.2686 23.2066L20.2664 23.2088L20.2675 23.2066ZM20.2203 19.9428H20.2585C20.9039 19.9428 21.4863 19.6746 21.8994 19.2425L21.9005 19.2413C22.3281 18.8216 22.593 18.2368 22.593 17.5904V17.5522V17.5545C22.5877 16.927 22.3362 16.3268 21.8926 15.883C21.449 15.4392 20.8489 15.1874 20.2215 15.1818H20.1844C19.538 15.1818 18.9532 15.4467 18.5335 15.8743C18.3117 16.0864 18.1353 16.3412 18.0149 16.6235C17.8945 16.9057 17.8327 17.2095 17.8331 17.5163V17.5567V17.5545C17.8337 18.1877 18.0855 18.7948 18.5333 19.2426C18.9811 19.6904 19.5882 19.9422 20.2215 19.9428H20.2203Z" fill="#101012" />
											</svg>
										</a>
										<a className="flex justify-center items-center w-[45.65px] h-[45.65px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 active:bg-blue2 md:hover:bg-blue2" href="https://discord.gg/dopple" target="_blank" rel="noreferrer" aria-label="website">
											<svg xmlns="http://www.w3.org/2000/svg" width="29" height="22" viewBox="0 0 29 22" fill="none">
												<path d="M24.3362 2.01132C22.529 1.16888 20.5724 0.557442 18.5342 0.204164C18.5164 0.203593 18.4986 0.206946 18.4821 0.213989C18.4657 0.221032 18.451 0.231593 18.4391 0.244927C18.1945 0.693318 17.9092 1.27758 17.719 1.72598C15.5572 1.39987 13.3587 1.39987 11.1969 1.72598C11.0067 1.264 10.7213 0.693318 10.4631 0.244927C10.4496 0.217752 10.4088 0.204164 10.368 0.204164C8.32988 0.557442 6.38684 1.16888 4.5661 2.01132C4.55251 2.01132 4.53892 2.0249 4.52533 2.03849C0.829486 7.56864 -0.18959 12.9493 0.313154 18.2757C0.313154 18.3028 0.326742 18.33 0.353917 18.3436C2.7997 20.1372 5.15037 21.2242 7.47386 21.9443C7.51462 21.9579 7.55538 21.9443 7.56897 21.9172C8.11248 21.1698 8.60163 20.3818 9.02285 19.5529C9.05003 19.4986 9.02285 19.4442 8.9685 19.4306C8.19401 19.1317 7.46027 18.7784 6.74012 18.3708C6.68577 18.3436 6.68577 18.2621 6.72654 18.2213C6.876 18.1126 7.02546 17.9903 7.17493 17.8816C7.2021 17.8545 7.24287 17.8545 7.27004 17.868C11.9442 20.0013 16.9852 20.0013 21.605 17.868C21.6322 17.8545 21.673 17.8545 21.7002 17.8816C21.8496 18.0039 21.9991 18.1126 22.1485 18.2349C22.2029 18.2757 22.2029 18.3572 22.135 18.3844C21.4284 18.8056 20.6811 19.1453 19.9066 19.4442C19.8522 19.4578 19.8386 19.5257 19.8522 19.5665C20.287 20.3953 20.7762 21.1834 21.3061 21.9307C21.3469 21.9443 21.3876 21.9579 21.4284 21.9443C23.7655 21.2242 26.1161 20.1372 28.5619 18.3436C28.5891 18.33 28.6027 18.3028 28.6027 18.2757C29.2005 12.1205 27.6108 6.78056 24.3905 2.03849C24.3769 2.0249 24.3633 2.01132 24.3362 2.01132ZM9.72941 15.0282C8.32988 15.0282 7.16134 13.7374 7.16134 12.1477C7.16134 10.5579 8.30271 9.26709 9.72941 9.26709C11.1697 9.26709 12.3111 10.5715 12.2975 12.1477C12.2975 13.7374 11.1561 15.0282 9.72941 15.0282ZM19.2 15.0282C17.8005 15.0282 16.632 13.7374 16.632 12.1477C16.632 10.5579 17.7733 9.26709 19.2 9.26709C20.6403 9.26709 21.7817 10.5715 21.7681 12.1477C21.7681 13.7374 20.6403 15.0282 19.2 15.0282Z" fill="#101012" />
											</svg>
										</a>
									</div>
									<span className="mt-[17.66px] text-[14px] leading-[17px] text-subtext">© 2023 Dopple Labs Inc. All Rights Reserved.</span>
								</div>
							</div>
						</Fade>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default UncensoredWaitlistModal;
