/* 'use client'

import React, { useState } from 'react';
import PopupEnvoltorio from '@/components/Login/PopupEnvoltorio';

const IndexPage = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  const openModal1 = () => {
    setIsModal1Open(true);
  };

  const openModal2 = () => {
    setIsModal2Open(true);
  };

  const openModal3 = () => {
    setIsModal3Open(true);
  };

  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const closeModal2 = () => {
    setIsModal2Open(false);
  };

  const closeModal3 = () => {
    setIsModal3Open(false);
  };

  return (
    <div>
      <h1>Ejemplo de Modales</h1>

      <PopupEnvoltorio title="Modal 1" isOpen={isModal1Open} onClose={closeModal1}>
        <button onClick={closeModal1}>Atras</button>
        <p>Contenido del Modal 1</p>
        <button onClick={openModal2}>Abrir Modal 2</button>
      </PopupEnvoltorio>

      <PopupEnvoltorio title="Modal 2" isOpen={isModal2Open} onClose={closeModal2}>
        <button onClick={closeModal2}>Atras</button>
        <p>Contenido del Modal 2</p>
        <button onClick={openModal3}>Abrir Modal 3</button>
      </PopupEnvoltorio>

      <PopupEnvoltorio title="Modal 3" isOpen={isModal3Open} onClose={closeModal3}>
        <button onClick={closeModal3}>Atras</button>
        <p>Contenido del Modal 3</p>
        <button onClick={openModal1}>Volver a Modal 1</button>
      </PopupEnvoltorio>

      <button onClick={openModal1}>Abrir Modal 1</button>
    </div>
  );
};

export default IndexPage; */

'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ExternalLogin from '@/components/Login/ExternalLogin'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import { openModal1,
  closeModal1,
  openModal2,
  closeModal2,
  openModal3,
  closeModal3 } from '@/redux/Slices/popupSlice';

const IndexPage = () => {
  const dispatch = useDispatch();
  const isModal1Open = useSelector((state) => state.popup.isModal1Open);
  const isModal2Open = useSelector((state) => state.popup.isModal2Open);
  const isModal3Open = useSelector((state) => state.popup.isModal3Open);

  const handleOpenModal1 = () => {
    dispatch(openModal1());
  };

  const handleCloseModal1 = () => {
    dispatch(closeModal1());
  };

  const handleCloseModal2 = () => {
    dispatch(closeModal2());
  };

  const handleCloseModal3 = () => {
    dispatch(closeModal3());
  };

  return (
    <div>
      <h1>Ejemplo de Modales</h1>
      <ExternalLogin open={isModal1Open} close={handleCloseModal1} />
      <Register open={isModal2Open} close={handleCloseModal2} />
      <Login open={isModal3Open} close={handleCloseModal3} />
      <button onClick={handleOpenModal1}>Abrir Modal 1</button>
    </div>
  );
}

export default IndexPage