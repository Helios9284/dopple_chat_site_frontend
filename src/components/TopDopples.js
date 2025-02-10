import { useMediaQuery } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { arrange, groupArr, sortByVolume } from "../utilities/format";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import ChartCard from "./ChartCard";
import { RefContext } from "../contexts/RefContextProvider";

const TopDopples = ({ loaded, doppleCategory }) => {
    const { dopples: _dopples } = useContext(RefContext)
    const dopples = [..._dopples]
    const nav = useNavigate();
    const matchesMD = useMediaQuery('(min-width:768px)');
    const [elastic, setElastic] = useState("none");

    const openProfile = (data) => {
        if (data._id) {
            nav("/profile/" + data._id)
            document.body.scrollTop = 0;
        }
    }

    return (
        matchesMD ?
            <div className="mt-4 pl-5 xl:px-[60px] pb-[30px] relative">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    className="ranking-container"
                >
                    {groupArr(dopples.length > 0 ? arrange(doppleCategory === -1 ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)) : Array(9).fill({}), 9).map((x, i) => {
                        return (
                            <SwiperSlide className="ranking-table" key={i}>
                                <div className="flex space-x-[30px] w-full" key={i}>
                                    {groupArr(x, 3).map((y, j) =>
                                        <div className="flex flex-col space-y-[10px] flex-1" key={j}>
                                            {y.map((z, k) =>
                                            (z !== "empty" &&
                                                <Fragment key={k}>
                                                    <ChartCard action={() => openProfile(z)} data={z} index={i * 9 + j * 3 + k + 1} key={k} />
                                                    {k < 2 &&
                                                        <div className="w-full h-[1px] bg-black5" />
                                                    }
                                                </Fragment>
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
                    {Array(loaded ? Math.ceil((doppleCategory === -1 ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)).length / 3) : 3).fill("").map((x, i) => {
                        return (
                            <SwiperSlide className="ranking-table" key={i}>
                                <div className="flex flex-col space-y-[10px]" key={i}>
                                    {(loaded ? (doppleCategory === -1 ? sortByVolume(dopples).filter((x, i) => i >= 0 && i <= 8) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory)).filter((x, i) => i >= 0 && i <= 8)).filter((x, j) => (j >= i * 3 && j <= i * 3 + 2)) : Array(3).fill({})).map((k, j) =>
                                        <>
                                            <ChartCard action={() => openProfile(k)} data={k} index={i * 3 + j + 1} key={j} />
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
    )
}

export default TopDopples;