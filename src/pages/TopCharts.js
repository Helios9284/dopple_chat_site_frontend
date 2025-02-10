import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../config";
import { useMediaQuery } from "@mui/material";
import axios from "../utilities/axiosConfig";
import ChartCard from "../components/ChartCard";
import { sortByVolume } from "../utilities/format";

const TopCharts = () => {
  const nav = useNavigate()
  const matches = useMediaQuery('(min-width:768px)');
  const [doppleCategory, setDoppleCategory] = useState(-1)
  const [dopples, setDopples] = useState(Array(9).fill({}))

  const openProfile = (data) => {
    if (data._id) nav("/profile/"+data._id)
  }
  const chooseDoppleCateogry = (i) => {
    setDoppleCategory(i)
  }
  useMemo(async () => {
    const { data: { data } } = await axios.get("/dopple")
    setDopples(data)
  }, [])
  return (
    <div className="pt-[15px] md:pt-[30px]">
      <div className="flex items-center space-x-[12.5px] md:space-x-[15px] font-medium text-[14px] leading-[17px] mb-[15px] md:mb-[24.4px]">
        <div className="flex items-center space-x-[5px] pl-5 xl:px-[60px] overflow-auto category-container">
          <button className={"flex items-center space-x-[5px] border border-black12 rounded-[5px] px-[17px] h-[45px] min-w-fit hover:bg-black12 transition" + (doppleCategory === -1 ? " bg-black12" : "")} onClick={() => chooseDoppleCateogry(-1)}>
            <span>All</span>
          </button>
          {categories.map((x, i) =>
            <button className={"flex items-center space-x-[5px] border border-black12 rounded-[5px] px-[17px] h-[45px] min-w-fit hover:bg-black12 transition" + (doppleCategory === i ? " bg-black12" : "")} onClick={() => chooseDoppleCateogry(i)} key={i}>
              <img src={x.image} alt="" />
              <span>{x.namePlural}</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center px-5 xl:px-[60px]">
        <span className="font-semibold text-[22px] leading-[22px]">Top {doppleCategory === -1 ? "Dopples" : categories[doppleCategory].namePlural}</span>
      </div>
      <div className={"flex items-start space-x-[10px] md:space-x-[30px] mt-[17px] md:mt-[15px] pl-5 pb-[30px] xl:px-[60px] overflow-auto" + (matches ? " topcharts-main topchart-main" : "")}>
        {matches ?
          Array(Math.ceil((doppleCategory === -1 ? sortByVolume(dopples) : dopples.filter((x, i) => x.category === doppleCategory)).length / 6)).fill("").map((x, i) => {
            return (
              <div className="flex flex-col space-y-[10px] min-w-[calc(100vw-40px)] md:min-w-[420px]" key={i}>
                {(doppleCategory === -1 ? sortByVolume(dopples) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory))).filter((x, j) => (j >= i * 6 && j <= i * 6 + 5)).map((k, j) =>
                  <>
                    <ChartCard action={() => openProfile(k)} data={k} index={i * 6 + j + 1} />
                    {j < 5 &&
                      <div className="w-full h-[1px] bg-black5" />
                    }
                  </>
                )}
              </div>
            )
          })
          :
          <div className="flex flex-col space-y-[10px] w-[calc(100%-20px)]">
            {(doppleCategory === -1 ? sortByVolume(dopples) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory))).map((x, i) =>
              <>
                <ChartCard action={() => openProfile(x)} data={x} index={i + 1} />
                {i < (doppleCategory === -1 ? sortByVolume(dopples) : sortByVolume(dopples.filter((x, i) => x.category === doppleCategory))).length - 1 &&
                  <div className="w-full h-[1px] bg-black5" />
                }
              </>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default TopCharts;
