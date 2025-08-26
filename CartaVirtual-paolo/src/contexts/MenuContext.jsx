import { createContext, useContext, useState, useEffect } from 'react';
import { menu as initialMenu } from '../data/menu';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(initialMenu);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (newItem) => {
    const id = Math.max(0, ...menu.map(item => item.id)) + 1;
    setMenu([...menu, { ...newItem, id }]);
  };

  const updateItem = (id, updatedItem) => {
    setMenu(menu.map(item => (item.id === id ? { ...updatedItem, id } : item)));
  };

  const deleteItem = (id) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingItem(item);
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  return (
    <MenuContext.Provider 
      value={{ 
        menu, 
        addItem, 
        updateItem, 
        deleteItem, 
        editingItem,
        startEditing,
        cancelEditing
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
