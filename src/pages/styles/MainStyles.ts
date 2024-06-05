import styled from 'styled-components';

export const FilterContainer = styled.div`
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
  `;
export const List = styled.div`
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