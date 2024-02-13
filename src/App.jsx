import { useState, createContext, useContext, useRef } from 'react';
import './App.css'

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);
/*
Implement a feature to allow item selection with the following requirements:
  1. Clicking an item selects/unselects it.
  2. Multiple items can be selected at a time.
  3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
  4. Currently selected items should be visually highlighted.
  5. Currently selected items' names should be shown at the top of the page.

Feel free to change the component structure at will.
*/
const SelectedItemsContext = createContext(null);

function SelectedItemsContextProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

function SelectedItemsHeader() {
  const { selectedItems } = useContext(SelectedItemsContext);
  return (
    <ul className="Header__list">
      {selectedItems.map(item => (
        <li className="Header__list--item" key={item.name}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

function ListItem({ item }) {
  const { setSelectedItems, selectedItems } = useContext(SelectedItemsContext);
  const liRef = useRef();
  const isSelected = selectedItems.includes(item);

  const handleClick = () => {
    if (isSelected) {
      const newItems = selectedItems.filter(arrayItem => arrayItem.name !== item.name);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    liRef.current.classList.toggle("selected");
  };

  return (
    <li
      className={`List__item List__item--${item.color}`}
      ref={liRef}
    >
      <button
        className="List__item--btn"
        onClick={handleClick}
      >
        {item.name}
      </button>
    </li>
  );
}


function List() {
  return (
    <SelectedItemsContextProvider>
      <header className="Header">
        <h2>Selected items</h2>
        <SelectedItemsHeader />
      </header>
      <ul className="List">
        {items.map(item => (
          <ListItem key={item.name} item={item} />
        ))}
      </ul>
    </SelectedItemsContextProvider>
  );
}

export default List
