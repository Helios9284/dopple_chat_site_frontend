import { Fragment, useContext, useState } from "react";
import { ClickAwayListener, Grow, Skeleton } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { categories } from "../config";
import { RefContext } from "../contexts/RefContextProvider";
import HtmlTooltip from "./HtmlTooltip";
import { getFormattedNumbers } from "../utilities/format";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const FeaturedDoppleCardCustomized = ({ action, _data }) => {
	const nav = useNavigate();
	const [cookies, setCookies] = useCookies(["userid"]);
	const [loadedAvatar, setLoadedAvatar] = useState(false);
	const [loadedBanner, setLoadedBanner] = useState(false);
	const { dopples, setDoppleName, setDopple, setHistory, setOpenDeleteDoppleConfirmModal, setDeleteDoppleConfirmContent, setOpenShareDoppleConfirmModal, setShareDoppleConfirmContent } = useContext(RefContext);
	const data = dopples.find(x => x._id === _data._id)
	const [openMenu, setOpenMenu] = useState(false);

	const openAction = (e) => {
		e.stopPropagation()
		setOpenMenu(!openMenu)
	}

	const chatNow = async () => {
		if (data._id) {
			nav("/messages")

			let userid = Math.random().toString(36).slice(2);
			if (!cookies?.userid) setCookies("userid", userid)
			else userid = cookies?.userid

			setDoppleName(data.sender)
			setDopple()
			setHistory([])
		}
	}

	const deleteDopple = () => {
		setOpenDeleteDoppleConfirmModal(true)
		setDeleteDoppleConfirmContent(_data)
	}

	const shareDopple = () => {
		setOpenShareDoppleConfirmModal(true)
		setShareDoppleConfirmContent(_data)
	}

	return (
		<>
			<button className={"flex flex-col rounded-[15px] bg-black5 overflow-hidden shadow-lg2 min-w-[260px] min-h-[260px] max-w-[260px] max-h-[260px] relative" + (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "" : " group")} onClick={action}>
				{data?.avatarURL && <LazyLoadImage className={"absolute opacity-0 pointer-events-none"} src={data?.avatarURL + "?tr=w-300,h-300"} alt="" onLoad={() => setLoadedAvatar(true)} />}
				{data?.bannerURL && <LazyLoadImage className={"absolute opacity-0 pointer-events-none"} src={data?.bannerURL + "?tr=w-500,h-500"} alt="" onLoad={() => setLoadedBanner(true)} />}
				{loadedAvatar && loadedBanner &&
					<>
						{data?.bannerURL && <LazyLoadImage className={"w-full h-full object-cover object-top relative transition duration-[0.8s]" + (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "" : " group-hover:scale-[1.05]")} src={data?.bannerURL + "?tr=w-500,h-500"} alt="" />}
						<div className={"absolute w-full h-full" + (openMenu ? " bg-gradient12" : " bg-gradient6")}>
							<div className="flex items-center space-x-[5px] p-[5px] rounded-[5px] bg-inputback font-medium text-[12px] leading-[15px] absolute top-[15px] left-[15px]">
								<LazyLoadImage className="w-[16.67px] h-[16.67px] md:w-auto md:h-auto" src={categories[data?.category].image} alt="" />
								<span>{categories[data?.category].name}</span>
							</div>
							<ClickAwayListener onClickAway={() => setOpenMenu(false)}>
								<div className="flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-nav-desktop border border-button font-medium text-[12px] leading-[15px] absolute top-[15px] right-[15px] cursor-pointer" onClick={openAction}>
									<svg className={openMenu ? "text-white" : "text-blue2"} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor" stroke="currentColor">
										<path d="M10.9841 5.96824C12.0799 5.96824 12.9683 5.07992 12.9683 3.98412C12.9683 2.88832 12.0799 2 10.9841 2C9.88832 2 9 2.88832 9 3.98412C9 5.07992 9.88832 5.96824 10.9841 5.96824Z" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M11.0159 12.9365C9.92007 12.9365 9.03175 12.0482 9.03175 10.9524C9.03175 9.85658 9.92007 8.96826 11.0159 8.96826C12.1117 8.96826 13 9.85658 13 10.9524C13 12.0482 12.1117 12.9365 11.0159 12.9365Z" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M10.9841 19.9048C12.0799 19.9048 12.9683 19.0164 12.9683 17.9206C12.9683 16.8248 12.0799 15.9365 10.9841 15.9365C9.88832 15.9365 9 16.8248 9 17.9206C9 19.0164 9.88832 19.9048 10.9841 19.9048Z" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<Grow in={openMenu}>
										<div className="flex flex-col absolute top-[calc(100%+5px)] right-0 rounded-[5px] border border-button bg-nav-desktop shadow-lg4 min-w-[154px]">
											<button className="flex items-center space-x-[10px] hover:bg-button px-[15px] py-[10px]" onClick={shareDopple}>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
													<path d="M4.75872 5.6748H1.31738V17.3557H12.9983V14.1659" stroke="white" strokeWidth="1.5" />
													<path d="M12.279 4.83173C4.77699 4.83173 4.33879 10.8259 4.99697 13.4299C7.43829 9.41115 9.9852 9.11939 12.279 9.11939V11.6834L17.9956 7.24015L12.279 2.59863V4.83173Z" stroke="white" strokeWidth="1.41667" />
												</svg>
												<span className="text-[14px] leading-[17px]">Share Dopple</span>
											</button>
											<button className="flex items-center space-x-[10px] hover:bg-button px-[15px] py-[10px]">
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
													<path d="M16.1456 9.64727V16.5597H2.59863V3.54707H9.85864" stroke="white" strokeWidth="1.3" />
													<path fillRule="evenodd" clipRule="evenodd" d="M15.4263 0.588867L18.9334 4.08475L11.8551 11.2334C11.7505 11.338 11.6213 11.4123 11.4866 11.4454L7.14648 12.3309L8.07549 8.04835C8.10707 7.90967 8.18259 7.77605 8.29019 7.66844L15.4263 0.588867ZM15.2216 2.31876L9.24706 8.29332L8.65042 10.9135L11.2253 10.2814L17.2048 4.30195L15.2216 2.31876Z" fill="white" />
													<path d="M12.5459 3.56836L14.2169 5.2394L15.8879 6.91044" stroke="white" strokeWidth="1.3" />
												</svg>
												<span className="text-[14px] leading-[17px]">Edit Dopple</span>
											</button>
											<button className="flex items-center space-x-[10px] hover:bg-button px-[15px] py-[10px]" onClick={chatNow}>
												<svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
													<path fillRule="evenodd" clipRule="evenodd" d="M1.33941 0.113281H0.617188V0.835503V11.3711V12.0933H1.33941H2.8001V13.9263V15.4424L3.97738 14.4872L6.92766 12.0933H15.4426H16.1648V11.3711V0.835503V0.113281H15.4426H1.33941ZM2.06163 10.6489V1.55773H14.7204V10.6489H6.67151H6.41537L6.21646 10.8103L4.24455 12.4103V11.3711V10.6489H3.52232H2.06163ZM17.3716 6.4732H19.3182V14.2834H18.4923H17.7701V15.0056V15.6476L16.2877 14.4448L16.0888 14.2834H15.8327H9.113V13.233H7.66856V15.0056V15.7278H8.39078H15.5765L18.0372 17.7245L19.2145 18.6797V17.1636V15.7278H20.0404H20.7626V15.0056V5.75098V5.02876H20.0404H17.3716V6.4732ZM5.6857 5.20576H11.0949V3.96484H5.6857V5.20576ZM4.67383 7.5358H12.1068V6.29488H4.67383V7.5358Z" fill="white" />
												</svg>
												<span className="text-[14px] leading-[17px]">Chat Now</span>
											</button>
											<button className="flex items-center space-x-[10px] hover:bg-button px-[15px] py-[10px]" onClick={deleteDopple}>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
													<path fillRule="evenodd" clipRule="evenodd" d="M1.82227 5.02473V3.62473H7.21553V0.907227H12.7835V3.62473H18.1768V5.02473H1.82227ZM11.3835 3.62473V2.30723H8.61553V3.62473H11.3835Z" fill="#E93131" />
													<path d="M7.57686 14.3843V11.3313H8.97686V14.3843H7.57686Z" fill="#E93131" />
													<path d="M11.0222 11.3313V14.3843H12.4222V11.3313H11.0222Z" fill="#E93131" />
													<path fillRule="evenodd" clipRule="evenodd" d="M3.8249 6.62229H16.175V19.0934H3.8249V6.62229ZM5.2249 8.02229V17.6934H14.775V8.02229H5.2249Z" fill="#E93131" />
												</svg>
												<span className="text-[14px] leading-[17px] text-red2 whitespace-nowrap">Delete Dopple</span>
											</button>
										</div>
									</Grow>
								</div>
							</ClickAwayListener>
							<div className="flex items-center space-x-[10px] absolute bottom-[15px] left-[15px] w-[calc(100%-30px)]">
								<div className="flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] flex-1 w-0">
									{data?.avatarURL && <LazyLoadImage className={"w-[25px] h-[25px] rounded-full"} src={data?.avatarURL + "?tr=w-300,h-300"} alt="" />}
									<span className="truncate">{data?.name}</span>
									<HtmlTooltip
										title={
											<Fragment>
												<div className={"flex flex-col items-start space-y-[15px] relative z-[999999] p-5 rounded-[10px] bg-[rgba(21,21,24,.75)] border border-button backdrop-blur-[25px] shadow-lg1"}>
													<span className="font-Inter font-bold text-[18px] leading-[22px]">Verified Dopple Account</span>
													<div className="flex items-start space-x-[10px]">
														<img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
														<span className="font-Inter text-[14px] leading-[17px] text-subtext max-w-[258px]">
															This account has been verified by the Dopple team.{"\u00a0"}
															<span className="text-blue2">Learn more.</span>
														</span>
													</div>
												</div>
											</Fragment>
										}
									>
										<img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
									</HtmlTooltip>
								</div>
								<div className="flex items-center space-x-[5px] font-semibold text-[16px] leading-[19px]">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
										<path fillRule="evenodd" clipRule="evenodd" d="M0.753581 -0.00292969H0.211914V0.538738V8.44043V8.9821H0.753581H1.8491V10.3569V11.4939L2.73206 10.7775L4.94478 8.9821H11.331H11.8726V8.44043V0.538738V-0.00292969H11.331H0.753581ZM1.29525 7.89876V1.0804H10.7893V7.89876H4.75267H4.56055L4.41137 8.01981L2.93244 9.21981V8.44043V7.89876H2.39077H1.29525ZM12.7777 4.76702H14.2377V10.6247H13.6183H13.0766V11.1663V11.6478L11.9648 10.7457L11.8156 10.6247H11.6235H6.58378V9.83689H5.50045V11.1663V11.708H6.04212H11.4314L13.277 13.2055L14.1599 13.9219V12.7848V11.708H14.7793H15.321V11.1663V4.22535V3.68368H14.7793H12.7777V4.76702ZM4.0133 3.81725H8.0702V2.88656H4.0133V3.81725ZM3.2544 5.56478H8.82916V4.63409H3.2544V5.56478Z" fill="white" />
									</svg>
									<span>{getFormattedNumbers(data?.messageCount)}</span>
								</div>
							</div>
						</div>
					</>
				}
				{(loadedAvatar === false || loadedBanner === false) &&
					<>
						<img className={"w-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"} src="/images/explore/topcharts/placeholder.svg" alt="" />
						<div className={"absolute w-full h-full bg-gradient7"}>
							<div className="flex items-center space-x-[10px] absolute bottom-[15px] left-[15px] w-[calc(100%-30px)]">
								<div className="flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] flex-1">
									<Skeleton variant="circular" sx={{ bgcolor: '#43464C' }} width={30} height={30} />
									<Skeleton variant="rounded" sx={{ bgcolor: '#43464C', borderRadius: "15px" }} width={113.04} height={15} />
								</div>
							</div>
						</div>
					</>
				}
			</button>
		</>
	)
}

export default FeaturedDoppleCardCustomized;