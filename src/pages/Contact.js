import { ClickAwayListener } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { RefContext } from "../contexts/RefContextProvider"
import { topicItems, topicKeys } from "../config"
import { validateEmail } from "../utilities/format"
import axios from "../utilities/axiosConfig";
import originalAxios from "axios";
import ReCAPTCHA from "react-google-recaptcha"

const Contact = () => {
    const { setOpenMessageSentModal } = useContext(RefContext)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [message, setMessage] = useState()
    const [validFirstName, setValidFirstName] = useState(-1)
    const [validLastName, setValidLastName] = useState(-1)
    const [validEmail, setValidEmail] = useState(-1)
    const [validMessage, setValidMessage] = useState(-1)
    const [openTopic, setOpenTopic] = useState(false)
    const [topic, setTopic] = useState(-1)
    const [sending, setSending] = useState(false);
    const [passToken ,setPassToken] = useState("");

    const send = async () => {
        if (firstName?.length > 0 && lastName?.length > 0 && email?.length > 0 && message?.length > 0 && topic >= 0 && !sending && passToken.length > 0) {
            setSending(true)
            try {
                const { data: { ip } } = await originalAxios.get("https://api.ipify.org/?format=json");
                console.log(firstName, lastName, email, phoneNumber, message, ip)
                const { data: { success } } = await axios.post("/contact", {
                    firstName, lastName, email, phoneNumber, message, ip, topic: topicKeys[topic]
                })
                if (success) setOpenMessageSentModal(true)
            } catch (e) {
                console.log(e)
            }
            setSending(false)
        }
    }

    useMemo(() => {
        setValidFirstName(firstName ? firstName.length > 0 ? 1 : 0 : -1)
        setValidLastName(lastName ? lastName.length > 0 ? 1 : 0 : -1)
        setValidEmail(email ? email.length > 0 ? (validateEmail(email) ? 1 : 0) : 0 : -1)
        setValidMessage(message ? message.length > 0 ? 1 : 0 : -1)
    }, [firstName, lastName, email, message])

    return (
        <div className="flex flex-col xl:flex-row justify-between space-y-7 xl:space-x-[88px] xl:space-y-0 max-w-[1320px] w-full mx-auto mt-[18px] md:mt-[90px] mb-[49px] md:mb-[101px] px-5 md:px-[85px]">
            <div className="flex flex-col justify-between mb-[10px] xl:mb-0">
                <div className="flex flex-col space-y-[5px] md:space-y-[29px]">
                    <span className="font-semibold text-[40px] md:text-[60px] leading-[44px] md:leading-[64px]">Contact the<br />Dopple Team</span>
                    <span className="text-[14px] leading-[26px] text-candysubtext">Get in touch with a Dopple team member. We try to answer messages with 24 hours.</span>
                </div>
            </div>
            <div className="flex flex-col px-[15px] md:px-[34px] py-[33px] md:pt-[44px] md:pb-[79px] bg-nav border border-button">
                <div className="flex flex-col md:flex-row space-y-[13px] md:space-x-3 md:space-y-0">
                    <div className="flex flex-col space-y-3 flex-1">
                        <span className={"font-medium text-[14px] leading-[17px]" + ((firstName === "" || validFirstName === 0) ? " text-red2" : " text-candysubtext")}>First Name*</span>
                        <div className={"flex px-[14px] w-full xl:w-[238px] h-10 rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative focus-within:border-white" + ((firstName === "" || validFirstName === 0) ? " border-red2" : " border-button")}>
                            <input className="placeholder-[#474C52] w-full" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={30} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 flex-1">
                        <span className={"font-medium text-[14px] leading-[17px]" + ((lastName === "" || validLastName === 0) ? " text-red2" : " text-candysubtext")}>Last Name*</span>
                        <div className={"flex px-[14px] w-full xl:w-[238px] h-10 rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative focus-within:border-white" + ((lastName === "" || validLastName === 0) ? " border-red2" : " border-button")}>
                            <input className="placeholder-[#474C52] w-full" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={30} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-[13px] md:space-x-3 md:space-y-0 mt-[18px]">
                    <div className="flex flex-col space-y-3 flex-1">
                        <span className={"font-medium text-[14px] leading-[17px]" + ((email === "" || validEmail === 0) ? " text-red2" : " text-candysubtext")}>Your Email*</span>
                        <div className={"flex px-[14px] w-full xl:w-[238px] h-10 rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative focus-within:border-white" + ((email === "" || validEmail === 0) ? " border-red2" : " border-button")}>
                            <input className="placeholder-[#474C52] w-full" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={30} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 flex-1">
                        <span className={"font-medium text-[14px] leading-[17px] text-candysubtext"}>Phone Number</span>
                        <div className={"flex px-[14px] w-full xl:w-[238px] h-10 rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative focus-within:border-white border-button"}>
                            <input className="placeholder-[#474C52] w-full" placeholder="(888) 888-8888" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} maxLength={30} onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3 mt-[18px]">
                    <div className="flex flex-col space-y-3 w-full">
                        <span className="font-medium text-[14px] leading-[17px] text-candysubtext">Message Topic*</span>
                        <ClickAwayListener onClickAway={() => setOpenTopic(false)}>
                            <div className={"flex items-center px-[14px] w-full h-10 rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative border-button cursor-pointer"} onClick={() => setOpenTopic(!openTopic)}>
                                <span className="flex-1">
                                    {topic >= 0 ? topicItems[topic] : "--select one--"}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17 10L12 15L7 10" stroke="#474C52" strokeLinecap="round" />
                                </svg>

                                {openTopic &&
                                    <div className="absolute top-[98%] left-0 w-full px-[14px] bg-[#131316] border-b border-l border-r border-button rounded-bl-[5px] rounded-br-[5px] z-[1]">
                                        <div className="w-full h-[1px] bg-button" />
                                        <div className="pt-3 pb-[9px]">
                                            <div className="flex flex-col items-start">
                                                {topicItems.map((x, i) =>
                                                    <button key={i} className="flex items-center space-x-2 w-full transition-all hover:bg-button" onClick={() => setTopic(i)}>
                                                        <div className="w-1 h-1 bg-white rounded-full ml-2" />
                                                        <span className="font-medium text-[14px] leading-[40px]">{x}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
                <div className="flex space-x-3 mt-[18px]">
                    <div className="flex flex-col space-y-3 w-full">
                        <span className={"font-medium text-[14px] leading-[17px]" + ((message === "" || validMessage === 0) ? " text-red2" : " text-candysubtext")}>Your Message*</span>
                        <div className={"flex px-[14px] py-4 w-full h-[85px] rounded-[5px] border bg-[#131316] text-[14px] leading-[17px] mt-[10px] relative focus-within:border-white" + ((message === "" || validMessage === 0) ? " border-red2" : " border-button")}>
                            <textarea className="resize-none placeholder-[#474C52] w-full" placeholder="Write message here.." value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-[18px]">
                    <ReCAPTCHA
                        sitekey={"6Ld_vZgoAAAAALCDhSl8UqxdHF0ysVAUSW_39RGH"}
                        onChange={v => setPassToken(v)}
                    />
                </div>
                <button className="flex justify-center items-center bg-blue2 mt-[31px] w-full h-[45px] font-bold text-[14px] leading-[17px] relative rounded-[5px] disabled:bg-button disabled:text-subtext" onClick={send} disabled={!(validFirstName === 1 && validLastName === 1 && validEmail === 1 && topic >= 0 && validMessage === 1 && !sending && passToken?.length > 0)}>
                    {sending ?
                        <div className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                <circle cx='60' cy='60' r='50' />
                            </svg>
                        </div>
                        :
                        "Send Message"
                    }
                </button>
                <span className="font-medium text-[12px] leading-[14px] text-[#66676B] text-center mt-[27px]">
                    We process your information in accordance with our&nbsp;
                    <Link to="/privacy" className="text-[#D1D5BA]">Privacy Policy</Link>
                </span>
            </div>
        </div>
    )
}

export default Contact;