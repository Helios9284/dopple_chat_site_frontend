import { useState } from "react";

const ProfilePreview = ({
    name,
    bio,
    tagLine,
    avatarPreview,
    bannerPreview
}) => {
    const [mobileMode, setMobileMode] = useState(true)

    return (
        <div className="flex flex-col items-center flex-1 min-h-[688px] xl:min-h-[740px] max-h-[688px] xl:max-h-[740px] pt-[30px] pb-[30px] xl:pb-[42px] bg-nav border-y xl:border-l xl:border-y-0 border-button">
            <span className="font-bold text-[22px] leading-[25px]">Profile Preview</span>
            <span className="mt-[10px] text-subtext font-medium text-[14px] leading-[17px] text-center">Preview your Dopple’s profile screen</span>
            <div className="flex justify-center items-center mt-[51px] mb-[50px] bg-nav w-full rounded-[10px] flex-1 h-0">
                {mobileMode ?
                    <div className="relative">
                        <div className="flex flex-col w-[204px] h-[329.47px] overflow-auto absolute top-[76.73px] left-[11.31px]">
                            <div className={"flex justify-center items-center h-[138.65px] bg-inputback relative"}>
                                {bannerPreview !== "" && bannerPreview !== "data:," ?
                                    <img className={"w-full h-full object-cover"} src={bannerPreview} alt="" />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="83" height="83" viewBox="0 0 83 83" fill="none">
                                        <path d="M20.8755 41.5736C20.8755 52.8283 30.0309 61.9838 41.2857 61.9838C52.5405 61.9838 61.6959 52.8283 61.6959 41.5736C61.6959 30.3188 52.5405 21.1633 41.2857 21.1633C30.0309 21.1633 20.8755 30.3188 20.8755 41.5736ZM37.2012 70.1079H45.3539V82.337H37.2012V70.1079ZM37.2012 0.810181H45.3539V13.0392H37.2012V0.810181ZM0.51416 37.4972H12.7432V45.6499H0.51416V37.4972ZM69.8119 37.4972H82.0409V45.6499H69.8119V37.4972ZM9.56771 67.5113L18.2095 58.8613L23.9776 64.6253L15.3357 73.2753L9.56771 67.5113ZM58.5694 18.5178L67.2194 9.86781L72.9833 15.6317L64.3333 24.2817L58.5694 18.5178ZM18.2218 24.2858L9.57178 15.6358L15.3398 9.87188L23.9816 18.5219L18.2218 24.2858ZM72.9833 67.5154L67.2194 73.2793L58.5694 64.6293L64.3333 58.8654L72.9833 67.5154Z" fill="#23252B" />
                                    </svg>
                                }
                                <div className="flex items-center absolute bottom-[11.09px] right-[11.09px] bg-menuback border border-[rgba(0,89,25,.25)] rounded-[28px] px-[5px] h-[20.52px] font-bold text-[6.66px]">
                                    <div className="relative">
                                        <div className="absolute top-[0.5px] right-[0px] w-[2.77px] h-[2.77px] rounded-full bg-[#00FF47] shadow-lg9" />
                                        <img className="w-[9.01px] h-[9.01px]" src="/images/profile/icons/global.svg" alt="" />
                                    </div>
                                    <span className="ml-[2.77px] mt-[1px]">24 Chatting Now</span>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 z-[1]">
                                <div className="flex flex-col px-[11.09px]">
                                    <div className="flex justify-between items-end mt-[-36.05px] w-[63.78px] h-[63.78px] rounded-[8.32px] overflow-hidden">
                                        {avatarPreview ?
                                            <img className={"w-full h-full object-cover"} src={avatarPreview} alt="" />
                                            :
                                            <div className="flex justify-center items-center w-full h-full bg-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="43" viewBox="0 0 38 43" fill="none">
                                                    <path d="M19.1875 18.0866C24.0546 18.0866 28.0001 14.0557 28.0001 9.0833C28.0001 4.11089 24.0546 0.0799561 19.1875 0.0799561C14.3204 0.0799561 10.3748 4.11089 10.3748 9.0833C10.3748 14.0557 14.3204 18.0866 19.1875 18.0866Z" fill="black" fillOpacity="0.25" />
                                                    <path d="M9.17935 21.4426C4.59891 21.4426 0.885742 25.2361 0.885742 29.9156V42.3149H37.4894V29.9156C37.4894 25.2361 33.7762 21.4426 29.1958 21.4426H9.17935Z" fill="black" fillOpacity="0.25" />
                                                </svg>
                                            </div>
                                        }
                                    </div>
                                    <span className="flex items-center space-x-[3.17px] mt-[11.09px]">
                                        <span className="font-bold text-[13.31px] leading-[16.31px] truncate">{name}</span>
                                        {name && name?.length > 0 &&
                                            <img className="w-[11.09px] h-[10.57px]" src="/images/explore/verified.svg" alt="" />
                                        }
                                    </span>
                                    <span className="mt-[2.86px] font-bold text-[8.87px] leading-[11.87px] text-subtext">{tagLine}</span>
                                    <span className="mt-[8.32px] text-[7.76px] leading-[9px] text-subtext w-full" style={{ wordBreak: "break-all" }}>{bio}</span>
                                    <div className="flex flex-col md:flex-row items-center mt-[15px]">
                                        <button className="flex justify-center items-center space-x-[5.71px] w-full h-[27.73px] bg-blue2 rounded-[2.77px] font-bold text-[7.6px] leading-[10.76px] transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.442383 0.517944H9.39357V7.21318H3.82663L1.82786 8.837V7.21318H0.442383V0.517944ZM6.63458 3.22518H3.20141V2.57748H6.63458V3.22518ZM7.27685 4.7059H2.55918V4.05819H7.27685V4.7059Z" fill="white" />
                                            </svg>
                                            <span>Chat Now</span>
                                        </button>
                                    </div>
                                    <div className="my-[8.32px] w-full h-[1px] bg-button" />
                                    <div className="flex justify-between items-center">
                                        <div className="w-[1px] h-[30px] bg-transparent" />
                                        <div className="flex flex-col items-center space-y-1 text-[5.55px] leading-[150%] text-subtext w-[47.47px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.1239 2.4961L9.96606 0.357422L7.7444 1.45265L5.51013 0.381753L4.37725 2.53294L1.91997 2.93887L2.3086 5.32433L0.566895 7.05204L2.32859 8.76061L1.96774 11.1502L4.42959 11.5292L5.58743 13.6679L7.80909 12.5727L10.0434 13.6436L11.1762 11.4924L13.6335 11.0865L13.2449 8.70101L14.9866 6.9733L13.2249 5.26472L13.5858 2.87517L11.1239 2.4961ZM10.6236 6.03775L9.71568 5.15811L7.24898 7.54772L5.83769 6.18041L4.92973 7.06001L7.24893 9.30695L10.6236 6.03775Z" fill="#8A939D" />
                                            </svg>
                                            <span className="text-center">Verified Dopple</span>
                                        </div>
                                        <div className="w-[1px] h-[30px] bg-button" />
                                        <div className="flex flex-col items-center space-y-1 text-[5.55px] leading-[150%] text-subtext w-[47.47px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                <path d="M8.01786 0.357422L9.98674 5.0366L15.0972 5.44158L11.2036 8.73845L12.3932 13.6679L8.01786 11.0263L3.64256 13.6679L4.83214 8.73845L0.938477 5.44158L6.04897 5.0366L8.01786 0.357422Z" fill="#8A939D" />
                                            </svg>
                                            <span className="text-center">Character</span>
                                        </div>
                                        <div className="w-[1px] h-[30px] bg-button" />
                                        <div className="flex flex-col items-center space-y-1 text-[5.55px] leading-[150%] text-subtext w-[47.47px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                <path d="M5.94888 10.104V11.9087H12.0154L14.1835 13.6679V11.9087H15.4455V4.36446H12.8569V10.104H5.94888Z" fill="#8A939D" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.200684 0.357422H11.6974V8.9459H4.54735L1.98017 11.0289V8.9459H0.200684V0.357422ZM8.1538 3.92054H3.7443V2.90896H8.1538V3.92054ZM8.97873 5.81996H2.91943V4.80838H8.97873V5.81996Z" fill="#8A939D" />
                                            </svg>
                                            <span className="max-w-full text-center break-words">6M Messages</span>
                                        </div>
                                        <div className="w-[1px] h-[30px] bg-button" />
                                        <div className="flex flex-col items-center space-y-1 text-[5.55px] leading-[150%] text-subtext w-[47.47px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                                                <path d="M5.27399 6.11552H2.34305C1.4902 6.11552 0.798828 6.7992 0.798828 7.64256V10.6188H4.30384V8.16672C4.30384 7.34266 4.68103 6.60572 5.27399 6.11552Z" fill="#8A939D" />
                                                <path d="M17.3688 10.6188H20.8737V7.64253C20.8737 6.79916 20.1824 6.11548 19.3295 6.11548H16.3986C16.9916 6.60569 17.3688 7.34264 17.3688 8.16672V10.6188Z" fill="#8A939D" />
                                                <path d="M13.0832 7.78496H14.6664C14.8796 7.78496 15.0525 7.95588 15.0525 8.16672V10.6188H13.0832V7.78496Z" fill="#8A939D" />
                                                <path d="M8.5893 7.78496V10.6188H6.62018V8.16672C6.62018 7.95588 6.79302 7.78496 7.00623 7.78496H8.5893Z" fill="#8A939D" />
                                                <path d="M16.9785 5.28066C18.0169 5.28066 18.8587 4.44824 18.8587 3.4214C18.8587 2.39457 18.0169 1.56215 16.9785 1.56215C15.9401 1.56215 15.0983 2.39457 15.0983 3.4214C15.0983 4.44824 15.9401 5.28066 16.9785 5.28066Z" fill="#8A939D" />
                                                <path d="M4.69408 5.28069C5.73247 5.28069 6.57425 4.44828 6.57425 3.42144C6.57425 2.39461 5.73247 1.56219 4.69408 1.56219C3.65569 1.56219 2.81391 2.39461 2.81391 3.42144C2.81391 4.44828 3.65569 5.28069 4.69408 5.28069Z" fill="#8A939D" />
                                                <path d="M10.8364 5.4879C12.2691 5.4879 13.4305 4.3394 13.4305 2.92266C13.4305 1.50592 12.2691 0.357422 10.8364 0.357422C9.40374 0.357422 8.24232 1.50592 8.24232 2.92266C8.24232 4.3394 9.40374 5.4879 10.8364 5.4879Z" fill="#8A939D" />
                                                <path d="M7.00625 6.63971C6.1534 6.63971 5.46203 7.32339 5.46203 8.16676V13.6679H16.2107V8.16676C16.2107 7.32339 15.5193 6.63971 14.6664 6.63971H7.00625Z" fill="#8A939D" />
                                            </svg>
                                            <span className="max-w-full text-center break-words">All Ages</span>
                                        </div>
                                        <div className="w-[1px] h-[30px] bg-transparent" />
                                    </div>
                                    <div className="mt-[8.32px] mb-[8.96px] w-full h-[1px] bg-button" />
                                </div>
                            </div>
                        </div>
                        <img className="w-[225.93px]" src="/images/create/iphone14.png" alt="" />
                    </div>
                    :
                    <div className="relative">
                        <div className="flex flex-col absolute top-[14.98px] left-1/2 -translate-x-1/2 w-[76.8558%] h-[84.0249%] bg-[#17181C] overflow-auto">
                            <img className="w-full" src="/images/create/Header.png" alt="" />
                            <div className="flex flex-col px-[17.17px] pt-2">
                                <div className="flex space-x-[8.58px]">
                                    <div className="flex justify-center items-center bg-inputback w-[197.42px] h-[124.74px] rounded-[4.29px] relative overflow-hidden">
                                        {bannerPreview ?
                                            <img className={"w-full h-full object-cover"} src={bannerPreview} alt="" />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                                                <path d="M17.7617 35.5628C17.7617 45.3806 25.7482 53.3672 35.566 53.3672C45.3838 53.3672 53.3704 45.3806 53.3704 35.5628C53.3704 25.745 45.3838 17.7585 35.566 17.7585C25.7482 17.7585 17.7617 25.745 17.7617 35.5628ZM32.003 60.454H39.1148V71.1217H32.003V60.454ZM32.003 0.00390625H39.1148V10.6716H32.003V0.00390625ZM0 32.0069H10.6677V39.1187H0V32.0069ZM60.4501 32.0069H71.1178V39.1187H60.4501V32.0069ZM7.89763 58.1889L15.4361 50.6433L20.4677 55.6714L12.9292 63.217L7.89763 58.1889ZM50.643 15.4507L58.1886 7.9051L63.2166 12.9331L55.671 20.4787L50.643 15.4507ZM15.4468 20.4823L7.90119 12.9367L12.9328 7.90865L20.4713 15.4543L15.4468 20.4823ZM63.2166 58.1925L58.1886 63.2205L50.643 55.6749L55.671 50.6469L63.2166 58.1925Z" fill="#23252B" />
                                            </svg>
                                        }
                                        <img className="absolute bottom-[5.72px] right-[5.72px] h-[10.59px]" src="/images/create/Chatting Now.png" alt="" />
                                    </div>
                                    <div className="flex flex-col flex-1 w-0">
                                        <div className="flex justify-center items-center w-[35.76px] h-[35.76px] rounded-[4.29px] bg-button overflow-hidden">
                                            {avatarPreview ?
                                                <img className={"w-full h-full object-cover"} src={avatarPreview} alt="" />
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25" fill="none">
                                                    <path d="M10.9999 10.6625C13.9252 10.6625 16.2966 8.27653 16.2966 5.33323C16.2966 2.38992 13.9252 0.00390625 10.9999 0.00390625C8.07465 0.00390625 5.70324 2.38992 5.70324 5.33323C5.70324 8.27653 8.07465 10.6625 10.9999 10.6625Z" fill="black" fillOpacity="0.25" />
                                                    <path d="M4.98473 12.649C2.23174 12.649 0 14.8945 0 17.6644V25.0039H22V17.6644C22 14.8945 19.7683 12.649 17.0153 12.649H4.98473Z" fill="black" fillOpacity="0.25" />
                                                </svg>
                                            }
                                        </div>
                                        <div className="flex space-x-[1.43px] mt-[4.29px] font-bold text-[6.87px] leading-[9.87px]">
                                            <span className="truncate">{name}</span>
                                            {name && name?.length > 0 &&
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.89534 1.64269L3.53367 0.953125L2.83969 1.30626L2.14177 0.96097L1.7879 1.65457L1.02032 1.78545L1.14171 2.55459L0.597656 3.11165L1.14796 3.66254L1.03524 4.433L1.80424 4.55522L2.16592 5.24479L2.8599 4.89166L3.55782 5.23695L3.91169 4.54335L4.67927 4.41246L4.55788 3.64332L5.10193 3.08627L4.55163 2.53537L4.66435 1.76492L3.89534 1.64269ZM3.73906 2.78462L3.45546 2.501L2.68494 3.27147L2.24409 2.83061L1.96047 3.11422L2.68492 3.8387L3.73906 2.78462Z" fill="white" />
                                                </svg>
                                            }
                                        </div>
                                        <span className="mt-[1.43px] font-bold text-[4.58px] leading-[7.58px] text-subtext">{tagLine}</span>
                                        <span className="mt-[4.29px] font-bold text-[4.01px] leading-[5.2px] text-subtext break-words">{bio}</span>
                                        <img className="mt-[4.29px]" src="/images/create/Content1.png" alt="" />
                                    </div>
                                </div>
                                <span className="mt-[8.58px] font-bold text-[6.29px] leading-[100%]">Similar</span>
                                <div className="relative mt-[4.52px]">
                                    <img className="w-full" src="/images/create/Content.png" alt="" />
                                    <button className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-[-7.15px] w-[14.31px] h-[14.31px] bg-white rounded-full shadow-lg12">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                            <path d="M4.02812 1.14844L1.45312 3.72344L4.02812 6.29844" stroke="#23252B" strokeWidth="1.43056" />
                                        </svg>
                                    </button>
                                    <button className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-[-7.15px] w-[14.31px] h-[14.31px] bg-white rounded-full shadow-lg12">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                            <path d="M0.971875 1.14844L3.54688 3.72344L0.971875 6.29844" stroke="#23252B" strokeWidth="1.43056" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img className="w-[515.26px]" src="/images/create/Macbook Pro.png" alt="" />
                    </div>
                }

            </div>
            <div className="flex w-[344px] min-h-[48px] h-12 p-0.5 bg-[#33353E] rounded-[5px] font-bold text-[14px] leading-[17px]">
                <button className={"flex justify-center items-center space-x-[10px] flex-1 h-full rounded-[5px]" + (mobileMode === true ? " bg-button" : "")} onClick={() => setMobileMode(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.66667 0.666992C0.746192 0.666992 0 1.41318 0 2.33366V15.667C0 16.5875 0.746192 17.3337 1.66667 17.3337H8.33333C9.25381 17.3337 10 16.5875 10 15.667V2.33366C10 1.41318 9.25381 0.666992 8.33333 0.666992H1.66667ZM9 3H1V13H9V3ZM3.6665 2H6.33317V2.66667H3.6665V2ZM5.1665 17C5.99493 17 6.6665 16.3284 6.6665 15.5C6.6665 14.6716 5.99493 14 5.1665 14C4.33808 14 3.6665 14.6716 3.6665 15.5C3.6665 16.3284 4.33808 17 5.1665 17Z" fill="white" />
                    </svg>
                    <span>Mobile</span>
                </button>
                <button className={"flex justify-center items-center space-x-[10px] flex-1 h-full rounded-[5px]" + (mobileMode === false ? " bg-button" : "")} onClick={() => setMobileMode(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                        <rect x="0.75" y="1.25" width="15.5" height="10.55" rx="1.15" stroke="white" />
                        <rect x="1" y="9" width="15" height="3" fill="white" />
                        <path d="M4.20996 17.25V15.27L6.35496 14.61L7.42746 11.64H8.49996H9.57246L10.645 14.61L12.79 15.27V17.25H4.20996Z" fill="white" />
                    </svg>
                    <span>Desktop</span>
                </button>
            </div>
        </div>
    )
}

export default ProfilePreview;