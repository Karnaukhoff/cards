import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInfo } from '../api';
import { setAllData } from '../store/dataSlice';
import * as S from "./styles/CardPageStyles";

// Define the types for the items in your data
interface Item {
  id: number;
  title: string;
  description: string;
  images: string[];
}

// Define the shape of the Redux state
interface RootState {
  data: {
    all: Item[];
  };
}

const CardPage: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.all);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getInfo().then((data) => {
      dispatch(setAllData(data));
    });
    // eslint-disable-next-line
  }, []);

  function findById(id: number): Item | undefined {
    return data.find((card) => card.id === id);
  }

  const delimiter = "/";
  const index = location.pathname.lastIndexOf(delimiter);
  const result = location.pathname.substring(index + 1);

  const card = findById(Number(result));
  console.log(card);

  return (
    <>
      <S.Block>
        <S.BackToCardsButton onClick={() => navigate(`/`)}>back to cards</S.BackToCardsButton>
        {card && <S.Image src={card.images[0]} alt={card.title} />}
        <div className="card-content">
          <h2 className="card-title">{card?.title}</h2>
          <p className="card-description">{card?.description}</p>
        </div>
      </S.Block>
    </>
  );
}

export default CardPage;