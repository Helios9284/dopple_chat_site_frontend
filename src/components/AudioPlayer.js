import { useRef, useState } from "react"

const AudioPlayer = ({ src, themeID }) => {
    let ref = useRef()
    const [time, setTime] = useState(0)
    const [ended, setEnded] = useState(false)
    const [playing, setPlaying] = useState(false)
    return (
        <div className={"flex items-center space-x-[10px] text-[14px] leading-[17px]" + (themeID === 0 ? " text-subtext" : themeID === 1 ? " text-title" : themeID === 2 ? " text-white" : themeID === 3 ? " text-subtext" : "")}>
            <audio ref={ref} src={src} type="audio" onTimeUpdate={e => setTime(Math.floor(e.target.currentTime))} onEnded={() => setEnded(true)} onPlaying={() => setPlaying(true)} />
            {!playing || ended ?
                <button onClick={() => { ref.current.play(); setEnded(false) }} className={themeID === 1 ? "text-blue2" : "text-white"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <path d="M13.7444 5.51497C14.1236 5.70652 14.4408 5.99248 14.662 6.3422C14.8831 6.69192 15 7.09222 15 7.50021C15 7.9082 14.8831 8.3085 14.662 8.65822C14.4408 9.00794 14.1236 9.2939 13.7444 9.48546L3.62933 14.7107C2.00059 15.5522 0 14.4572 0 12.7262V2.27497C0 0.542479 2.00059 -0.551768 3.62933 0.28898L13.7444 5.51497Z" />
                    </svg>
                </button>
                :
                <button onClick={() => { ref.current.pause(); setPlaying(false); }} className={themeID === 1 ? "text-blue2" : "text-white"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <rect width="6" height="15" />
                        <rect x="9" width="6" height="15" />
                    </svg>
                </button>
            }
            <img src="/images/messages/voice.svg" alt="" />
            <span>{Math.floor(time / 60)}:{time % 60}</span>
        </div>
    )
}

export default AudioPlayer;