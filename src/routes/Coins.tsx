import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    // 가져온 코인api 데이터를 담을 coin 배열
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    // api 로딩 여부 확인
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

       (async() => {
        const res = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await res.json();

        // 가져온 데이터를  100개까지만 받음
        setCoins(json.slice(0, 100));
        // 데이터를 다 받았으면 loading 해제
        setLoading(false);
       })(); 
    }, [])

    return (
      <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      { loading ? <Loader>loading...</Loader> 
      : 
      (<CoinsList>
        {coins.map((coin) => (
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