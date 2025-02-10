import { Link } from "react-router-dom"

const About = () => {
	return (
		<div>
			<div className="relative overflow-hidden pb-[72px]">
				<img className="absolute top-0 left-0 w-full" src="/images/about/solar1.png" alt="" />
				<img className="absolute bottom-0 left-0 w-full h-[1291px]" src="/images/about/solar2.png" alt="" />
				<div className="flex flex-col items-center space-y-[30px] max-w-[832px] text-center z-[1] relative mx-auto mt-7 md:mt-[88px] px-5 md:px-0">
					<span className="font-semibold text-[40px] md:text-[60px] leading-[44px] md:leading-[64px] bg-gradient14 gradient-text">The Most Realistic AI Chat Experience In The Universe</span>
					<span className="text-[16px] leading-[26px] text-[#CACFD2]">We are on a mission to make AI chatbots look, talk and sound real.</span>
					<div className="flex space-x-[10px] w-full sm1:w-auto">
						<Link className="flex justify-center items-center space-x-[10px] flex-1 sm1:flex-[unset] sm1:min-w-[183px] h-[50px] px-4 sm1:px-0 rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px]" to="/">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
								<path fillRule="evenodd" clipRule="evenodd" d="M8.33773 16.6385C8.38659 16.2441 8.45003 15.8072 8.51027 15.3923C8.64222 14.4837 8.75877 13.6811 8.67289 13.6639C8.4907 13.6275 7.76196 12.5708 7.68908 12.2793C7.64961 12.1214 7.72771 11.8887 7.80761 11.6507C7.87523 11.4492 7.94414 11.2439 7.94414 11.0768C7.94414 10.7125 6.6324 10.1659 6.23159 10.1295C5.91094 10.1003 5.39353 9.58292 5.17491 9.32786C5.17491 9.52219 5.14576 9.86713 5.02916 9.69223C4.88341 9.47361 3.71742 6.6315 3.71742 6.26713C3.71742 5.97563 3.18301 5.56268 2.9158 5.39264L2.51216 4.91331C1.76545 6.09628 1.33333 7.49768 1.33333 9C1.33333 13.0111 4.41361 16.3027 8.33773 16.6385ZM5.40773 2.22528L7.39758 2.14972L7.68908 3.31571L7.39758 3.89871C6.69799 3.46146 6.4988 4.42098 6.48665 4.95539L7.54333 5.24689L7.68908 5.90276C7.87127 5.73272 8.20649 5.31976 8.08989 5.02826C7.97329 4.73676 7.99273 4.15377 8.01702 3.89871L8.56358 4.04446L9.03726 4.70033C9.18301 4.53029 9.46722 4.21936 9.43807 4.33596C9.40892 4.45256 10.1061 5.86632 10.4583 6.55863C10.0794 6.38373 9.03726 7.16592 8.56358 7.57887L7.68908 9.21855C7.13524 8.4315 6.48665 8.69628 6.23159 8.92705C6.28017 9.24284 6.40649 9.87442 6.52309 9.87442C6.63969 9.87442 6.96034 9.51005 7.10609 9.32786V10.1295C7.10609 10.2461 7.71337 10.591 8.01702 10.7489L8.45426 10.3481L9.69313 10.676L11.0413 11.7692L11.9887 11.8785L12.3166 12.6436L11.8065 13.6639C11.2262 14.4937 10.3402 15.7171 9.59993 16.6435C12.7149 16.4024 15.308 14.2997 16.268 11.4465C16.1942 11.3066 16.114 11.2349 16.0332 11.2955C15.8 11.4704 14.7701 11.3683 14.2842 11.2955C14.102 10.8825 13.7377 9.95458 13.7377 9.54648C13.7377 9.13838 14.3692 8.55053 14.685 8.30761L16.3247 8.05255L16.5738 7.80342C16.5579 7.70172 16.54 7.60069 16.5201 7.50035L16.0332 7.14162C15.8875 7.20235 15.5595 7.37482 15.4138 7.57887C15.268 7.78292 14.7215 7.95539 14.4664 8.01612V7.14162L15.1223 6.923L14.8672 6.26713H15.4502L15.9376 5.73262C15.3017 4.38485 14.2846 3.25225 13.0254 2.47391C12.5319 2.9015 11.9563 3.36428 11.7336 3.42502C11.413 3.51247 11.2842 4.40883 11.2599 4.84607L10.2033 3.2064L10.4583 2.44122L10.2033 1.74891V1.42721C9.81125 1.36542 9.40937 1.33333 9 1.33333C7.70197 1.33333 6.47928 1.65591 5.40773 2.22528ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="white" />
							</svg>
							<span>Explore Dopples</span>
						</Link>
						<Link className="flex justify-center items-center space-x-[10px] flex-1 sm1:flex-[unset] sm1:min-w-[183px] h-[50px] px-4 sm1:px-0 rounded-[5px] bg-button font-bold text-[14px] leading-[17px]" to="/contact">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
								<path fillRule="evenodd" clipRule="evenodd" d="M2.65726 0.682373C1.22421 0.682373 0.0625 1.84409 0.0625 3.27713V10.9893C0.0625 12.4224 1.22421 13.5841 2.65726 13.5841H13.9012L16.8677 15.2262C17.348 15.4922 17.9375 15.1447 17.9375 14.5956V3.27713C17.9375 1.84409 16.7758 0.682373 15.3427 0.682373H2.65726ZM4.60104 8.32253C5.35737 8.32253 5.9705 7.7094 5.9705 6.95307C5.9705 6.19674 5.35737 5.58361 4.60104 5.58361C3.84471 5.58361 3.23159 6.19674 3.23159 6.95307C3.23159 7.7094 3.84471 8.32253 4.60104 8.32253ZM10.2977 6.95307C10.2977 7.7094 9.68461 8.32253 8.92828 8.32253C8.17195 8.32253 7.55883 7.7094 7.55883 6.95307C7.55883 6.19674 8.17195 5.58361 8.92828 5.58361C9.68461 5.58361 10.2977 6.19674 10.2977 6.95307ZM13.2518 8.32253C14.0081 8.32253 14.6213 7.7094 14.6213 6.95307C14.6213 6.19674 14.0081 5.58361 13.2518 5.58361C12.4955 5.58361 11.8823 6.19674 11.8823 6.95307C11.8823 7.7094 12.4955 8.32253 13.2518 8.32253Z" fill="white" />
							</svg>
							<span>Contact Us</span>
						</Link>
					</div>
				</div>
				<div className="relative mt-[169.33px] md:mt-[226px] w-fit mx-auto">
					<img className="w-[91.13px] h-[91.13px] md:w-[200px] md:h-[200px]" src="/images/about/Subtract.png" alt="" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[152.7px] md:w-[336px] h-[152.7px] md:h-[336px] bg-contain bg-half bg-no-repeat bg-orbitback1">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] md:w-[316px] h-[140px] md:h-[316px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet1">
								<img className="w-[36.45px] h-[36.45px] md:w-20 md:h-20" src="/images/about/system/1.png" alt="" />
							</div>
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[223.14px] md:w-[491px] h-[223.14px] md:h-[491px] bg-contain bg-half bg-no-repeat bg-orbitback2">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[435px] h-[200px] md:h-[435px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet2">
								<img className="w-[43.46px] md:w-[95px] h-[43.46px] md:h-[95px]" src="/images/about/system/2.png" alt="" />
							</div>
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[285.86px] md:w-[629px] h-[285.86px] md:h-[629px] bg-contain bg-half bg-no-repeat bg-orbitback3" />

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[345.4px] md:w-[760px] h-[345.4px] md:h-[760px] bg-contain bg-half bg-no-repeat bg-orbitback4">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] md:w-[670px] h-[310px] md:h-[670px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet3">
								<img className="w-[64.49px] md:w-[141px] h-[64.49px] md:h-[141px]" src="/images/about/system/3.png" alt="" />
							</div>
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[345.4px] md:w-[760px] h-[345.4px] md:h-[760px] bg-contain bg-half bg-no-repeat bg-orbitback4">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] md:w-[600px] h-[270px] md:h-[600px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet4">
								<img className="w-[28.04px] md:w-[61px] h-[28.04px] md:h-[61px]" src="/images/about/system/4.png" alt="" />
							</div>
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[405.39px] md:w-[892px] h-[405.39px] md:h-[892px] bg-contain bg-half bg-no-repeat bg-orbitback5">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[752px] h-[340px] md:h-[752px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet5">
								<img className="w-[53.28px] md:w-[118px] h-[53.28px] md:h-[118px]" src="/images/about/system/5.png" alt="" />
							</div>
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[474.47px] md:w-[1044px] h-[474.47px] md:h-[1044px] bg-contain bg-half bg-no-repeat bg-orbitback6" />

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[544px] md:w-[1197px] h-[544px] md:h-[1197px] bg-contain bg-half bg-no-repeat bg-orbitback7">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[405px] md:w-[890px] h-[405px] md:h-[890px]">
							<div className="absolute top-0 left-0 bottom-0 right-0 will-change-transform transform-style-3d planet6">
								<img className="w-[22.43px] md:w-[49px] h-[22.43px] md:h-[49px]" src="/images/about/system/6.png" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col space-y-20 md:space-y-[100px] mt-[99.54px] md:mt-[280px] relative">
					<div className="flex flex-col space-y-[100px]">
						<div className="flex flex-col items-center space-y-[25px] max-w-[calc(100%-40px)] lg3:max-w-[1200px] mx-auto">
							<div className="flex flex-col items-center space-y-4">
								<span className="font-semibold text-[40px] md:text-[50px] text-[44px] md:leading-[54px] text-center">Unparalleled Chat Experience</span>
								<span className="text-[16px] leading-[26px] text-[#CACFD2] text-center max-w-[663px]">Our AI-powered chatbots provide industry-leading conversational skills that immerse you in realistic chats with clones of people and characters.</span>
								<Link className="flex justify-center items-center space-x-[10px] min-w-[183px] h-[50px] bg-button rounded-[5px] font-bold text-[14px] leading-[17px] z-[1]" to="/">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.33773 16.6385C8.38659 16.2441 8.45003 15.8072 8.51027 15.3923C8.64222 14.4837 8.75877 13.6811 8.67289 13.6639C8.4907 13.6275 7.76196 12.5708 7.68908 12.2793C7.64961 12.1214 7.72771 11.8887 7.80761 11.6507C7.87523 11.4492 7.94414 11.2439 7.94414 11.0768C7.94414 10.7125 6.6324 10.1659 6.23159 10.1295C5.91094 10.1003 5.39353 9.58292 5.17491 9.32786C5.17491 9.52219 5.14576 9.86713 5.02916 9.69223C4.88341 9.47361 3.71742 6.6315 3.71742 6.26713C3.71742 5.97563 3.18301 5.56268 2.9158 5.39264L2.51216 4.91331C1.76545 6.09628 1.33333 7.49768 1.33333 9C1.33333 13.0111 4.41361 16.3027 8.33773 16.6385ZM5.40773 2.22528L7.39758 2.14972L7.68908 3.31571L7.39758 3.89871C6.69799 3.46146 6.4988 4.42098 6.48665 4.95539L7.54333 5.24689L7.68908 5.90276C7.87127 5.73272 8.20649 5.31976 8.08989 5.02826C7.97329 4.73676 7.99273 4.15377 8.01702 3.89871L8.56358 4.04446L9.03726 4.70033C9.18301 4.53029 9.46722 4.21936 9.43807 4.33596C9.40892 4.45256 10.1061 5.86632 10.4583 6.55863C10.0794 6.38373 9.03726 7.16592 8.56358 7.57887L7.68908 9.21855C7.13524 8.4315 6.48665 8.69628 6.23159 8.92705C6.28017 9.24284 6.40649 9.87442 6.52309 9.87442C6.63969 9.87442 6.96034 9.51005 7.10609 9.32786V10.1295C7.10609 10.2461 7.71337 10.591 8.01702 10.7489L8.45426 10.3481L9.69313 10.676L11.0413 11.7692L11.9887 11.8785L12.3166 12.6436L11.8065 13.6639C11.2262 14.4937 10.3402 15.7171 9.59993 16.6435C12.7149 16.4024 15.308 14.2997 16.268 11.4465C16.1942 11.3066 16.114 11.2349 16.0332 11.2955C15.8 11.4704 14.7701 11.3683 14.2842 11.2955C14.102 10.8825 13.7377 9.95458 13.7377 9.54648C13.7377 9.13838 14.3692 8.55053 14.685 8.30761L16.3247 8.05255L16.5738 7.80342C16.5579 7.70172 16.54 7.60069 16.5201 7.50035L16.0332 7.14162C15.8875 7.20235 15.5595 7.37482 15.4138 7.57887C15.268 7.78292 14.7215 7.95539 14.4664 8.01612V7.14162L15.1223 6.923L14.8672 6.26713H15.4502L15.9376 5.73262C15.3017 4.38485 14.2846 3.25225 13.0254 2.47391C12.5319 2.9015 11.9563 3.36428 11.7336 3.42502C11.413 3.51247 11.2842 4.40883 11.2599 4.84607L10.2033 3.2064L10.4583 2.44122L10.2033 1.74891V1.42721C9.81125 1.36542 9.40937 1.33333 9 1.33333C7.70197 1.33333 6.47928 1.65591 5.40773 2.22528ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="white" />
									</svg>
									<span>Explore Dopples</span>
								</Link>
							</div>
							<div className="flex flex-col lg2:flex-row space-y-5 lg2:space-x-5 lg2:space-y-0 z-[1]">
								<div className="flex-[unset] lg2:flex-[3.4] h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button px-[26px] pt-7 pb-7 lg2:pb-0 w-full h-full rounded-[20px]">
										<span className="font-semibold text-[20px] leading-[24px]">Chat with Dopples</span>
										<span className="mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">A fun and engaging way to connect with your favorite AI-powered characters.</span>
										<div className="flex justify-between space-x-2 mt-[17px]">
											<div className="flex flex-col items-center space-y-1">
												<img className="w-[42px] h-[42px]" src="/images/about/dopples/1.png" alt="" />
												<span className="text-[12px] leading-[14px]">Genghis</span>
											</div>
											<div className="flex flex-col items-center space-y-1">
												<img className="w-[42px] h-[42px]" src="/images/about/dopples/2.png" alt="" />
												<span className="text-[12px] leading-[14px]">Emoji Bot</span>
											</div>
											<div className="flex flex-col items-center space-y-1">
												<img className="w-[42px] h-[42px]" src="/images/about/dopples/3.png" alt="" />
												<span className="text-[12px] leading-[14px]">Gandhi</span>
											</div>
											<div className="flex flex-col items-center space-y-1">
												<img className="w-[42px] h-[42px]" src="/images/about/dopples/4.png" alt="" />
												<span className="text-[12px] leading-[14px]">Dad Jokes</span>
											</div>
										</div>
										<img className="self-center object-contain h-[206.93px] mt-3" src="/images/about/dopples/Frame 67.png" alt="" />
									</div>
								</div>
								<div className="flex-[unset] lg2:flex-[4.79] h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Thousands of Dopples to choose from</span>
										<span className="px-[26px] mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">There are thousands of Dopples to chat with, with more being created by our community daily.</span>
										<img className="block lg2:hidden self-center object-cover h-[275px] mt-[19px]" src="/images/about/dopples/thousands_of_dopples_mobile.png" alt="" />
										<img className="hidden lg2:block self-center object-cover h-[275px] mt-[19px]" src="/images/about/dopples/thousands_of_dopples.png" alt="" />
									</div>
								</div>
								<div className="flex-[unset] lg2:flex-[3.4] h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button px-[26px] pt-7 pb-5 lg2:pb-0 w-full h-full rounded-[20px]">
										<span className="font-semibold text-[20px] leading-[24px]">Customizeable experience</span>
										<span className="mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">Make your chat experience personalized with themes, settings and more.</span>
										<img className="block lg2:hidden flex-1 h-0 self-center object-contain mt-[19px]" src="/images/about/dopples/customizable_experience_mobile.png" alt="" />
										<img className="hidden lg2:block flex-[unset] h-auto self-center object-contain mt-[19px]" src="/images/about/dopples/customizable_experience.png" alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-[100px]">
						<div className="flex flex-col items-center space-y-[25px] max-w-[calc(100%-40px)] lg3:max-w-[1200px] mx-auto">
							<div className="flex flex-col items-center space-y-4">
								<span className="font-semibold text-[40px] md:text-[50px] text-[44px] md:leading-[54px] text-center">Advanced Image Generation</span>
								<span className="text-[16px] leading-[26px] text-[#CACFD2] text-center max-w-[663px]">Our proprietary AI models can generate images from conversational context, enriching the chat experience.</span>
								<Link className="flex justify-center items-center space-x-[10px] min-w-[183px] h-[50px] bg-button rounded-[5px] font-bold text-[14px] leading-[17px] z-[1]" to="/">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.33773 16.6385C8.38659 16.2441 8.45003 15.8072 8.51027 15.3923C8.64222 14.4837 8.75877 13.6811 8.67289 13.6639C8.4907 13.6275 7.76196 12.5708 7.68908 12.2793C7.64961 12.1214 7.72771 11.8887 7.80761 11.6507C7.87523 11.4492 7.94414 11.2439 7.94414 11.0768C7.94414 10.7125 6.6324 10.1659 6.23159 10.1295C5.91094 10.1003 5.39353 9.58292 5.17491 9.32786C5.17491 9.52219 5.14576 9.86713 5.02916 9.69223C4.88341 9.47361 3.71742 6.6315 3.71742 6.26713C3.71742 5.97563 3.18301 5.56268 2.9158 5.39264L2.51216 4.91331C1.76545 6.09628 1.33333 7.49768 1.33333 9C1.33333 13.0111 4.41361 16.3027 8.33773 16.6385ZM5.40773 2.22528L7.39758 2.14972L7.68908 3.31571L7.39758 3.89871C6.69799 3.46146 6.4988 4.42098 6.48665 4.95539L7.54333 5.24689L7.68908 5.90276C7.87127 5.73272 8.20649 5.31976 8.08989 5.02826C7.97329 4.73676 7.99273 4.15377 8.01702 3.89871L8.56358 4.04446L9.03726 4.70033C9.18301 4.53029 9.46722 4.21936 9.43807 4.33596C9.40892 4.45256 10.1061 5.86632 10.4583 6.55863C10.0794 6.38373 9.03726 7.16592 8.56358 7.57887L7.68908 9.21855C7.13524 8.4315 6.48665 8.69628 6.23159 8.92705C6.28017 9.24284 6.40649 9.87442 6.52309 9.87442C6.63969 9.87442 6.96034 9.51005 7.10609 9.32786V10.1295C7.10609 10.2461 7.71337 10.591 8.01702 10.7489L8.45426 10.3481L9.69313 10.676L11.0413 11.7692L11.9887 11.8785L12.3166 12.6436L11.8065 13.6639C11.2262 14.4937 10.3402 15.7171 9.59993 16.6435C12.7149 16.4024 15.308 14.2997 16.268 11.4465C16.1942 11.3066 16.114 11.2349 16.0332 11.2955C15.8 11.4704 14.7701 11.3683 14.2842 11.2955C14.102 10.8825 13.7377 9.95458 13.7377 9.54648C13.7377 9.13838 14.3692 8.55053 14.685 8.30761L16.3247 8.05255L16.5738 7.80342C16.5579 7.70172 16.54 7.60069 16.5201 7.50035L16.0332 7.14162C15.8875 7.20235 15.5595 7.37482 15.4138 7.57887C15.268 7.78292 14.7215 7.95539 14.4664 8.01612V7.14162L15.1223 6.923L14.8672 6.26713H15.4502L15.9376 5.73262C15.3017 4.38485 14.2846 3.25225 13.0254 2.47391C12.5319 2.9015 11.9563 3.36428 11.7336 3.42502C11.413 3.51247 11.2842 4.40883 11.2599 4.84607L10.2033 3.2064L10.4583 2.44122L10.2033 1.74891V1.42721C9.81125 1.36542 9.40937 1.33333 9 1.33333C7.70197 1.33333 6.47928 1.65591 5.40773 2.22528ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="white" />
									</svg>
									<span>Explore Dopples</span>
								</Link>
							</div>
							<div className="flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 z-[1]">
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 pb-[15.73px] w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Advanced image generation inside chats</span>
										<span className="px-[26px] mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">Dopples can send you images, with accurate environments, emotion and consistent styles.</span>
										<img className="h-[244.27px] lg2:h-[258.27px] self-center object-cover mt-4 lg2:mt-7" src="/images/about/dopples/advanced_img_generation.png" alt="" />
									</div>
								</div>
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Unparalleled image quality</span>
										<span className="px-[26px] mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">Our image generation models keep the theme, style and personality of the Dopple alive, making for an even more immersive chat experience.</span>
										<img className="block md:hidden px-[26px] self-center object-cover mt-[56px] h-[218px] md:mt-auto" src="/images/about/dopples/unparalleled_img_quality.png" alt="" />
										<img className="hidden md:block px-[26px] self-center object-cover mt-[56px] md:mt-auto" src="/images/about/dopples/unparalleled_img_quality.png" alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-[100px]">
						<div className="flex flex-col items-center space-y-[25px] max-w-[calc(100%-40px)] lg3:max-w-[1200px] mx-auto">
							<div className="flex flex-col items-center space-y-4">
								<span className="font-semibold text-[40px] md:text-[50px] text-[44px] md:leading-[54px] text-center">Cutting-Edge Voice<br />Messages & Calling</span>
								<span className="text-[16px] leading-[26px] text-[#CACFD2] text-center">Hear your Dopples speak through voice messages and also real-time voice calling.</span>
								<Link className="flex justify-center items-center space-x-[10px] min-w-[183px] h-[50px] bg-button rounded-[5px] font-bold text-[14px] leading-[17px] z-[1]" to="/">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.33773 16.6385C8.38659 16.2441 8.45003 15.8072 8.51027 15.3923C8.64222 14.4837 8.75877 13.6811 8.67289 13.6639C8.4907 13.6275 7.76196 12.5708 7.68908 12.2793C7.64961 12.1214 7.72771 11.8887 7.80761 11.6507C7.87523 11.4492 7.94414 11.2439 7.94414 11.0768C7.94414 10.7125 6.6324 10.1659 6.23159 10.1295C5.91094 10.1003 5.39353 9.58292 5.17491 9.32786C5.17491 9.52219 5.14576 9.86713 5.02916 9.69223C4.88341 9.47361 3.71742 6.6315 3.71742 6.26713C3.71742 5.97563 3.18301 5.56268 2.9158 5.39264L2.51216 4.91331C1.76545 6.09628 1.33333 7.49768 1.33333 9C1.33333 13.0111 4.41361 16.3027 8.33773 16.6385ZM5.40773 2.22528L7.39758 2.14972L7.68908 3.31571L7.39758 3.89871C6.69799 3.46146 6.4988 4.42098 6.48665 4.95539L7.54333 5.24689L7.68908 5.90276C7.87127 5.73272 8.20649 5.31976 8.08989 5.02826C7.97329 4.73676 7.99273 4.15377 8.01702 3.89871L8.56358 4.04446L9.03726 4.70033C9.18301 4.53029 9.46722 4.21936 9.43807 4.33596C9.40892 4.45256 10.1061 5.86632 10.4583 6.55863C10.0794 6.38373 9.03726 7.16592 8.56358 7.57887L7.68908 9.21855C7.13524 8.4315 6.48665 8.69628 6.23159 8.92705C6.28017 9.24284 6.40649 9.87442 6.52309 9.87442C6.63969 9.87442 6.96034 9.51005 7.10609 9.32786V10.1295C7.10609 10.2461 7.71337 10.591 8.01702 10.7489L8.45426 10.3481L9.69313 10.676L11.0413 11.7692L11.9887 11.8785L12.3166 12.6436L11.8065 13.6639C11.2262 14.4937 10.3402 15.7171 9.59993 16.6435C12.7149 16.4024 15.308 14.2997 16.268 11.4465C16.1942 11.3066 16.114 11.2349 16.0332 11.2955C15.8 11.4704 14.7701 11.3683 14.2842 11.2955C14.102 10.8825 13.7377 9.95458 13.7377 9.54648C13.7377 9.13838 14.3692 8.55053 14.685 8.30761L16.3247 8.05255L16.5738 7.80342C16.5579 7.70172 16.54 7.60069 16.5201 7.50035L16.0332 7.14162C15.8875 7.20235 15.5595 7.37482 15.4138 7.57887C15.268 7.78292 14.7215 7.95539 14.4664 8.01612V7.14162L15.1223 6.923L14.8672 6.26713H15.4502L15.9376 5.73262C15.3017 4.38485 14.2846 3.25225 13.0254 2.47391C12.5319 2.9015 11.9563 3.36428 11.7336 3.42502C11.413 3.51247 11.2842 4.40883 11.2599 4.84607L10.2033 3.2064L10.4583 2.44122L10.2033 1.74891V1.42721C9.81125 1.36542 9.40937 1.33333 9 1.33333C7.70197 1.33333 6.47928 1.65591 5.40773 2.22528ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="white" />
									</svg>
									<span>Explore Dopples</span>
								</Link>
							</div>
							<div className="flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 z-[1]">
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Receive voice messages & audio transcription</span>
										<span className="px-[26px] text-[14px] leading-[26px] text-[#CACFD2]">Dopples can send you voice messages and read you their texts live, creating a more immersive experience.</span>
										<img className="block md:hidden pl-[26px] self-center object-cover max-h-[273px] mt-[14px]" src="/images/about/dopples/receive-voice-mobile.png" alt="" />
										<img className="hidden md:block pl-[26px] self-center object-cover lg2:h-[273px] mt-auto" src="/images/about/dopples/receive-voice.png" alt="" />
									</div>
								</div>
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 pb-[15px] lg2:pb-0 w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Talk on the phone with Dopples</span>
										<span className="px-[26px] mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">Using our two-way conversational technology, you can speak in real-time over phone call and voice chat to your Dopples.</span>
										<img className="block md:hidden px-[26px] self-center object-cover max-h-[291px] mt-2 lg2:mt-auto" src="/images/about/dopples/talk.png" alt="" />
										<img className="hidden md:block px-[26px] self-center object-cover max-h-[291px] mt-2 lg2:mt-auto" src="/images/about/dopples/talk.png" alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-[100px]">
						<div className="flex flex-col items-center space-y-[25px] max-w-[calc(100%-40px)] lg3:max-w-[1200px] mx-auto">
							<div className="flex flex-col items-center space-y-4">
								<span className="font-semibold text-[40px] md:text-[50px] text-[44px] md:leading-[54px] text-center">Powered by Dopple AI LLM</span>
								<span className="text-[16px] leading-[26px] text-[#CACFD2] text-center">Dopple's internally-developed LLM powers the Dopple chatbots and platform.</span>
								<Link className="flex justify-center items-center space-x-[10px] min-w-[183px] h-[50px] bg-button rounded-[5px] font-bold text-[14px] leading-[17px] z-[1]" to="/">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.33773 16.6385C8.38659 16.2441 8.45003 15.8072 8.51027 15.3923C8.64222 14.4837 8.75877 13.6811 8.67289 13.6639C8.4907 13.6275 7.76196 12.5708 7.68908 12.2793C7.64961 12.1214 7.72771 11.8887 7.80761 11.6507C7.87523 11.4492 7.94414 11.2439 7.94414 11.0768C7.94414 10.7125 6.6324 10.1659 6.23159 10.1295C5.91094 10.1003 5.39353 9.58292 5.17491 9.32786C5.17491 9.52219 5.14576 9.86713 5.02916 9.69223C4.88341 9.47361 3.71742 6.6315 3.71742 6.26713C3.71742 5.97563 3.18301 5.56268 2.9158 5.39264L2.51216 4.91331C1.76545 6.09628 1.33333 7.49768 1.33333 9C1.33333 13.0111 4.41361 16.3027 8.33773 16.6385ZM5.40773 2.22528L7.39758 2.14972L7.68908 3.31571L7.39758 3.89871C6.69799 3.46146 6.4988 4.42098 6.48665 4.95539L7.54333 5.24689L7.68908 5.90276C7.87127 5.73272 8.20649 5.31976 8.08989 5.02826C7.97329 4.73676 7.99273 4.15377 8.01702 3.89871L8.56358 4.04446L9.03726 4.70033C9.18301 4.53029 9.46722 4.21936 9.43807 4.33596C9.40892 4.45256 10.1061 5.86632 10.4583 6.55863C10.0794 6.38373 9.03726 7.16592 8.56358 7.57887L7.68908 9.21855C7.13524 8.4315 6.48665 8.69628 6.23159 8.92705C6.28017 9.24284 6.40649 9.87442 6.52309 9.87442C6.63969 9.87442 6.96034 9.51005 7.10609 9.32786V10.1295C7.10609 10.2461 7.71337 10.591 8.01702 10.7489L8.45426 10.3481L9.69313 10.676L11.0413 11.7692L11.9887 11.8785L12.3166 12.6436L11.8065 13.6639C11.2262 14.4937 10.3402 15.7171 9.59993 16.6435C12.7149 16.4024 15.308 14.2997 16.268 11.4465C16.1942 11.3066 16.114 11.2349 16.0332 11.2955C15.8 11.4704 14.7701 11.3683 14.2842 11.2955C14.102 10.8825 13.7377 9.95458 13.7377 9.54648C13.7377 9.13838 14.3692 8.55053 14.685 8.30761L16.3247 8.05255L16.5738 7.80342C16.5579 7.70172 16.54 7.60069 16.5201 7.50035L16.0332 7.14162C15.8875 7.20235 15.5595 7.37482 15.4138 7.57887C15.268 7.78292 14.7215 7.95539 14.4664 8.01612V7.14162L15.1223 6.923L14.8672 6.26713H15.4502L15.9376 5.73262C15.3017 4.38485 14.2846 3.25225 13.0254 2.47391C12.5319 2.9015 11.9563 3.36428 11.7336 3.42502C11.413 3.51247 11.2842 4.40883 11.2599 4.84607L10.2033 3.2064L10.4583 2.44122L10.2033 1.74891V1.42721C9.81125 1.36542 9.40937 1.33333 9 1.33333C7.70197 1.33333 6.47928 1.65591 5.40773 2.22528ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="white" />
									</svg>
									<span>Explore Dopples</span>
								</Link>
							</div>
							<div className="flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 z-[1]">
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Fine-tuned for engaging conversations</span>
										<span className="px-[26px] text-[14px] leading-[26px] text-[#CACFD2]">Dopple’s fine-tuned LLM models were engineered for the sole purpose of creating engaging dialogue and conversations with users.</span>
										<img className="block md:hidden pl-[26px] self-center object-cover mt-[16.81px]" src="/images/about/dopples/fine-tuned-mobile.png" alt="" />
										<img className="hidden md:block pl-[26px] self-center object-cover mt-auto" src="/images/about/dopples/fine-tuned.png" alt="" />
									</div>
								</div>
								<div className="flex-[unset] md:flex-1 lg2:h-[410px] p-[1px] bg-gradient13 rounded-[20px] overflow-hidden">
									<div className="flex flex-col bg-button pt-7 pb-[37.19px] lg2:pb-[19.08px] w-full h-full rounded-[20px]">
										<span className="px-[26px] font-semibold text-[20px] leading-[24px]">Preferred by users over competitor models</span>
										<span className="px-[26px] mt-[6px] text-[14px] leading-[26px] text-[#CACFD2]">In a blind study across over 1,000 users, Dopple’s LLM was the most preferred model compared to competitor LLMs.</span>
										<img className="block md:hidden px-[26px] self-center object-cover max-h-[167.81px] mt-[45px]" src="/images/about/dopples/preferred.png" alt="" />
										<img className="hidden md:block px-[26px] self-center object-cover max-h-[243.92px] mt-auto" src="/images/about/dopples/preferred.png" alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center bg-nav-desktop pt-[60px] px-5 md:px-0">
				<span className="font-semibold text-[40px] md:text-[50px] text-[44px] md:leading-[54px] text-center">Get In Touch With Us</span>
				<span className="mt-4 text-[16px] leading-[26px] text-[#CACFD2] text-center">Contact us for general support, partnership inquiries and more.</span>
				<Link className="flex justify-center items-center space-x-[10px] mt-4 min-w-[183px] h-[50px] bg-blue2 rounded-[5px] font-bold text-[14px] leading-[17px]" to="/contact">
					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
						<path fillRule="evenodd" clipRule="evenodd" d="M3.15726 0.682495C1.72421 0.682495 0.5625 1.84421 0.5625 3.27726V10.9895C0.5625 12.4225 1.72421 13.5842 3.15726 13.5842H14.4012L17.3677 15.2263C17.848 15.4923 18.4375 15.1448 18.4375 14.5958V3.27725C18.4375 1.84421 17.2758 0.682495 15.8427 0.682495H3.15726ZM5.10104 8.32265C5.85737 8.32265 6.4705 7.70952 6.4705 6.95319C6.4705 6.19686 5.85737 5.58374 5.10104 5.58374C4.34471 5.58374 3.73159 6.19686 3.73159 6.95319C3.73159 7.70952 4.34471 8.32265 5.10104 8.32265ZM10.7977 6.95319C10.7977 7.70952 10.1846 8.32265 9.42828 8.32265C8.67195 8.32265 8.05883 7.70952 8.05883 6.95319C8.05883 6.19686 8.67195 5.58374 9.42828 5.58374C10.1846 5.58374 10.7977 6.19686 10.7977 6.95319ZM13.7518 8.32265C14.5081 8.32265 15.1213 7.70952 15.1213 6.95319C15.1213 6.19686 14.5081 5.58374 13.7518 5.58374C12.9955 5.58374 12.3823 6.19686 12.3823 6.95319C12.3823 7.70952 12.9955 8.32265 13.7518 8.32265Z" fill="white" />
					</svg>
					<span>Contact Dopple</span>
				</Link>
				<img className="mt-[58.83px] md:mt-[69px] h-[421.07px] max-w-[unset] self-start md:self-center md:h-auto md:max-w-[calc(100%-40px)] lg:max-w-[1070px]" src="/images/about/touch-screen.png" alt="" />
			</div>
		</div>
	)
}

export default About