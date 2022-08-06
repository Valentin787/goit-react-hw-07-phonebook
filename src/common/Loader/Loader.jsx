import { createPortal } from "react-dom";
import HashLoader
 from "react-spinners/HashLoader";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import s from "./Loader.module.css";
const loader = document.querySelector("#loader");


function Loader({loading}) {

  return createPortal(
    <div className={s.wrapLoader}>
      <div className={s.modal}>
        <HashLoader

          height={15}
          width={5}
          radius={2}
          margin={2}
          color={"#7814a0"}
          loading={loading}
          size={80}
        />
      </div>
    </div>,
    loader
  );

}

export default Loader