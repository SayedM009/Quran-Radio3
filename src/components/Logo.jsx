import styles from "./componentsModules/Logo.module.css";
function Logo() {
  return (
    <div className="bg-zinc-700 col-span-4 md:col-span-1  row-span-1 flex justify-center items-center text-center rounded-xl p-3 ">
      <h1 className={`${styles.logo} 	      tracking-widest 	`}>QURAN</h1>
    </div>
  );
}

export default Logo;
