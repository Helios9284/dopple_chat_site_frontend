import React, { useContext, useMemo, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenForgetPasswordModal } from "../redux/reducers/ModalReducer";
import { setProfile } from "../redux/reducers/AuthReducer";
import { RefContext } from "../contexts/RefContextProvider";
import { validateEmail } from "../utilities/format";
import axios from "../utilities/axiosConfig"

const ForgetPasswordModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openForgetPasswordModal);
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordForConfirm, setPasswordForConfirm] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);
	const [passwordForConfirmShown, setPasswordForConfirmShown] = useState(false);
	const [code1, setCode1] = useState("");
	const [code2, setCode2] = useState("");
	const [code3, setCode3] = useState("");
	const [code4, setCode4] = useState("");
	const [code, setCode] = useState("");
	const [codeValid, setCodeValid] = useState(-1);
	const { themeID } = useContext(RefContext);
	let container = useRef();
	let ref1 = useRef();
	let ref2 = useRef();
	let ref3 = useRef();
	let ref4 = useRef();

	const close = async () => {
		dispatch(setOpenForgetPasswordModal());
		setEmail("");
		setStep(1);
		setCode1("");
		setCode2("");
		setCode3("");
		setCode4("");
		setCode("");
		setCodeValid(-1);
		setPassword("");
		setPasswordForConfirm("");
		setPasswordShown(false);
		setPasswordForConfirmShown(false);
	};

	const getCodeAtFirst = async () => {
		const { data: { success, code: _code } } = await axios.post("/user/sendCode", {
			email, reason: "Reset Password Code"
		})
		if (success) {
			setCode(_code)
			setStep(2)
		}
	}

	const getCode = async () => {
		const { data: { success, code: _code } } = await axios.post("/user/sendCode", {
			email, reason: "Reset Password Code"
		})
		if (success) setCode(_code)
	}

	const setNewPassword = async () => {
		const { data: { success } } = await axios.put("/user/setPassword", {
			email, password,
		})
		if (success) {
			const { data: { token } } = await axios.get("/user/email/" + email)
			dispatch(setProfile({ type: "email", token, ...jwtDecode(token) }))
			close()
		}
	}

	useMemo(() => open && setStep(1), [open])

	useMemo(() => { if (code1.length === 1 && ref2?.current) ref2?.current?.focus() }, [code1])
	useMemo(() => { if (code2.length === 1 && ref3?.current) ref3?.current?.focus() }, [code2])
	useMemo(() => { if (code3.length === 1 && ref4?.current) ref4?.current?.focus() }, [code3])

	useMemo(() => {
		if (code.length > 0) {
			if (codeValid === -1 && code1.length === 0 && code2.length === 0 && code3.length === 0 && code4.length === 0)
				return
			else {
				if (code === code1 + code2 + code3 + code4) setCodeValid(1)
				else setCodeValid(0)
			}
		}
	}, [code, code1, code2, code3, code4, codeValid])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[450px] overflow-x-hidden overflow-y-auto max-h-[90%]" ref={container}>
					<div className={"border outline-none rounded-[5px] shadow-lg" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-button" : themeID === 2 ? " bg-white border-button" : themeID === 3 ? " bg-nav-desktop border-button" : "")}>
						<button className="flex justify-center items-center absolute top-0 right-0 w-[35px] h-[35px] md:w-[30px] md:h-[30px] bg-button text-subtext rounded-bl-[5px] z-[1]" onClick={close}>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M2 2L12 12M2 12L12 2" stroke="#8A939D" stroke-width="2" stroke-linecap="square" />
							</svg>
						</button>
						<div className="flex flex-col items-center px-[15px] md:px-[30px] py-[78px] relative">
							{/* step1 */}
							{step === 1 &&
								<>
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
										<rect y="0.283203" width="100" height="100" rx="15" fill="#23252B" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M35.7565 38.3069C35.7565 33.4166 39.721 29.4521 44.6113 29.4521C49.5017 29.4521 53.4661 33.4166 53.4661 38.3069V42.7213H35.7565V38.3069ZM30.7565 42.7213V38.3069C30.7565 30.6552 36.9595 24.4521 44.6113 24.4521C52.2631 24.4521 58.4661 30.6551 58.4661 38.3069V42.7213H63.8777V52.4761C56.5739 52.4765 50.6532 58.3975 50.6532 65.7013C50.6532 66.8515 50.8 67.9674 51.0759 69.0313H25.709V42.7213H30.7565ZM46.4533 57.1132C47.6664 56.5032 48.4987 55.2472 48.4987 53.7968C48.4987 51.748 46.8377 50.087 44.7888 50.087C42.74 50.087 41.079 51.748 41.079 53.7968C41.079 55.2458 41.9097 56.5008 43.1209 57.1115V60.4899H46.4533V57.1132Z" fill="#848D97" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M63.8795 76.1141C69.6302 76.1141 74.2921 71.4522 74.2921 65.7015C74.2921 59.9507 69.6302 55.2888 63.8795 55.2888C58.1287 55.2888 53.4668 59.9507 53.4668 65.7015C53.4668 71.4522 58.1287 76.1141 63.8795 76.1141ZM62.6472 67.2843L62.6554 67.8636H64.5484V67.3903C64.5484 66.5744 64.8503 66.1501 65.9191 65.53C67.0288 64.8691 67.6489 63.9961 67.6489 62.7558V62.7395C67.6489 60.9526 66.1557 59.6635 63.9201 59.6635C61.4968 59.6635 60.1668 61.0669 60.1097 62.9761V62.9925L62.0108 62.9843L62.0271 62.9761C62.0843 61.9726 62.7615 61.328 63.814 61.328C64.8421 61.328 65.5275 61.9562 65.5275 62.813V62.8293C65.5275 63.6289 65.1848 64.0695 64.173 64.6814C63.0471 65.3423 62.5738 66.0767 62.6472 67.2843ZM62.3372 70.4582C62.3372 71.2334 62.8757 71.7392 63.6916 71.7392C64.5239 71.7392 65.0461 71.2334 65.0461 70.4582C65.0461 69.6749 64.5239 69.1691 63.6916 69.1691C62.8757 69.1691 62.3372 69.6749 62.3372 70.4582Z" fill="#848D97" />
									</svg>
									<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										Forgot password?
									</span>
									<span className={"mt-[10px] text-center font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										No worries, we’ll send you reset instructions.
									</span>
									<div className={"flex items-center rounded-[5px] border px-5 h-[50px] relative my-[82px] w-full transition duration-800" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + ((!validateEmail(email) && email.length > 0 ? " border-[#E93131]" : (themeID === 0 ? " border-button" : themeID === 1 ? " border-[#C4C7CB]" : themeID === 2 ? " border-[#C4C7CB]" : themeID === 3 ? " text-button" : "")))}>
										<input className={"w-0 flex-1 text-[14px] leading-[17px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")} placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
									</div>
									<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" disabled={(!validateEmail(email) && email.length > 0) || email?.length === 0} onClick={getCodeAtFirst}>
										Reset password
									</button>
								</>
							}

							{/* step2 */}
							{step === 2 &&
								<>
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
										<rect width="100" height="100" rx="15" fill="#23252B" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M35.8663 38.1124C35.8663 33.264 39.7968 29.3335 44.6452 29.3335C49.4937 29.3335 53.4241 33.2639 53.4241 38.1124V42.4972H35.8663V38.1124ZM30.8663 42.4972V38.1124C30.8663 30.5025 37.0353 24.3335 44.6452 24.3335C52.2551 24.3335 58.4241 30.5025 58.4241 38.1124V42.4972H63.7848V52.1868C56.53 52.1874 50.6491 58.0687 50.6491 65.3236C50.6491 66.4661 50.7949 67.5746 51.069 68.6314H25.8711V42.4972H30.8663ZM46.4782 56.7931C47.6831 56.1871 48.5098 54.9396 48.5098 53.4989C48.5098 51.4637 46.86 49.8139 44.8248 49.8139C42.7896 49.8139 41.1398 51.4637 41.1398 53.4989C41.1398 54.9382 41.965 56.1847 43.168 56.7913V60.1473H46.4782V56.7931Z" fill="#848D97" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M63.7884 75.6669C69.5007 75.6669 74.1315 71.0361 74.1315 65.3238C74.1315 59.6115 69.5007 54.9807 63.7884 54.9807C58.0761 54.9807 53.4453 59.6115 53.4453 65.3238C53.4453 71.0361 58.0761 75.6669 63.7884 75.6669ZM66.3217 59.7599L65.9048 58.4155L67.0509 58.0601L67.9903 61.0892L68.1679 61.662L67.5952 61.8399L64.5682 62.7804L64.2122 61.6345L65.7606 61.1534C63.6085 60.1301 60.9963 60.9174 59.7842 63.0169C59.0496 64.2892 58.9888 65.7652 59.4932 67.0342L58.0993 67.5882C57.4328 65.9112 57.5115 63.9533 58.4852 62.267C60.0758 59.5118 63.4862 58.4622 66.3217 59.7599ZM68.0793 63.6353C68.5757 64.9001 68.512 66.3678 67.781 67.6339C66.5676 69.7357 63.9511 70.5224 61.7976 69.4942L63.3506 69.0117L62.9946 67.8657L59.9676 68.8062L59.3949 68.9841L59.5725 69.5569L60.5119 72.5861L61.658 72.2306L61.2425 70.8905C64.0782 72.1889 67.4892 71.1394 69.08 68.3839C70.0489 66.7058 70.1317 64.7588 69.4756 63.0872L68.0793 63.6353Z" fill="#848D97" />
									</svg>
									<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										Password reset
									</span>
									<span className={"mt-[10px] text-center font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										We sent a code to{"\u00a0"}
										<span className="font-bold">{email}</span>
									</span>
									<div className="flex flex-col items-center space-y-[15px] my-[30px]">
										<span className={"font-bold text-[16px] leading-[19px]" + (codeValid === 0 ? " text-[#E93131]" : "")}>{codeValid === 0 ? "Invalid Code" : "Enter code"}</span>
										<div className="flex space-x-[10px] codebox">
											<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
												<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code1} onChange={e => e.target.value.length <= 1 && setCode1(e.target.value)} ref={ref1} type="number" />
											</div>
											<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
												<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code2} onChange={e => e.target.value.length <= 1 && setCode2(e.target.value)} ref={ref2} type="number" />
											</div>
											<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
												<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code3} onChange={e => e.target.value.length <= 1 && setCode3(e.target.value)} ref={ref3} type="number" />
											</div>
											<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
												<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code4} onChange={e => e.target.value.length <= 1 && setCode4(e.target.value)} ref={ref4} type="number" />
											</div>
										</div>
										<span className="text-[14px] leading-[17px] text-subtext">
											Didn't receive an email?{"\u00a0"}
											<button className="font-bold text-blue2" onClick={getCode}>Resend Now.</button>
										</span>
									</div>
									<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" disabled={code !== code1 + code2 + code3 + code4 || code1.length === 0 || code2.length === 0 || code3.length === 0 || code4.length === 0} onClick={() => code === code1 + code2 + code3 + code4 && setStep(3)}>
										Continue
									</button>
								</>
							}

							{/* step3 */}
							{step === 3 &&
								<>
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
										<rect width="100" height="100" rx="15" fill="#23252B" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M37.5734 39.3922C37.5734 34.5437 41.5038 30.6133 46.3523 30.6133C51.2007 30.6133 55.1312 34.5437 55.1312 39.3922V43.777H37.5734V39.3922ZM32.5734 43.777V39.3922C32.5734 31.7823 38.7424 25.6133 46.3523 25.6133C53.9621 25.6133 60.1312 31.7823 60.1312 39.3922V43.777H65.4918V54.2692L53.6318 66.0719L52.7326 69.9112H27.5781V43.777H32.5734ZM48.1852 58.0729C49.3901 57.4669 50.2169 56.2193 50.2169 54.7787C50.2169 52.7435 48.567 51.0936 46.5319 51.0936C44.4967 51.0936 42.8468 52.7435 42.8468 54.7787C42.8468 56.218 43.672 57.4645 44.875 58.0711V61.427H48.1852V58.0729Z" fill="#848D97" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M66.8673 55.7891L72.4221 61.3261L68.2808 65.5085L65.4414 62.669L62.6979 59.9254L66.8673 55.7891ZM61.7219 60.8937L55.5646 67.0022C55.3941 67.1727 55.2745 67.3843 55.2245 67.6039L53.7531 74.387L60.6273 72.9844C60.8406 72.9321 61.0453 72.8143 61.211 72.6486L67.3135 66.4855L64.4693 63.6411L61.7219 60.8937Z" fill="#848D97" />
									</svg>
									<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										Set new password
									</span>
									<span className={"mt-[10px] font-light text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										Must be at least 8 characters
									</span>
									<div className="w-full relative my-[52px]">
										{password !== passwordForConfirm ?
											<span className="absolute bottom-[calc(100%+7px)] right-0 text-[#E93131] text-[12px] leading-[14px]">Passwords doesn’t match</span>
											:
											(password.length < 8 || passwordForConfirm.length < 8) &&
											<span className="absolute bottom-[calc(100%+7px)] right-0 text-[#E93131] text-[12px] leading-[14px]">Must be at least 8 characters</span>
										}
										<div className="flex flex-col space-y-[10px] w-full">
											<div className={"flex items-center rounded-[5px] border px-[15px] h-[50px] relative w-full transition duration-800" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + ((password !== passwordForConfirm || password.length < 8 || passwordForConfirm.length < 8) ? " text-[#E93131] border-[#E93131]" : (themeID === 0 ? " border-button text-white" : themeID === 1 ? " border-[#C4C7CB] text-title" : themeID === 2 ? " border-[#C4C7CB] text-title" : themeID === 3 ? " text-white" : ""))}>
												<input className={"w-0 flex-1 font-light text-[14px] leading-[17px]" + (passwordShown === false && password.length > 0 ? " passinput" : "")} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} type={passwordShown ? "text" : "password"} />
												<button className={password === passwordForConfirm ? "text-subtext" : "text-[#E93131]"} onClick={() => setPasswordShown(!passwordShown)}>
													{passwordShown ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
															<path d="M9.99913 15.8334C10.7875 15.8334 11.5075 15.7476 12.1641 15.5992L10.7 14.1351C10.4725 14.1526 10.2416 14.1667 9.99913 14.1667C5.53996 14.1667 3.81246 10.9617 3.39413 10.0001C3.70825 9.29906 4.1325 8.65284 4.65079 8.08589L3.48579 6.92089C2.20413 8.31006 1.71829 9.70922 1.70913 9.73672C1.65164 9.90786 1.65164 10.0931 1.70913 10.2642C1.72663 10.3192 3.63829 15.8334 9.99913 15.8334ZM9.99913 4.16672C8.46829 4.16672 7.21079 4.49672 6.16246 4.98422L3.08829 1.91089L1.90996 3.08922L16.91 18.0892L18.0883 16.9109L15.3225 14.1451C17.5008 12.5192 18.2783 10.2992 18.29 10.2642C18.3474 10.0931 18.3474 9.90786 18.29 9.73672C18.2716 9.68089 16.36 4.16672 9.99913 4.16672ZM14.1425 12.9651L12.2425 11.0651C12.4008 10.7401 12.4991 10.3826 12.4991 10.0001C12.4991 8.63256 11.3666 7.50006 9.99913 7.50006C9.61663 7.50006 9.25913 7.59839 8.93496 7.75756L7.42829 6.25089C8.25539 5.96707 9.12472 5.82589 9.99913 5.83339C14.4583 5.83339 16.1858 9.03839 16.6041 10.0001C16.3525 10.5767 15.6325 11.9517 14.1425 12.9651Z" />
														</svg>
														:
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" onClick={() => setPasswordShown(true)}>
															<path d="M10.0007 7.5C10.6637 7.5 11.2996 7.76339 11.7684 8.23223C12.2373 8.70107 12.5007 9.33696 12.5007 10C12.5007 10.663 12.2373 11.2989 11.7684 11.7678C11.2996 12.2366 10.6637 12.5 10.0007 12.5C9.33761 12.5 8.70173 12.2366 8.23288 11.7678C7.76404 11.2989 7.50065 10.663 7.50065 10C7.50065 9.33696 7.76404 8.70107 8.23288 8.23223C8.70173 7.76339 9.33761 7.5 10.0007 7.5ZM10.0007 3.75C14.1673 3.75 17.7257 6.34167 19.1673 10C17.7257 13.6583 14.1673 16.25 10.0007 16.25C5.83398 16.25 2.27565 13.6583 0.833984 10C2.27565 6.34167 5.83398 3.75 10.0007 3.75ZM2.65065 10C3.3242 11.3753 4.37007 12.534 5.66938 13.3444C6.96869 14.1548 8.46931 14.5844 10.0007 14.5844C11.532 14.5844 13.0326 14.1548 14.3319 13.3444C15.6312 12.534 16.6771 11.3753 17.3507 10C16.6771 8.62474 15.6312 7.46604 14.3319 6.65562C13.0326 5.8452 11.532 5.41557 10.0007 5.41557C8.46931 5.41557 6.96869 5.8452 5.66938 6.65562C4.37007 7.46604 3.3242 8.62474 2.65065 10Z" />
														</svg>
													}
												</button>
											</div>
											<div className={"flex items-center rounded-[5px] border px-[15px] h-[50px] relative w-full transition duration-800" + (themeID === 0 ? " bg-inputback" : themeID === 1 ? " bg-[#F7F7FA]" : themeID === 2 ? " bg-[#F7F7FA]" : themeID === 3 ? " bg-inputback" : "") + ((password !== passwordForConfirm || password.length < 8 || passwordForConfirm.length < 8) ? " text-[#E93131] border-[#E93131]" : (themeID === 0 ? " border-button text-white" : themeID === 1 ? " border-[#C4C7CB] text-title" : themeID === 2 ? " border-[#C4C7CB] text-title" : themeID === 3 ? " text-white" : ""))}>
												<input className={"w-0 flex-1 font-light text-[14px] leading-[17px]" + (passwordForConfirmShown === false && passwordForConfirm.length > 0 ? " passinput" : "")} placeholder="Confirm your password" value={passwordForConfirm} onChange={e => setPasswordForConfirm(e.target.value)} type={passwordForConfirmShown ? "text" : "password"} />
												<button className={password === passwordForConfirm ? "text-subtext" : "text-[#E93131]"} onClick={() => setPasswordForConfirmShown(!passwordForConfirmShown)}>
													{passwordForConfirmShown ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
															<path d="M9.99913 15.8334C10.7875 15.8334 11.5075 15.7476 12.1641 15.5992L10.7 14.1351C10.4725 14.1526 10.2416 14.1667 9.99913 14.1667C5.53996 14.1667 3.81246 10.9617 3.39413 10.0001C3.70825 9.29906 4.1325 8.65284 4.65079 8.08589L3.48579 6.92089C2.20413 8.31006 1.71829 9.70922 1.70913 9.73672C1.65164 9.90786 1.65164 10.0931 1.70913 10.2642C1.72663 10.3192 3.63829 15.8334 9.99913 15.8334ZM9.99913 4.16672C8.46829 4.16672 7.21079 4.49672 6.16246 4.98422L3.08829 1.91089L1.90996 3.08922L16.91 18.0892L18.0883 16.9109L15.3225 14.1451C17.5008 12.5192 18.2783 10.2992 18.29 10.2642C18.3474 10.0931 18.3474 9.90786 18.29 9.73672C18.2716 9.68089 16.36 4.16672 9.99913 4.16672ZM14.1425 12.9651L12.2425 11.0651C12.4008 10.7401 12.4991 10.3826 12.4991 10.0001C12.4991 8.63256 11.3666 7.50006 9.99913 7.50006C9.61663 7.50006 9.25913 7.59839 8.93496 7.75756L7.42829 6.25089C8.25539 5.96707 9.12472 5.82589 9.99913 5.83339C14.4583 5.83339 16.1858 9.03839 16.6041 10.0001C16.3525 10.5767 15.6325 11.9517 14.1425 12.9651Z" />
														</svg>
														:
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
															<path d="M10.0007 7.5C10.6637 7.5 11.2996 7.76339 11.7684 8.23223C12.2373 8.70107 12.5007 9.33696 12.5007 10C12.5007 10.663 12.2373 11.2989 11.7684 11.7678C11.2996 12.2366 10.6637 12.5 10.0007 12.5C9.33761 12.5 8.70173 12.2366 8.23288 11.7678C7.76404 11.2989 7.50065 10.663 7.50065 10C7.50065 9.33696 7.76404 8.70107 8.23288 8.23223C8.70173 7.76339 9.33761 7.5 10.0007 7.5ZM10.0007 3.75C14.1673 3.75 17.7257 6.34167 19.1673 10C17.7257 13.6583 14.1673 16.25 10.0007 16.25C5.83398 16.25 2.27565 13.6583 0.833984 10C2.27565 6.34167 5.83398 3.75 10.0007 3.75ZM2.65065 10C3.3242 11.3753 4.37007 12.534 5.66938 13.3444C6.96869 14.1548 8.46931 14.5844 10.0007 14.5844C11.532 14.5844 13.0326 14.1548 14.3319 13.3444C15.6312 12.534 16.6771 11.3753 17.3507 10C16.6771 8.62474 15.6312 7.46604 14.3319 6.65562C13.0326 5.8452 11.532 5.41557 10.0007 5.41557C8.46931 5.41557 6.96869 5.8452 5.66938 6.65562C4.37007 7.46604 3.3242 8.62474 2.65065 10Z" />
														</svg>
													}
												</button>
											</div>
										</div>
									</div>
									<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" disabled={password?.length === 0 || passwordForConfirm?.length === 0 || password !== passwordForConfirm || password.length < 8 || passwordForConfirm.length < 8} onClick={setNewPassword}>
										Reset password
									</button>
								</>
							}

							{/* step4 */}
							{step === 4 &&
								<>
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
										<rect y="0.283203" width="100" height="100" rx="15" fill="#23252B" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M35.7565 38.3069C35.7565 33.4166 39.721 29.4521 44.6113 29.4521C49.5017 29.4521 53.4661 33.4166 53.4661 38.3069V42.7213H35.7565V38.3069ZM30.7565 42.7213V38.3069C30.7565 30.6552 36.9595 24.4521 44.6113 24.4521C52.2631 24.4521 58.4661 30.6551 58.4661 38.3069V42.7213H63.8777V52.4761C56.5739 52.4765 50.6532 58.3975 50.6532 65.7013C50.6532 66.8515 50.8 67.9674 51.0759 69.0313H25.709V42.7213H30.7565ZM46.4533 57.1132C47.6664 56.5032 48.4987 55.2472 48.4987 53.7968C48.4987 51.748 46.8377 50.087 44.7888 50.087C42.74 50.087 41.079 51.748 41.079 53.7968C41.079 55.2458 41.9097 56.5008 43.1209 57.1115V60.4899H46.4533V57.1132Z" fill="#848D97" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M63.8795 76.1141C69.6302 76.1141 74.2921 71.4522 74.2921 65.7015C74.2921 59.9507 69.6302 55.2888 63.8795 55.2888C58.1287 55.2888 53.4668 59.9507 53.4668 65.7015C53.4668 71.4522 58.1287 76.1141 63.8795 76.1141ZM63.2322 68.975L69.3197 63.268L67.9518 61.8089L62.5955 66.8305L59.8551 63.8943L58.393 65.259L61.8172 68.9278L62.501 69.6604L63.2322 68.975Z" fill="#848D97" />
									</svg>
									<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										Password has been changed
									</span>
									<span className={"mt-[10px] text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
										You are ready to log in
									</span>
									<div className="my-[147px]" />
								</>
							}

							<button className="flex items-center space-x-[10px] text-blue2 font-bold text-[14px] leading-[17px] mt-[30px] self-center" onClick={close}>
								<svg width="20" height="34" viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M2 17L9.28571 10M2 17L9.28571 24M2 17L19 17" stroke="#048DFF" stroke-width="2" stroke-linecap="square" />
								</svg>
								<span>Back to log in</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal >
	)
}

export default ForgetPasswordModal;