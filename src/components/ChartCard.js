import { useContext, useMemo, useState } from "react";
import { Skeleton, useMediaQuery } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RefContext } from "../contexts/RefContextProvider";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utilities/axiosConfig";
import { getFormattedNumbers } from "../utilities/format";
import { setDopples } from "../redux/reducers/ChatReducer";
import { setDetails } from "../redux/reducers/ModalReducer";

const ChartCard = ({ action, data, index }) => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width:1024px)');
	const matchesMD = useMediaQuery('(max-width:768px)');
	const profile = useSelector(store => store.AuthReducer.profile);
	const { setDopple: setDoppleContext, setDoppleName, setHistory, setLoadedMsgs, setLoadedDopples, setOpenSignModal, setSending } = useContext(RefContext);
	const [cookies, setCookies] = useCookies(["userid"]);
	const [loaded, setLoaded] = useState(false)
	const [loadedAvatar, setLoadedAvatar] = useState(true)

	const chat = async (e, dt) => {
		if (!dt._id) return
		e.stopPropagation()
		let userid = Math.random().toString(36).slice(2);
		if (!cookies?.userid) setCookies("userid", userid)
		else userid = cookies?.userid

		setDoppleContext()
		nav("/messages")
		setHistory([])
		setLoadedDopples(false)
		setLoadedMsgs(false)
		setSending(true)

		const { data: { data: dopplesData } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
		if (!profile && userid && (dopplesData.active_chats.length + dopplesData.saved_chats.length >= 1)) {
			setOpenSignModal(true)
			dispatch(setDetails({ openLoginOrSignup: false }))
			return
		}

		try {
			await axios.post(`chat/new_chat_id`, {
				username: profile?.email ?? cookies?.userid,
				dopple_name: dt.sender,
			})

			const { data: { data } } = await axios.get("/chat", { params: { username: profile?.email || cookies?.userid } })
			dispatch(setDopples({ arr: data }))

			const _dopple = data.active_chats?.find(x => x.dopple_name === dt.sender)
            setDoppleContext(_dopple)
		} catch (e) {
			console.log(e)
		}
	}

	useMemo(() => {
		if (data._id) setLoaded(true)
	}, [data])

	return (
		<>
			<div className="flex items-center space-x-2 cursor-pointer" onClick={action}>
				<div className="flex items-center flex-1 group">
					<div className={"w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-[15px] overflow-hidden" + ((loaded && loadedAvatar) ? " block" : " hidden")}>
						{data.avatarURL &&
							<LazyLoadImage fetchpriority="high" className="w-full h-full object-cover lazyload" src={data.avatarURL + "?tr=w-200,h-200"} alt="" placeholder={
								<div className={"flex justify-center items-center w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-[15px] bg-black5"}>
									<img className="w-8 md:w-10" src="/images/explore/topcharts/placeholder.svg" alt="" />
								</div>
							} delayTime={300} onLoad={() => setLoadedAvatar(true)} />
						}
					</div>
					{!(loaded && loadedAvatar) &&
						<div className={"flex justify-center items-center w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-[15px] bg-black5" + ((loaded && loadedAvatar) ? " ml-[11.5px]" : "")}>
							<img className="w-8 md:w-10" src="/images/explore/topcharts/placeholder.svg" alt="" />
						</div>
					}
					<div className="flex items-start space-x-[11.5px] flex-1 ml-[11.5px]">
						{loaded && loadedAvatar ?
							<span className="font-bold text-[16px] leading-[19px] transition duration-800 group-hover:text-blue2">{index}</span>
							:
							<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={17} height={17} />
						}
						<div className="flex flex-col space-y-[5px] flex-1 w-0">
							<div className="flex items-center space-x-[5.71px]">
								{loaded && loadedAvatar ?
									<>
										<span className="truncate font-bold text-[16px] leading-[19px] transition duration-800 group-hover:text-blue2">{data.name}</span>
										<img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
									</>
									:
									<>
										<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={75} height={10} />
										<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={17} height={17} />
									</>
								}
							</div>
							{loaded && loadedAvatar ?
								<span className="text-[14px] leading-[17px] text-subtext truncate">{data.tagLine}</span>
								:
								<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={(matchesMD || matches) ? 160 : "100%"} height={10} />
							}
							<div className="flex items-center space-x-[5.71px] text-subtext">
								{loaded && loadedAvatar ?
									<>
										<img src="/images/interactive.svg" alt="" />
										<span className="text-[14px] leading-[17px]">{getFormattedNumbers(data?.messageCount ?? 0)}</span>
									</>
									:
									<>
										<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={14} height={14} />
										<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={35} height={10} />
									</>
								}
							</div>
						</div>
					</div>
				</div>
				<button className="px-[10px] py-2 text-blue2 rounded-[6px] bg-black12 font-bold text-[14px] leading-[17px] transition duration-800 hover:text-white hover:bg-blue2" onClick={e => chat(e, data)}>CHAT</button>
			</div>
		</>
	)
}

export default ChartCard;