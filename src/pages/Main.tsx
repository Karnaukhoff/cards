import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../api';
import { setAllData, setFilter, setFilteredData } from '../store/dataSlice';
import Card from '../components/Cards';
import * as S from './styles/MainStyles';

// Define the types for the items in your data
interface Item {
  id: number; // Changed to number
  title: string;
  description: string;
  images: string[];
}

// Define the shape of the Redux state
interface RootState {
  data: {
    filter: 'all' | 'liked';
    all: Item[];
    filtered: Item[];
    deleted: string;
  };
}

const Main: React.FC = () => {
  const filter = useSelector((state: RootState) => state.data.filter);
  const data = useSelector((state: RootState) => state.data.all);
  const filtered = useSelector((state: RootState) => state.data.filtered);
  const deletedMode = useSelector((state: RootState) => state.data.deleted);

  const dispatch = useDispatch();

  const [show, setShow] = useState<Item[]>(data);
  const [favourite, setFavourite] = useState<Item[]>(() => {
    const savedFavourites = localStorage.getItem('favourite');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value as 'all' | 'liked'));
  };

  const addCard = (newCard: Item) => {
    setFavourite((prevArray) => {
      const updatedFavourites = [...prevArray, newCard];
      localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const removeCard = (deleteCard: Item) => {
    setFavourite((prevArray) => {
      const updatedFavourites = prevArray.filter((item) => item.id !== deleteCard.id);
      localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  useEffect(() => {
    dispatch(setFilteredData(favourite));
  }, [favourite, dispatch]);

  useEffect(() => {
    getInfo().then((data) => {
      // Convert id from string to number
      const normalizedData = data.map((item: any) => ({
        ...item,
        id: parseInt(item.id, 10),
      }));
      dispatch(setAllData(normalizedData));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filter === 'all') setShow(data);
    else setShow(filtered);
    // eslint-disable-next-line
  }, [filter, filtered, data]);

  return (
    <>
      <S.FilterContainer>
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === 'all'}
            onChange={handleFilterChange}
          />
          Show All
        </label>
        <label>
          <input
            type="radio"
            value="liked"
            checked={filter === 'liked'}
            onChange={handleFilterChange}
          />
          Show Liked
        </label>
      </S.FilterContainer>
      <S.List>
        {show.map((item) => (
          <li key={item.id}>
            <Card
              title={item.title}
              description={item.description}
              imageUrl={item.images[0]}
              id={item.id}
              onAddCard={addCard}
              item={item}
              removeCard={removeCard}
              favourite={favourite}
              filter={filter}
            />
          </li>
        ))}
        {show.length === 0 && deletedMode === 'active' && filter === 'all' && <p>Все карточки удалены</p>}
        {show.length === 0 && deletedMode === '' && filter === 'all' && <p>Загрузка...</p>}
        {filtered.length === 0 && filter === 'liked' && <p>Ничего не найдено...</p>}
      </S.List>
    </>
  );
};

export default Main;
