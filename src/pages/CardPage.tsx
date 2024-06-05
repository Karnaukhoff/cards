import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInfo } from '../api';
import { setAllData } from '../store/dataSlice';
import { useDispatch } from 'react-redux';
import * as S from "./styles/CardPageStyles";

const CardPage: React.FC = () => {
    const data = useSelector((state: any) => state.data.all)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getInfo().then((data) => {
          dispatch(setAllData(data))
      }
      );
        // eslint-disable-next-line
      }, [])

    function findById(id: number) {
        return data.find((card: any) => card.id === id);
      }

    const delimiter = "/"; 
    const index = location.pathname.lastIndexOf(delimiter); 
    const result = location.pathname.substring(index + 1);

    const card = findById(Number(result))
    console.log(card);

    return(
        <>
        <S.Block>
            <S.BackToCardsButton onClick={() => navigate(`/`)}>back to cards</S.BackToCardsButton>
            <S.Image src={card?.images[0]} alt="" />
            <div className="card-content">
                <h2 className="card-title">{card?.title}</h2>
                <p className="card-description">{card?.description}</p>
            </div>
        </S.Block>
        </>
    )
}
export default CardPage