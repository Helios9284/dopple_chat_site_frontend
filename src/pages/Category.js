import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { categories, routeCategories, subcategories } from "../config";
import { arrange, getFeaturedByCategory, groupArr, sortByVolume } from "../utilities/format";
import axios from "../utilities/axiosConfig";
import DoppleCard from "../components/DoppleCard";
import ChartCard from "../components/ChartCard";
import useWindowDimensions from "../hooks/useDimensions";
import FeaturedDoppleCard from "../components/FeaturedDoppleCard";
import * as anim1_1 from '../animations/Hover/Characters Hover Default.json';
import * as anim1_2 from '../animations/Hover/Characters Hover Selected.json';

import * as anim2_1 from '../animations/Hover/Companions Hover Default.json';
import * as anim2_2 from '../animations/Hover/Companions Hover Selected.json';

import * as anim3_1 from '../animations/Hover/Mentors Hover Default.json';
import * as anim3_2 from '../animations/Hover/Mentors Hover Selected.json';

import * as anim4_1 from '../animations/Hover/Assistant Hover Default.json';
import * as anim4_2 from '../animations/Hover/Assistant Hover Selected.json';

import 'swiper/css';
import Lottie from "react-lottie";
import { RefContext } from "../contexts/RefContextProvider";

const Row = ({ title, doppleArr = [] }) => {
  const nav = useNavigate();
  const { width: screenWidth } = useWindowDimensions();
  const [openArrow, setOpenArrow] = useState(false)
  const ref = useRef();
  const prev = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft - (screenWidth - 40), behavior: 'smooth' });
  }
  const next = (ref) => {
    ref.current.scrollTo({ left: ref.current.scrollLeft + (screenWidth - 40), behavior: 'smooth' });
  }
  const openProfile = (data) => {
    if (data._id) {
      nav("/profile/" + data._id)
      document.body.scrollTop = 0;
    }
  }
  return (
    <>
      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-semibold text-[22px] leading-[22px]">{title}</span>
      </div>
      <div className="relative" onMouseEnter={() => setOpenArrow(true)} onMouseLeave={() => setOpenArrow(false)}>
        <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 left-[10px] xl:left-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => prev(ref)} aria-label="Prev">
          <svg className="w-2 xl:w-auto xl:-ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
            <path d="M12 3L3 12L12 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={"hidden md:flex justify-center items-center w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full bg-white shadow-lg3 absolute top-1/2 right-[10px] xl:right-[35px] -translate-y-1/2 z-[1] transition-all text-button hover:text-blue2 " + (openArrow ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => next(ref)} aria-label="Next">
          <svg className="w-2 xl:w-auto xl:-mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 15 24" fill="none" stroke="currentColor">
            <path d="M3 3L12 12L3 21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="px-5 xl:px-0 xl:mx-[60px] pb-[30px] overflow-auto scrollbar" ref={ref}>
          <div className="flex space-x-[5px] mt-[15px]">
            {doppleArr.map((x, j) =>
              <DoppleCard key={j} action={() => openProfile(x)} data={x} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const Category = () => {
  const nav = useNavigate()
  const { key } = useParams();
  const { dopples: _dopples } = useContext(RefContext)
  const dopples = [..._dopples]
  const matchesMD = useMediaQuery('(min-width:768px)');
  const [doppleCategory, setDoppleCategory] = useState()
  const [filteredDopples] = useState(dopples)
  const [featuredDopples, setFeaturedDopples] = useState([])
  const [featured, setFeatured] = useState(Array(4).fill({}))
  const [elastic, setElastic] = useState("none");
  const [loaded, setLoaded] = useState(false);
  const [animsIn, setAnimsIn] = useState([false, false, false, false]);
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
      animationData: doppleCategory === 0 ? anim1_2 : anim1_1,
    },
    {
      ...defaultOption,
      animationData: doppleCategory === 1 ? anim2_2 : anim2_1,
    },
    {
      ...defaultOption,
      animationData: doppleCategory === 2 ? anim3_2 : anim3_1,
    },
    {
      ...defaultOption,
      animationData: doppleCategory === 3 ? anim4_2 : anim4_1,
    },
  ]
  // const animsOptionSelected = [
  //   {
  //     ...defaultOption,
  //     animationData: anim1_4,
  //   },
  //   {
  //     ...defaultOption,
  //     animationData: anim2_4,
  //   },
  //   {
  //     ...defaultOption,
  //     animationData: anim3_4,
  //   },
  //   {
  //     ...defaultOption,
  //     animationData: anim4_4,
  //   },
  // ]

  const mouseEnter = (entered, i) => {
    let tmp = [...animsIn]
    tmp[i] = entered
    setAnimsIn(tmp)
  }
  const openProfile = (data) => {
    if(data._id) nav("/profile/" + data._id)
  }
  const chooseDoppleCateogry = (i) => {
    if (i === "all") nav("/")
    else nav("/category/" + i)
  }

  useMemo(async () => {
    const { data: { data: featuredTmp } } = await axios.get("/dopple/featured")
    setFeaturedDopples(featuredTmp)

    setLoaded(true)
  }, [])
  useEffect(() => {
    if (key === "all") {
      setDoppleCategory("all")
    }
    else if (routeCategories[key] >= 0 && routeCategories[key] <= 3)
      setDoppleCategory(routeCategories[key])
    else {
      nav("/")
    }
  }, [key])
  useMemo(async () => {
    if (featuredDopples?.length > 0)
      setFeatured((doppleCategory === "all" ? getFeaturedByCategory(featuredDopples) : featuredDopples.filter(x => x.category === doppleCategory).filter((x, i) => i >= 0 && i <= 3)))
  }, [doppleCategory, featuredDopples])
  return (
    <div className="pt-[15px] md:pt-[30px]">
      <div className="flex items-center space-x-[12.5px] md:space-x-[15px] font-medium text-[14px] leading-[17px] mb-[15px] md:mb-[24.4px]">
        <div className="flex items-center space-x-[5px] pl-5 xl:px-[60px] overflow-auto category-container">
          <button className={"flex items-center space-x-[5px] border border-black12 rounded-[5px] px-[17px] h-[45px] min-w-fit hover:bg-black12 transition" + (doppleCategory === "all" ? " bg-black12" : "")} onClick={() => chooseDoppleCateogry("all")}>
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

      <span className="font-bold text-[22px] leading-[22px] px-5 xl:px-[60px]">Featured {(doppleCategory !== undefined && doppleCategory === "all") ? "Dopples" : categories[doppleCategory]?.namePlural}</span>
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
        <span className="font-semibold text-[22px] leading-[22px]">Top {doppleCategory !== null && doppleCategory !== undefined ? (doppleCategory === "all" ? "Dopples" : categories[doppleCategory].namePlural) : null}</span>
        <Link className="text-blue2 font-medium text-[14px] leading-[17px] transition hover:text-white" to="/topcharts">See all</Link>
      </div>
      {matchesMD ?
        <div className="mt-4 pl-5 xl:px-[60px] pb-[30px] relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            className="ranking-container"
          >
            {groupArr(loaded ? arrange(doppleCategory === "all" ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)) : Array(9).fill({}), 9).map((x, i) => {
              return (
                <SwiperSlide className="ranking-table">
                  <div className="flex space-x-[30px] w-full" key={i}>
                    {groupArr(x, 3).map((y, j) =>
                      <div className="flex flex-col space-y-[10px] flex-1" key={j}>
                        {y.map((z, k) =>
                        (z !== "empty" &&
                          <>
                            <ChartCard action={() => openProfile(z)} data={z} index={i * 9 + j * 3 + k + 1} />
                            {k < 2 &&
                              <div className="w-full h-[1px] bg-black5" />
                            }
                          </>
                        )
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        :
        <div className="mt-4 pl-5 xl:px-[60px] pb-[30px] relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            className={"ranking-container " + (elastic === "left" ? `translate-x-[5px]` : elastic === "right" ? `translate-x-[-5px]` : "translate-x-[0px]")}
            onSlideChange={e => {
              setElastic(e.activeIndex < e.previousIndex ? "left" : "right")
              setTimeout(() => setElastic("none"), 400)
            }}
          >
            {Array(loaded ? Math.ceil((doppleCategory === "all" ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)).length / 3) : 3).fill("").map((x, i) => {
              return (
                <SwiperSlide className="ranking-table">
                  <div className="flex flex-col space-y-[10px]" key={i}>
                    {(loaded ? (doppleCategory === "all" ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)).filter((x, j) => (j >= i * 3 && j <= i * 3 + 2)) : Array(3).fill({})).map((k, j) =>
                      <>
                        <ChartCard action={() => openProfile(k)} data={k} index={i * 3 + j + 1} />
                        {j < 2 &&
                          <div className="w-full h-[1px] bg-black5" />
                        }
                      </>
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      }

      {doppleCategory === "all" ?
        categories.map((x, i) =>
          subcategories[i].map((y, j) =>
            filteredDopples.filter(x => x.category === i && x.subcategory === j).length > 0 ?
              <Row title={y} doppleArr={filteredDopples.filter(x => x.category === i && x.subcategory === j)} />
              :
              <></>
          )
        )
        :
        (typeof doppleCategory === "number" && subcategories[doppleCategory].map((x, i) =>
          filteredDopples.filter(x => x.category === doppleCategory && x.subcategory === i).length > 0 ?
            <Row title={x} doppleArr={filteredDopples.filter(x => x.category === doppleCategory && x.subcategory === i)} />
            :
            <></>
        ))
      }
    </div>
  );
};

export default Category;
