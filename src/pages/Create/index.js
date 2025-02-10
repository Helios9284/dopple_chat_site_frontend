import { useCallback, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import DoppleCropModal from "../../components/DoppleCropModal";
import BannerCropModal from "../../components/BannerCropModal";
import { blacklist, categories, subcategories } from "../../config";
import SampleConversation from "./SampleConversation";
import ProfilePreview from "./ProfilePreview";
import Voice from "./Voice";
import { Slide, Snackbar } from "@mui/material";

const ratings = ["Everyone (10+)", "Teen (13+)", "Mature (18+)"]

const visibilities = [
    {
        name: "Public",
        image: "/images/create/public.svg",
    },
    {
        name: "Unlisted",
        image: "/images/create/unlisted.svg",
    },
    {
        name: "Private",
        image: "/images/create/private.svg",
    }
]

const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
}

const Create = () => {
    const [step, setStep] = useState(1)
    const [openAlert, setOpenAlert] = useState(false)
    const [avatarFileName, setAvatarFileName] = useState(false);
    const [bannerFileName, setBannerFileName] = useState(false);
    const [doing] = useState(false);
    const [currentBlackword, setCurrentBlackword] = useState("")
    const [visibility, setVisibility] = useState(-1)
    const [category, setCategory] = useState(-1)
    const [subCategory, setSubCategory] = useState(-1)
    const [rating, setRating] = useState(-1)
    const [openVisibility, setOpenVisibility] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [openSubCategory, setOpenSubCategory] = useState(false)
    const [openRating, setOpenRating] = useState(false)
    const [name, setName] = useState()
    const [tagLine, setTagLine] = useState()
    const [description, setDescription] = useState()
    const [greeting, setGreeting] = useState()
    const [bio, setBio] = useState()
    const [accept, setAccept] = useState(false)
    const [validName, setValidName] = useState(-1)
    const [validDescription, setValidDescription] = useState(-1)
    const [validBio, setValidBio] = useState(-1)
    const [validTagLine, setValidTagLine] = useState(-1)
    const [validCategory, setValidCategory] = useState(-1)
    const [validSubCategory, setValidSubCategory] = useState(-1)
    const [validVisibility, setValidVisibility] = useState(-1)
    const [validAvatar, setValidAvatar] = useState(-1)
    const [validBanner, setValidBanner] = useState(-1)
    const [validAccept, setValidAccept] = useState(-1)

    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const [openBannerModal, setOpenBannerModal] = useState(false);
    const [avatarFileUrl, setAvatarFileUrl] = useState("");
    const [bannerFileUrl, setBannerFileUrl] = useState("");
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [bannerPreview, setBannerPreview] = useState("");
    const [preparingAvatarPreview, setPreparingAvatarPreview] = useState(false);
    const [preparingBannerPreview, setPreparingBannerPreview] = useState(false);

    const [textValues, setTextValues] = useState(Array(4).fill(""))
    const [validSampleConversation, setValidSampleConversation] = useState(-1)

    const create = () => {
        alert(1)
    }

    const dropHandler = useCallback(async (acceptedFiles, type) => {
        const [File] = acceptedFiles;
        if (type === 0) setAvatarFileName(File.name);
        if (type === 1) setBannerFileName(File.name);
        fetchUploadImage(File, type);
        if (type === 0) {
            setPreparingAvatarPreview(true)
        }
        if (type === 1) {
            setPreparingBannerPreview(true)
            setBannerFile(File)
        }
    }, []);

    const fetchUploadImage = async (file, type) => {
        if (type === 0) setOpenAvatarModal(true);
        if (type === 1) setOpenBannerModal(true);
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "v3okwqmh")
        data.append("cloud_name", "du1twfuco")
        const { url } = await fetch("https://api.cloudinary.com/v1_1/du1twfuco/image/upload", {
            method: "post",
            body: data
        }).then(resp => resp.json());
        if (type === 0) setAvatarFileUrl(url);
        if (type === 1) setBannerFileUrl(url);
    }

    const deleteAvatar = () => {
        setAvatarFileUrl("");
        setAvatarPreview("");
    }

    const deleteBanner = () => {
        setBannerFileUrl("");
        setBannerPreview("");
    }

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }

    const checkBlackList = (value) => {
        if (blacklist.findIndex(x => value.indexOf(x) > -1) > -1) {
            setOpenAlert(true)
            setCurrentBlackword(blacklist[blacklist.findIndex(x => value.indexOf(x) > -1)])
        }
        return blacklist.findIndex(x => value.indexOf(x) > -1) > -1
    }

    const _checkBlackList = (value) => {
        console.log(value)
        return blacklist.findIndex(x => value.indexOf(x) > -1) > -1
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
        checkBlackList(e.target.value)
    }

    const handleChangeTagLine = (e) => {
        setTagLine(e.target.value)
        checkBlackList(e.target.value)
    }

    const handleChangeBio = (e) => {
        setBio(e.target.value)
        checkBlackList(e.target.value)
    }

    const handleChangeGreeting = (e) => {
        setGreeting(e.target.value)
        checkBlackList(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
        checkBlackList(e.target.value)
    }

    useMemo(() => {
        if (name !== undefined) setValidName(name.length > 0 ? 1 : 0)
        if (tagLine !== undefined) setValidTagLine(tagLine.length > 0 ? 1 : 0)
        if (description !== undefined) setValidDescription(description?.length >= 100 ? 1 : 0)
        if (bio !== undefined) setValidBio(bio?.length > 30 ? 1 : 0)
        if (category >= 0) setValidCategory(1)
        if (subCategory >= 0) setValidSubCategory(1)
        if (visibility >= 0) setValidVisibility(1)
        if (accept === true) setValidAccept(1)
        if (avatarPreview.length > 0 && avatarPreview !== "data:,") setValidAvatar(1)
        if (bannerPreview.length > 0 && bannerPreview !== "data:,") setValidBanner(1)
    }, [name, tagLine, description, bio, category, visibility, accept, avatarPreview, bannerPreview])

    return (
        <>
            {doing &&
                <div className="fixed w-full h-full bg-[rgba(0,0,0,0.8)] top-0 left-0 z-[103]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <div className="flex justify-center items-center">
                            <svg className='spinnerInner' viewBox='0 0 120 120'>
                                <circle cx='60' cy='60' r='50' />
                            </svg>
                        </div>
                    </div>
                </div>
            }
            <div className="flex flex-col xl:flex-row xl:justify-between space-y-[30px] xl:space-x-[42px] xl:space-y-0 bg-[#17181C]">
                <div className="flex flex-col flex-1 pt-[30px] pl-5 pr-5 xl:pl-[60px] xl:pr-0 pb-[30px] xl:flex-[unset] xl:w-[702px]">
                    <span className="font-bold text-[22px] leading-[25px]">Create New Dopple</span>
                    <span className="mt-[10px] text-subtext font-medium text-[14px] leading-[17px]">Setup your new Dopple chatbot.</span>
                    <span className="mt-[30px] text-white font-bold text-[16px] leading-[19px]">
                        Step {step}: {"\u00a0"}
                        {step === 1 && "Name & Profile"}
                        {step === 2 && "Behavior & Personality"}
                        {step === 3 && "Publishing & Availability"}
                    </span>
                    <div className="flex space-x-1 mt-[10px] h-1 mb-[30px]">
                        <div className="flex-1 bg-[#484E54] relative">
                            <div className={"absolute h-full bg-blue2 transition-all" + (step >= 1 ? " w-full" : " w-0")}></div>
                        </div>
                        <div className="flex-1 bg-[#484E54] relative">
                            <div className={"absolute h-full bg-blue2 transition-all" + (step >= 2 ? " w-full" : " w-0")}></div>
                        </div>
                        <div className="flex-1 bg-[#484E54] relative">
                            <div className={"absolute h-full bg-blue2 transition-all" + (step >= 3 ? " w-full" : " w-0")}></div>
                        </div>
                    </div>

                    {/* Step1 */}
                    {step === 1 &&
                        <>
                            <div className="flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0">
                                <div className="flex flex-col flex-1">
                                    <span className="font-bold text-[16px] leading-[19px]">Dopple Name</span>
                                    <div className={"flex px-[15px] h-[50px] rounded-[5px] border bg-inputback text-[14px] leading-[17px] mt-[10px] relative" + ((name === "" || validName === 0) ? " border-red2" : " border-button")}>
                                        <input className="placeholder-[#484E54] w-full" placeholder="Your Dopple Name" value={name} onChange={handleChangeName} maxLength={25} />
                                        {(name === "" || validName === 0) && <span className="absolute bottom-[calc(100%+10px)] right-0 text-red1 text-[12px] leading-[14px]">Missing items to complete form.</span>}
                                        {(name === undefined || name.length > 0) && validName !== 0 &&
                                            <span className="absolute bottom-[calc(100%+10px)] right-[10px] text-black4 text-[12px] leading-[15px]">{name?.length ?? 0}/25 characters</span>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="font-bold text-[16px] leading-[19px]">Dopple Tagline</span>
                                    <div className={"flex px-[15px] h-[50px] rounded-[5px] border bg-inputback text-[14px] leading-[17px] mt-[10px] relative" + ((tagLine === "" || validTagLine === 0) ? " border-red2" : " border-button")}>
                                        <input className="placeholder-[#484E54] w-full" placeholder="Your Dopple Tagline" value={tagLine} onChange={handleChangeTagLine} maxLength={30} />
                                        {(tagLine === "" || validTagLine === 0) && <span className="absolute bottom-[calc(100%+10px)] right-0 text-red1 text-[12px] leading-[14px]">Missing items to complete form.</span>}
                                        {(tagLine === undefined || tagLine.length > 0) && validTagLine !== 0 &&
                                            <span className="absolute bottom-[calc(100%+10px)] right-[10px] text-black4 text-[12px] leading-[15px]">{tagLine?.length ?? 0}/30 characters</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm2:flex-row space-y-[10px] sm2:space-x-5 sm2:space-y-0 mt-5">
                                <div className="flex items-center flex-1 w-full sm2:w-0 space-x-[30px] sm2:space-x-[10px]">
                                    <div className={"flex justify-center items-center w-[150px] h-[150px] sm2:w-[100px] sm2:h-[100px] border bg-inputback rounded-[9.75px] md:rounded-[6.25px]" + (validAvatar === 0 ? " border-red2" : " border-button")}>
                                        {avatarPreview !== "" ?
                                            <img className="rounded-[5px] w-full h-full object-cover" src={avatarPreview} width="100%" height="100%" alt="" />
                                            :
                                            <img className="w-[69.06px] h-[78px] md:w-[78px] md:h-[78px] sm2:w-auto sm2:h-auto" src="/images/create/blank-avatar.svg" alt="" />
                                        }
                                    </div>
                                    <div className="flex flex-col items-center sm2:items-start space-y-[10px]">
                                        <span className="font-bold text-[16px] leading-[19px]">Upload Profile Image</span>
                                        <span className="text-subtext text-[12px] leading-[14px] max-w-[172px] truncate">
                                            {avatarPreview !== "" ? avatarFileName : "Max. 2 MB, 512x512 px"}
                                        </span>
                                        <div className="flex space-x-[10px]">
                                            <Dropzone maxFiles={1} accept={["image/*"]} onDrop={(acceptedFiles) => dropHandler(acceptedFiles, 0)}>
                                                {({ getRootProps, getInputProps }) => (
                                                    avatarPreview !== "" ?
                                                        <button className="flex justify-center items-center w-10 h-10 rounded-[5px] bg-button" {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <img src="/images/create/edit.svg" alt="" />
                                                        </button>
                                                        :
                                                        <button className="bg-button rounded-[5px] w-[172px] h-10 font-bold text-[14px] leading-[17px]" {...getRootProps()} disabled={preparingAvatarPreview}>
                                                            <input {...getInputProps()} />
                                                            {preparingAvatarPreview ? "Uploading..." : "Upload"}
                                                        </button>
                                                )}
                                            </Dropzone>
                                            {avatarPreview !== "" &&
                                                <button className="flex justify-center items-center w-10 h-10 rounded-[5px] bg-button" onClick={deleteAvatar}>
                                                    <img src="/images/create/delete.svg" alt="" />
                                                </button>
                                            }
                                        </div>
                                        <DoppleCropModal fileUrl={avatarFileUrl} setFileUrl={setAvatarFileUrl} open={openAvatarModal} setOpen={setOpenAvatarModal} setPreview={setAvatarPreview} setPreparingPreview={setPreparingAvatarPreview} />
                                    </div>
                                </div>
                                <div className="flex items-center flex-1 w-full sm2:w-0 space-x-[30px] sm2:space-x-[10px]">
                                    <div className={"flex justify-center items-center w-[150px] h-[100px] sm2:w-[156px] sm2:h-[100px] border bg-inputback rounded-[9.75px] md:rounded-[6.25px]" + (validBanner === 0 ? " border-red2" : " border-button")}>
                                        {bannerPreview !== "" && bannerPreview !== "data:," ?
                                            <img className="rounded-[5px] w-full h-full object-cover" src={bannerPreview} alt="" />
                                            :
                                            <img className="w-[58px] h-[58px] md:w-[78px] md:h-[78px] sm2:w-auto sm2:h-auto" src="/images/create/blank-banner.svg" alt="" />
                                        }
                                    </div>
                                    <div className="flex flex-col items-center sm2:items-start space-y-[10px]">
                                        <span className="font-bold text-[16px] leading-[19px]">Upload Banner Image</span>
                                        <span className="text-subtext text-[12px] leading-[14px] max-w-[172px] truncate">
                                            {bannerPreview !== "" ? bannerFileName : "Max 4 MB, 1240x812 px"}
                                        </span>
                                        <div className="flex space-x-[10px]">
                                            <Dropzone maxFiles={1} accept={["image/*"]} onDrop={(acceptedFiles) => dropHandler(acceptedFiles, 1)}>
                                                {({ getRootProps, getInputProps }) => (
                                                    bannerPreview !== "" ?
                                                        <button className="flex justify-center items-center w-10 h-10 rounded-[5px] bg-button" {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <img src="/images/create/edit.svg" alt="" />
                                                        </button>
                                                        :
                                                        <button className="bg-button rounded-[5px] w-[172px] h-10 font-bold text-[14px] leading-[17px]" {...getRootProps()} disabled={preparingBannerPreview}>
                                                            <input {...getInputProps()} />
                                                            {preparingBannerPreview ? "Uploading..." : "Upload"}
                                                        </button>
                                                )}
                                            </Dropzone>
                                            {bannerPreview !== "" &&
                                                <button className="flex justify-center items-center w-10 h-10 rounded-[5px] bg-button" onClick={deleteBanner}>
                                                    <img src="/images/create/delete.svg" alt="" />
                                                </button>
                                            }
                                        </div>
                                        {bannerFile &&
                                            <BannerCropModal imageToCrop={URL.createObjectURL(bannerFile)} fileUrl={bannerFileUrl} setFileUrl={setBannerFileUrl} open={openBannerModal} setOpen={setOpenBannerModal} setPreview={setBannerPreview} setPreparingPreview={setPreparingBannerPreview} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <span className="mt-5 font-bold text-[16px] leading-[19px]">Dopple Bio</span>
                            <div className={"flex p-[15px] rounded-[5px] border bg-inputback mt-[10px] relative" + ((bio?.length < 30 || validBio === 0) ? " border-red2" : " border-button")}>
                                <textarea className="placeholder-[#484E54] w-full min-h-[100px] md:min-h-[100px] resize-none text-[14px] leading-[17px]" placeholder="I'm your go-to gnome from 'Blue Sky', crafting wonders as clouds drift by. Married to Betsy and with hammer in hand, I build dreams in the sky's vast land." value={bio} onChange={handleChangeBio} maxLength={300} />
                                {(bio?.length < 30 || validBio === 0) && <span className="absolute bottom-[calc(100%+10px)] right-0 text-red1 text-[12px] leading-[14px]">Minimum 30 characters</span>}
                                {(bio === undefined || bio.length >= 30) && validBio !== 0 &&
                                    <span className="absolute bottom-[calc(100%+10px)] right-[10px] text-black4 text-[12px] leading-[15px]">{bio?.length ?? 0}/300 characters</span>
                                }
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                                <div className="flex flex-col space-y-[10px]">
                                    <span className="font-bold text-[16px] leading-[19px]">Category</span>
                                    <button className="relative" onClick={() => setOpenCategory(!openCategory)}>
                                        <div className={"flex justify-between items-center space-x-[11px] px-[15px] h-[50px] border text-black4 text-[14px] leading-[17px] rounded-[5px] relative z-[9]" + (validCategory === 0 ? " border-red2" : " border-button") + (openCategory ? " bg-[#111215]" : " bg-[#111215]")}>
                                            {category >= 0 ?
                                                <div className="flex items-center space-x-[5px] text-white">
                                                    <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                        <img src={categories[category].image} alt="" />
                                                    </div>
                                                    <span className="font-bold text-[14px] leading-[17px]">{categories[category].name}</span>
                                                </div>
                                                :
                                                <span>Select</span>
                                            }
                                            <img className={openCategory ? "rotate-[180deg] transition" : "transition"} src="/images/explore/arrow-down.svg" alt="" />
                                        </div>
                                        {openCategory &&
                                            <div className="flex flex-col space-y-[5px] absolute top-0 left-0 w-full pt-[60px] pb-[10px] border border-button bg-[#111215] rounded-[5px] z-[8] shadow-lg4">
                                                {categories.map((x, i) =>
                                                    <button key={i} className="flex items-center space-x-[5px] px-[15px] py-[5px] hover:bg-black5" onClick={() => setCategory(i)}>
                                                        <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                            <img src={x.image} alt="" />
                                                        </div>
                                                        <span className="font-semibold text-[14px] leading-[17px]">{x.name}</span>
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </button>
                                </div>
                                <div className="flex flex-col space-y-[10px]">
                                    <span className="font-bold text-[16px] leading-[19px]">Subcategory</span>
                                    <button className="relative" onClick={() => setOpenSubCategory(!openSubCategory)}>
                                        <div className={"flex justify-between items-center space-x-[11px] px-[15px] h-[50px] border text-black4 text-[14px] leading-[17px] rounded-[5px] relative z-[7]" + (validSubCategory === 0 ? " border-red2" : " border-button") + (openSubCategory ? " bg-[#111215]" : " bg-[#111215]")}>
                                            {subCategory >= 0 ?
                                                <div className="flex items-center space-x-[5px] text-white">
                                                    <span className="font-bold text-[14px] leading-[17px]">{subcategories[category][subCategory]}</span>
                                                </div>
                                                :
                                                <span>Select</span>
                                            }
                                            <img className={openSubCategory ? "rotate-[180deg] transition" : "transition"} src="/images/explore/arrow-down.svg" alt="" />
                                        </div>
                                        {openSubCategory && category >= 0 &&
                                            <div className="flex flex-col space-y-[5px] absolute top-0 left-0 w-full pt-[60px] pb-[10px] border border-button bg-[#111215] rounded-[5px] z-[6] shadow-lg4">
                                                {subcategories[category].map((x, i) =>
                                                    <button key={i} className="flex items-center space-x-[5px] px-[15px] py-[11.5px] hover:bg-black5" onClick={() => setSubCategory(i)}>
                                                        <span className="font-semibold text-[14px] leading-[17px]">{x}</span>
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </button>
                                </div>
                                <div className="flex flex-col space-y-[10px]">
                                    <span className="font-bold text-[16px] leading-[19px]">Content Rating</span>
                                    <button className="relative" onClick={() => setOpenRating(!openRating)}>
                                        <div className={"flex justify-between items-center space-x-[11px] px-[15px] h-[50px] border text-black4 text-[14px] leading-[17px] rounded-[5px] relative z-[5]" + (validVisibility === 0 ? " border-red2" : " border-button" + (openRating ? " bg-[#111215]" : " bg-[#111215]"))}>
                                            {rating >= 0 ?
                                                <div className="flex items-center space-x-[5px] text-white">
                                                    <span className="font-bold text-[14px] leading-[17px]">{ratings[rating]}</span>
                                                </div>
                                                :
                                                <span>Select</span>
                                            }
                                            <img className={openRating ? "rotate-[180deg] transition" : "transition"} src="/images/explore/arrow-down.svg" alt="" />
                                        </div>
                                        {openRating &&
                                            <div className="flex flex-col space-y-[5px] absolute top-0 left-0 w-full pt-[60px] pb-[10px] border border-button bg-[#111215] rounded-[5px] z-[4] shadow-lg4">
                                                {ratings.map((x, i) =>
                                                    <button key={i} className="flex items-center space-x-[5px] px-[15px] py-[11.5px] hover:bg-black5" onClick={() => setRating(i)}>
                                                        <span className="font-semibold text-[14px] leading-[17px]">{x}</span>
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </button>
                                </div>
                                <div />
                                {/* <div className="flex flex-col space-y-[10px]">
                                    <span className="font-bold text-[16px] leading-[19px]">Public / Unlisted</span>
                                    <button className="relative" onClick={() => setOpenVisibility(!openVisibility)}>
                                        <div className={"flex justify-between items-center space-x-[11px] px-[15px] h-[50px] border text-black4 text-[14px] leading-[17px] rounded-[5px] relative z-[3]" + (validVisibility === 0 ? " border-red2" : " border-button" + (openVisibility ? " bg-[#111215]" : " bg-[#111215]"))}>
                                            {visibility >= 0 ?
                                                <div className="flex items-center space-x-[5px] text-white">
                                                    <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                        <img src={visibilities[visibility].image} alt="" />
                                                    </div>
                                                    <span className="font-bold text-[14px] leading-[17px]">{visibilities[visibility].name}</span>
                                                </div>
                                                :
                                                <span>Select</span>
                                            }
                                            <img className={openVisibility ? "rotate-[180deg] transition" : "transition"} src="/images/explore/arrow-down.svg" alt="" />
                                        </div>
                                        {openVisibility &&
                                            <div className="flex flex-col space-y-[5px] absolute top-0 left-0 w-full pt-[60px] pb-[10px] border border-button bg-[#111215] rounded-[5px] font-semibold text-[14px] leading-[17px] z-[2] shadow-lg4">
                                                {visibilities.map((x, i) =>
                                                    <button key={i} className={"items-center space-x-[5px] px-[15px] py-[5px] hover:bg-black5 text-left" + ((step === 1 && i === 2) ? " hidden" : " flex")} onClick={() => setVisibility(i)}>
                                                        <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                            <img src={x.image} alt="" />
                                                        </div>
                                                        <span className="font-semibold text-[14px] leading-[17px]">{x.name}</span>
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </button>
                                </div> */}
                            </div>
                            <button className="flex justify-center items-center space-x-[10px] px-5 w-[170px] h-[50px] min-h-[50px] font-semibold text-[14px] leading-[17px] bg-blue2 rounded-[5px] mt-[30px] self-end disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setStep(2)} disabled={!(validName === 1 && validTagLine === 1 && validBio === 1 && category >= 0 && subCategory >= 0 && rating >= 0 && visibility >= 0 && avatarPreview?.length > 0 && avatarPreview !== "data:," && bannerPreview?.length > 0 && bannerPreview !== "data:," && !_checkBlackList(name) && !_checkBlackList(tagLine) && !_checkBlackList(bio))}>
                                <span>Continue</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                                    <path d="M1.52393 11.4531L6.47632 6.50073L1.52393 1.54834" stroke="white" strokeWidth="1.6" />
                                </svg>
                            </button>
                        </>
                    }

                    {/* Step2 */}
                    {step === 2 &&
                        <>
                            <span className="font-semibold text-[16px] leading-[19px]">
                                Greeting
                                <span className="text-[14px] leading-[17px] text-subtext"> (Optional)</span>
                            </span>
                            <span className="mt-[7px] font-medium text-[14px] leading-[17px] text-subtext">This is the first message your Dopple will send to a new chat user.</span>
                            <div className={"flex px-[15px] h-[50px] rounded-[5px] border bg-inputback text-[14px] leading-[17px] mt-[10px] relative border-button"}>
                                <input className="placeholder-[#484E54] w-full" placeholder='Joe Shmoe, the vibrant blue gnome from the show "Blue Sky", resides in the heavens, crafting.' value={greeting} onChange={handleChangeGreeting} maxLength={100} />
                                {(greeting === undefined || greeting.length > 0) &&
                                    <span className="absolute bottom-[calc(100%+10px)] right-[10px] text-black4 text-[12px] leading-[15px]">{greeting?.length ?? 0}/100 characters</span>
                                }
                            </div>
                            <span className="mt-5 font-bold text-[16px] leading-[19px]">Dopple Description</span>
                            <div className={"flex p-[15px] rounded-[5px] border bg-inputback mt-[10px] relative" + ((description?.length < 100 || validDescription === 0) ? " border-red2" : " border-button")}>
                                <textarea className="placeholder-[#484E54] w-full min-h-[100px] md:min-h-[100px] resize-none text-[14px] leading-[17px]" placeholder='Joe Shmoe, the vibrant blue gnome from the show "Blue Sky", resides in the heavens, crafting intricate cloud-wood structures as a skilled carpenter. Married to the charming gnome Betsy, the duo creates ethereal wonders amidst the skies. Together, their airborne tales and carpentry marvels are legendary among the cloud-dwelling community.' value={description} onChange={handleChangeDescription} maxLength={1000} />
                                {(description?.length < 100 || validDescription === 0) && <span className="absolute bottom-[calc(100%+10px)] right-0 text-red1 text-[12px] leading-[14px]">Minimum 100 characters</span>}
                                {(description === undefined || description.length >= 100) && validDescription !== 0 &&
                                    <span className="absolute bottom-[calc(100%+10px)] right-[10px] text-black4 text-[12px] leading-[15px]">{description?.length ?? 0}/1000 characters</span>
                                }
                            </div>
                            <div className="flex flex-col mt-5">
                                <span className="font-bold text-[16px] leading-[19px] relative">
                                    Sample Conversation
                                    <span className="text-[12px] leading-[14px] text-subtext"> (Optional)</span>
                                    {textValues.filter(x => x.length > 0).length < 4 && validSampleConversation === 0 &&
                                        <span className="absolute bottom-0 right-0 font-normal text-red1 text-[10px] tiny:text-[12px] leading-[12px] tiny:leading-[14px]">Minimum 4 message samples.</span>
                                    }
                                </span>
                                <span className="mt-[5px] text-subtext font-medium text-[14px] leading-[17px]">Write example conversations to train your Dopple how to speak.</span>
                                <SampleConversation
                                    avatarPreview={avatarPreview}
                                    textValues={textValues} setTextValues={setTextValues}
                                    validSampleConversation={validSampleConversation} setValidSampleConversation={setValidSampleConversation}
                                />
                            </div>
                            <div className="flex flex-col mt-5">
                                <span className="font-bold text-[16px] leading-[19px]">
                                    Add Voice
                                    <span className="text-[12px] leading-[14px] text-subtext"> (Optional)</span>
                                </span>
                                <span className="mt-[5px] text-subtext text-[14px] leading-[17px]">Add description text saying "Upload audio samples to give your Dopple a voice</span>
                                <Voice />
                            </div>
                            <div className="flex justify-between mt-[30px]">
                                <button className="flex justify-center items-center space-x-[10px] px-5 w-[170px] h-[50px] min-h-[50px] font-semibold text-[14px] leading-[17px] bg-button rounded-[5px] self-end" onClick={() => setStep(1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path d="M6.97607 10.9521L2.02368 5.99976L6.97607 1.04736" stroke="white" strokeWidth="1.6" />
                                    </svg>
                                    <span>Back</span>
                                </button>
                                <button className="flex justify-center items-center space-x-[10px] px-5 w-[170px] h-[50px] min-h-[50px] font-semibold text-[14px] leading-[17px] bg-blue2 rounded-[5px] self-end disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setStep(3)} disabled={!(validDescription === 1 && !_checkBlackList(greeting) && !_checkBlackList(description))}>
                                    <span>Continue</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                                        <path d="M1.52393 11.4531L6.47632 6.50073L1.52393 1.54834" stroke="white" strokeWidth="1.6" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    }

                    {/* Step3 */}
                    {step === 3 &&
                        <>
                            <div className="flex flex-col space-y-[10px]">
                                <span className="font-bold text-[16px] leading-[19px]">Visibility</span>
                                <button className="relative" onClick={() => setOpenVisibility(!openVisibility)}>
                                    <div className={"flex justify-between items-center space-x-[11px] px-[15px] h-[50px] border text-black4 text-[14px] leading-[17px] rounded-[5px] relative z-[3]" + (validVisibility === 0 ? " border-red2" : " border-button" + (openVisibility ? " bg-[#111215]" : " bg-[#111215]"))}>
                                        {visibility >= 0 ?
                                            <div className="flex items-center space-x-[5px] text-white">
                                                <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                    <img src={visibilities[visibility].image} alt="" />
                                                </div>
                                                <span className="font-bold text-[14px] leading-[17px]">{visibilities[visibility].name}</span>
                                            </div>
                                            :
                                            <div className="flex items-center space-x-[10px] text-[14px] leading-[17px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.32316 13.8311C14.8074 13.8311 18.6463 7.25 18.6463 7.25C18.6463 7.25 15.3558 0.668945 9.32316 0.668945C3.29053 0.668945 0 7.25 0 7.25C0 7.25 3.83895 13.8311 9.32316 13.8311ZM9.32316 11.0886C11.4434 11.0886 13.1621 9.36989 13.1621 7.24969C13.1621 5.1295 11.4434 3.41075 9.32316 3.41075C7.20297 3.41075 5.48421 5.1295 5.48421 7.24969C5.48421 9.36989 7.20297 11.0886 9.32316 11.0886Z" fill="#D9D9D9" />
                                                </svg>
                                                <span className="text-white">Your Gnome From Above</span>
                                            </div>
                                        }
                                        <img className={openVisibility ? "rotate-[180deg] transition" : "transition"} src="/images/explore/arrow-down.svg" alt="" />
                                    </div>
                                    {openVisibility &&
                                        <div className="flex flex-col space-y-[5px] absolute top-0 left-0 w-full pt-[60px] pb-[10px] border border-button bg-[#111215] rounded-[5px] font-semibold text-[14px] leading-[17px] z-[2] shadow-lg4">
                                            {visibilities.map((x, i) =>
                                                <button key={i} className="flex items-center space-x-[5px] px-[15px] py-[5px] hover:bg-black5 text-left" onClick={() => setVisibility(i)}>
                                                    <div className="flex justify-center items-center bg-blue2 w-[25px] h-[25px] px-[4.5px] py-[4.94px] rounded-full">
                                                        <img src={x.image} alt="" />
                                                    </div>
                                                    <span className="font-semibold text-[14px] leading-[17px]">{x.name}</span>
                                                </button>
                                            )}
                                        </div>
                                    }
                                </button>
                            </div>
                            <div className="flex flex-col space-y-[15px] px-[15px] py-[30px] rounded-[10px] bg-nav-desktop mt-[30px]">
                                <span className="font-bold text-[22px] leading-[26px]">Share Dopple Link:</span>
                                {bannerPreview &&
                                    <div className="h-[321px]">
                                        <img className="w-full h-full object-cover" src={bannerPreview} alt="" />
                                    </div>
                                }
                                <div className="flex space-x-[10px]">
                                    <div className="flex-1 bg-button rounded-[5px] min-h-[50px] px-[15px] py-4 font-bold text-[14px] leading-[17px]">
                                        dopple.ai/ruby-rose-245
                                    </div>
                                    <button className="flex justify-center items-center bg-blue2 w-[50px] h-[50px] rounded-[5px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                            <path d="M21.147 0.5H7.6167V5.26538H16.3811V14.0303H21.147V0.5Z" fill="white" />
                                            <path d="M0.853027 7.26514H14.3833V20.7954H0.853027V7.26514Z" fill="white" />
                                        </svg>
                                    </button>
                                    <button className="flex justify-center items-center bg-blue2 w-[50px] h-[50px] rounded-[5px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                            <path d="M12.1855 16.0481L6.80689 13.1146C6.2906 13.6271 5.63414 13.9752 4.92026 14.1152C4.20639 14.2551 3.46706 14.1806 2.79548 13.9009C2.12391 13.6213 1.55016 13.1491 1.14656 12.5439C0.742963 11.9386 0.527588 11.2275 0.527588 10.5C0.527588 9.77254 0.742963 9.06136 1.14656 8.45612C1.55016 7.85089 2.12391 7.37869 2.79548 7.09906C3.46706 6.81943 4.20639 6.74489 4.92026 6.88483C5.63414 7.02477 6.2906 7.37294 6.80689 7.88543L12.1855 4.95193C12.001 4.08644 12.1343 3.18347 12.5608 2.40815C12.9874 1.63282 13.6788 1.03695 14.5086 0.729493C15.3384 0.422041 16.2512 0.423555 17.0799 0.733759C17.9087 1.04396 18.5981 1.64213 19.0221 2.41886C19.4461 3.1956 19.5764 4.09901 19.389 4.96388C19.2017 5.82875 18.7093 6.59729 18.0019 7.12895C17.2945 7.66061 16.4193 7.91987 15.5365 7.85932C14.6536 7.79877 13.8221 7.42245 13.1939 6.79918L7.81525 9.73268C7.92239 10.2383 7.92239 10.7607 7.81525 11.2663L13.1939 14.2008C13.8221 13.5776 14.6536 13.2012 15.5365 13.1407C16.4193 13.0801 17.2945 13.3394 18.0019 13.8711C18.7093 14.4027 19.2017 15.1713 19.389 16.0361C19.5764 16.901 19.4461 17.8044 19.0221 18.5811C18.5981 19.3579 17.9087 19.956 17.0799 20.2662C16.2512 20.5764 15.3384 20.578 14.5086 20.2705C13.6788 19.9631 12.9874 19.3672 12.5608 18.5919C12.1343 17.8165 12.001 16.9136 12.1855 16.0481Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start space-x-[11px] mt-[30px]">
                                <button className={"flex justify-center items-center min-w-[20px] h-[20px] bg-transparent border rounded-[5px]" + (validAccept === 0 ? " border-red2" : " border-button")} onClick={() => setAccept(!accept)}>
                                    {accept &&
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 3.14286L4.6 7L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                </button>
                                <div className="text-[14px] leading-[17px]">
                                    By publishing your Dopple, you agree to our Dopple creation
                                    <button className="text-blue2">{"\u00a0"}Terms and Conditions</button>
                                    , as well as our privacy policy and disclaimers.
                                </div>
                            </div>
                            <div className="flex justify-between mt-[30px]">
                                <button className="flex justify-center items-center space-x-[10px] px-5 w-[170px] h-[50px] min-h-[50px] font-semibold text-[14px] leading-[17px] bg-button rounded-[5px] self-end" onClick={() => setStep(2)}>
                                    <span>Back</span>
                                </button>
                                <button className="flex justify-center items-center space-x-[10px] px-5 w-[170px] h-[50px] min-h-[50px] font-semibold text-[14px] leading-[17px] bg-blue2 rounded-[5px] self-end disabled:opacity-50 disabled:cursor-not-allowed" onClick={create} disabled={!(accept)}>
                                    <span>Continue</span>
                                </button>
                            </div>
                        </>
                    }
                    <Snackbar open={openAlert} autoHideDuration={5000} onClose={closeAlert} TransitionComponent={SlideTransition}
                        id="blacklist-snack"
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <div className="flex items-start md:items-center space-x-[10px] p-5 bg-[rgba(233,49,49,.2)] border border-red2 backdrop-blur-[10px] rounded-[10px] relative">
                            <svg className="min-w-[35px] min-h-[35px]" xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
                                <path d="M17.5 2.6875C9.07812 2.6875 2.1875 9.57812 2.1875 18C2.1875 26.4219 9.07812 33.3125 17.5 33.3125C25.9219 33.3125 32.8125 26.4219 32.8125 18C32.8125 9.57812 25.9219 2.6875 17.5 2.6875ZM16.2969 9.25H18.7031V21.2812H16.2969V9.25ZM17.5 27.8438C16.625 27.8438 15.8594 27.0781 15.8594 26.2031C15.8594 25.3281 16.625 24.5625 17.5 24.5625C18.375 24.5625 19.1406 25.3281 19.1406 26.2031C19.1406 27.0781 18.375 27.8438 17.5 27.8438Z" fill="#E93131" />
                            </svg>
                            <span className="break-words text-[16px] leading-[19px] tracking-[-0.8px] md:tracking-[unset]">Your provided bio contains a potentially sensitive word:{"\u00a0"}<span className="font-semibold">“{currentBlackword}”</span>. This might impact your Dopple's appearance in search results.</span>
                            <button className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red2 rounded-full p-2" onClick={() => setOpenAlert(false)}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                    <path d="M1 1L11 11M1 11L11 1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </Snackbar>
                </div>
                <ProfilePreview
                    name={name}
                    bio={bio}
                    tagLine={tagLine}
                    avatarPreview={avatarPreview}
                    bannerPreview={bannerPreview}
                />
            </div>
        </>
    );
};

export default Create;