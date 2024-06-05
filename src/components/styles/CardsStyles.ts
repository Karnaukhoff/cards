import styled from 'styled-components';

export const Image = styled.img`
  width: 268px;
  height: 250px;
  border: 1px solid #000000;
`;
export const Block = styled.div`
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
`;
export const DeleteButton = styled.button<{ isVisible: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  outline: none;
  margin-top: 5px;
  color: black;

  img {
    height: 30px;
    width: 30px;
  }

  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

  &:hover {
    color: gray;
  }
`;