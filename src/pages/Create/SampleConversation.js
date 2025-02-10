import { Fragment, useState } from "react"
import { Collapse } from "@mui/material";

const SampleConversation = ({ avatarPreview, textValues, setTextValues, validSampleConversation, setValidSampleConversation }) => {

    const [openConversation, setOpenConversation] = useState(false)

    const setValue = (i, text) => {
        let tmp = [...textValues]
        tmp[i] = text
        if (tmp.filter(x => x.length > 0).length < 4)
            setValidSampleConversation(0)
        else
            setValidSampleConversation(1)
        setTextValues(tmp)
    }

    const keydown = (e, i) => {
        if (e.key === 'Enter') {
            if (textValues.length - 1 > i)
                document.querySelectorAll(".single-line")[i + 1].focus()
        }
    }

    const addNewText = () => {
        let tmp = [...textValues]
        tmp.push("");
        setTextValues(tmp)
    }

    const removeText = (i) => {
        let tmp = [...textValues]
        tmp.splice(i, 1)
        setTextValues(tmp)
    }

    return (
        <div className="mt-[10px] p-[15px] rounded-[5px] bg-inputback border border-button">
            <button className="flex justify-between items-center space-x-[10px] w-full" onClick={() => setOpenConversation(!openConversation)}>
                <div className="flex flex-col items-start space-y-[5px]">
                    <span className="font-semibold text-[16px] leading-[19px]">Conversation</span>
                    <span className="text-[14px] leading-[17px] text-subtext text-left">Write example Dopple and User conversation below.</span>
                </div>
                <svg className={!openConversation ? "rotate-[180deg]" : ''} xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1.09521 6.47656L6.04761 1.52417L11 6.47656" stroke="#848D97" strokeWidth="1.6" />
                </svg>
            </button>
            <Collapse in={openConversation}>
                <div className={"flex flex-col space-y-[10px] sample-conversation mt-[15px]" + (textValues.filter(x => x.length > 0).length < 4 && validSampleConversation === 0 ? " border-red2" : " border-button")}>
                    {textValues.map((x, i) =>
                        <Fragment key={i}>
                            {i % 2 === 0 ?
                                <div className="flex items-end space-x-[10px]">
                                    <div className="flex justify-center items-center w-[35px] h-[35px] bg-[#44AAFF] rounded-[5px] text-[8px] leading-[10px] tracking-[-0.4px]">
                                        USER
                                    </div>
                                    <span className="resize-none min-h-[41px] p-[10px] bg-blue2 border border-[#4AF] rounded-tl-[15px] rounded-tr-[20px] rounded-br-[20px] text-[16px] leading-[19px] min-w-[50px] outline-none single-line" role="inputbox" contentEditable value={x} onInput={e => setValue(i, e.currentTarget.textContent)} autoFocus onKeyDown={e => keydown(e, i)} />
                                    {(i === textValues.length - 1 || i === textValues.length - 2) && x.length === 0 &&
                                        <button className="flex justify-center items-center w-5 h-5 rounded-full border border-subtext self-center" onClick={() => removeText(i)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 2.00073L10 10.0007M2 10.0007L10 2.00073" stroke="#8A939D" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                                :
                                <div className="flex items-end space-x-[10px]">
                                    {avatarPreview ?
                                        <div className="flex justify-center items-center min-w-[35px] max-w-[35px] h-[35px] rounded-[5px] bg-button overflow-hidden">
                                            <img className={"w-full h-full object-cover"} src={avatarPreview} alt="" />
                                        </div>
                                        :
                                        <div className="flex justify-center items-center w-[35px] h-[35px] bg-[#363941] rounded-[5px] text-[8px] leading-[10px] tracking-[-0.4px]">
                                            DOPPLE
                                        </div>
                                    }
                                    <span className="resize-none min-h-[41px] p-[10px] bg-button border border-[#363941] rounded-tl-[15px] rounded-tr-[20px] rounded-br-[20px] text-[16px] leading-[19px] min-w-[50px] outline-none single-line" role="inputbox" contentEditable value={x} onInput={e => setValue(i, e.currentTarget.textContent)} autoFocus onKeyDown={e => keydown(e, i)} />
                                    {(i === textValues.length - 1 || i === textValues.length - 2) && x.length === 0 &&
                                        <button className="flex justify-center items-center w-5 h-5 rounded-full border border-subtext self-center" onClick={() => removeText(i)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 2.00073L10 10.0007M2 10.0007L10 2.00073" stroke="#8A939D" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            }
                        </Fragment>
                    )}
                    <button className="flex justify-center items-center w-fit min-w-[158px] min-h-[30px] bg-button text-blue2 text-[14px] leading-[17px] rounded-[5px]" onClick={addNewText}>Add New Message +</button>
                </div>
            </Collapse>
        </div>
    )
}

export default SampleConversation;