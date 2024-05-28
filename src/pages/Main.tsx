import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getInfo } from '../api';
import { setAllData, setFilter } from '../store/dataSlice';
import Card from '../components/Cards';

const Main: React.FC = () => {
    const filter = useSelector((state: any) => state.data.filter)
    const data = useSelector((state: any) => state.data.all)
    const filtered = useSelector((state: any) => state.data.filtered)
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter(event.target.value as 'all' | 'liked'));
    };
  
    const dispatch = useDispatch();
    const [show, setShow] = useState<any>(data);
    
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
    `
  
    useEffect(() => {
      getInfo().then((data) => {
        dispatch(setAllData(data))
        setShow(data)
    }
    );
      // eslint-disable-next-line
    }, [])
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
                <Card title={item?.title} description={item?.description} imageUrl={item?.images[0]} key={item.id}/>
              </li>
            );
          })
        }
        {
          (filtered.length === 0 && filter === "liked") ? <p>Ничего не найдено...</p> : null
        }
        
      </List>
      </>
      
    );
}
export default Main;