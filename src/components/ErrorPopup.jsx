import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as all from "@fortawesome/free-solid-svg-icons";
import styles from "./componentsModules/ErrorPopup.module.css";
import { useMainContext } from "../contexts/MainContext";
function ErrorPopup() {
  const { isError, errorMessage, dispatch } = useMainContext();
  return (
    <div
      className={`${
        isError && styles.errorIn
      } bg-red-400 min-w-[15rem]	md:w-[20rem]  border-l-[10px] border-solid border-red-600 text-black justify-between h-[60px] text-center items-center absolute top-10 right-[-100%]  ${
        isError ? "flex" : "hidden"
      }`}
    >
      <p className="ml-2">{errorMessage}</p>
      <FontAwesomeIcon
        icon={all.faXmark}
        className="text-white text-[20px]  absolute top-2 right-2 cursor-pointer"
        onClick={() => dispatch({ type: "disableErrorMessage" })}
      />
    </div>
  );
}

export default ErrorPopup;
