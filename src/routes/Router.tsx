import { BrowserRouter,Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Price from "./Price";
import CandleChart from "./CandleChart";
import AreaChart from "./AreaChart";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route  path={`${process.env.PUBLIC_URL}/:coinId`} element = {<Coin/>}> 
                    <Route path={`price`} element={<Price/>}></Route>
                    <Route path={`candlechart`} element={<CandleChart/>}></Route>
                    <Route path={`areachart`} element={<AreaChart/>}></Route>
                </Route>

                <Route  path={`${process.env.PUBLIC_URL}/`} element = {<Coins/>}>  

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router