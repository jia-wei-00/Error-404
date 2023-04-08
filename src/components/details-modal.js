import React from "react";
import "../styles/components/details-modal.scss";
import Popup from "reactjs-popup";
import { observer } from "mobx-react-lite";
import { apiStore } from "../store";

const Modal = ({ popup_index }) => {
  React.useEffect(() => {
    apiStore.fetchDetails(popup_index);
  }, []);
  const coin_details = apiStore.coin_details;
  console.log(coin_details);
  return (
    <div className="content">
      <div className="box-main">
        <div>
          <h1>{coin_details.name}</h1>
          <img src={coin_details.image} />
        </div>
      </div>
      <div className="box-1">
        {/* <div>{coin_details.descript}</div> */}
      </div>
      <div className="box-2">
        <div>Box 2</div>
      </div>
      <div className="box-3">
        <div>Box 3</div>
      </div>
      <div className="box-4">
        <div>Box 4</div>
      </div>
    </div>
  );
};

export default observer(Modal);
