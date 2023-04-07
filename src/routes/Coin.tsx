import { Helmet } from 'react-helmet';
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";



const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  font-weight: normal;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 0px;
  border-radius: 10px;
  
  a {
    display: block;
    color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;





// https://api.coinpaprika.com/v1/coins/${coinId}에서 받아온
// 데이터 타입 설정(info의 타입)
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }

// https://api.coinpaprika.com/v1/tickers/${coinId}에서 받아온
// 데이터 타입 설정(priceInfo의 타입)
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }





function Coin(){
    const {coinId} = useParams();
    const {state} = useLocation();
    const priceMatch = useMatch(`${process.env.PUBLIC_URL}/${coinId}/price`); 
    const chartMatch = useMatch(`${process.env.PUBLIC_URL}/${coinId}/chart`);   
    // fetchCoinInfo(coinId!) 
    // !=> 확장 할당 어션셜로 값이 무조건 할당되어있다고 컴파일러에게 전달해 값이 없어도 변수를 사용할 수 있게 한다고 합니다.

    const {isLoading: infoLoading, data : infoData} 
    = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data : tickersData} 
    = useQuery<PriceData>([
    "tickers", coinId], 
    () => fetchCoinTickers(coinId),
    {
      refetchInterval : 3000,
    });
    
   
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
          <Helmet>
            <title> {state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
          </Helmet>
        <Header>
        {/* state가 존재하면 name을 가져오고 아니면 Loading문구를 보여줌*/}
        <Link to ={`${process.env.PUBLIC_URL}/`}>
          
          <Title>
          <Logo src={`https://static.coinpaprika.com/coin/${coinId}/logo.png`}/>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Link>
        </Header>
        {loading ? <Loader>Loading...</Loader> 
        : 
        <>
        <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>통화 단위:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격:</span>
              <span>${Number(tickersData?.quotes.USD.price.toFixed(3)).toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>총 공급량:</span>
              <span>{Number(tickersData?.total_supply).toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 공급량:</span>
              <span>{Number(tickersData?.max_supply).toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to ={`${process.env.PUBLIC_URL}/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}> 
              <Link to = {`${process.env.PUBLIC_URL}/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Outlet context={{coinId}}/>
        </>
        }
      </Container>
    )
}

export default Coin;