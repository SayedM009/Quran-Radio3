/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from "react";

const MainContext = createContext();

const initialValue = {
  languages: [],
  selectedLanguage: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
  fullFetchedObjs: [],
  fullFetchedObj: {},
  channelTypes: [],
  selectedChannelType: "",
  selectedChannelValues: [],
  selectedChannelVoice: "",
  selectedChannelVoiceValues: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setLangs":
      return { ...state, languages: action.payload };
    case "setLang":
      return { ...state, selectedLanguage: action.payload };
    case "setSpinnerStatus":
      return { ...state, isLoading: action.payload };
    case "setErrorMsg":
      return { ...state, isError: true, errorMessage: action.payload };
    case "disableErrorMessage":
      return { ...state, isError: false, errorMessage: "" };
    case "setFullFechedObjs":
      return { ...state, fullFetchedObjs: action.payload };
    case "setFullFechedObj":
      return { ...state, fullFetchedObj: action.payload };
    case "setChannelsType":
      return { ...state, channelTypes: action.payload };
    case "setSelectedChannelType":
      return { ...state, selectedChannelType: action.payload };
    case "setSelectedChannelValues":
      return { ...state, selectedChannelValues: action.payload };
    case "setSelectedChannelVoice":
      return { ...state, selectedChannelVoice: action.payload };
    case "setSelectedChannelVoiceValues":
      return { ...state, selectedChannelVoiceValues: action.payload };
  }
}

function MainProvider({ children }) {
  const [
    {
      languages,
      selectedLanguage,
      isLoading,
      isError,
      errorMessage,
      fullFetchedObjs,
      fullFetchedObj,
      channelTypes,
      selectedChannelType,
      selectedChannelValues,
      selectedChannelVoice,
      selectedChannelVoiceValues,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);

  //   Get Languages from Puplic API
  useEffect(() => {
    // Enable Loading Spinner
    dispatch({ type: "setSpinnerStatus", payload: true });
    const getFetchedLanguages = async function () {
      try {
        const res = await fetch("https://mp3quran.net/api/v3/languages");
        // Throw an Error if did not fetch any value
        if (!res.ok) throw new Error("Something Went Wrong");
        const data = await res.json();
        const { language } = data;
        // Set All Fetched Objects
        dispatch({ type: "setFullFechedObjs", payload: language });
        // Set Languages to initialValue
        dispatch({ type: "setLangs", payload: language.map((l) => l.native) });
      } catch (error) {
        // Enable Error Popup
        dispatch({ type: "setErrorMsg", payload: error.message });
      } finally {
        // Disable Loading Spinner
        dispatch({ type: "setSpinnerStatus", payload: false });
      }
    };
    getFetchedLanguages();
  }, []);

  // Get Different Channels
  useEffect(() => {
    // Condition check if the user select a language or not to continue
    if (!selectedLanguage) return;

    // Filtering objects by selected language
    const channels = fullFetchedObjs.filter(
      (lang) => lang.native === selectedLanguage
    );

    // Set Full Fetched Object
    dispatch({ type: "setFullFechedObj", payload: channels });
    const [OBJ_KEYS] = channels;

    // Set Channels Type [Reciters, Radios]
    dispatch({
      type: "setChannelsType",
      payload: Object.keys(OBJ_KEYS).slice(6, 8),
    });
  }, [selectedLanguage, fullFetchedObjs]);

  // Get Seleted Channel Values
  useEffect(() => {
    // Condition to check if the user select a channel or not to continue
    if (!selectedChannelType) return;
    // Full Selected Object
    const [obj] = fullFetchedObj;
    // Enable Loading Spinner
    dispatch({ type: "setSpinnerStatus", payload: true });
    const selectChannel = async function () {
      try {
        const res = await fetch(`${obj[selectedChannelType]}`);
        const data = await res.json();
        // Set Selected Channel Value
        dispatch({
          type: "setSelectedChannelValues",
          payload: data[Object.keys(data).join("")],
        });
      } catch (error) {
        // Enable Error Popup
        dispatch({ type: "setErrorMsg", payload: error.message });
      } finally {
        // Disable Loading Spinner
        dispatch({ type: "setSpinnerStatus", payload: false });
      }
    };
    selectChannel();
  }, [selectedChannelType, fullFetchedObj]);

  // Get Link of Selected Channel Value
  useEffect(() => {
    if (!selectedChannelVoice) return;
    const [x] = selectedChannelValues.filter(
      (l) => l.name == selectedChannelVoice
    );

    const test = async function () {
      try {
        // Case 01 if ther user selete Reciters
        if (selectedChannelType === "reciters") {
          console.log("ok");
          const [API] = x.moshaf;
          const res = await fetch(`${API.server}`);
          const data = await res.json();
          console.log(data);
        } else {
          dispatch({ type: "setSelectedChannelVoiceValues", payload: x.url });
        }
      } catch {
        console.error();
      }
    };
    test();
  }, [selectedChannelVoice, selectedChannelValues, selectedChannelType]);

  return (
    <MainContext.Provider
      value={{
        languages,
        selectedLanguage,
        isLoading,
        isError,
        errorMessage,
        fullFetchedObjs,
        fullFetchedObj,
        channelTypes,
        selectedChannelType,
        selectedChannelValues,
        selectedChannelVoice,
        selectedChannelVoiceValues,
        dispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

function useMainContext() {
  const context = useContext(MainContext);
  if (context === "undefind")
    throw new Error("Wrong place to call Context API");
  return context;
}

export { MainProvider, useMainContext };
