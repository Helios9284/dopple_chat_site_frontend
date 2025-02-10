import { useContext, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoppleCard from "../components/DoppleCard";
import axios from "../utilities/axiosConfig";
import { categories } from "../config";
import FeaturedDoppleCard from "../components/FeaturedDoppleCard";
import Lottie from "react-lottie";
import { getFeaturedByCategory } from "../utilities/format";
import useWindowDimensions from "../hooks/useDimensions";
import { RefContext } from "../contexts/RefContextProvider";
import * as anim1_1 from '../animations/Hover/Characters Hover Default.json';
import * as anim2_1 from '../animations/Hover/Companions Hover Default.json';
import * as anim3_1 from '../animations/Hover/Mentors Hover Default.json';
import * as anim4_1 from '../animations/Hover/Assistant Hover Default.json';
import TopDopples from "../components/TopDopples";

import 'swiper/css';

const Explore = () => {
  const nav = useNavigate()
  const { width: screenWidth } = useWindowDimensions();
  const [doppleCategory, setDoppleCategory] = useState(-1)
  const { dopples } = useContext(RefContext)
  const [featuredDopples, setFeaturedDopples] = useState([])
  const [featured, setFeatured] = useState(Array(4).fill({}))
  const [loaded, setLoaded] = useState(false)
  const [openArrow1, setOpenArrow1] = useState(false)
  const [openArrow2, setOpenArrow2] = useState(false)
  const [openArrow3, setOpenArrow3] = useState(false)
  const [openArrow4, setOpenArrow4] = useState(false)
  const [animsIn, setAnimsIn] = useState([false, false, false, false]);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const defaultOption = {
    loop: false,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const animsOption = [
    {
      ...defaultOption,
      animationData: anim1_1,
    },
    {
      ...defaultOption,
      animationData: anim2_1,
    },
    {
      ...defaultOption,
      animationData: anim3_1,
    },
    {
      ...defaultOption,
      animationData: anim4_1,
    },
  ]

  const mouseEnter = (entered, i) => {
    let tmp = [...animsIn]
    tmp[i] = entered
    setAnimsIn(tmp)
  }
  const openProfile = (data) => {
    if (data._id) {
      nav("/profile/" + data._id)
      document.body.scrollTop = 0;
    }
  }
  const chooseDoppleCateogry = (i) => {
    setDoppleCategory(i)
  }
  const prev = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft - (screenWidth - 40), behavior: 'smooth' });
  }
  const next = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft + (screenWidth - 40), behavior: 'smooth' });
  }
  useMemo(async () => {
    if (featuredDopples?.length > 0)
      setFeatured((doppleCategory === -1 ? getFeaturedByCategory(featuredDopples) : featuredDopples.filter(x => x.category === doppleCategory).filter((x, i) => i >= 0 && i <= 3)))
  }, [doppleCategory, featuredDopples])
  useMemo(async () => {
    const { data: { data: featuredTmp } } = await axios.get("/dopple/featured")
    setFeaturedDopples(featuredTmp)

    setLoaded(true)
  }, [])
  return (
    <div className="pt-[15px] md:pt-[30px]">
      <div className="flex items-center space-x-[12.5px] md:space-x-[15px] font-medium text-[14px] leading-[17px] mb-[15px] md:mb-[24.4px]">
        <div className="flex items-center space-x-[5px] pl-5 xl:px-[60px] overflow-auto category-container">
          <button className={"flex items-center space-x-[5px] border border-button rounded-[5px] px-[17px] h-[45px] min-w-fit hover:bg-button transition" + (doppleCategory === -1 ? " bg-button" : "")} onClick={() => chooseDoppleCateogry(-1)}>
            <span>All</span>
          </button>
          {categories.map((x, i) =>
            <button className={"flex items-center space-x-[5px] border border-button rounded-[5px] px-[17px] h-[45px] min-w-fit hover:bg-button transition" + (doppleCategory === i ? " bg-button" : "")} onClick={() => nav("/category/" + x.namePlural.toLowerCase())} key={i} onMouseEnter={() => mouseEnter(true, i)} onMouseLeave={() => mouseEnter(false, i)}>
              <Lottie width={20} height={20} options={animsOption[i]} isClickToPauseDisabled isStopped={!animsIn[i]} />
              <span>{x.namePlural}</span>
            </button>
          )}
        </div>
      </div>

      <span className="font-bold text-[22px] leading-[22px] px-5 xl:px-[60px]">Featured {doppleCategory === -1 ? "Dopples" : categories[doppleCategory].namePlural}</span>
      <div className="relative">
        <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar">
          <div className="flex space-x-[13.4px] mt-[15px]">
            {featured.map((x, i) =>
              <FeaturedDoppleCard key={i} action={() => openProfile(x)} _data={x} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-bold text-[22px] leading-[22px]">Top {doppleCategory === -1 ? "Dopples" : categories[doppleCategory].namePlural}</span>
        <Link className="text-blue2 font-semibold text-[16px] leading-[19px] transition hover:text-white" to="/topcharts">See All</Link>
      </div>

      <TopDopples loaded={loaded} doppleCategory={doppleCategory} />
      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-bold text-[22px] leading-[22px]">Characters</span>
        <Link className="text-blue2 font-semibold text-[16px] leading-[19px] transition hover:text-white" to="/category/characters">See All</Link>
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
            {(dopples.length > 0 ? dopples.filter(x => x.category === 0) : Array(9).fill({})).map((x, i) =>
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-bold text-[22px] leading-[22px]">Companions</span>
        <Link className="text-blue2 font-semibold text-[16px] leading-[19px] transition hover:text-white" to="/category/companions">See All</Link>
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
            {(dopples.length > 0 ? dopples.filter(x => x.category === 1) : Array(9).fill({})).map((x, i) =>
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-bold text-[22px] leading-[22px]">Mentors</span>
        <Link className="text-blue2 font-semibold text-[16px] leading-[19px] transition hover:text-white" to="/category/mentors">See All</Link>
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
            {(dopples.length > 0 ? dopples.filter(x => x.category === 2) : Array(9).fill({})).map((x, i) =>
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-bold text-[22px] leading-[22px]">Assistants</span>
        <Link className="text-blue2 font-semibold text-[16px] leading-[19px] transition hover:text-white" to="/category/assistants">See All</Link>
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
            {(dopples.length > 0 ? dopples.filter(x => x.category === 3) : Array(9).fill({})).map((x, i) =>
              <DoppleCard key={i} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
