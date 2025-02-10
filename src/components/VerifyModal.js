import React, { useContext, useMemo, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenVerifyModal } from "../redux/reducers/ModalReducer";
import { setProfile } from "../redux/reducers/AuthReducer";
import { RefContext } from "../contexts/RefContextProvider";
import axios from "../utilities/axiosConfig"
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { useNavigate } from "react-router-dom";

const VerifyModal = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openVerifyModal);
	const newCreds = useSelector(store => store.ModalReducer.details.newCreds);
	const [code1, setCode1] = useState("");
	const [code2, setCode2] = useState("");
	const [code3, setCode3] = useState("");
	const [code4, setCode4] = useState("");
	const [code, setCode] = useState("");
	const [codeValid, setCodeValid] = useState(false);
	const { themeID } = useContext(RefContext);
	let container = useRef();
	let ref1 = useRef();
	let ref2 = useRef();
	let ref3 = useRef();
	let ref4 = useRef();

	const close = async () => {
		dispatch(setOpenVerifyModal());
	};

	const getCode = async () => {
		const { data: { success, code: _code } } = await axios.post("/user/sendCode", {
			email: newCreds.email, reason: "Confirm Email"
		})
		if (success) setCode(_code)
	}

	const setVerified = async () => {
		const { data } = await axios.post("/user", newCreds)
		if (data.success) {
			await axios.post("/user/email_confirmed", { email: newCreds.email })
			window.fbq("track", "CompleteRegistration")
			window.ttq.track("CompleteRegistration")
			window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/jzdnCIqUrc8YEJ2mi4oq' })
			window.snaptr("track", "SIGN_UP")
			dispatch(setProfile({ type: 2, token: data.token, ...jwtDecode(data.token) }))
			nav("/")
			close()
		}
	}

	useMemo(() => open && getCode(), [open])

	useMemo(() => code1.length === 1 && ref2?.current.focus(), [code1])
	useMemo(() => code2.length === 1 && ref3?.current.focus(), [code2])
	useMemo(() => code3.length === 1 && ref4?.current.focus(), [code3])

	useMemo(() => {
		if (code.length > 0 && code1.length > 0 && code2.length > 0 && code3.length > 0 && code4.length > 0) {
			if (code === code1 + code2 + code3 + code4) setCodeValid(1)
			else setCodeValid(0)
		}
	}, [code, code1, code2, code3, code4])

	useOutsideDetector([container], () => open && close())

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[450px]" ref={container}>
					<div className={"border outline-none rounded-[5px] shadow-lg" + (themeID === 0 ? " bg-nav-desktop border-button" : themeID === 1 ? " bg-white border-button" : themeID === 2 ? " bg-white border-button" : themeID === 3 ? " bg-nav-desktop border-button" : "")}>
						<div className="flex flex-col items-center px-[15px] md:px-[30px] py-[30px] relative">
							<span className={"font-bold text-[24px] leading-[28px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
								Verify your email
							</span>
							<span className={"mt-[15px] text-center text-[16px] leading-[19px]" + (themeID === 0 ? " text-white" : themeID === 1 ? " text-title" : themeID === 2 ? " text-title" : themeID === 3 ? " text-white" : "")}>
								Please check your inbox for verification code sent to{"\u00a0"}
								<span className="font-bold">{newCreds?.email}</span>
							</span>
							<div className="flex flex-col items-center space-y-[15px] my-[48px]">
								<span className={"font-bold text-[16px] leading-[19px]" + (codeValid === 0 ? " text-[#E93131]" : "")}>{codeValid === 0 ? "Invalid Code" : "Enter code"}</span>
								<div className="flex space-x-[10px]">
									<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
										<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code1} onChange={e => setCode1(e.target.value)} ref={ref1} />
									</div>
									<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
										<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code2} onChange={e => setCode2(e.target.value)} ref={ref2} />
									</div>
									<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
										<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code3} onChange={e => setCode3(e.target.value)} ref={ref3} />
									</div>
									<div className={"flex justify-center items-center w-[82px] h-[88px] rounded-[5px] bg-inputback border" + (codeValid === 0 ? " border-[#E93131] text-[#E93131]" : " border-button")}>
										<input className="w-[31px] h-full font-bold text-[45px] leading-[48px] placeholder-button" placeholder="0" maxLength={1} value={code4} onChange={e => setCode4(e.target.value)} ref={ref4} />
									</div>
								</div>
								<span className="text-[14px] leading-[17px] text-subtext">
									Didn't receive an email?{"\u00a0"}
									<button className="font-bold text-blue2" onClick={getCode}>Resend Now.</button>
								</span>
							</div>
							<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" disabled={code !== code1 + code2 + code3 + code4 || code1.length === 0 || code2.length === 0 || code3.length === 0 || code4.length === 0} onClick={() => code === code1 + code2 + code3 + code4 && setVerified()}>
								Verify Email
							</button>
							<span className="mt-[30px] text-[14px] leading-[17px]">Can’t find it? Please check your spam folder</span>
						</div>
					</div>
				</div>
			</div>
		</Modal >
	)
}

export default VerifyModal;