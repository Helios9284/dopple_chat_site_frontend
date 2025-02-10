import { Fragment, useContext, useState } from "react";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { categories } from "../config";
import { RefContext } from "../contexts/RefContextProvider";
import HtmlTooltip from "../components/HtmlTooltip";
import { getFormattedNumbers } from "../utilities/format";

const FeaturedDoppleCard = ({ action, _data }) => {
	const [loadedAvatar, setLoadedAvatar] = useState(false);
	const [loadedBanner, setLoadedBanner] = useState(false);
	const { dopples } = useContext(RefContext);
	const data = dopples.find(x => x._id === _data._id)

	return (
		<>
			<button className={"flex flex-col rounded-[15px] bg-black5 overflow-hidden shadow-lg2 min-w-[260px] max-w-[260px] min-h-[260px] max-h-[260px] xl:min-w-[calc((100vw-120px-40.2px)/4)] xl:max-w-[calc((100vw-120px-40.2px)/4)] xl:min-h-[calc((100vw-120px-40.2px)/4)] xl:max-h-[calc((100vw-120px-40.2px)/4)] relative" + (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "" : " group")} onClick={action}>
				{data?.avatarURL && <LazyLoadImage className={"absolute opacity-0 pointer-events-none"} src={data?.avatarURL + "?tr=w-300,h-300"} alt="" onLoad={() => setLoadedAvatar(true)} />}
				{data?.bannerURL && <LazyLoadImage className={"absolute opacity-0 pointer-events-none"} src={data?.bannerURL + "?tr=w-500,h-500"} alt="" onLoad={() => setLoadedBanner(true)} />}
				{loadedAvatar && loadedBanner &&
					<>
						{data?.bannerURL && <LazyLoadImage className={"w-full h-full object-cover object-top relative transition duration-[0.8s]" + (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? "" : " group-hover:scale-[1.05]")} src={data?.bannerURL + "?tr=w-500,h-500"} alt="" />}
						<div className={"absolute w-full h-full bg-gradient6"}>
							<div className="flex items-center space-x-[5px] p-[5px] rounded-[5px] bg-inputback font-medium text-[12px] md:text-[14px] leading-[15px] md:leading-[17px] absolute top-[15px] left-[15px]">
								<LazyLoadImage className="w-[16.67px] h-[16.67px] md:w-auto md:h-auto" src={categories[data?.category].image} alt="" />
								<span>{categories[data?.category].name}</span>
							</div>
							<div className="flex items-center space-x-[10px] absolute bottom-[15px] left-[15px] w-[calc(100%-30px)]">
								<div className="flex items-center space-x-[5px] font-bold text-[16px] leading-[19px] flex-1 w-0">
									{data?.avatarURL && <LazyLoadImage className={"w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full"} src={data?.avatarURL + "?tr=w-300,h-300"} alt="" />}
									<span className="truncate">{data?.name}</span>
									<HtmlTooltip
										title={
											<Fragment>
												<div className="flex flex-col items-start space-y-[15px] relative z-[999999] p-5 rounded-[10px] bg-[rgba(21,21,24,.75)] border border-button backdrop-blur-[25px] shadow-lg1">
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
										<img className="w-[15px] h-[15px] md:w-5 md:h-5" src="/images/explore/verified.svg" alt="" />
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

export default FeaturedDoppleCard;