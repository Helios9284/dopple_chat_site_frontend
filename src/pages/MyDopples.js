import { useContext, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDetails, setOpenWaitlistModal } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import axios from "../utilities/axiosConfig";
import FeaturedDoppleCardCustomized from "../components/FeaturedDoppleCardCustomized";
import useWindowDimensions from "../hooks/useDimensions";
import DeleteDoppleConfirmModal from "../components/DeleteDoppleConfirmModal";
import ShareDoppleConfirmModal from "../components/ShareDoppleConfirmModal";

const CreateButton = ({ action }) => {
  return (
    <button className={"bg-inputback border border-2 border-dashed border-black12 rounded-[10px] shadow-md relative min-w-[260px] min-h-[260px] max-w-[260px] max-h-[260px]"} onClick={action}>
      <svg className="absolute top-[56px] left-1/2 -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.6875 27.6797H72.5313V90.5234H9.6875V27.6797ZM17.1875 35.1797V83.0234H65.0313V35.1797H17.1875Z" fill="#23252B" />
        <path d="M32.2168 30.1948L32.2168 13.2188H87.5606V68.5625H68.3973" stroke="#23252B" strokeWidth="7.5" />
        <path fillRule="evenodd" clipRule="evenodd" d="M13.4395 31.4316H68.7832V86.7754H13.4395V31.4316ZM37.3633 55.3551V45.5879H44.8633V55.3551H54.627V62.8551H44.8633V72.6192H37.3633V62.8551H27.5957V55.3551H37.3633Z" fill="#23252B" />
      </svg>
      <span className="absolute bottom-[55px] left-1/2 -translate-x-1/2 font-bold text-[24px] leading-[28px] text-button w-full">Create Dopple</span>
    </button>
  )
}

const MyDopples = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { setOpenSignModal } = useContext(RefContext)
  const profile = useSelector(store => store.AuthReducer.profile)
  const [dopples, setDopples] = useState(Array(4).fill({ category: 0 }).concat(Array(4).fill({ category: 1 })).concat(Array(4).fill({ category: 2 })).concat(Array(4).fill({ category: 3 })).concat(Array(4).fill({ category: 4 })))

  const { width: screenWidth } = useWindowDimensions();
  const [openArrow1, setOpenArrow1] = useState(false)
  const [openArrow2, setOpenArrow2] = useState(false)
  const [openArrow3, setOpenArrow3] = useState(false)
  const [openArrow4, setOpenArrow4] = useState(false)
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const openProfile = (data) => {
    if (data._id) {
      nav("/profile/" + data._id)
      document.body.scrollTop = 0;
    }
  }
  const create = () => {
    // nav("/create")
    if (!profile) {
      setOpenSignModal(true)
      dispatch(setDetails({ openLoginOrSignup: false }))
    }
    else
      dispatch(setOpenWaitlistModal());
  }
  const prev = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft - (screenWidth - 40), behavior: 'smooth' });
  }
  const next = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft + (screenWidth - 40), behavior: 'smooth' });
  }
  const deleteConfirm = () => {
    alert()
  }
  useMemo(async () => {
    if (profile?.email) {
      const { data: { data } } = await axios.post("/dopple/getByEmail", { email: "royarata0406@gmail.com" })
      setDopples(data)
    }
  }, [profile?.email])
  return (
    <div className="pt-[30px] pb-[30px] md:pb-[50px]">
      <div className="flex flex-col">
        <span className="px-5 xl:px-[60px] font-semibold text-[22px] leading-[25px]">My Dopples</span>
        <span className="px-5 xl:px-[60px] mt-[10px] font-medium text-[14px] leading-[17px] text-black4">Simplify and personalize your Dopple profiles all on one page.</span>

        <div className="flex justify-between items-center mt-[30px] px-5 xl:px-[60px]">
          <span className="font-bold text-[22px] leading-[22px]">Characters</span>
        </div>
        <div className="relative" onMouseEnter={() => setOpenArrow1(true)} onMouseLeave={() => setOpenArrow1(false)}>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow1 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref1)} aria-label="Prev">
            <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow1 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref1)} aria-label="Next">
            <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref1}>
            <div className="flex space-x-[5px] mt-[15px]">
              <CreateButton action={create} />
              {dopples.filter(x => x.category === 0).map((x, i) =>
                <FeaturedDoppleCardCustomized key={i} action={() => openProfile(x)} _data={x} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[30px] px-5 xl:px-[60px]">
          <span className="font-bold text-[22px] leading-[22px]">Companions</span>
        </div>
        <div className="relative" onMouseEnter={() => setOpenArrow2(true)} onMouseLeave={() => setOpenArrow2(false)}>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow2 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref2)} aria-label="Prev">
            <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow2 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref2)} aria-label="Next">
            <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref2}>
            <div className="flex space-x-[5px] mt-[15px]">
              <CreateButton action={create} />
              {dopples.filter(x => x.category === 1).map((x, i) =>
                <FeaturedDoppleCardCustomized key={i} action={() => openProfile(x)} _data={x} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[30px] px-5 xl:px-[60px]">
          <span className="font-bold text-[22px] leading-[22px]">Mentors</span>
        </div>
        <div className="relative" onMouseEnter={() => setOpenArrow3(true)} onMouseLeave={() => setOpenArrow3(false)}>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow3 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref3)} aria-label="Prev">
            <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow3 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref3)} aria-label="Next">
            <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref3}>
            <div className="flex space-x-[5px] mt-[15px]">
              <CreateButton action={create} />
              {dopples.filter(x => x.category === 3).map((x, i) =>
                <FeaturedDoppleCardCustomized key={i} action={() => openProfile(x)} _data={x} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[30px] px-5 xl:px-[60px]">
          <span className="font-bold text-[22px] leading-[22px]">Assistants</span>
        </div>
        <div className="relative" onMouseEnter={() => setOpenArrow4(true)} onMouseLeave={() => setOpenArrow4(false)}>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow4 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref4)} aria-label="Prev">
            <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow4 ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref4)} aria-label="Next">
            <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
              <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref4}>
            <div className="flex space-x-[5px] mt-[15px]">
              <CreateButton action={create} />
              {dopples.filter(x => x.category === 4).map((x, i) =>
                <FeaturedDoppleCardCustomized key={i} action={() => openProfile(x)} _data={x} />
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteDoppleConfirmModal deleteConfirm={deleteConfirm} />
      <ShareDoppleConfirmModal />
    </div>
  );
};

export default MyDopples;
