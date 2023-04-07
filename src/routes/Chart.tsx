import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom"; 
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


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
  
  const isDark = useRecoilValue(isDarkAtom)
 
  return (
    <div>
      {
        isLoading 
      ? ("Loading... chart...") 
      : (
        <ApexChart
  type="candlestick"
  series={[
    {
      data: data?.map(price => ({
        x:  new Date(price.time_close*1000).toISOString(),
        y: [parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)],
      })) ?? [],
    },
  ]}
  options={{
    theme: {
      mode : isDark ? "dark" : "light",
    },
    chart: {
      height: 300,
      width: 500,
      toolbar :{
        show : false,
      },
      background: "transparent",
    },
    grid: {
      show: true,
    },

    xaxis: {
      categories: data?.map(price => price.time_close),
      type: "datetime",
      axisBorder: { show: false },
      axisTicks: { show: false }, 
      labels: { show: false },
    },
    yaxis: {
      show: true,
    },
    
    tooltip: {
      y: {
        formatter: value => `$ ${value.toFixed(1)}`,
      },
    },
  }}
/>
        )
      }
    </div>   
    )
  }
  
  export default Chart;