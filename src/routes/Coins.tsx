import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

// 스타일 컴포넌트
const Container = styled.div`
  padding: 0px 20px;
  max-width : 480px;
  margin : 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
    font-size : 48px;
    color: ${(props) => props.theme.accentColor};
`;
const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;

    // 옆 아이콘에 맞게 가운데로 맞춰줌
    display: flex;
    align-items : center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

// 코인리스트 인터페이스 설정(코인리스트 타입)
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
// useQuery >> 한 번 불러온 데이터를 캐시에 저장해두기 때문에 다른 화면 이동한 후 돌아와도
//             다시 로딩화면을 띄우지 않음
function Coins(){
    // useQuery(1,2) 
    // 1 >> query의 고유식별자(key값)
    // 2 >> fetch 함수 : api.ts의 fetchCoins
    // 3 >> refetchinterval : 데이터를 주기적으로 리패치함

    // useQuery 반환값
    // isLoading(boolean) : fetch 함수(fetchCoins)의 데이터를 가져오는 동안 로딩 여부
    // data(any) : fetch 함수 통해 가져온 json 데이터를 받음

    // data의 타입은 any이므로 ICoin을 통해 data의 타입설정
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)

    return (
      <Container>
        <Helmet>
            <title>COIN LIST</title>
        </Helmet>
      <Header>
        <Title>Coin List</Title>
      </Header>
      { isLoading ? <Loader>loading...</Loader> 
      : 
      (<CoinsList>
        {data?.slice(0,100).map((coin) => (
          <Coin key={coin.id}>
            {/* 
              to > 지정하는 화면으로 이동할 경로값
              state > 이동할 화면에 보낼 데이터
             */}
            <Link to={`${process.env.PUBLIC_URL}/${coin.id}`} state = {{name : coin.name}}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>)}
    </Container>
    )
}

export default Coins;