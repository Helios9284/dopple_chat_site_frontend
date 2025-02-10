import React, { useRef, useContext, useState, useMemo, Fragment } from "react";
import { ClickAwayListener, Modal, Zoom, useMediaQuery } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import HtmlTooltip from "./HtmlTooltip";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from "react-redux";
import axios from "../utilities/axiosConfig"
import { commafy } from "../utilities/format";
import { setDetails } from "../redux/reducers/ModalReducer";

const DopplePlusModal = () => {
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width:1024px)');
	const profile = useSelector(store => store.AuthReducer.profile);
	const { openDopplePlusModal: open, setOpenDopplePlusModal, setOpenSignModal } = useContext(RefContext);
	const [count, setCount] = useState(0);
	const [joined, setJoined] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [openTooltip1, setOpenTooltip1] = useState(false);
	const [openTooltip2, setOpenTooltip2] = useState(false);
	const [openTooltip3, setOpenTooltip3] = useState(false);
	const [openTooltip4, setOpenTooltip4] = useState(false);
	let container = useRef();

	const close = async () => {
		setOpenDopplePlusModal(false);
	};

	const join = async () => {
		if (!profile?.email) {
			setOpenSignModal(true)
            dispatch(setDetails({ openLoginOrSignup: false }))
			return
		}
		if (joined) return
		setLoaded(false)
		const { data: { success } } = await axios.post("/doppleplus_waitlist", { email: profile?.email, type: "email" })

		if (success) {
			setJoined(true)
			const { data: { data: { total } } } = await axios.get("/doppleplus_waitlist")
			setCount(total)
			setLoaded(true)
		}
	}

	useMemo(async () => {
		const { data: { data: { total } } } = await axios.get("/doppleplus_waitlist")
		setCount(total)

		if (!profile?.email) {
			setLoaded(true);
			return;
		}

		try {
			const { data } = await axios.put("/doppleplus_waitlist/exists", { email: profile?.email })
			setJoined(data.data.exists || false);
			setLoaded(true);
		} catch (e) {
			console.log(e)
		}
	}, [profile?.email])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px]">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none w-[calc(100%-40px)] rounded-[10px] overflow-auto max-w-[388px] lg:max-w-[1080px] max-h-[90%]"} ref={container}>
					<Zoom in timeout={300}>
						<div className={"bg-[#020815]"}>
							<div className="hidden lg:block absolute top-0 left-0 w-full h-full z-[1] overflow-hidden">
								<LazyLoadImage
									className="w-full h-full object-cover object-top z-[1]"
									alt=""
									effect="blur"
									src="/images/doppleplus/back.png"
								/>
							</div>
							<div className="block lg:hidden absolute top-0 left-0 w-full h-full z-[1] overflow-hidden">
								<LazyLoadImage
									className="w-full h-full object-cover object-top z-[1]"
									alt=""
									effect="blur"
									src="/images/doppleplus/back-mobile.png"
								/>
							</div>
							<div className="flex flex-col items-center lg:items-start px-5 lg:px-[75px] pt-[253px] pb-[30px] lg:py-[63px] rounded-[10px] border border-button shadow-lg11 relative z-[2]">
								<button className="flex justify-center items-center bg-button rounded-bl-[5px] absolute top-0 right-0 w-[35px] lg:w-[30px] h-[35px] lg:h-[30px]" onClick={close}>
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
										<path d="M2 2L12 12M2 12L12 2" stroke="#8A939D" strokeWidth="2" strokeLinecap="square" />
									</svg>
								</button>
								<img className="h-[43.636px] mb-[10px] lg:mb-[19.36px] grow-prop" src="/images/doppleplus/logo.png" alt="" />
								<div className="flex flex-col items-center lg:items-start w-full lg:w-[365px]">
									<span className="font-semibold text-[22px] leading-[26px] lg:text-[35px] lg:leading-[39px] text-center lg:text-left grow-prop delay-[100ms]">Your AI adventure begins here.</span>
									<span className="font-semibold text-[14px] lg:text-[16px] text-subtext mt-5 lg:mt-[15px] grow-prop delay-[200ms]">
										<span className="text-white text-[35px] lg:text-[45px]">$9.99</span>/ Month
									</span>
									<span className="text-[16px] text-subtext mt-[10px] lg:mt-[15px] grow-prop delay-[300ms]">No commitments. Cancel Anytime.</span>
									<div className="flex flex-col space-y-[11px] mt-5 lg:mt-[15.5px]">
										<div className="flex items-center grow-prop delay-[400ms]">
											<img src="/images/doppleplus/check.svg" alt="" />
											<span className="ml-[15px] mr-[5px]">Access to Dopple Vault</span>
											{matches ?
												<HtmlTooltip
													className="dopple-plus-tooltip"
													placement="top"
													title={
														<Fragment>
															<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px]">
																<span>Secure your chats with a dedicated pincode.</span>
															</div>
														</Fragment>
													}
												>
													<img src="/images/doppleplus/info.svg" alt="" />
												</HtmlTooltip>
												:
												<ClickAwayListener onClickAway={() => setOpenTooltip1(false)}>
													<HtmlTooltip
														placement="top"
														PopperProps={{ disablePortal: true }}
														onClose={() => setOpenTooltip1(false)}
														open={openTooltip1}
														title={
															<Fragment>
																<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px] text-center">
																	<span>Secure your chats with a<br />dedicated pincode.</span>
																</div>
															</Fragment>
														}
													>
														<img src="/images/doppleplus/info.svg" alt="" onClick={() => setOpenTooltip1(true)} />
													</HtmlTooltip>
												</ClickAwayListener>
											}
										</div>
										<div className="flex items-center grow-prop delay-[500ms]">
											<img src="/images/doppleplus/check.svg" alt="" />
											<span className="ml-[15px] mr-[5px]">Skip waiting room</span>
											{matches ?
												<HtmlTooltip
													className="dopple-plus-tooltip"
													placement="top"
													title={
														<Fragment>
															<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px]">
																<span>Bypass wait times during high-demand periods.</span>
															</div>
														</Fragment>
													}
												>
													<img src="/images/doppleplus/info.svg" alt="" />
												</HtmlTooltip>
												:
												<ClickAwayListener onClickAway={() => setOpenTooltip2(false)}>
													<HtmlTooltip
														placement="top"
														PopperProps={{ disablePortal: true }}
														onClose={() => setOpenTooltip2(false)}
														open={openTooltip2}
														title={
															<Fragment>
																<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px] text-center">
																	<span>Bypass wait times during<br /> high-demand periods.</span>
																</div>
															</Fragment>
														}
													>
														<img src="/images/doppleplus/info.svg" alt="" onClick={() => setOpenTooltip2(true)} />
													</HtmlTooltip>
												</ClickAwayListener>
											}
										</div>
										<div className="flex items-center grow-prop delay-[600ms]">
											<img src="/images/doppleplus/check.svg" alt="" />
											<span className="ml-[15px] mr-[5px]">Exclusive Chat Themes & PFPs</span>
											{matches ?
												<HtmlTooltip
													className="dopple-plus-tooltip"
													placement="top"
													title={
														<Fragment>
															<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px]">
																<span>Access all chat themes and profile pictures.</span>
															</div>
														</Fragment>
													}
												>
													<img src="/images/doppleplus/info.svg" alt="" />
												</HtmlTooltip>
												:
												<ClickAwayListener onClickAway={() => setOpenTooltip3(false)}>
													<HtmlTooltip
														placement="top"
														PopperProps={{ disablePortal: true }}
														onClose={() => setOpenTooltip3(false)}
														open={openTooltip3}
														title={
															<Fragment>
																<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px] text-center">
																	<span>Access all chat themes<br />and profile pictures.</span>
																</div>
															</Fragment>
														}
													>
														<img src="/images/doppleplus/info.svg" alt="" onClick={() => setOpenTooltip3(true)} />
													</HtmlTooltip>
												</ClickAwayListener>
											}
										</div>
										<div className="flex items-center grow-prop delay-[700ms]">
											<img src="/images/doppleplus/check.svg" alt="" />
											<span className="ml-[15px] mr-[5px]">Early Access to New Features</span>
											{matches ?
												<HtmlTooltip
													className="dopple-plus-tooltip"
													placement="top"
													title={
														<Fragment>
															<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px]">
																<span>Get access to new features before public release</span>
															</div>
														</Fragment>
													}
												>
													<img src="/images/doppleplus/info.svg" alt="" />
												</HtmlTooltip>
												:
												<ClickAwayListener onClickAway={() => setOpenTooltip4(false)}>
													<HtmlTooltip
														placement="top"
														PopperProps={{ disablePortal: true }}
														onClose={() => setOpenTooltip4(false)}
														open={openTooltip4}
														title={
															<Fragment>
																<div className="bg-yellow1 rounded-[5px] p-[10px] text-black text-[12px] leading-[14px] text-center">
																	<span>Get access to new features<br/> before public release</span>
																</div>
															</Fragment>
														}
													>
														<img src="/images/doppleplus/info.svg" alt="" onClick={() => setOpenTooltip4(true)} />
													</HtmlTooltip>
												</ClickAwayListener>
											}
										</div>
									</div>
									<div className="flex items-center space-x-[5px] mt-[15px] lg:mt-5 text-[14px] leading-[17px] tracking-[0.2px] grow-prop delay-[800ms]">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
											<path d="M7.48171 3.64248C7.95043 2.37579 9.74203 2.37579 10.2107 3.64248L11.0155 5.81734C11.1629 6.21559 11.4769 6.52958 11.8751 6.67694L14.05 7.48171C15.3167 7.95043 15.3167 9.74203 14.05 10.2107L11.8751 11.0155C11.4769 11.1629 11.1629 11.4769 11.0155 11.8751L10.2107 14.05C9.74203 15.3167 7.95043 15.3167 7.48171 14.05L6.67694 11.8751C6.52958 11.4769 6.21559 11.1629 5.81734 11.0155L3.64248 10.2107C2.37579 9.74203 2.37579 7.95043 3.64248 7.48171L5.81734 6.67694C6.21559 6.52958 6.52958 6.21559 6.67694 5.81734L7.48171 3.64248Z" fill="white" />
											<path d="M2.35937 0.464456C2.58853 -0.154818 3.46442 -0.154819 3.69357 0.464455L4.09186 1.54083C4.16391 1.73553 4.31741 1.88903 4.51211 1.96108L5.58849 2.35937C6.20776 2.58853 6.20776 3.46442 5.58849 3.69357L4.51211 4.09186C4.31741 4.16391 4.16391 4.31741 4.09186 4.51211L3.69357 5.58849C3.46442 6.20776 2.58853 6.20776 2.35937 5.58849L1.96108 4.51211C1.88903 4.31741 1.73553 4.16391 1.54083 4.09186L0.464456 3.69357C-0.154818 3.46442 -0.154819 2.58853 0.464455 2.35937L1.54083 1.96108C1.73553 1.88903 1.88903 1.73553 1.96108 1.54083L2.35937 0.464456Z" fill="white" />
										</svg>
										<span>Join {commafy(count)} others on the waitlist</span>
									</div>
									<button className="flex justify-center items-center space-x-[10px] font-semibold text-[16px] leading-[19px] w-[253px] lg:w-auto px-5 py-[10px] border border-yellow1 rounded-[5px] bg-gradient10 mt-[10px] grow-prop delay-[900ms]" onClick={join}>
										{(loaded ?
											(joined === true ?
												<>
													<span>You're on the waitlist</span>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 11" fill="none">
														<path d="M2 4.50693L6.20317 8.97546L13.6755 2.02441" stroke="#FFAD00" strokeWidth="2.31701" strokeLinecap="square" strokeLinejoin="round" />
													</svg>
												</>
												:
												"Join Waitlist"
											)
											:
											<div className="flex justify-center items-center">
												<svg className='spinnerInner1' viewBox='0 0 120 120'>
													<circle cx='60' cy='60' r='50' />
												</svg>
											</div>
										)}
									</button>
									<span className="text-[12px] leading-[14px] text-subtext mt-5 lg:mt-[15px] grow-prop delay-[1000ms] text-center lg:text-left">
										The characters portrayed in Dopple are humorous parodies inspired by original characters and are not affiliated, endorsed, or authorized by their respective creators or copyright holders.
									</span>
								</div>
							</div>
						</div>
					</Zoom>
				</div>
			</div>
		</Modal>
	)
}

export default DopplePlusModal;
