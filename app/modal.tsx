import React, { useState } from 'react';
import AddMenuScreen from '../screens/AddMenuScreen';

export default function ModalScreen () {
  const [menuItems, setMenuItems] = useState([]);

  return (
    <AddMenuScreen menuItems={menuItems} setMenuItems={setMenuItems} />
  );
}
