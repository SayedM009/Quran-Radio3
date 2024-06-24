import { useMainContext } from "../contexts/MainContext";
import ReusableTypes from "./ReusableTypes";
import ErrorPopup from "./ErrorPopup";
import SubNavigation from "./SubNavigation";
import Spinner from "./Spinner";

export default function Channels() {
  const {
    channelTypes,
    selectedChannelType,
    selectedChannelValues,
    isLoading,
    selectedChannelVoice,
  } = useMainContext();
  return (
    <div className="bg-zinc-700	 col-start-1	col-end-5	row-span-8 rounded-xl md:col-start-2">
      <SubNavigation />
      {channelTypes.length > 0 && (
        <ReusableTypes
          iterator={channelTypes}
          selectedOption={selectedChannelType}
          dispatchType="setSelectedChannelType"
          outContainerStyleClass={
            "m-auto p-2 gap-2 flex justify-center mt-10 overflow-x-scroll md:overflow-hidden whitespace-nowrap flex-wrap w-[90%] mt-5"
          }
          innerContainerStyleClass="flex justify-center"
          headingTile="Channels Type"
          headingStyleClass="text-white md:w-screen font-light text-2xl ml-5 md:mt-[100px]"
          boxStyleClass="mt-5 md:h-[100px] md:w-[100px]"
        />
      )}

      <div className="mt-10 m-auto ">
        {isLoading && selectedChannelType.length > 0 && <Spinner />}
      </div>
      {!isLoading && (
        <ReusableTypes
          iterator={selectedChannelValues}
          iteratorTarget="name"
          selectedOption={selectedChannelVoice}
          dispatchType="setSelectedChannelVoice"
          outContainerStyleClass={
            "m-auto p-2 gap-2 flex justify-center mt-10  whitespace-nowrap flex-wrap w-[90%]"
          }
          headingTile={
            selectedChannelType
              ? selectedChannelType[0].toUpperCase() +
                selectedChannelType.slice(1)
              : selectedChannelType
          }
          headingStyleClass="text-white text-white md:w-screen font-light text-2xl ml-5"
          // boxStyleClass="mt-5 h-[100px]"
        />
      )}
      <ErrorPopup />
    </div>
  );
}
