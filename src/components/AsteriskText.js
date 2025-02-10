import { useContext } from "react";
import { RefContext } from "../contexts/RefContextProvider";

const AsteriskText = ({ text, sender }) => {
    const { themeID } = useContext(RefContext);
    var bold = /\*(.*?)\*/gm;
    const getTextColors = () => {
        if (sender === "ai") {
            if (themeID === 0) return "text-subtext"
            if (themeID === 1) return "text-subtextlight"
            if (themeID === 2) return "text-[#9D8A8A]"
            if (themeID === 3) return "text-galaxysubtext"
        }
        if (sender === "human") {
            if (themeID === 0) return "text-[#B2E8FF]"
            if (themeID === 1) return "text-[#B2E8FF]"
            if (themeID === 2) return "text-[#FFD7D7]"
            if (themeID === 3) return "text-[#ADB5FF]"
        }
    }
    var html = text?.replace(bold, `<span class="italic ${getTextColors()} font-semibold">$1</span>`);
    return (
        <span dangerouslySetInnerHTML={{ __html: html }} />
    );
    // return text;
}

export default AsteriskText;