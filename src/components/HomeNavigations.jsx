import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
export default function Navigations() {
  return (
    <>
      <Logo />
      <div className="bg-zinc-700	 col-span-1  row-start-2	 rounded-xl flex items-center flex-wrap	content-evenly p-3 hidden md:block">
        <div className="flex items-center	w-full  cursor-pointer	">
          <FontAwesomeIcon
            icon={all.faHouse}
            size="lg"
            className="text-white"
          />
          <h2 className="text-white ml-3 text-base	">Home</h2>
        </div>
        <div className="flex items-center	 cursor-pointer	">
          <FontAwesomeIcon
            icon={all.faMagnifyingGlass}
            size="lg"
            className="text-white"
          />
          <h2 className="text-white ml-3 text-base	">Search</h2>
        </div>
      </div>
    </>
  );
}
