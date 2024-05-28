import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getInfo } from '../api';
import { setAllData } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

const Image = styled.img`
  width: 600px;
  height: 600px;
  border: 1px solid #000000;
`;
const Block = styled.div`
  width: 600px;
  height: 800px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
`
const BackToCardsButton = styled.button`
    width: 100px;
`;

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
        <Block>
            <BackToCardsButton onClick={() => navigate(`/`)}>back to cards</BackToCardsButton>
            <Image src={card?.images[0]} alt="" />
            <div className="card-content">
                <h2 className="card-title">{card?.title}</h2>
                <p className="card-description">{card?.description}</p>
            </div>
        </Block>
        </>
    )
}
export default CardPage