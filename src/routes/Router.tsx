import { BrowserRouter,Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path="/react-crypto/:coinId" element = {<Coin/>}>  
                </Route>

                <Route path="/react-crypto" element = {<Coins/>}>  
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router