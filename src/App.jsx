/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "@fontsource/open-sauce-sans/300.css";
import "@fontsource/open-sauce-sans/400.css";
import "@fontsource/open-sauce-sans/500.css";
import "@fontsource/open-sauce-sans/600.css";
import "@fontsource/open-sauce-sans/700.css";
import "@fontsource/open-sauce-sans/800.css";
import "@fontsource/open-sauce-sans/900.css";

import Navigations from "./components/HomeNavigations";
import Library from "./components/Library";
import Player from "./components/Player";
import Channels from "./components/Channels";
import { MainProvider } from "./contexts/MainContext";

function App() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (!language) return;
    const [link] = languages.filter((l) =>
      l.native === language ? l.radios : ""
    );
    const Quran = async function () {
      const res = await fetch(`${link.radios}`);
      const data = await res.json();
      console.log(data);
    };
    Quran();
  }, [language]);

  if (!languages) return;
  return (
    <div className="h-[90vh] md:h-[97vh] bg-black m-2 rounded-xl grid grid-cols-4	grid-rows-8 p-4 gap-2">
      {/* {languages.map((language, i) => (
        <Language lang={language.native} selectLang={setLanguage} key={i} />
      ))} */}
      <MainProvider>
        <Navigations />
        <Channels />
        <Library />
        <Player />
      </MainProvider>
    </div>
  );
}

// function Language({ lang, selectLang }) {
//   function handleClicking() {
//     selectLang(lang);
//   }
//   return (
//     <button
//       onClick={handleClicking}
//       className="w-40	 h-auto bg-slate-800	text-zinc-300	mr-6 rounded-none p-3 mb-4 mt-4"
//     >
//       {lang}
//     </button>
//   );
// }

export default App;
