import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getInfo } from '../api';
import { setAllData, setFilter, setFilteredData } from '../store/dataSlice';
import Card from '../components/Cards';

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

    const FilterContainer = styled.div`
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
  `;
    const List = styled.div`
      max-width: 1175px;
      width: 100%;
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: (270px);
          grid-template-columns: repeat(4, 270px);
      grid-auto-rows: 441px;
      grid-gap: 80px 26px;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      scrollbar-color: #FFFFFF #2E2E2E;
      scrollbar-width: thin;
      scrollbar-width: 0px;
      height: 922px;
      &::-webkit-scrollbar {
          width: 0px;
          background-color: #009EE4;
      }
      &::-webkit-scrollbar-thumb {
          background-color: #0080C1;
          border-radius: 3px;
      }
      list-style: none;
    `;
  
    useEffect(() => {
      getInfo().then((data) => {
        dispatch(setAllData(data))
        setShow(data)
    }
    );
      // eslint-disable-next-line
    }, [])
    useEffect(() =>  {
      setShow(data)
    }, [data])
    useEffect(() => {
      if (filter === "all") setShow(data)
        else setShow(filtered)
      // eslint-disable-next-line
    }, [filter])
  
    return (
      <>
      <FilterContainer>
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
      </FilterContainer>
      <List >
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
        
      </List>
      </>
      
    );
}
export default Main;