import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import {motion} from 'framer-motion';



const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ICoinId{
  coinId: string;
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

function AreaChart(){
    const {coinId} = useOutletContext<ICoinId>();
    const {isLoading, data} = useQuery<ICoinHis[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    
    const isDark = useRecoilValue(isDarkAtom)

return (
    <div>
        {
        isLoading ? (<Loader>차트를 불러오는 중 입니다...</Loader>) :
        (
        <ApexChart 
            type="area"
            series={[
            {
              name : "Price",
              // data가 null이나 undefined인 경우 빈 배열[]을 할당
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            }
            ]} 
            options={{
              theme : {
                mode : isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                background: "transparent",
                // 툴바 x
                toolbar: {
                  show: false,
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1200,
                }
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              dataLabels : {
                enabled : false},
              // y축 값 x
              yaxis: {
                show: true,
              },
               // x축 값 x
              xaxis: {
                categories: data?.map(price => new Date(price.time_close*1000).toISOString()),
                type: "datetime",
                axisBorder: { show: true },// x축 라인
                axisTicks: { show: false }, // x축 칸을 나타내는 선
                labels: { show: false },
              },
              fill: {
                type: "gradient",
                gradient: { 
                gradientToColors: ["#0be881"], 
                stops: [0, 100] }, // 0왼쪽끝,100오른쪽끝
              },
              colors: ["#0fbcf9"],
              tooltip:{
                y : {
                  // toFixed(소수점 자리수)
                  formatter : (value) => `$${Number(value.toFixed(0)).toLocaleString()}`,
                }
              }
            }}
            />
        )
        }
    </div>
)
}

export default AreaChart;