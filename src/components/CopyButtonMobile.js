import { useState } from "react";
import { copyCode } from "../utilities/format";

const CopyButtonMobile = ({ txt, themeID }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        setCopied(true)
        copyCode(txt)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-subtext" : themeID === 2 ? " bg-candybutton text-candybuttonmenu" : themeID === 3 ? " bg-galaxybutton text-galaxysubtext" : "")} onClick={copy}>
            {copied ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 11" fill="currentColor">
                    <path d="M5.25077 7.25896L1.74985 3.63012L0 5.44454L5.25077 10.8891L14 1.8157L12.2514 0L5.25077 7.25896Z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                    <path d="M11.2914 0.889404H4.38848V3.82199H11.2914V0.889404Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.04563 2.35558H0.210938V17.111H15.4689V2.35558H12.6195V5.23034H3.04563V2.35558ZM4.09474 9.8595H11.3933V8.44955H4.09474V9.8595ZM5.36149 13.0018H10.1265V11.5919H5.36149V13.0018Z" />
                </svg>
            }
        </button>
    )
}

export default CopyButtonMobile;