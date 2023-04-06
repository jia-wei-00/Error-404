import React from 'react';
import '../styles/components/details-modal.scss';
import Popup from 'reactjs-popup';

const Modal = () => {
  return (
    <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal //Center the pop-up
    nested //Not yet sure what this does
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="content">
          <div className='box-main'><div>Crypto Box</div></div>
          <div className='box-1'><div>Box 1</div></div>
          <div className='box-2'><div>Box 2</div></div>
          <div className='box-3'><div>Box 3</div></div>
          <div className='box-4'><div>Box 4</div></div>
        </div>
      </div>
    )}
  </Popup>
  )
}

export default Modal


