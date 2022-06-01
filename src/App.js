import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import {Container} from '@material-ui/core'
import NavBar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";


const App = () => {
    return ( 
        <BrowserRouter>
            <Container maxWidth="xl" style={{margin: 0, padding: 0}}>
                <NavBar/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/auth" exact element={<Auth/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
     );
}
 
export default App;
