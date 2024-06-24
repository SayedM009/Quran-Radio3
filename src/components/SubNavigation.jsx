/* eslint-disable react/prop-types */
import { useMainContext } from "../contexts/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import styles from "./componentsModules/SubNavigation.module.css";
import Spinner from "./Spinner";
import ReusableTypes from "./ReusableTypes";

function SubNavigation() {
  // Main Context
  const { languages, isLoading, selectedLanguage } = useMainContext();

  return (
    <>
      <div className=" mx-5 mt-5 flex items-center justify-between lg:h-[60px]">
        {/* Back & Forward */}
        <div className=" gap-2 hidden md:flex">
          <span
            className={`${styles.arrowHover} bg-zinc-600 w-[50px] h-[50px] inline-block rounded-full flex justify-center items-center cursor-pointer`}
          >
            <FontAwesomeIcon icon={all.faChevronLeft} className="text-white" />
          </span>
          <span
            className={`${styles.arrowHover} bg-zinc-600 w-[50px] h-[50px] inline-block rounded-full flex justify-center items-center cursor-pointer`}
          >
            <FontAwesomeIcon
              icon={all.faChevronRight}
              className="text-white  p-4 rounded-full"
            />
          </span>
        </div>

        {/* {isLoading && <Spinner />} */}
        {isLoading && languages.length == 0 && <Spinner />}
        {/* Select Language */}
        <ReusableTypes
          iterator={languages}
          selectedOption={selectedLanguage}
          dispatchType="setLang"
          outContainerStyleClass={
            "lg:w-[50%] p-2 flex  whitespace-nowrap md:w-[30%] "
          }
          // headingTile="Languages"
          // headingStyleClass="text-white  font-light text-2xl  mb-5"
        />
        {/* Perimum & App Installation & User Profile */}
        <div className=" hidden md:flex gap-3 items-center">
          <div className="bg-white p-2 rounded-3xl font-bold cursor-pointer">
            Explore Premium
          </div>
          <div className="bg-black text-white p-2 rounded-3xl cursor-pointer">
            Install App
          </div>
          <div className="bg-violet-700 p-2 rounded-full w-[40px] h-[40px] text-center font-bold text-xl cursor-pointer">
            S
          </div>
        </div>
      </div>
    </>
  );
}

export default SubNavigation;
