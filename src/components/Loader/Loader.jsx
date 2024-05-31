import { DNA } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" />
    </div>
  );
};

export default Loader;
