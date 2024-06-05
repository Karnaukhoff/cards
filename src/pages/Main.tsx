import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getInfo } from '../api';
import { setAllData, setFilter, setFilteredData } from '../store/dataSlice';
import Card from '../components/Cards';
import * as S from "./styles/MainStyles";

const Main: React.FC = () => {
    const filter = useSelector((state: any) => state.data.filter)
    const data = useSelector((state: any) => state.data.all)
    const filtered = useSelector((state: any) => state.data.filtered)
    const deletedMode = useSelector((state: any) => state.data.deleted)
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter(event.target.value as 'all' | 'liked'));
    };
  
    const dispatch = useDispatch();
    const [show, setShow] = useState<any>(data);
    const [favourite, setFavourite] = useState<any>(() => {
      const savedFavourites = localStorage.getItem('favourite');
      return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    const addCard = (newCard: any) => {
      setFavourite((prevArray: any) => {
        const updatedFavourites = [...prevArray, newCard];
        localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
        return updatedFavourites;
      });
    };
    const removeCard = (deleteCard: any) => {
      setFavourite((prevArray: any) => {
        const updatedFavourites = prevArray.filter((item: any) => item.id !== deleteCard.id);
        localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
        return updatedFavourites;
      });
    };
    
    useEffect(() => {
      dispatch(setFilteredData(favourite));
    }, [favourite, dispatch]);
  
    useEffect(() => {
      getInfo().then((data) => {
        dispatch(setAllData(data))
    });
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (filter === "all") setShow(data)
      else setShow(filtered)
      // eslint-disable-next-line
    }, [filter, filtered, data])
  
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
      <S.List >
        {
          show.map((item: any) => {
            return (
              <li key={item.id}>
                <Card title={item?.title} description={item?.description} imageUrl={item?.images[0]} key={item.id} id={item.id} onAddCard={addCard} item={item} removeCard={removeCard} favourite={favourite} filter={filter}/>
              </li>
            );
          })
        }
        {
          show.length === 0 && deletedMode === 'active' && filter === "all" ? <p>Все карточки удалены</p> : ""
        }
        {
          show.length === 0 && deletedMode === '' && filter === "all" ? <p>Загрузка...</p> : ""
        }
        {
          filtered.length === 0 && filter === "liked" ? <p>Ничего не найдено...</p> : null
        }
        
      </S.List>
      </>
      
    );
}
export default Main;