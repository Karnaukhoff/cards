import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAllData, setDeletedMode } from '../store/dataSlice';
import * as S from "./styles/CardsStyles";

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    id: number;
    onAddCard: (newCard: any) => void;
    item: any;
    removeCard: (newCard: any) => void;
    favourite: any;
    filter: string;
  }
  
  const Card: React.FC<CardProps> = ({ title, description, imageUrl, id, onAddCard, item, removeCard, favourite, filter }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.data.all)
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
      if (favourite.some((favItem: any) => favItem.id === item.id)){
         removeCard(item)
        }
      else {
        onAddCard(item)
      }  
    };

    useEffect(() => {
      if (favourite.some((favItem: any) => favItem.id === item.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      // eslint-disable-next-line
    }, [favourite, item]);
    
    return (
      <>
      <S.Block onClick={() => navigate(`/card/${id}`)}>
        <S.Image src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title?.substring(0, 20)}{title.length >= 20 ? "..." : ""}</h2>
          <p className="card-description">{description?.substring(0, 100)}{description.length >= 100 ? "..." : ""}</p>
        </div>

      </S.Block>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <S.DeleteButton
          isVisible={filter !== 'liked'}
          onClick={() => {
            removeCard(item)
            let newData = data.filter((item: any) => item.id !== id);
            dispatch(setAllData(newData));
            dispatch(setDeletedMode('active'));
          }}
        >
          <img src="trash.png" alt="" />
        </S.DeleteButton>
        <button style={{
          backgroundColor: 'transparent',
          color: liked ? 'red' : 'black',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          outline: 'none',
          marginTop: '5px',
        }}
        onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? 'red' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-heart"
            width="24"
            height="24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      </>
      
    );
  };
  
  export default Card;