import React, { useRef } from "react";
import { Modal, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { useOutsideDetector } from "../hooks/useOutsideDetector";

const WaitlistModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openWaitlistModal);

	let container = useRef();

	const close = async () => {
		dispatch(setOpenWaitlistModal());
	};

	useOutsideDetector([container], () => open === true && close())

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[388px]" ref={container}>
					<Slide direction="up" in={open} timeout={300}>
						<div className="bg-nav-desktop outline-none rounded-[10px] shadow-lg">
							<div className="flex flex-col items-center p-[30px] relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="76" height="75" viewBox="0 0 76 75" fill="none">
									<g filter="url(#filter0_i_3619_64428)">
										<g clip-path="url(#clip0_3619_64428)">
											<rect x="0.5" width="75" height="75" rx="12.2197" fill="url(#paint0_linear_3619_64428)" />
											<path fill-rule="evenodd" clip-rule="evenodd" d="M32.8768 24.5143C33.4067 21.5701 35.9998 19.3353 39.119 19.3353C48.3384 19.3353 55.8537 26.9002 55.8537 36.0947C55.8537 45.4593 48.1993 53.1647 38.8085 53.1647H25.7631C23.3542 53.1647 21.0744 52.0757 19.5605 50.2019C19.5605 54.2325 22.828 57.5 26.8587 57.5H38.8085C50.6581 57.5 60.2225 47.8078 60.2225 36.0947C60.2225 24.5517 50.7971 15 39.119 15C33.2041 15 28.409 19.7583 28.409 25.6279V43.8418H25.8838C24.8044 43.8418 23.9293 42.9734 23.9293 41.9023V24.6526V24.4691C23.9293 20.7458 25.8586 17.2883 29.0273 15.333H28.8801C23.733 15.333 19.5605 19.5055 19.5605 24.6526V41.9023C19.5605 45.3678 22.3916 48.1771 25.8838 48.1771H39.6301C46.2149 48.1771 51.5528 42.88 51.5528 36.3457C51.5528 29.8114 46.2149 24.5143 39.6301 24.5143H32.8768ZM39.5408 43.7461H32.6885V28.7539H39.5408C43.7127 28.7539 47.0947 32.11 47.0947 36.25C47.0947 40.39 43.7127 43.7461 39.5408 43.7461Z" fill="#1B1C20" />
											<g opacity="0.5" filter="url(#filter1_f_3619_64428)">
												<path d="M75.7856 45.5801L0.185547 26.8504V-0.619873H75.7856V45.5801Z" fill="url(#paint1_linear_3619_64428)" />
											</g>
										</g>
										<rect x="1.41648" y="0.916477" width="73.167" height="73.167" rx="11.3032" stroke="white" stroke-width="1.83295" />
									</g>
									<defs>
										<filter id="filter0_i_3619_64428" x="0.5" y="0" width="75" height="79.8879" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
											<feFlood flood-opacity="0" result="BackgroundImageFix" />
											<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
											<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
											<feOffset dy="4.88788" />
											<feGaussianBlur stdDeviation="2.44394" />
											<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
											<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
											<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3619_64428" />
										</filter>
										<filter id="filter1_f_3619_64428" x="-2.25839" y="-3.06381" width="80.488" height="51.0878" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
											<feFlood flood-opacity="0" result="BackgroundImageFix" />
											<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
											<feGaussianBlur stdDeviation="1.22197" result="effect1_foregroundBlur_3619_64428" />
										</filter>
										<linearGradient id="paint0_linear_3619_64428" x1="0.5" y1="75" x2="75.5" y2="0" gradientUnits="userSpaceOnUse">
											<stop stop-color="#F2F2F2" />
											<stop offset="1" stop-color="white" />
										</linearGradient>
										<linearGradient id="paint1_linear_3619_64428" x1="10.2655" y1="-7.48744" x2="32.2428" y2="61.8499" gradientUnits="userSpaceOnUse">
											<stop stop-color="white" />
											<stop offset="1" stop-color="white" stop-opacity="0" />
										</linearGradient>
										<clipPath id="clip0_3619_64428">
											<rect x="0.5" width="75" height="75" rx="12.2197" fill="white" />
										</clipPath>
									</defs>
								</svg>
								<span className="mt-[30px] font-bold text-[24px] leading-[28px]">You're on the list.</span>
								<span className="mt-[10px] text-[14px] leading-[17px] text-subtext text-center tiny:whitespace-nowrap">
									You’ve been added to the Dopple creation waitlist.<br/>
									We’ll email you as soon as its your turn!
								</span>
								<button className="flex justify-center items-center mt-[30px] w-full h-[45px] rounded-[5px] bg-white text-nav font-bold text-[14px] leading-[17px]" onClick={close}>Close</button>
							</div>
						</div>
					</Slide>
				</div>
			</div>
		</Modal >
	)
}

export default WaitlistModal;