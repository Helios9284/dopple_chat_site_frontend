import { useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utilities/axiosConfig";
import { RefContext } from "../contexts/RefContextProvider";
import { commafy } from "../utilities/format";
import { useCookies } from "react-cookie";

const JoinBar = () => {
    const loc = useLocation();
    const [cookies] = useCookies(["userid"]);
    const profile = useSelector(store => store.AuthReducer.profile);
    const { count, setCount, setJoinedWaitlist, joinedWaitlist, setOpenUncensoredWaitlistModalStep3, exists, setExists, hasAccessToLLM, setHasAccessToLLM } = useContext(RefContext)

    useMemo(async () => {
        if (profile) {
            const { data } = await axios.put("/waitlist/exists", { email: profile.email })
            setJoinedWaitlist(data.data.exists)
            if (data.data.orderId) {
                setCount(data.data.orderId)
            }
            setExists(data.data.exists)
        }
    }, [profile, loc.pathname])

    useEffect(() => {
        const checkIfUserTalked = async () => {
            const { data: { data: { has_talked_to_nsfw_llm } } } = await axios.post("/chat/hasTalkedNSFW_LLM", {
                username: profile?.email ?? cookies?.userid
            })
            setHasAccessToLLM(has_talked_to_nsfw_llm)
        }
        checkIfUserTalked()
    }, [profile?.email, cookies?.userid])

    return (
        <>
            {(hasAccessToLLM === false || hasAccessToLLM === null) &&
                (joinedWaitlist && profile ?
                    <button className="flex justify-center items-center space-x-[10px] bg-blue2 h-[30px] font-bold text-[16px] leading-[19px]" onClick={() => setOpenUncensoredWaitlistModalStep3(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <g filter="url(#filter0_i_5360_196992)">
                                <g clipPath="url(#clip0_5360_196992)">
                                    <rect x="0.5" width="20" height="20" rx="3.25859" fill="url(#paint0_linear_5360_196992)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.13402 6.53714C9.2753 5.75204 9.96682 5.15608 10.7986 5.15608C13.2571 5.15608 15.2612 7.17339 15.2612 9.62524C15.2612 12.1225 13.22 14.1773 10.7158 14.1773H7.23701C6.59464 14.1773 5.9867 13.8869 5.58301 13.3872C5.58301 14.462 6.45433 15.3333 7.52917 15.3333H10.7158C13.8757 15.3333 16.4262 12.7487 16.4262 9.62524C16.4262 6.54713 13.9128 4 10.7986 4C9.22128 4 7.94261 5.26888 7.94261 6.83411V11.6911H7.2692C6.98136 11.6911 6.74802 11.4596 6.74802 11.1739V6.57401V6.5251C6.74802 5.5322 7.26249 4.61021 8.10747 4.08881H8.06821C6.69567 4.08881 5.58301 5.20147 5.58301 6.57401V11.1739C5.58301 12.0981 6.33794 12.8472 7.2692 12.8472H10.9349C12.6908 12.8472 14.1143 11.4347 14.1143 9.69218C14.1143 7.9497 12.6908 6.53714 10.9349 6.53714H9.13402ZM10.9111 11.6658H9.08379V7.66787H10.9111C12.0236 7.66787 12.9255 8.56284 12.9255 9.66683C12.9255 10.7708 12.0236 11.6658 10.9111 11.6658Z" fill="black" />
                                    <g opacity="0.5" filter="url(#filter1_f_5360_196992)">
                                        <path d="M19.9519 12L0.400391 7.13513V0H19.9519V12Z" fill="url(#paint1_linear_5360_196992)" />
                                    </g>
                                </g>
                                <rect x="0.744394" y="0.244394" width="19.5112" height="19.5112" rx="3.01419" stroke="white" strokeWidth="0.488788" />
                            </g>
                            <defs>
                                <filter id="filter0_i_5360_196992" x="0.5" y="0" width="20" height="21.3034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="1.30343" />
                                    <feGaussianBlur stdDeviation="0.651717" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_5360_196992" />
                                </filter>
                                <filter id="filter1_f_5360_196992" x="-0.251327" y="-0.651717" width="20.8552" height="13.3034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="0.325859" result="effect1_foregroundBlur_5360_196992" />
                                </filter>
                                <linearGradient id="paint0_linear_5360_196992" x1="0.5" y1="20" x2="20.5" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F2F2F2" />
                                    <stop offset="1" stopColor="white" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_5360_196992" x1="3.00726" y1="-1.78378" x2="8.73587" y2="16.2116" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                                <clipPath id="clip0_5360_196992">
                                    <rect x="0.5" width="20" height="20" rx="3.25859" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>You're #{commafy(count)} on the waitlist</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                            <path d="M1.5 1L6.5 6L1.5 11" stroke="white" strokeWidth="2" />
                        </svg>
                    </button>
                    :
                    (!profile || !exists) ?
                        <Link className="flex justify-center items-center space-x-[10px] bg-blue2 h-[30px] font-bold text-[16px] leading-[19px]" to="/waitlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <g filter="url(#filter0_i_5360_196992)">
                                    <g clipPath="url(#clip0_5360_196992)">
                                        <rect x="0.5" width="20" height="20" rx="3.25859" fill="url(#paint0_linear_5360_196992)" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.13402 6.53714C9.2753 5.75204 9.96682 5.15608 10.7986 5.15608C13.2571 5.15608 15.2612 7.17339 15.2612 9.62524C15.2612 12.1225 13.22 14.1773 10.7158 14.1773H7.23701C6.59464 14.1773 5.9867 13.8869 5.58301 13.3872C5.58301 14.462 6.45433 15.3333 7.52917 15.3333H10.7158C13.8757 15.3333 16.4262 12.7487 16.4262 9.62524C16.4262 6.54713 13.9128 4 10.7986 4C9.22128 4 7.94261 5.26888 7.94261 6.83411V11.6911H7.2692C6.98136 11.6911 6.74802 11.4596 6.74802 11.1739V6.57401V6.5251C6.74802 5.5322 7.26249 4.61021 8.10747 4.08881H8.06821C6.69567 4.08881 5.58301 5.20147 5.58301 6.57401V11.1739C5.58301 12.0981 6.33794 12.8472 7.2692 12.8472H10.9349C12.6908 12.8472 14.1143 11.4347 14.1143 9.69218C14.1143 7.9497 12.6908 6.53714 10.9349 6.53714H9.13402ZM10.9111 11.6658H9.08379V7.66787H10.9111C12.0236 7.66787 12.9255 8.56284 12.9255 9.66683C12.9255 10.7708 12.0236 11.6658 10.9111 11.6658Z" fill="black" />
                                        <g opacity="0.5" filter="url(#filter1_f_5360_196992)">
                                            <path d="M19.9519 12L0.400391 7.13513V0H19.9519V12Z" fill="url(#paint1_linear_5360_196992)" />
                                        </g>
                                    </g>
                                    <rect x="0.744394" y="0.244394" width="19.5112" height="19.5112" rx="3.01419" stroke="white" strokeWidth="0.488788" />
                                </g>
                                <defs>
                                    <filter id="filter0_i_5360_196992" x="0.5" y="0" width="20" height="21.3034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1.30343" />
                                        <feGaussianBlur stdDeviation="0.651717" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_5360_196992" />
                                    </filter>
                                    <filter id="filter1_f_5360_196992" x="-0.251327" y="-0.651717" width="20.8552" height="13.3034" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="0.325859" result="effect1_foregroundBlur_5360_196992" />
                                    </filter>
                                    <linearGradient id="paint0_linear_5360_196992" x1="0.5" y1="20" x2="20.5" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F2F2F2" />
                                        <stop offset="1" stopColor="white" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_5360_196992" x1="3.00726" y1="-1.78378" x2="8.73587" y2="16.2116" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" />
                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                    </linearGradient>
                                    <clipPath id="clip0_5360_196992">
                                        <rect x="0.5" width="20" height="20" rx="3.25859" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Join the #NoFilter Waitlist</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                <path d="M1.5 1L6.5 6L1.5 11" stroke="white" strokeWidth="2" />
                            </svg>
                        </Link>
                        :
                        null
                )
            }
        </>
    )
}

export default JoinBar;