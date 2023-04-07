import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom"; 
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


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

function Chart() {
  const {coinId} = useOutletContext<ICoinId>();
  const {isLoading, data} = useQuery<ICoinHis[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  
 
  return (
    <div>
      {isLoading 
      ? ("Loading... chart...") 
      : (
      <ApexChart 
        type="line"
        series={[
        {
          name : "Price",
          // data가 null이나 undefined인 경우 빈 배열[]을 할당
          data: data?.map((price) => parseFloat(price.close)) ?? [],
        }
        ]} 
        options={{
          theme : {
            mode : "dark",
          },
          chart: {
            height: 300,
            width: 500,
            // 툴바 x
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          // y축 값 x
          yaxis: {
            show: false,
          },
           // x축 값 x
          xaxis: {
            categories: data?.map(price => new Date(price.time_close*1000).toISOString()),
            type: "datetime",
            axisBorder: { show: false },// x축 라인
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
              formatter : (value) => `$${value.toFixed(0)}`,
            }
          }
        }}
        />
        )}
    </div>   
    )
  }
  
  export default Chart;