import { useContext, useState, useCallback, useMemo, Fragment } from "react";
import { setProfile } from "../redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../config";
import { Collapse, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RefContext } from "../contexts/RefContextProvider";
import { useCookies } from "react-cookie";
import { setOpenDeleteAccountModal } from "../redux/reducers/ModalReducer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Dropzone from "react-dropzone";
import AvatarCropModal from "../components/AvatarCropModal";
import axios from "../utilities/axiosConfig";
import jwtDecode from "jwt-decode";

const dopplePlusAvatars = ["/images/account/builtin-avatars/dopple+/1.svg", "/images/account/builtin-avatars/dopple+/2.svg", "/images/account/builtin-avatars/dopple+/3.svg", "/images/account/builtin-avatars/dopple+/4.svg", "/images/account/builtin-avatars/dopple+/5.svg", "/images/account/builtin-avatars/dopple+/6.svg", "/images/account/builtin-avatars/dopple+/7.svg", "/images/account/builtin-avatars/dopple+/8.svg", "/images/account/builtin-avatars/dopple+/9.svg", "/images/account/builtin-avatars/dopple+/10.svg", "/images/account/builtin-avatars/dopple+/11.svg", "/images/account/builtin-avatars/dopple+/12.svg", "/images/account/builtin-avatars/dopple+/13.svg", "/images/account/builtin-avatars/dopple+/14.svg", "/images/account/builtin-avatars/dopple+/15.svg", "/images/account/builtin-avatars/dopple+/16.svg", "/images/account/builtin-avatars/dopple+/17.svg", "/images/account/builtin-avatars/dopple+/18.svg", "/images/account/builtin-avatars/dopple+/19.svg", "/images/account/builtin-avatars/dopple+/20.svg", "/images/account/builtin-avatars/dopple+/21.svg", "/images/account/builtin-avatars/dopple+/22.svg", "/images/account/builtin-avatars/dopple+/23.svg", "/images/account/builtin-avatars/dopple+/24.svg",]

