import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    id: number;
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
  
  const Card: React.FC<CardProps> = ({ title, description, imageUrl, id }) => {
    const navigate = useNavigate();
    
    return (
      <Block onClick={() => navigate(`/card/${id}`)}>
        <Image src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title?.substring(0, 20)}{title.length >= 20 ? "..." : ""}</h2>
          <p className="card-description">{description?.substring(0, 100)}{description.length >= 100 ? "..." : ""}</p>
        </div>

      </Block>
    );
  };
  
  export default Card;