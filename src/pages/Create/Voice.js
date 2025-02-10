import { useState } from "react"
import { Collapse } from "@mui/material";

const Voice = () => {

    const [openVoicePanel, setOpenVoicePanel] = useState(false)

    return (
        <div className="mt-[10px] p-[15px] rounded-[5px] bg-inputback border border-button">
            <button className="flex justify-between items-center space-x-[10px] w-full" onClick={() => setOpenVoicePanel(!openVoicePanel)}>
                <div className="flex flex-col items-start space-y-[5px]">
                    <span className="font-semibold text-[16px] leading-[19px]">Voice Design</span>
                    <span className="text-[14px] leading-[17px] text-subtext text-left">Upload voice recordings or choose from pre-recorded voices.</span>
                </div>
                <svg className={!openVoicePanel ? "rotate-[180deg]" : ''} xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1.09521 6.47656L6.04761 1.52417L11 6.47656" stroke="#848D97" strokeWidth="1.6" />
                </svg>
            </button>
            <Collapse in={openVoicePanel}>
                <div className="flex flex-col justify-center items-center px-5 pb-[33px] mt-[30px] min-h-[168px] text-center">
                    <svg className="text-subtext" xmlns="http://www.w3.org/2000/svg" width="76" height="75" viewBox="0 0 76 75" fill="currentColor">
                        <path d="M62.1699 33.2527C62.1699 32.9304 61.9062 32.6667 61.584 32.6667H57.1895C56.8672 32.6667 56.6035 32.9304 56.6035 33.2527C56.6035 43.5286 48.2759 51.8562 38 51.8562C27.7241 51.8562 19.3965 43.5286 19.3965 33.2527C19.3965 32.9304 19.1328 32.6667 18.8105 32.6667H14.416C14.0938 32.6667 13.8301 32.9304 13.8301 33.2527C13.8301 45.6086 23.1025 55.804 35.0703 57.2468V64.7468H24.4282C23.4248 64.7468 22.6191 65.7942 22.6191 67.0906V69.7273C22.6191 70.0496 22.8242 70.3132 23.0732 70.3132H52.9268C53.1758 70.3132 53.3809 70.0496 53.3809 69.7273V67.0906C53.3809 65.7942 52.5752 64.7468 51.5718 64.7468H40.6367V57.2834C52.7437 55.9651 62.1699 45.7112 62.1699 33.2527ZM38 45.7039C44.8774 45.7039 50.4512 40.196 50.4512 33.3992V16.9929C50.4512 10.196 44.8774 4.68823 38 4.68823C31.1226 4.68823 25.5488 10.196 25.5488 16.9929V33.3992C25.5488 40.196 31.1226 45.7039 38 45.7039ZM31.1152 16.9929C31.1152 13.2869 34.1841 10.2546 38 10.2546C41.8159 10.2546 44.8848 13.2869 44.8848 16.9929V33.3992C44.8848 37.1052 41.8159 40.1375 38 40.1375C34.1841 40.1375 31.1152 37.1052 31.1152 33.3992V16.9929Z" />
                        <path d="M56.5 15.3278V11.1528H63.3577V4.50146H67.5327V11.1528H74.4062V15.3278H67.5327V21.9791H63.3577V15.3278H56.5Z" />
                    </svg>
                    <span className="mt-[15px] text-subtext font-bold text-[18px] leading-[21px]">Click to upload a audio file or drag and drop</span>
                    <span className="mt-[5px] text-[#484E54] text-[16px] leading-[19px]">Upload up to 5 audio sample files. Audio file should be under 10MB</span>
                </div>
            </Collapse>
        </div>
    )
}

export default Voice;