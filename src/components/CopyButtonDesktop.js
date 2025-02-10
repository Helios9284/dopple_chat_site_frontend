import { useState } from "react";
import { copyCode } from "../utilities/format";

const CopyButtonDesktop = ({ txt, themeID }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        setCopied(true)
        copyCode(txt)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button className={"invisible group-hover:visible flex justify-center items-center w-[25px] h-[25px] rounded-[5px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-subtext" : themeID === 2 ? " text-candybuttonmenu" : themeID === 3 ? " text-galaxysubtext" : "")} onClick={copy}>
            {copied ?
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
                    <path d="M5.25077 7.25896L1.74985 3.63012L0 5.44454L5.25077 10.8891L14 1.8157L12.2514 0L5.25077 7.25896Z" />
                </svg>
                :
                (themeID === 0 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                        <path d="M11.2914 0.889404H4.38848V3.82199H11.2914V0.889404Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.04563 2.35558H0.210938V17.111H15.4689V2.35558H12.6195V5.23034H3.04563V2.35558ZM4.09474 9.8595H11.3933V8.44955H4.09474V9.8595ZM5.36149 13.0018H10.1265V11.5919H5.36149V13.0018Z" />
                    </svg>
                    :
                    themeID === 2 ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M14.1193 2.5H6.8807V5.39253H14.1193V2.5Z" fill="#FF8BA0" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.47255 3.94615H2.5V18.5H18.5V3.94615H15.512V6.78164H5.47255V3.94615ZM6.57267 11.3476H14.2261V9.95687H6.57267V11.3476ZM7.90103 14.447H12.8978V13.0563H7.90103V14.447Z" fill="#FF8BA0" />
                        </svg>
                        :
                        themeID === 3 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M14.1193 2.5H6.8807V5.39253H14.1193V2.5Z" fill="#8A939D" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.47255 3.94615H2.5V18.5H18.5V3.94615H15.512V6.78164H5.47255V3.94615ZM6.57267 11.3476H14.2261V9.95687H6.57267V11.3476ZM7.90103 14.447H12.8978V13.0563H7.90103V14.447Z" fill="#8A939D" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="currentColor">
                                <path d="M4.8099 3.02069H3.14323C2.7012 3.02069 2.27728 3.19629 1.96472 3.50886C1.65216 3.82142 1.47656 4.24535 1.47656 4.68739V14.6875C1.47656 15.1296 1.65216 15.5535 1.96472 15.8661C2.27728 16.1786 2.7012 16.3542 3.14323 16.3542H13.1432C13.5853 16.3542 14.0092 16.1786 14.3217 15.8661C14.6343 15.5535 14.8099 15.1296 14.8099 14.6875V4.68739C14.8099 4.24535 14.6343 3.82142 14.3217 3.50886C14.0092 3.19629 13.5853 3.02069 13.1432 3.02069H11.4766M4.8099 3.02069C4.8099 2.57866 4.98549 2.15473 5.29805 1.84217C5.61061 1.5296 6.03454 1.354 6.47656 1.354H9.8099C10.2519 1.354 10.6758 1.5296 10.9884 1.84217C11.301 2.15473 11.4766 2.57866 11.4766 3.02069M4.8099 3.02069C4.8099 3.46273 4.98549 3.88666 5.29805 4.19922C5.61061 4.51179 6.03454 4.68739 6.47656 4.68739H9.8099C10.2519 4.68739 10.6758 4.51179 10.9884 4.19922C11.301 3.88666 11.4766 3.46273 11.4766 3.02069" strokeWidth="1.66668" strokeLinecap="round" stroke-linejoin="round" />
                            </svg>
                )
            }
        </button>
    )
}

export default CopyButtonDesktop;