import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "../contexts/MainContext";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);
  const { selectedChannelVoiceValues } = useMainContext();
  const [value, setValue] = useState("");
  const audioRef = useRef(null);
  const { selectedChannelVoice, selectedChannelType } = useMainContext();
  useEffect(() => {
    if (!selectedChannelVoiceValues) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setValue(selectedChannelVoiceValues);
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectedChannelVoiceValues]);

  // Handle Playing
  function handlePlaying() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  return (
    <div className="bg-black col-span-4  row-span-6 rounded-xl md:grid grid-cols-3	 items-center ">
      {/* Music Summary */}
      <div className="col-span-1 flex items-center hidden md:flex">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
          alt="user-icon"
          className="w-[40px] rounded-full mr-5"
        ></img>
        <div className="info">
          <h4 className="text-white font-bold">
            {selectedChannelVoice ? selectedChannelVoice : "Select a  Voice"}
          </h4>
          <p className="text-white text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
      </div>
      {/* Player Settings */}
      <div className="md:col-span-1 flex flex-wrap justify-center">
        <div className="flex justify-between  md:w-[20%] m-auto gap-2 mt-2 md:mt-5 md:mt-auto">
          <FontAwesomeIcon
            icon={all.faShuffle}
            className="text-white cursor-pointer"
            title="Random"
            size="lg"
          />
          <FontAwesomeIcon
            icon={all.faBackwardStep}
            className="text-white cursor-pointer"
            title="Previous"
            size="lg"
          />
          {isPlaying ? (
            <FontAwesomeIcon
              icon={all.faPause}
              className="text-white cursor-pointer"
              title="Pause"
              onClick={handlePlaying}
              size="lg"
            />
          ) : (
            <FontAwesomeIcon
              icon={all.faPlay}
              className="text-white cursor-pointer"
              title="Play"
              onClick={handlePlaying}
              size="lg"
            />
          )}
          {/*  */}

          <FontAwesomeIcon
            icon={all.faForwardStep}
            className="text-white cursor-pointer"
            title="Next"
            size="lg"
          />
          <FontAwesomeIcon
            icon={all.faRepeat}
            className="text-white cursor-pointer"
            title="Repeat"
            size="lg"
          />
        </div>
        {selectedChannelType !== "radios" && (
          <div className="bg-white h-[2px] mt-4 w-[100%] mx-auto">
            <div className="w-[20px] bg-red-700 h-[2px]"></div>
            <div></div>
          </div>
        )}

        <audio ref={audioRef} src={`${value}`} autoPlay={isPlaying} />
      </div>
      {/* Volum & Screen */}
      <div className="col-span-1 text-white text-right hidden md:block">
        <FontAwesomeIcon
          icon={all.faVolumeHigh}
          className="mr-5 cursor-pointer"
          title="Volum"
        />
        <FontAwesomeIcon
          icon={all.faUpRightAndDownLeftFromCenter}
          className="text-white cursor-pointer	"
          title="Full-Screen"
        />
      </div>
    </div>
  );
}
