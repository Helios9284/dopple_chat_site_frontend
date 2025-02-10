const Typing = ({ themeID }) => (
    <div className="typing">
        <div className={"typing__dot" + (themeID === 0 ? " bg-subtext" : themeID === 1 ? " bg-subtext" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-[#9277FF]" : "")}></div>
        <div className={"typing__dot" + (themeID === 0 ? " bg-subtext" : themeID === 1 ? " bg-subtext" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-[#9277FF]" : "")}></div>
        <div className={"typing__dot" + (themeID === 0 ? " bg-subtext" : themeID === 1 ? " bg-subtext" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-[#9277FF]" : "")}></div>
    </div>
)

export default Typing