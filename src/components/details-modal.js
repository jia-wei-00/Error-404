import React from "react";
import "../styles/components/details-modal.scss";
import Popup from "reactjs-popup";
import { observer } from "mobx-react-lite";
import { apiStore } from "../store";

const DetailsModal = (test_data) => {
  console.log(test_data.test);
  return (
    <div className="content">
      <div className="box-main">
        <div>Crypto</div>
      </div>
      <div className="box-1">
        <div>Box 1</div>
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

export default observer(DetailsModal);
