import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';

function Dropdown({ title, items }) {

    //Constant for dropdown
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dd-wrapper m-auto">

      {/*Display the button of the menu*/}
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title text-center d-flex justify-content-around">
          <h2 className="m-auto header__logo">Konexio</h2>
          <p className="dd-header__title mb-0 m-auto">{title}</p>
        </div>
      </div>

      {/*Display the drop down menu with the links to the Backgrounds*/}
      {open && (
        <div className="dd-list drop_button" id="dropdown_menu">
          {items.map(item => (
            <p className="dd-list-item" key={item.id} id={'Menu_' + item.id}>
                <span>{item.value}</span>
            </p> 
          ))}
        </div>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);