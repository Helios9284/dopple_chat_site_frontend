import React, { useRef, useContext, useState, useMemo } from "react";
import { Modal, Slide } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Swiper, SwiperSlide } from 'swiper/react';

const CookieModal = () => {
	const { openCookieModal: open, setOpenCookieModal } = useContext(RefContext);
	const [, setCookies] = useCookies(["accepted"])
	const [allow, setAllow] = useState(false)
	const [showOptional, setShowOptional] = useState(false)
	let container = useRef();
	const [swiper, setSwiper] = useState(null);
	const [elastic, setElastic] = useState("none");

	const close = async () => {
		setOpenCookieModal(false);
	};

	const acceptOptional = () => {
		setCookies("accepted", "partially")
		close()
	}

	const accept = () => {
		setCookies("accepted", "all")
		close()
	}

	const manageCookies = () => {
		setShowOptional(true)
		setElastic("right")
		setTimeout(() => setElastic("none"), 400)
	}

	useMemo(() => {
		if (showOptional) swiper.slideTo(1)
	}, [showOptional])

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-inputback backdrop-blur-[5px] outline-none">
				<div className={"fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 outline-none w-[calc(100vw-40px)] max-w-[512px] rounded-[10px]"} ref={container}>
					<Slide direction="up" in={open} timeout={300}>
						<div className="flex flex-col items-center px-4 md:px-[38px] pt-[38px] pb-[30px] md:pb-10 bg-nav-desktop rounded-[10px] scrollbar overflow-x-hidden overflow-y-auto max-h-[90vh]">
							<svg className="w-[70px] h-[74px] min-h-[74px]" xmlns="http://www.w3.org/2000/svg" width="70" height="74" viewBox="0 0 70 74" fill="none">
								<path fillRule="evenodd" clipRule="evenodd" d="M22.9241 16.5053C23.8362 11.3979 28.3004 7.52091 33.6701 7.52091C49.5413 7.52091 62.4791 20.6445 62.4791 36.595C62.4791 52.8408 49.302 66.2081 33.1355 66.2081H9.06781C5.94051 66.2081 2.98235 64.7883 1.02619 62.3483L0 61.0683V68.334C0 71.3136 2.41543 73.729 5.39502 73.729H33.1355C53.5347 73.729 70 56.915 70 36.595C70 16.5703 53.7741 0 33.6701 0C23.4875 0 15.2328 8.25467 15.2328 18.4373V50.0347H10.8855C9.02729 50.0347 7.5209 48.5283 7.5209 46.6701V16.7453V10.3757C7.5209 7.67629 8.91476 5.16822 11.2071 3.74278L16.2971 0.577765H7.81069C3.49697 0.577765 0 4.07473 0 8.38846V16.7453V46.6701C0 52.682 4.87362 57.5556 10.8855 57.5556H34.55C45.8857 57.5556 55.0751 48.3662 55.0751 37.0305C55.0751 25.6948 45.8857 16.5053 34.55 16.5053H22.9241ZM34.5516 50.0347H22.7553V24.0263H34.5516C41.7336 24.0263 47.5558 29.8485 47.5558 37.0305C47.5558 44.2125 41.7336 50.0347 34.5516 50.0347Z" fill="white" />
							</svg>
							<span className="mt-[29.27px] font-bold text-[24px] leading-[28px]">Welcome to Dopple!</span>
							<span className="mt-2 font-medium text-[14px] leading-[24px] text-center">Please accept the Dopple terms of service and cookie policy before proceeding.</span>
							<span className="mt-[17px] text-[#CACFD2] text-[14px] leading-[24px]">Please remember:</span>
							<div className="flex flex-col space-y-[10px] text-[#CACFD2] text-[14px]">
								<div className="flex items-center space-x-4">
									<svg className="min-w-[20px]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M10.6152 9.93143H14.8953M10.6152 9.93143V8.51614V7.10085H13.3265L15.598 4.82935M10.6152 9.93143V11.5227V13.114H13.3265L15.2016 14.9891" stroke="#8A939D" strokeLinejoin="round" />
										<circle cx="16.3716" cy="3.91921" r="1.5923" fill="#8A939D" />
										<circle cx="16.3482" cy="9.91335" r="1.5923" fill="#8A939D" />
										<circle cx="16.3716" cy="15.7776" r="1.5923" fill="#8A939D" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11.1789 15.7038V16.3931C11.1789 17.5721 10.0341 18.5279 8.62193 18.5279C7.20978 18.5279 6.065 17.5721 6.065 16.3931V15.7038C5.1544 15.7509 3.55814 15.3778 3.44973 13.6905C3.70107 13.7139 3.97601 13.7239 4.26087 13.7132C4.87387 13.6902 5.56979 13.5698 6.18469 13.2487L5.7218 12.3623C5.28242 12.5917 4.74695 12.6942 4.22328 12.7139C3.70122 12.7336 3.22773 12.6695 2.93715 12.5964L2.93563 12.6024C1.7602 12.2075 0.898541 11.1178 1.13212 9.63176C1.40818 7.87541 3.14317 7.3881 4.06413 7.37241C3.68024 6.47227 3.50367 4.79324 5.34514 4.38192C5.40624 4.87883 5.55772 5.43462 5.84061 5.92328C6.23877 6.6111 6.91747 7.18872 7.94853 7.21472L7.97374 6.21504C7.36901 6.19979 6.97332 5.88398 6.70606 5.42229C6.46675 5.00889 6.34785 4.49908 6.31927 4.06655V3.48076C6.31927 2.36039 7.40713 1.45215 8.74907 1.45215C10.091 1.45215 11.1789 2.36039 11.1789 3.48076V7.37241V9.93693V12.8204V15.7038ZM7.65481 9.42548H11.1476V10.4255H7.65481V9.42548Z" fill="#8A939D" />
									</svg>
									<span className="leading-[24px]">Dopples are AI-powered and everything they say or create is made up.</span>
								</div>
								<div className="flex items-center space-x-4">
									<svg className="min-w-[20px]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M18.328 2.98364H1.42188V6.31728H18.328V2.98364ZM18.328 7.31728H1.42188V17.0163H18.328V7.31728ZM3.36379 5.15978H7.50422V4.15978H3.36379V5.15978ZM4.20832 11.9434L2.99542 13.1568L3.70267 13.8637L4.91558 12.6503L6.12908 13.8633L6.83604 13.1561L5.62254 11.9431L6.83427 10.7308L6.12702 10.0239L4.91528 11.2361L3.70313 10.0245L2.99617 10.7317L4.20832 11.9434ZM7.95325 13.1568L9.16616 11.9434L7.954 10.7317L8.66096 10.0245L9.87312 11.2361L11.0849 10.0239L11.7921 10.7308L10.5804 11.9431L11.7939 13.1561L11.0869 13.8633L9.87341 12.6503L8.66051 13.8637L7.95325 13.1568ZM14.124 11.9434L12.9111 13.1568L13.6184 13.8637L14.8313 12.6503L16.0448 13.8633L16.7518 13.1561L15.5383 11.9431L16.75 10.7308L16.0427 10.0239L14.831 11.2361L13.6188 10.0245L12.9119 10.7317L14.124 11.9434Z" fill="#8A939D" />
									</svg>
									<span className="leading-[24px]">Some Dopples can be offensive and produce NSFW content. </span>
								</div>
								<div className="flex items-center space-x-4">
									<svg className="min-w-[20px]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M12.6062 1.80151H2.73828V17.9055H17.2821V6.88409H13.1062H12.6062V6.38409V1.80151ZM17.0017 5.88409H13.6062V2.00571L17.0017 5.88409ZM13.8901 9.28366H6.0749V8.28366H13.8901V9.28366ZM6.0749 12.0258H13.8901V11.0258H6.0749V12.0258ZM11.5651 14.7679H6.0749V13.7679H11.5651V14.7679Z" fill="#8A939D" />
									</svg>
									<span className="leading-[24px]">You can read Dopple descriptions to preview their personality before chatting with them.</span>
								</div>
							</div>
							<span className="mt-[17px] text-[#CACFD2] font-medium text-[14px] leading-[24px] text-center">
								🍪 We use cookies to improve the Dopple experience.
							</span>

							<Swiper
								onSwiper={setSwiper}
								slidesPerView={'auto'}
								spaceBetween={40}
								initialSlide={0}
								allowTouchMove={false}
								className={"dopple-row-mobile mt-[17px] ranking-container " + (elastic === "left" ? `translate-x-[5px]` : elastic === "right" ? `translate-x-[-5px]` : "translate-x-[0px]")}
							>
								<SwiperSlide className={"flex ranking-table font-bold text-[14px] leading-[17px] space-x-[18px] md:space-x-[31px]"}>
									<button className="flex justify-center items-center space-x-[5px] flex-1 min-h-[50px] h-[50px] md:min-h-[45px] md:h-[45px] transition-all bg-button hover:bg-[#34363C] rounded-[5px]" onClick={manageCookies}>Manage Cookies</button>
									<button className={"flex justify-center items-center space-x-[5px] flex-1 min-h-[50px] h-[50px] md:min-h-[45px] md:h-[45px] transition-all bg-blue2 hover:bg-blue3 rounded-[5px]" + (showOptional ? " w-full md:w-auto" : "")} onClick={accept}>
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
											<path fillRule="evenodd" clipRule="evenodd" d="M0.863281 5.72734L2.68157 3.90905L5.409 6.63648L11.3184 0.727051L13.1367 2.54534L5.409 10.2731L0.863281 5.72734Z" fill="white" />
										</svg>
										<span>Accept</span>
									</button>
								</SwiperSlide>
								<SwiperSlide className={"flex ranking-table font-bold text-[14px] leading-[17px] flex-col justify-between items-center md:items-stretch md:flex-row space-y-4 md:space-y-0"}>
									{showOptional &&
										<button className="flex items-center space-x-[9px]" onClick={() => setAllow(!allow)}>
											<div className="flex justify-center items-center w-[15px] h-[15px] bg-white rounded-[5px]">
												{allow &&
													<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
														<path fillRule="evenodd" clipRule="evenodd" d="M0 4.38909L1.41421 2.97487L3.53553 5.09619L8.13173 0.5L9.54594 1.91421L3.53553 7.92462L0 4.38909Z" fill="#1B1C20" />
													</svg>
												}
											</div>
											<span className="font-medium text-[14px] leading-[24px] text-subtext">Optional cookies allowed</span>
										</button>
									}
									<button className={"flex justify-center items-center space-x-[5px] min-h-[50px] h-[50px] md:min-h-[45px] md:h-[45px] transition-all bg-blue2 hover:bg-blue3 rounded-[5px]" + (showOptional ? " w-full md:w-[203px]" : "")} onClick={acceptOptional}>
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
											<path fillRule="evenodd" clipRule="evenodd" d="M0.863281 5.72734L2.68157 3.90905L5.409 6.63648L11.3184 0.727051L13.1367 2.54534L5.409 10.2731L0.863281 5.72734Z" fill="white" />
										</svg>
										<span>Accept</span>
									</button>
								</SwiperSlide>
							</Swiper>
							<span className="block md:hidden text-[14px] leading-[17px] text-center mt-8">
								By joining, I agree to the
								<Link to="/terms" className="font-bold text-blue2"> Terms and Conditions</Link>
							</span>
						</div>
					</Slide>
				</div>
			</div>
		</Modal>
	)
}

export default CookieModal;