const Account = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:1024px)');
    const profile = useSelector(store => store.AuthReducer.profile);
    const [, setCookies, removeCookies] = useCookies(["profile", "themeid"])
    const { themeID, setOpenDopplePlusModal } = useContext(RefContext);
    const [doing, setDoing] = useState(false);
    const [language, setLanguage] = useState(0);
    const [isLanguageShown, setIsLanguageShown] = useState(false);
    const [languageUnsaved, setLanguageUnsaved] = useState(0);
    const [index, setIndex] = useState(profile.picture);
    const [indexUnsaved, setIndexUnsaved] = useState(profile.picture);
    const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const [avatarFileUrl, setAvatarFileUrl] = useState("");
    const [avatarPreviews, setAvatarPreviews] = useState(profile.pictures)
    const [username, setUsername] = useState(profile.username);
    const [nameExists, setNameExists] = useState(false);
    // const nameExists = allUsers.some(x => x.username.toLowerCase() === username.toLowerCase());

    const save = async () => {
        setDoing(true);
        try {
            const { data } = await axios.put("/user", {
                email: profile.email,
                username,
            })

            if (data.success) {
                dispatch(setProfile({ type: 2, token: data.token, ...jwtDecode(data.token) }))
            }
            else alert("Same username is detected.")
        } catch (e) {
            console.log(e)
        }
        setDoing(false);
    }

    const deleteAccount = async () => {
        dispatch(setOpenDeleteAccountModal())
    }

    const logout = () => {
        dispatch(setProfile(undefined))
        removeCookies("profile")
        removeCookies("themeid")
        localStorage.removeItem('accessToken');
        nav("/")
    }

    const applyAvatar = async () => {
        setIndex(indexUnsaved)
        const { data: { success, token } } = await axios.put("/user", {
            username: profile.username,
            email: profile.email,
            picture: indexUnsaved,
            pictures: avatarPreviews,
        })
        if (success) {
            dispatch(setProfile({ ...jwtDecode(token) }))
            setCookies("profile", JSON.stringify({ ...jwtDecode(token) }))
            setOpenAvatarEdit(false)
            document.body.scrollTop = 0;
        }
    }

    const apply = () => {
        setIsLanguageShown(false)
        setLanguage(languageUnsaved)
    }

    const fetchUploadImage = async (file) => {
        setOpenAvatarModal(true);
        console.log(file);
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "v3okwqmh")
        data.append("cloud_name", "du1twfuco")
        const { url } = await fetch("https://api.cloudinary.com/v1_1/du1twfuco/image/upload", {
            method: "post",
            body: data
        }).then(resp => resp.json());
        setAvatarFileUrl(url);
    }

    const dropHandler = useCallback(async (acceptedFiles) => {
        const [File] = acceptedFiles;
        fetchUploadImage(File);
    }, []);

    useMemo(async () => {
        if (!username) {
            return;
        }

        const { data: { exists } } = await axios.get(`/user/username/${username}`)
        setNameExists(exists || false);
    }, [username])

    return (
        <>
            {matches &&
                <header className="fixed top-0 left-0 w-full h-[76px] lg:h-[70px] bg-nav-desktop z-[2]">
                    <span className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[18px] leading-[21px]"}>
                        My Account
                    </span>
                    <Link to="/" className={"flex items-center space-x-[10px] absolute top-1/2 left-[62px] -translate-y-1/2 font-bold text-[16px] leading-[19px] text-blue2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor">
                            <path d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                        <span>Back to explore</span>
                    </Link>
                </header>
            }
            {openAvatarEdit &&
                <header className="fixed top-0 left-0 w-full h-[76px] lg:h-[70px] bg-nav-desktop z-[2]">
                    <span className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[18px] leading-[21px]"}>
                        Change Avatar
                    </span>
                    <button className={"flex items-center space-x-[10px] absolute top-1/2 left-[22px] -translate-y-1/2 font-bold text-[16px] leading-[19px] text-blue2"} onClick={() => setOpenAvatarEdit(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor">
                            <path d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </button>
                </header>
            }
            {isLanguageShown && !matches &&
                <header className="fixed top-0 left-0 w-full h-[76px] bg-nav-desktop z-[2]">
                    <span className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[18px] leading-[21px]"}>
                        Language
                    </span>
                    <Link to="/" className={"flex items-center space-x-[10px] absolute top-1/2 left-[22px] -translate-y-1/2 font-bold text-[16px] leading-[19px] text-blue2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor">
                            <path d="M1 8L8.28571 1M1 8L8.28571 15M1 8L18 8" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </header>
            }
            {openAvatarEdit ?
                <div className="flex flex-col space-y-[56px] pt-[15px] lg:pt-[180px] pb-[50px] px-5 max-w-[770px] mx-auto">
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-[15px] lg:gap-x-[10px] lg:gap-y-2 justify-items-center">
                        <Dropzone maxFiles={1} accept={["image/*"]} onDrop={(acceptedFiles) => dropHandler(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <button className="flex justify-center items-center bg-nav border-2 border-button w-[119px] h-[119px] max-w-[25vw] max-h-[25vw] rounded-[5px]" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
                                        <path d="M50.5 28.5714H29.0714V50H21.9286V28.5714H0.5V21.4286H21.9286V0H29.0714V21.4286H50.5V28.5714Z" fill="#23252B" />
                                    </svg>
                                </button>
                            )}
                        </Dropzone>
                        <AvatarCropModal fileUrl={avatarFileUrl} setFileUrl={setAvatarFileUrl} open={openAvatarModal} setOpen={setOpenAvatarModal} previews={avatarPreviews} setPreviews={setAvatarPreviews} setIndexUnsaved={setIndexUnsaved} />
                        <Fragment>
                            {avatarPreviews.map((x, i) =>
                                <button key={i} className={"border w-[119px] h-[119px] max-w-[25vw] max-h-[25vw] rounded-[5px] overflow-hidden relative lazyimg-account" + (x ? "" : " hidden") + (indexUnsaved === i ? " border-3 border-blue2" : " border-button")} onClick={() => setIndexUnsaved(i)}>
                                    <div className={"flex justify-center items-center absolute bottom-[5px] right-[5px] rounded-full w-5 h-5 z-[1] border" + (indexUnsaved === i ? " bg-blue2 border-transparent" : " bg-inputback border-[#31333C]")}>
                                        <svg className={indexUnsaved === i ? "opacity-100" : "opacity-0"} xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                            <path d="M1.64722 3.14286L5.24722 7L11.6472 1" stroke="white" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <LazyLoadImage
                                        className="w-full h-full object-cover"
                                        alt=""
                                        effect="blur"
                                        src={x}
                                    />
                                </button>
                            )}
                            {dopplePlusAvatars.map((x, i) =>
                                <button key={i} className="p-0.5 w-[119px] h-[119px] max-w-[25vw] max-h-[25vw] bg-sun rounded-[5px] overflow-hidden relative" onClick={() => setOpenDopplePlusModal(true)}>
                                    <div className="absolute w-[115px] h-[115px] max-w-[25vw] max-h-[25vw] bg-black15 opacity-50 rounded-[5px] z-[1]" />
                                    <div className={"flex justify-center items-center absolute bottom-[2px] right-[2px] rounded-tl-[6.67px] rounded-br-[5px] w-10 h-10 z-[1] bg-gradient11"}>
                                        <img className="h-[15px]" src="/images/messages/dplus.png" alt="" />
                                    </div>
                                    <LazyLoadImage
                                        className="w-full h-full object-cover"
                                        alt=""
                                        effect="blur"
                                        src={x}
                                    />
                                </button>
                            )}
                        </Fragment>
                    </div>
                    <button className="w-full h-[50px] bg-blue2 rounded-[5px] font-bold max-w-[491px] mx-auto text-[16px] leading-[19px]" onClick={applyAvatar}>Apply</button>
                </div>
                :
                isLanguageShown && !matches ?
                    <div className="flex flex-col space-y-5 pt-[15px] pb-[50px] px-5">
                        <div className="flex flex-col w-full rounded-[5px] langlist">
                            {languages.map((x, i) =>
                                <button className={"flex justify-between items-center space-x-[10px] p-[15px] text-[16px] leading-[19px] border-b transition duration-800" + (themeID === 0 ? " bg-button hover:bg-[#31333C] border-[#31333C] text-white" : themeID === 1 ? " bg-[#EDEDF0] hover:bg-[#C6CED8] border-[#C6CED8] text-title" : themeID === 2 ? " bg-candybutton hover:bg-candysubtext border-candysubtext text-candytitle" : themeID === 3 ? " bg-galaxybutton hover:bg-[rgba(156,116,243,.5)] border-[rgba(156,116,243,.5)] text-galaxytitle" : "")} key={i} onClick={() => setLanguageUnsaved(i)}>
                                    <div className="flex items-center space-x-[10px] w-0 flex-1">
                                        <img src={x.flag} alt="" />
                                        <span className="w-0 flex-1 truncate text-left">{x.name}</span>
                                    </div>
                                    {i === languageUnsaved ?
                                        <>
                                            {(themeID === 0 || themeID === 1) &&
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <rect width="30" height="30" rx="15" fill="#048DFF" />
                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                            {themeID === 2 &&
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <rect width="30" height="30" rx="15" fill="white" />
                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="#DD57AF" strokeWidth="3" />
                                                </svg>
                                            }
                                            {themeID === 3 &&
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <rect width="30" height="30" rx="15" fill="#5200FF" />
                                                    <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" strokeWidth="3" />
                                                </svg>
                                            }
                                        </>
                                        :
                                        <div className={"w-[30px] h-[30px] border rounded-full" + (themeID === 0 ? " bg-inputback border-[#31333C]" : themeID === 1 ? " bg-white1 border-[#C4C7CB]" : themeID === 2 ? " bg-candynav border-candysubtext" : themeID === 3 ? " bg-[rgba(11,3,16,.5)] border-[#5200FF]" : "")} />
                                    }
                                </button>
                            )}
                        </div>
                        <button className={"flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] w-full min-h-[50px] mt-[30px] disabled:opacity-50" + (themeID === 0 ? " bg-blue2" : themeID === 1 ? " bg-blue2" : themeID === 2 ? " bg-candysubtext" : themeID === 3 ? " bg-galaxysubtext" : "")} onClick={apply}>Apply</button>
                    </div>
                    :
                    <div className="flex flex-col items-center h-full pt-[15px] lg:pt-[142px] pb-[30px] px-5 max-w-[500px] mx-auto">
                        {!matches && <span className="font-bold text-[24px] leading-[28px]">My Account</span>}
                        <div className="bg-button w-[150px] h-[150px] rounded-[10px] lg:mt-0 mt-[15px] relative overflow-hidden lazyimg-account">
                            <LazyLoadImage
                                className="w-full h-full object-cover"
                                alt=""
                                effect="blur"
                                src={avatarPreviews[index]}
                            />
                            <button className="flex justify-center items-center absolute bottom-[5px] right-[5px] w-10 h-10 bg-blue2 rounded-[15px]" onClick={() => setOpenAvatarEdit(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16.1454 9.12472L12.3421 13.0624L5.42387 13.9602L6.48436 7.15146L10.7675 3.01205L1.59824 3.01218C1.42845 3.13554 1.7216 2.84239 1.59824 3.01218L1.59724 3.01202V17.5602H1.59847C1.60091 17.5602 1.59724 17.5602 1.59724 17.5602C1.59724 17.5602 1.59604 17.5602 1.59847 17.5602H16.1454C16.022 17.73 16.3152 17.4368 16.1454 17.5602V9.12472Z" fill="white" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.4264 0.588867L18.9335 4.08475L16.4958 6.54665L14.7028 4.75351L12.9726 3.02327L15.4264 0.588867ZM11.9966 3.9915L8.29032 7.66844C8.18271 7.77605 8.10719 7.90967 8.07561 8.04835L7.14661 12.3309L11.4867 11.4454C11.6214 11.4123 11.7507 11.338 11.8553 11.2334L15.5286 7.52356L13.7307 5.7256L11.9966 3.9915Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col mt-[15px] w-full">
                            <span className="text-[14px] leading-[17px] text-subtext">Username</span>
                            <div className={"flex items-center rounded-[5px] bg-nav border px-5 h-[50px] relative mt-[5px]" + (((nameExists && username !== profile.username) || username?.length > 15) ? " border-[#E93131]" : " border-button")}>
                                <input className="w-0 flex-1" placeholder="Username" value={username} onChange={e => setUsername(e.target.value.replace(/\s/g, ''))} />
                                {(nameExists && username !== profile.username) || username?.length > 15 ?
                                    <svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setUsername("")}>
                                        <path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" strokeWidth="3" strokeLinejoin="round" />
                                    </svg>
                                    :
                                    (username.length > 0 && username !== profile.username ?
                                        <svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
                                            <path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        : null)
                                }
                                {nameExists && username.length > 0 && username !== profile.username &&
                                    <span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Username is already in use</span>
                                }
                                {username?.length > 15 &&
                                    <span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Max character limit reached</span>
                                }
                            </div>
                            <span className="text-[12px] leading-[14px] mt-[5px] text-subtext">You can change this at any time</span>
                            <span className="text-[14px] leading-[17px] text-subtext mt-[15px]">My Email</span>
                            <div className="flex items-center space-x-[10px] rounded-[5px] bg-nav border border-button px-5 h-[50px] relative mt-[5px]">
                                <input className="w-0 flex-1 text-subtext" placeholder="My Email" readOnly value={profile?.email} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.89453 5.89407C4.89453 4.4857 6.03624 3.34399 7.44461 3.34399C8.85298 3.34399 9.99468 4.4857 9.99468 5.89407V7.27417H4.89453V5.89407ZM2.89453 7.27417V5.89407C2.89453 3.38113 4.93167 1.34399 7.44461 1.34399C9.95755 1.34399 11.9947 3.38113 11.9947 5.89407V7.27417H13.4667V15.5H1.5332V7.27417H2.89453Z" fill="#848D97" />
                                </svg>
                            </div>
                            <span className="text-[14px] leading-[17px] text-subtext mt-[15px]">Language</span>
                            <button className={"flex justify-between items-center space-x-[10px] bg-button px-5 h-[50px] relative mt-[5px]" + (isLanguageShown ? " rounded-t-[5px]" : " rounded-[5px]")} onClick={() => setIsLanguageShown(!isLanguageShown)}>
                                <div className="flex items-center space-x-[10px] w-0 flex-1">
                                    <img className="w-[30px] h-[30px]" src={languages[language].flag} alt="" />
                                    <span className="w-0 flex-1 truncate text-left">{languages[language].name}</span>
                                </div>
                                <svg className={!(isLanguageShown && matches) ? "rotate-[180deg] transition" : "transition"} xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                                    <path d="M1 9.75L8.5 2.25L16 9.75" stroke="#8A939D" strokeWidth="2" />
                                </svg>
                            </button>
                            {matches &&
                                <Collapse in={isLanguageShown}>
                                    <div className="flex flex-col w-full bg-[#31333C] rounded-b-[5px] overflow-hidden">
                                        {languages.map((x, i) =>
                                            <button className="flex justify-between items-center space-x-[10px] px-5 py-[15px] text-[16px] leading-[19px] bg-button text-white border-y border-[#31333C] hover:bg-[#31333C] transition duration-800" key={i} onClick={() => setLanguage(i)}>
                                                <div className="flex items-center space-x-[10px] w-0 flex-1">
                                                    <img className="w-[30px] h-[30px]" src={x.flag} alt="" />
                                                    <span className="w-0 flex-1 truncate text-left">{x.name}</span>
                                                </div>
                                                {language === i ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                        <rect width="30" height="30" rx="15" fill="#048DFF" />
                                                        <path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <div className="w-[30px] h-[30px] bg-inputback border border-[#31333C] rounded-full" />
                                                }
                                            </button>
                                        )}
                                    </div>
                                </Collapse>
                            }
                            <button className="flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] bg-blue2 h-[50px] mt-[15px] disabled:bg-subtext transition duration-300" disabled={username.length === 0 || (index === profile.picture && username === profile.username) || doing} onClick={save}>Save Changes</button>
                            <div className="w-full h-[1px] bg-button mt-[39.5px] relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black15 px-[11.59px] font-bold text-[16px] leading-[19px]">
                                    Account Status
                                </div>
                            </div>
                            <button className="flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] bg-button text-[#E93131] h-[50px] mt-[39.5px] disabled:bg-subtext" onClick={logout}>Sign out</button>
                            <button className="flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] bg-[#E93131] text-white h-[50px] mt-[15px]" onClick={deleteAccount}>Delete Account</button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Account;