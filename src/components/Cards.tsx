import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { setAllData, setDeletedMode } from '../store/dataSlice';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    id: number;
    onAddCard: (newCard: any) => void;
    item: any
  }

const Image = styled.img`
  width: 268px;
  height: 250px;
  border: 1px solid #000000;
`;
const Block = styled.div`
  width: 270px;
  height: 430px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.25);
  transition: 0.4s;
  &:hover{
      transform: scale(1.01);
  }
`
  
  const Card: React.FC<CardProps> = ({ title, description, imageUrl, id, onAddCard, item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.data.all)
    const [liked, setLiked] = useState(false);

    //Определить состояние liked по наличию в filtered(redux)
    //useEffect, следящий за состоянием filtered и вновь определить состояние liked
    const handleClick = () => {
      setLiked(!liked);
      //Добавить элемент в filtered
      if (!liked) onAddCard(item)
      //Удалить элемент из filtered  
    };
    
    return (
      <>
      <Block onClick={() => navigate(`/card/${id}`)}>
        <Image src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title?.substring(0, 20)}{title.length >= 20 ? "..." : ""}</h2>
          <p className="card-description">{description?.substring(0, 100)}{description.length >= 100 ? "..." : ""}</p>
        </div>

      </Block>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          outline: 'none',
          marginTop: '5px', 
        }}
        onClick={() => {
          let newData = data.filter((item: any) => item.id !== id);
          dispatch(setAllData(newData))
          dispatch(setDeletedMode('active'))
          }}
      >
        <img src="trash.png" alt="" style={{
          height: '30px',
          width: '30px'
        }}/>
      </button>
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