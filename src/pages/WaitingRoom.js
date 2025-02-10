import { useEffect, useState } from "react";

const WaitingRoom = () => {
    const [timer, setTimer] = useState(0)
    const [loadedMobileVideo, setLoadedMobileVideo] = useState(false)
    const [loadedDesktopVideo, setLoadedDesktopVideo] = useState(false)
    const dots = ["", ".", "..", "..."]
    useEffect(() => {
        setInterval(() => setTimer(x => x += 1), 500)
    }, [])
    return (
        <div>
            <header className="px-5 mt-5 md:px-[60px] md:mt-[30px] relative z-[2]">
                <svg className="h-[33px] md:h-[50px]" viewBox="0 0 333 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M58.0405 40.0535V11.9844H67.3176C76.3568 11.9844 83.9291 15.83 83.9291 26.0982C83.9291 35.1771 76.5154 40.0535 68.1501 40.0535H58.0405ZM64.2252 17.6933V34.3445H67.4365C73.1851 34.3445 77.5065 32.164 77.5065 25.781C77.5065 20.2703 73.1059 17.6933 67.8726 17.6933H64.2252ZM86.6563 30.4196C86.6563 24.2745 91.4138 20.31 97.3606 20.31C103.307 20.31 108.065 24.2745 108.065 30.4196C108.065 36.5647 103.307 40.5292 97.3606 40.5292C91.4138 40.5292 86.6563 36.5647 86.6563 30.4196ZM92.6031 30.4196C92.6031 33.3137 94.3872 35.296 97.3606 35.296C100.334 35.296 102.118 33.3137 102.118 30.4196C102.118 27.5255 100.334 25.5432 97.3606 25.5432C94.3872 25.5432 92.6031 27.5255 92.6031 30.4196ZM112.123 49.0927V20.7857H117.594V23.323H117.673C118.585 21.9354 120.884 20.31 123.58 20.31C129.289 20.31 133.056 24.4331 133.056 30.261C133.056 35.6132 129.725 40.5292 124.254 40.5292C121.796 40.5292 119.497 39.8552 118.149 37.9919H118.07V49.0927H112.123ZM117.594 30.4196C117.594 33.3137 119.378 35.296 122.351 35.296C125.325 35.296 127.109 33.3137 127.109 30.4196C127.109 27.5255 125.325 25.5432 122.351 25.5432C119.378 25.5432 117.594 27.5255 117.594 30.4196ZM137.095 49.0927V20.7857H142.566V23.323H142.645C143.557 21.9354 145.856 20.31 148.552 20.31C154.261 20.31 158.028 24.4331 158.028 30.261C158.028 35.6132 154.697 40.5292 149.226 40.5292C146.768 40.5292 144.469 39.8552 143.121 37.9919H143.042V49.0927H137.095ZM142.566 30.4196C142.566 33.3137 144.35 35.296 147.323 35.296C150.297 35.296 152.081 33.3137 152.081 30.4196C152.081 27.5255 150.297 25.5432 147.323 25.5432C144.35 25.5432 142.566 27.5255 142.566 30.4196ZM161.591 40.0535V10.0814H167.538V40.0535H161.591ZM185.885 33.6705L190.047 36.7232C188.144 39.1416 185.012 40.5292 181.92 40.5292C175.973 40.5292 171.216 36.5647 171.216 30.4196C171.216 24.2745 175.973 20.31 181.92 20.31C187.47 20.31 190.959 24.2745 190.959 30.4196V32.2829H177.163C177.638 34.5427 179.343 36.0096 181.643 36.0096C183.585 36.0096 184.893 35.0185 185.885 33.6705ZM177.163 28.2391H185.012C185.052 26.2568 183.506 24.5917 181.365 24.5917C178.748 24.5917 177.321 26.3757 177.163 28.2391ZM194.695 36.6439C194.695 34.622 196.32 32.9965 198.342 32.9965C200.364 32.9965 201.989 34.622 201.989 36.6439C201.989 38.6659 200.364 40.2913 198.342 40.2913C196.32 40.2913 194.695 38.6659 194.695 36.6439ZM218.399 40.0535V37.6351H218.319C217.011 39.6967 214.632 40.5292 212.214 40.5292C208.606 40.5292 205.355 38.4676 205.355 34.5824C205.355 27.9219 213.443 27.803 218.399 27.803C218.399 25.7018 216.654 24.3538 214.593 24.3538C212.65 24.3538 211.025 25.226 209.756 26.6533L206.584 23.4023C208.765 21.3407 211.936 20.31 215.068 20.31C222.006 20.31 223.87 23.8384 223.87 30.261V40.0535H218.399ZM218.399 31.609H216.932C215.108 31.609 211.064 31.7675 211.064 34.3841C211.064 35.8114 212.571 36.4854 213.879 36.4854C216.218 36.4854 218.399 35.2563 218.399 32.8776V31.609ZM227.68 40.0535V20.7857H233.627V40.0535H227.68ZM227.204 14.7199C227.204 12.8169 228.75 11.2708 230.653 11.2708C232.556 11.2708 234.103 12.8169 234.103 14.7199C234.103 16.6229 232.556 18.1691 230.653 18.1691C228.75 18.1691 227.204 16.6229 227.204 14.7199Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.8275 10.6758C15.4175 7.37224 18.3049 4.86457 21.7781 4.86457C32.0437 4.86457 40.4119 13.353 40.4119 23.6699C40.4119 34.1778 31.8889 42.8239 21.4323 42.8239H6.92626C4.23271 42.8239 1.68484 41.6009 0 39.4994C0 44.0221 3.66637 47.6885 8.18907 47.6885H21.4323C34.6267 47.6885 45.2765 36.813 45.2765 23.6699C45.2765 10.7178 34.7815 0 21.7781 0C15.1919 0 9.85269 5.33918 9.85269 11.9254V32.3628H7.04084C5.83892 32.3628 4.86458 31.3885 4.86458 30.1865V10.8309V10.5879C4.86458 6.43099 7.011 2.56876 10.5411 0.373703C4.7657 0.373703 0 5.05557 0 10.8309V30.1865C0 34.0751 3.1523 37.2274 7.04084 37.2274H22.3472C29.6792 37.2274 35.623 31.2836 35.623 23.9516C35.623 16.6196 29.6792 10.6758 22.3472 10.6758H14.8275ZM22.3479 32.3629H14.718V15.5404H22.3479C26.9933 15.5404 30.7592 19.3063 30.7592 23.9517C30.7592 28.5971 26.9933 32.3629 22.3479 32.3629Z" fill="white" />
                </svg>
            </header>
            <div className="fixed top-0 left-0 w-full h-full bg-waitingroom-gradient z-[1]" />
            <video className={"hidden lg:block fixed top-0 left-0 w-full h-full object-cover" + (loadedDesktopVideo ? " visible" : " invisible")} autoPlay loop muted playsInline controls={false} onLoadedData={() => setLoadedDesktopVideo(true)}>
                <source src="/videos/waitingrooms/Waiting Page Desktop.mp4" type="video/mp4" />
            </video>
            <video className={"block lg:hidden fixed top-0 left-0 w-full h-full object-cover" + (loadedMobileVideo ? " visible" : " invisible")} autoPlay loop muted playsInline controls={false} onLoadedData={() => setLoadedMobileVideo(true)}>
                <source src="/videos/waitingrooms/Waiting Page Mobile.mp4" type="video/mp4" />
            </video>
            {(!loadedDesktopVideo || !loadedMobileVideo) &&
                <img className="fixed top-0 left-0 w-full h-full object-cover" src="/images/waitingroom/poster.jpg" alt="" />
            }
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-[2]">
                <div className="flex flex-col items-center text-center">
                    <div className="flex justify-center items-center w-[100px] h-[100px] lg:w-[133px] lg:h-[133px] rounded-full bg-[rgba(0,0,0,.6)] border-6 border-[rgba(0,0,0,.5)] relative">
                        <svg className="w-[40%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 64" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6493 14.9462C20.4311 10.5684 24.2575 7.2453 28.8601 7.2453C42.464 7.2453 53.5535 18.4941 53.5535 32.1659C53.5535 46.0908 42.2588 57.5485 28.4018 57.5485H8.92476C5.51576 57.5485 2.29114 56.0007 0.158784 53.341L0 53.1429V58.114C0 61.362 2.63301 63.995 5.88098 63.995H28.4018C45.8869 63.995 60 49.583 60 32.1659C60 15.0019 46.0921 0.798828 28.8601 0.798828C20.1321 0.798828 13.0567 7.87424 13.0567 16.6022V43.6856H9.33045C7.73768 43.6856 6.44649 42.3944 6.44649 40.8017V15.1519V10.7034C6.44649 7.76083 7.9659 5.02683 10.4648 3.47299L13.9689 1.29405H8.51426C3.81196 1.29405 0 5.10602 0 9.80831V15.1519V40.8017C0 45.9547 4.17739 50.1321 9.33045 50.1321H29.6143C39.3306 50.1321 47.2072 42.2555 47.2072 32.5392C47.2072 22.8229 39.3306 14.9462 29.6143 14.9462H19.6493ZM29.6153 43.6863H19.5042V21.3934H29.6153C35.7713 21.3934 40.7618 26.3839 40.7618 32.5399C40.7618 38.6959 35.7713 43.6863 29.6153 43.6863Z" fill="white" />
                        </svg>
                        <svg className='spinnerInner2 absolute w-[114px] h-[114px] lg:w-[152px] lg:h-[152px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' viewBox='0 0 120 120'>
                            <circle cx='60' cy='60' r='50' />
                        </svg>
                    </div>
                    <span className="mt-[30px] font-bold text-[45px] lg:text-[55px] leading-[49px] lg:leading-[54px]">You’re In Line.</span>
                    <span className="mt-[15px] mr-[22px] font-semibold text-[22px] leading-[26px] relative">
                        Don't Refresh. 5 Minutes Left
                        <span className="absolute top-1/2 translate-x-[100%] -translate-y-1/2 right-0">{dots[timer % 4]}</span>
                    </span>
                    <span className="mt-[15px] max-w-[381px] lg:max-w-[unset] text-[18px] leading-[21px]">We're experiencing high usage volume, you're in the virtual queue.</span>
                    <div className="flex flex-col lg:flex-row items-center mt-[30px] space-y-[10px] lg:space-x-[10px] lg:space-y-0 font-bold text-[18px] leading-[22px]">
                        <button className="flex justify-center items-center w-[calc(100vw-20px)] verytiny:w-[325px] waitingroom-btn px-[17.5px] h-[50px] lg:h-[60px] rounded-[5px] bg-blue2 text-nav">Skip the wait with Dopple+</button>
                        <button className="flex justify-center items-center w-[calc(100vw-20px)] verytiny:w-[325px] waitingroom-btn px-[19px] h-[50px] lg:h-[60px] rounded-[5px] bg-nav text-white">Already have Dopple+? Sign In.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom;