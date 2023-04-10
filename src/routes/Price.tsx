import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "../api";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  font-weight: normal;
`;
const DevTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10px 0px;
  gap: 10px;
`;
const TickerTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0px;
  gap: 10px;
`;
const Tab = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 5px 0px;
  border-radius: 10px;
  gap: 10px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;


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

interface ICoinHis{
  time_open: number,
  time_close: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  market_cap: number
}

function Price() {
  const {coinId} = useParams();

  const {isLoading: tickersLoading, data : tickersData} = useQuery<PriceData>(["priceA", coinId], () => fetchCoinTickers(coinId));
  const {isLoading: devLoading, data:devData} = useQuery<ICoinHis[]>(["priceB", coinId], () => fetchCoinHistory(coinId));

  const loading = devLoading || tickersLoading;

    return (
      <Container>
        {loading ? <Loader>가격 정보를 불러오는 중입니다.</Loader> : (
          <>
          <DevTabs>
          <Tab>
            <span>시가</span>
            <span>${devData?.slice(20).map((data)=>(
              data.open
              ))}</span>
          </Tab>
          <Tab>
            <span>고가</span>
            <span>${devData?.slice(20).map((data)=>(
              data.high
              ))}</span>
          </Tab>
          <Tab>
            <span>저가</span>
            <span>${devData?.slice(20).map((data)=>(
              data.low
              ))}</span>
          </Tab>
        </DevTabs>
        <TickerTabs>
          <Tab>
            <span>역대 고가</span>
            <span>${Number(tickersData?.quotes.USD.ath_price.toFixed(5)).toLocaleString()} </span>
          </Tab>
          <Tab>
            <span>거래량(24H)</span>
            <span>{Number(tickersData?.quotes.USD.volume_24h.toFixed(0)).toLocaleString()} </span>
          </Tab>
          <Tab>
            <span>변동(24H)</span>
            <span>{tickersData?.quotes.USD.percent_change_24h}%</span>
          </Tab>
          <Tab>
            <span>변동(7D)</span>
            <span>{tickersData?.quotes.USD.percent_change_7d}%</span>
          </Tab>
        </TickerTabs>
        </>         
        )}
        
      </Container>
    )
  }
  
  export default Price;