import React, { useState, useMemo, useRef, useContext } from "react";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';
import AppleLogin from 'react-apple-login';
import jwtDecode from "jwt-decode";
import axios from "../utilities/axiosConfig"
import originalAxios from 'axios';
import { setDetails, setOpenForgetPasswordModal, setOpenUsernameModal } from "../redux/reducers/ModalReducer";
import { setProfile } from "../redux/reducers/AuthReducer";
import { validateEmail } from "../utilities/format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RefContext } from "../contexts/RefContextProvider";

const SignModal = () => {
	const dispatch = useDispatch();
	const loc = useLocation();
	const nav = useNavigate();
	const { openSignModal: open, setOpenSignModal } = useContext(RefContext);
	const openLoginOrSignup = useSelector(store => store.ModalReducer.details.openLoginOrSignup);
	const themeID = 0;
	const [cookies] = useCookies(["accepted"])
	const [googleUser, setGoogleUser] = useState();
	const [remember, setRemember] = useState(false);
	const [emailUsername, setEmailUsername] = useState();
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [validUsername, setValidUsername] = useState(-1);
	const [validEmailUsername, setValidEmailUsername] = useState(-1);
	const [emailError, setEmailError] = useState(undefined)
	const [validEmail, setValidEmail] = useState(-1);
	const [validPassword, setValidPassword] = useState(-1);
	const [showPassword, setShowPassword] = useState(false);
	const [nameExists, setNameExists] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	// const nameExists = allUsers.some(x => x.username.toLowerCase() === username?.toLowerCase());
	let container = useRef();

	const loginGG = useGoogleLogin({
		onSuccess: (codeResponse) => setGoogleUser(codeResponse),
		onError: (error) => console.log('Login Failed:', error)
	})

	const loginAP = async (res) => {
		if (res.authorization.code) {
			const _decoded = jwtDecode(res.authorization.id_token)
			const { data: { exists, token } } = await axios.get("/user/email/" + _decoded.email)
			if (exists === false) {
				console.log("new google")
				dispatch(setOpenUsernameModal())
				dispatch(setDetails({ email: _decoded.email }))
			}
			else {
				console.log("exists google")
				dispatch(setProfile({ type: 1, token, ...jwtDecode(token) }))
				if (loc.pathname !== "/messages") nav("/")
			}
			setOpenSignModal(true)
		}
	}

	useMemo(async () => {
		if (googleUser) {
			axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
				headers: {
					Authorization: `Bearer ${googleUser.access_token}`,
					Accept: 'application/json'
				}
			})
				.then(async (res) => {
					const { data: { exists, token } } = await axios.get("/user/email/" + res.data.email)
					if (exists === false) {
						console.log("new google")
						dispatch(setOpenUsernameModal())
						dispatch(setDetails({ email: res.data.email }))
					}
					else {
						console.log("exists google")
						dispatch(setProfile({ type: 1, token, ...jwtDecode(token) }))
						if (loc.pathname !== "/messages") nav("/")
					}
					setOpenSignModal(false)
				})
				.catch((err) => console.log(err))
		}
	}, [googleUser, dispatch])

	const forgot = () => {
		dispatch(setOpenForgetPasswordModal())
		close()
	}

	const close = async () => {
		setOpenSignModal(false)
	};

	const create = async () => {
		let ip = null;

		try {
			const ipData = await originalAxios.get("https://api.ipify.org/?format=json");
			ip = ipData.data.ip;
		} catch (error) { }

		if (username?.length > 0 && email?.length > 0 && password?.length > 0 && validateEmail(email) && ip?.length > 0) {
			try {
				const { data: { exists } } = await axios.get("/user/email/" + email)
				setEmailExists(exists)
				// if (exists === false) {
				// 	close()
				// 	dispatch(setOpenVerifyModal())
				// 	dispatch(setDetails({ newCreds: { username, email, ip, password } }))
				// }

				const { data } = await axios.post("/user", {
					username, email, ip, password, acceptedCookies: cookies?.accepted
				})
				if (data.success) {
					window.fbq("track", "CompleteRegistration")
					window.ttq.track("CompleteRegistration")
					window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/jzdnCIqUrc8YEJ2mi4oq' })
					window.snaptr("track", "SIGN_UP")
					dispatch(setProfile({ type: 2, token: data.token, ...jwtDecode(data.token) }))
					close()
					if (loc.pathname !== "/messages") nav("/")
				}
			} catch (e) {
				setValidEmail(1);
				setEmailError(e.response.data.error);
			}
		} else {
			setValidEmail((email?.length > 0 && validateEmail(email)) ? 1 : 0)
			setValidUsername(username?.length > 0 ? 1 : 0)
			setValidPassword(password?.length > 0 ? 1 : 0)
		}
	}

	const signin = async () => {
		if (emailUsername?.length > 0 && password?.length > 0) {
			try {
				const { data } = await axios.post("/user/signin", {
					emailUsername, password, acceptedCookies: cookies?.accepted
				})
				if (data.success) {
					dispatch(setProfile({ type: 2, token: data.token, ...jwtDecode(data.token) }))
					close()
					if (loc.pathname !== "/messages") nav("/")
				}
			} catch (e) {
				setValidEmailUsername(1);
				setEmailError(e.response.data.error);
			}
		} else {
			setValidEmailUsername(emailUsername?.length > 0 ? 1 : 0)
			setValidPassword(password?.length > 0 ? 1 : 0)
		}
	}

	useMemo(async () => {
		if (!username) {
			return;
		}

		const { data: { exists } } = await axios.get(`/user/username/${username}`)
		setNameExists(exists || false);
	}, [username])

	useMemo(async () => {
		if (!email) {
			return;
		}

		const { data: { exists } } = await axios.get("/user/email/" + email)
		setEmailExists(exists || false);
	}, [email])

	useMemo(() => {
		if (username?.length > 0) setValidUsername(1)
		if (email?.length > 0) setValidEmail(1)
		if (password?.length > 0) setValidPassword(1)
		if (emailUsername?.length > 0) setValidEmailUsername(1)
	}, [username, email, password, emailUsername])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border outline-none rounded-[5px] shadow-lg w-[calc(100vw-20px)] tiny:w-[388px] login-modal overflow-x-hidden overflow-y-auto max-h-[90%]" + (themeID === 0 ? " bg-nav border-button" : themeID === 1 ? " bg-white border-[#EDEDF0]" : themeID === 2 ? " bg-candynav " : themeID === 3 ? " bg-galaxynav border-galaxybutton" : "")} ref={container}>
					<div className={"flex text-[14px] leading-[17px] w-full border-b" + (openLoginOrSignup ? " mb-[30px]" : " mb-6") + (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#EDEDF0]" : themeID === 2 ? " border-candybutton" : themeID === 3 ? " border-galaxybutton" : "")}>
						<button className={"flex justify-center items-center space-x-[5px] h-[65px] flex-1" + (!openLoginOrSignup ? " border-b-2 font-bold" : "") + (!openLoginOrSignup ? (themeID === 0 ? " text-white border-blue2" : themeID === 1 ? " text-title border-blue2" : themeID === 2 ? " text-candytitle border-candybuttonhighlight" : themeID === 3 ? " text-galaxytitle border-[#5200FF]" : "") : (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonhighlight" : themeID === 3 ? " text-galaxysubtext" : ""))} onClick={() => dispatch(setDetails({ openLoginOrSignup: false }))}>
							<span>Signup</span>
						</button>
						<button className={"flex justify-center items-center space-x-[5px] h-[65px] flex-1" + (openLoginOrSignup ? " border-b-2 font-bold" : "") + (openLoginOrSignup ? (themeID === 0 ? " text-white border-blue2" : themeID === 1 ? " text-title border-blue2" : themeID === 2 ? " text-candytitle border-candybuttonhighlight" : themeID === 3 ? " text-galaxytitle border-[#5200FF]" : "") : (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonhighlight" : themeID === 3 ? " text-galaxysubtext" : ""))} onClick={() => dispatch(setDetails({ openLoginOrSignup: true }))}>
							<span>Login</span>
						</button>
					</div>

					<button className={"flex justify-center items-center w-[35px] h-[35px] absolute top-[-2px] right-[-1px] rounded-[5px] rounded-tr-0 transition duration-800" + (themeID === 0 ? " bg-button text-subtext hover:text-blue2" : themeID === 1 ? " bg-[#EDEDF0] text-blue2 hover:text-subtext" : themeID === 2 ? " bg-candybutton text-candysubtext" : themeID === 3 ? " bg-galaxybutton text-[#9277FF]" : "")} onClick={close}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
							<path d="M1 1L11 11M1 11L11 1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					{openLoginOrSignup ?
						<>
							<div className="flex flex-col pb-[30px] px-[15px] lg:px-[30px] lg:pb-[103px] relative overflow-hidden">
								<span className="font-semibold text-[24px] leading-[28px] text-center">Log In to Dopple</span>
								<div className="flex flex-col space-y-[10px] md:space-y-[15px] mt-[30px]">
									<button className="bg-button h-[45px] md:h-[50px] rounded-[5px] font-bold text-[14px] leading-[17px] relative outline-none transition duration-800 hover:bg-white hover:text-[#191A1E]" onClick={loginGG}>
										Continue with Google
										<img className="absolute top-1/2 left-5 md:left-[15px] -translate-y-1/2 w-[23.17px] h-[23.17px] md:w-5 md:h-5" src="/images/google.svg" alt="" />
									</button>
									<AppleLogin
										clientId="doppleweb"
										redirectURI="https://beta.dopple.ai"
										usePopup={true}
										callback={loginAP} // Catch the response
										scope="email name"
										responseMode="query"
										responseType="code"
										render={renderProps => (
											<button className="bg-button h-[45px] md:h-[50px] rounded-[5px] font-bold text-[14px] leading-[17px] relative outline-none transition duration-800 hover:bg-white hover:text-[#191A1E]" onClick={renderProps.onClick}>
												Continue with Apple
												<svg className="absolute top-1/2 left-5 md:left-[15px] -translate-y-1/2 w-[23.17px] h-[23.17px] md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
													<path d="M15.1643 19.1976C14.0658 20.253 12.8665 20.0864 11.712 19.5864C10.4903 19.0754 9.36946 19.0532 8.08049 19.5864C6.46647 20.2752 5.61462 20.0752 4.65069 19.1976C-0.81905 13.6094 -0.0120387 5.09936 6.19746 4.78828C7.71061 4.86605 8.76421 5.6104 9.64968 5.67706C10.9723 5.41043 12.2388 4.64386 13.6511 4.74385C15.3436 4.87716 16.6214 5.54374 17.462 6.74359C13.9649 8.82111 14.7944 13.3872 18 14.6648C17.3611 16.3313 16.5317 17.9866 15.153 19.2087L15.1643 19.1976ZM9.53759 4.72163C9.36946 2.24416 11.3982 0.199975 13.7296 0C14.0546 2.8663 11.1068 4.99937 9.53759 4.72163Z" />
												</svg>
											</button>
										)}
									/>
								</div>
								<div className="mt-[32.5px] md:mt-[40.5px] h-[1px] bg-button relative">
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-[11.58px] md:px-[10px] font-bold text-[14px] leading-[17px] text-button bg-nav">OR</div>
								</div>
								<div className="flex flex-col mt-[32.5px] md:mt-[39.5px]">
									{emailError && validEmailUsername && <p className="text-right text-red-500 mb-2 text-[13px]">{emailError}</p>}
									<input className={"px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] bg-inputback text-[14px] leading-[17px] placeholder-black4 w-full border focus:border-[#8A939D] transition duration-800 hover:border-[#8A939D]" + ((emailUsername === "" || validEmailUsername === 0) ? " border-red1" : " border-black5")} placeholder="Email / Username" value={emailUsername} onChange={e => setEmailUsername(e.target.value.replace(/\s/g, ''))} />
									<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D] mt-[15px]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "") + ((password === "" || validPassword === 0) ? " border-red1" : " border-black5")}>
										<input className={"w-0 flex-1 placeholder-black4" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "") + ((!password || password?.length === 0 || showPassword === true) ? "" : " passinput")} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
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
									</div>
									<button className="rounded-[5px] bg-blue2 w-full py-[14px] md:py-[16.5px] font-bold text-[14px] leading-[17px] mt-[15px] transition duration-800 hover:bg-white hover:text-blue2" onClick={signin}>
										Continue
									</button>
									<div className="flex justify-between items-center text-[14px] leading-[17px] mt-[30px] md:mt-[15px]">
										<button className="flex items-center space-x-[5px]" onClick={() => setRemember(!remember)}>
											<div className="flex justify-center items-center w-[20px] h-[20px] border border-black5 rounded-[5px]">
												{remember &&
													<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M1 3.14286L4.6 7L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												}
											</div>
											<span>Remember Me</span>
										</button>
										<button className="text-blue2 transition duration-800 hover:text-white" onClick={forgot}>Forgot Password?</button>
									</div>
								</div>
							</div>
						</>
						:
						<>
							<div className="flex flex-col pb-[30px] px-[15px] lg:px-[30px] relative overflow-hidden">
								<span className="font-semibold text-[24px] leading-[28px] text-center">Create a Free Account</span>
								<span className="mt-[5px] text-[14px] leading-[17px] text-subtext text-center">Never stop chatting. Unlimited & free.</span>
								<div className="flex flex-col space-y-[10px] md:space-y-[15px] mt-[30px]">
									<button className="bg-button h-[45px] md:h-[50px] rounded-[5px] font-bold text-[14px] leading-[17px] relative outline-none transition duration-800 hover:bg-white hover:text-[#191A1E]" onClick={loginGG}>
										Continue with Google
										<img className="absolute top-1/2 left-5 md:left-[15px] -translate-y-1/2 w-[23.17px] h-[23.17px] md:w-5 md:h-5" src="/images/google.svg" alt="" />
									</button>
									<AppleLogin
										clientId="doppleweb"
										redirectURI="https://beta.dopple.ai"
										usePopup={true}
										callback={loginAP} // Catch the response
										scope="email name"
										responseMode="query"
										responseType="code"
										render={renderProps => (
											<button className="bg-button h-[45px] md:h-[50px] rounded-[5px] font-bold text-[14px] leading-[17px] relative outline-none transition duration-800 hover:bg-white hover:text-[#191A1E]" onClick={renderProps.onClick}>
												Continue with Apple
												<svg className="absolute top-1/2 left-5 md:left-[15px] -translate-y-1/2 w-[23.17px] h-[23.17px] md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
													<path d="M15.1643 19.1976C14.0658 20.253 12.8665 20.0864 11.712 19.5864C10.4903 19.0754 9.36946 19.0532 8.08049 19.5864C6.46647 20.2752 5.61462 20.0752 4.65069 19.1976C-0.81905 13.6094 -0.0120387 5.09936 6.19746 4.78828C7.71061 4.86605 8.76421 5.6104 9.64968 5.67706C10.9723 5.41043 12.2388 4.64386 13.6511 4.74385C15.3436 4.87716 16.6214 5.54374 17.462 6.74359C13.9649 8.82111 14.7944 13.3872 18 14.6648C17.3611 16.3313 16.5317 17.9866 15.153 19.2087L15.1643 19.1976ZM9.53759 4.72163C9.36946 2.24416 11.3982 0.199975 13.7296 0C14.0546 2.8663 11.1068 4.99937 9.53759 4.72163Z" />
												</svg>
											</button>
										)}
									/>
								</div>
								<div className="mt-[32.5px] md:mt-[40.5px] h-[1px] bg-black5 relative">
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-[11.58px] md:px-[10px] font-bold text-[14px] leading-[17px] text-button bg-nav">OR</div>
								</div>
								<div className="flex flex-col space-y-[15px] mt-[32.5px] md:mt-[39.5px]">
									<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (nameExists ? " border-[#E93131]" : (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "")) + ((username === "" || validUsername === 0 || username?.length > 15) ? " border-red1" : " border-black5")}>
										<input className={"w-0 flex-1 placeholder-black4" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} placeholder="Choose username" value={username} onChange={e => setUsername(e.target.value.replace(/\s/g, ''))} />
										{nameExists || username?.length > 15 ?
											<svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setUsername("")}>
												<path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" strokeWidth="3" strokeLinejoin="round" />
											</svg>
											:
											(username?.length > 0 ?
												<svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
													<path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
												: null)
										}
										{nameExists && username?.length > 0 &&
											<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Username is already in use</span>
										}
										{username?.length > 15 &&
											<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Max character limit reached</span>
										}
										{emailExists &&
											<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">This email already exists</span>
										}
									</div>
									<input className={"px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] bg-inputback text-[14px] leading-[17px] placeholder-black4 w-full border focus:border-[#8A939D] transition duration-800 hover:border-[#8A939D]" + ((email === "" || validEmail === 0) ? " border-red1" : " border-black5")} placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} />
									<div className={"flex items-center rounded-[5px] border px-5 md:px-4 h-[45px] md:h-[50px] rounded-[5px] relative w-full transition duration-800 text-[14px] leading-[17px] focus-within:border-[#8A939D] hover:border-[#8A939D] mt-[15px]" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + (themeID === 0 ? " border-black5" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "") + ((password === "" || validPassword === 0) ? " border-red1" : " border-black5")}>
										<input className={"w-0 flex-1 placeholder-black4" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "") + ((!password || password?.length === 0 || showPassword === true) ? "" : " passinput")} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
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
									</div>
									<button className="rounded-[5px] bg-blue2 w-full py-[14px] md:py-[16.5px] font-bold text-[14px] leading-[17px] transition duration-800 disabled:opacity-50 hover:enabled:bg-white hover:enabled:text-blue2" onClick={create} disabled={nameExists || emailExists || (username?.length === 0 && validUsername) || email?.length === 0 || email === undefined || password?.length === 0 || password === undefined}>
										Create Account
									</button>
								</div>
								<span className="text-[14px] leading-[17px] text-center mt-[30px]">
									By joining, I agree to the
									<Link to="/terms" className="font-bold text-blue2"> Terms and Conditions</Link>
								</span>
							</div>
						</>
					}
				</div>
			</div>
		</Modal>
	)
}

export default SignModal;
