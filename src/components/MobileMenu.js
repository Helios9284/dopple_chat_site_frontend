import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setDetails } from "../redux/reducers/ModalReducer";
import { setProfile } from "../redux/reducers/AuthReducer";
import { useContext, useRef, useState } from "react";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { RefContext } from "../contexts/RefContextProvider";

const MobileMenu = ({ setOpenMenu }) => {
	const dispatch = useDispatch();
	const { setOpenSignModal } = useContext(RefContext);
	const profile = useSelector(store => store.AuthReducer.profile);
	const nav = useNavigate();
	const [openProfileMenu, setOpenProfileMenu] = useState(false);
	let mobileMenuRef = useRef();

	const login = () => {
		setOpenMenu(false);
		setOpenSignModal(true);
		dispatch(setDetails({ openLoginOrSignup: true }))
	}
	const logout = () => {
		dispatch(setProfile(undefined))
		localStorage.removeItem('accessToken');
		nav("/")
	}
	const create = () => {
		if (!profile) {
			setOpenSignModal(true);
			dispatch(setDetails({ openLoginOrSignup: false }))
		}
		else
			nav("/create")
	}

	useOutsideDetector([mobileMenuRef], () => setOpenMenu(false))
	return (
		<div className="flex flex-col fixed bottom-0 left-0 w-full bg-black12 z-[3]" ref={mobileMenuRef}>
			<div className="flex flex-col space-y-5 border-b border-black5 px-5 pt-5 pb-[30px]">
				<div className="flex justify-between items-center">
					<img className="h-[20px]" src="/images/logo-header.svg" alt="" />
					<button className="flex justify-center items-center w-[35px] h-[35px] bg-black5 rounded-[5px] ml-[10px]" onClick={() => setOpenMenu(false)}>
						<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.6665 1.16667L13.3332 12.8333M1.6665 12.8333L13.3332 1.16667" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
				<div className="flex justify-center items-center space-x-[15px]">
					<button className="border border-blue2 rounded-[10px] w-[147px] h-[40px] font-semibold text-[12px] leading-[14.32px]" onClick={create}>
						Create Dopple
					</button>
					{profile ?
						<button className="flex justify-between items-center w-[125px] h-[40px] px-[15px] rounded-[10px] border border-white ml-[15px] relative" onClick={() => setOpenProfileMenu(!openProfileMenu)}>
							<div className="flex items-center space-x-[10px] w-full">
								{profile.picture ?
									<img className="w-5 h-5 rounded-full" src={profile.picture} alt="" />
									:
									<img className="w-5 h-5 rounded-full" src="/images/blank-profile.svg" alt="" />
								}
								<span className="truncate">{profile.username}</span>
							</div>
							<svg className={openProfileMenu ? "rotate-[180deg] transition" : "transition"} width="7" height="4" viewBox="0 0 7 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.84592 0.152959C6.74723 0.0550192 6.6134 -4.4304e-07 6.47386 -4.3084e-07C6.33431 -4.18641e-07 6.20048 0.0550192 6.10179 0.152959L3.49682 2.73897L0.891853 0.15296C0.7926 0.0577954 0.659666 0.00513776 0.521684 0.0063282C0.383701 0.00751839 0.251709 0.0624613 0.154137 0.159324C0.0565645 0.256186 0.00121943 0.387217 2.0677e-05 0.524196C-0.00117856 0.661174 0.0518648 0.793141 0.147727 0.891671L3.12476 3.84704C3.22345 3.94498 3.35728 4 3.49682 4C3.63637 4 3.7702 3.94498 3.86889 3.84704L6.84592 0.891671C6.94458 0.793701 7 0.660844 7 0.522315C7 0.383786 6.94458 0.250929 6.84592 0.152959Z" />
							</svg>
						</button>
						:
						<button className="w-[94px] h-[40px] bg-blue2 rounded-[10px] font-semibold text-[12px] leading-[14.32px]" onClick={login}>Login</button>
					}
				</div>
				{openProfileMenu &&
					<div className="flex flex-col items-center space-y-[10px] font-semibold text-[12px] leading-[14.32px]">
						<div className="px-[27px] py-[10px]">
							<Link to="/mydopples">My Dopples</Link>
						</div>
						<div className="px-[27px] py-[10px]">
							<Link to="/earnings">Earnings</Link>
						</div>
						<div className="px-[27px] py-[10px]">
							<Link to="/settings">Settings</Link>
						</div>
						<div className="px-[27px] py-[10px]">
							<span onClick={logout}>Sign out</span>
						</div>
					</div>
				}
			</div>
			<div className="px-5 pt-[30px] pb-5 text-black6">
				<div className="flex flex-col items-center space-y-[13px] text-[12px] leading-[14.32px] mb-[27px]">
					<div className="flex items-center space-x-[15px]">
						<Link to="/">Explore Page</Link>
						<Link to="/terms">Terms & Conditions</Link>
						<a>Disclaimers</a>
					</div>
					<div className="flex items-center space-x-[15px]">
						<a>Technical Support</a>
						<Link to="/privacy">Privacy Policy</Link>
						<a>About</a>
					</div>
				</div>
				<div className="flex flex-col items-center lg2:items-start space-y-[15px]">
					<div className="flex space-x-5 md:space-x-[10px]">
						<a href="https://twitter.com/DoppleAi" target="_blank" rel="noreferrer">
							<svg className="w-10 h-10 md:w-auto md:h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="20" height="20" rx="10" fill="white" />
								<path d="M15.7858 7.0684C15.3526 7.25173 14.8932 7.37216 14.4228 7.42572C14.9184 7.14178 15.2892 6.69519 15.4662 6.16913C15.0007 6.43413 14.4904 6.61985 13.959 6.72031C13.6017 6.35462 13.1281 6.11209 12.6119 6.03043C12.0957 5.94877 11.5657 6.03255 11.1043 6.26875C10.643 6.50495 10.2762 6.88034 10.0609 7.33655C9.84557 7.79276 9.79386 8.30423 9.91378 8.79146C8.96971 8.74627 8.04612 8.51164 7.203 8.10281C6.35988 7.69398 5.61607 7.12008 5.01988 6.41838C4.80887 6.76509 4.69799 7.15921 4.69858 7.56039C4.69858 8.34779 5.11809 9.04342 5.75445 9.4507C5.37752 9.43933 5.0089 9.34196 4.67928 9.16669V9.19439C4.67926 9.71889 4.8689 10.2273 5.21603 10.6333C5.56316 11.0393 6.04641 11.3179 6.58382 11.4219C6.23393 11.5127 5.86702 11.5261 5.51092 11.461C5.66244 11.9125 5.9578 12.3073 6.35561 12.5902C6.75343 12.8731 7.23378 13.0299 7.72938 13.0385C7.23684 13.4086 6.67288 13.6821 6.06974 13.8435C5.4666 14.0049 4.83612 14.051 4.21436 13.9791C5.29959 14.6467 6.56287 15.0011 7.85313 15C12.2208 15 14.6084 11.5392 14.6084 8.53786C14.6084 8.44011 14.6062 8.34128 14.6016 8.24407C15.0662 7.92279 15.4672 7.52431 15.7858 7.0684Z" fill="#111112" />
							</svg>
						</a>
						<a href="https://instagram.com/Dopple_ai" target="_blank" rel="noreferrer">
							<svg className="w-10 h-10 md:w-auto md:h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="20" height="20" rx="10" fill="white" />
								<path d="M10.514 5.00062C10.8789 4.99922 11.2437 5.00288 11.6084 5.01161L11.7054 5.01511C11.8174 5.01911 11.9279 5.02411 12.0614 5.03011C12.5934 5.05511 12.9564 5.13911 13.2749 5.2626C13.6048 5.3896 13.8828 5.56159 14.1608 5.83957C14.415 6.08936 14.6117 6.39152 14.7373 6.72503C14.8608 7.04351 14.9448 7.40699 14.9698 7.93896C14.9758 8.07196 14.9808 8.18295 14.9848 8.29495L14.9878 8.39194C14.9967 8.75652 15.0005 9.1212 14.9993 9.48589L14.9998 9.85887V10.5138C15.001 10.8787 14.9972 11.2435 14.9883 11.6083L14.9853 11.7053C14.9813 11.8173 14.9763 11.9278 14.9703 12.0613C14.9453 12.5932 14.8603 12.9562 14.7373 13.2747C14.6121 13.6086 14.4154 13.911 14.1608 14.1606C13.9108 14.4148 13.6085 14.6115 13.2749 14.7371C12.9564 14.8606 12.5934 14.9446 12.0614 14.9696C11.9279 14.9756 11.8174 14.9806 11.7054 14.9846L11.6084 14.9876C11.2437 14.9965 10.8789 15.0003 10.514 14.9991L10.141 14.9996H9.48656C9.12171 15.0008 8.75686 14.997 8.39211 14.9881L8.29512 14.9851C8.17643 14.9808 8.05777 14.9758 7.93914 14.9701C7.40716 14.9451 7.04418 14.8601 6.7252 14.7371C6.39156 14.6118 6.08935 14.415 5.83975 14.1606C5.58528 13.9108 5.38838 13.6085 5.26278 13.2747C5.13928 12.9562 5.05529 12.5932 5.03029 12.0613C5.02472 11.9426 5.01972 11.824 5.01529 11.7053L5.01279 11.6083C5.00357 11.2435 4.9994 10.8787 5.00029 10.5138V9.48589C4.99889 9.1212 5.00256 8.75652 5.01129 8.39194L5.01479 8.29495C5.01879 8.18295 5.02379 8.07196 5.02979 7.93896C5.05479 7.40649 5.13878 7.04401 5.26227 6.72503C5.38795 6.39135 5.58524 6.08928 5.84025 5.84007C6.08968 5.58546 6.3917 5.38838 6.7252 5.2626C7.04418 5.13911 7.40666 5.05511 7.93914 5.03011L8.29512 5.01511L8.39211 5.01261C8.75669 5.0034 9.12137 4.99923 9.48606 5.00012L10.514 5.00062ZM10 7.50049C9.6688 7.4958 9.33994 7.557 9.03257 7.68051C8.7252 7.80403 8.44544 7.9874 8.20955 8.21998C7.97366 8.45255 7.78635 8.72969 7.6585 9.03529C7.53065 9.34089 7.46481 9.66885 7.46481 10.0001C7.46481 10.3314 7.53065 10.6593 7.6585 10.9649C7.78635 11.2705 7.97366 11.5477 8.20955 11.7802C8.44544 12.0128 8.7252 12.1962 9.03257 12.3197C9.33994 12.4432 9.6688 12.5044 10 12.4997C10.663 12.4997 11.2989 12.2364 11.7677 11.7675C12.2365 11.2987 12.4999 10.6629 12.4999 9.99986C12.4999 9.33685 12.2365 8.701 11.7677 8.23218C11.2989 7.76337 10.663 7.50049 10 7.50049ZM10 8.50044C10.1993 8.49676 10.3973 8.53283 10.5824 8.60653C10.7675 8.68023 10.9362 8.79009 11.0784 8.92969C11.2206 9.06928 11.3336 9.23581 11.4107 9.41956C11.4878 9.6033 11.5276 9.80058 11.5276 9.99985C11.5276 10.1991 11.4879 10.3964 11.4109 10.5802C11.3338 10.764 11.2209 10.9305 11.0787 11.0702C10.9366 11.2098 10.768 11.3197 10.5829 11.3935C10.3977 11.4673 10.1998 11.5034 10.0005 11.4998C9.60273 11.4998 9.22122 11.3418 8.93993 11.0605C8.65864 10.7792 8.50061 10.3977 8.50061 9.99986C8.50061 9.60205 8.65864 9.22054 8.93993 8.93925C9.22122 8.65796 9.60273 8.49994 10.0005 8.49994L10 8.50044ZM12.6249 6.75053C12.4636 6.75698 12.3111 6.8256 12.1992 6.942C12.0874 7.05841 12.0249 7.21357 12.0249 7.37499C12.0249 7.53642 12.0874 7.69158 12.1992 7.80799C12.3111 7.92439 12.4636 7.99301 12.6249 7.99946C12.7906 7.99946 12.9496 7.93362 13.0668 7.81641C13.184 7.69921 13.2499 7.54025 13.2499 7.37449C13.2499 7.20874 13.184 7.04978 13.0668 6.93257C12.9496 6.81537 12.7906 6.74953 12.6249 6.74953V6.75053Z" fill="#111112" />
							</svg>
						</a>
						<a href="https://www.youtube.com/@Dopple_ai" target="_blank" rel="noreferrer">
							<svg className="w-10 h-10 md:w-auto md:h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="20" height="20" rx="10" fill="white" />
								<path d="M8.8 11.7143L11.914 10L8.8 8.28571V11.7143ZM15.736 7.24C15.814 7.50857 15.868 7.86857 15.904 8.32571C15.946 8.78286 15.964 9.17714 15.964 9.52L16 10C16 11.2514 15.904 12.1714 15.736 12.76C15.586 13.2743 15.238 13.6057 14.698 13.7486C14.416 13.8229 13.9 13.8743 13.108 13.9086C12.328 13.9486 11.614 13.9657 10.954 13.9657L10 14C7.486 14 5.92 13.9086 5.302 13.7486C4.762 13.6057 4.414 13.2743 4.264 12.76C4.186 12.4914 4.132 12.1314 4.096 11.6743C4.054 11.2171 4.036 10.8229 4.036 10.48L4 10C4 8.74857 4.096 7.82857 4.264 7.24C4.414 6.72571 4.762 6.39429 5.302 6.25143C5.584 6.17714 6.1 6.12571 6.892 6.09143C7.672 6.05143 8.386 6.03429 9.046 6.03429L10 6C12.514 6 14.08 6.09143 14.698 6.25143C15.238 6.39429 15.586 6.72571 15.736 7.24Z" fill="#111112" />
							</svg>
						</a>
						<a href="https://dopple.ai" target="_blank" rel="noreferrer">
							<svg className="w-10 h-10 md:w-auto md:h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="20" height="20" rx="10" fill="white" />
								<path d="M12.616 11.2C12.664 10.804 12.7 10.408 12.7 10C12.7 9.592 12.664 9.196 12.616 8.8H14.644C14.74 9.184 14.8 9.586 14.8 10C14.8 10.414 14.74 10.816 14.644 11.2M11.554 14.536C11.914 13.87 12.19 13.15 12.382 12.4H14.152C13.5707 13.401 12.6485 14.1592 11.554 14.536ZM11.404 11.2H8.596C8.536 10.804 8.5 10.408 8.5 10C8.5 9.592 8.536 9.19 8.596 8.8H11.404C11.458 9.19 11.5 9.592 11.5 10C11.5 10.408 11.458 10.804 11.404 11.2ZM10 14.776C9.502 14.056 9.1 13.258 8.854 12.4H11.146C10.9 13.258 10.498 14.056 10 14.776ZM7.6 7.6H5.848C6.42331 6.59633 7.34488 5.83689 8.44 5.464C8.08 6.13 7.81 6.85 7.6 7.6ZM5.848 12.4H7.6C7.81 13.15 8.08 13.87 8.44 14.536C7.34717 14.159 6.42691 13.4006 5.848 12.4ZM5.356 11.2C5.26 10.816 5.2 10.414 5.2 10C5.2 9.586 5.26 9.184 5.356 8.8H7.384C7.336 9.196 7.3 9.592 7.3 10C7.3 10.408 7.336 10.804 7.384 11.2M10 5.218C10.498 5.938 10.9 6.742 11.146 7.6H8.854C9.1 6.742 9.502 5.938 10 5.218ZM14.152 7.6H12.382C12.1942 6.85687 11.9161 6.13954 11.554 5.464C12.658 5.842 13.576 6.604 14.152 7.6ZM10 4C6.682 4 4 6.7 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.31451 14.7998 6.97595 15.2417 7.7039 15.5433C8.43185 15.8448 9.21207 16 10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 9.21207 15.8448 8.43185 15.5433 7.7039C15.2417 6.97595 14.7998 6.31451 14.2426 5.75736C13.6855 5.20021 13.0241 4.75825 12.2961 4.45672C11.5681 4.15519 10.7879 4 10 4Z" fill="#111112" />
							</svg>
						</a>
					</div>
					<span className="text-[12px] leading-[14.32px]">© 2023 Dopple AI. All rights reserved</span>
				</div>
			</div>
		</div>
	)
}

export default MobileMenu;