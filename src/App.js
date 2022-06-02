import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Container} from '@material-ui/core'
import NavBar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return ( 
        <BrowserRouter>
            <Container maxWidth="xl" style={{margin: 0, padding: 0}}>
                <NavBar/>
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/posts" />}/>
                    <Route path="/posts" exact element={<Home/>}/>
                    <Route path="/auth" exact element={!user ? <Auth/> : <Navigate replace to="/posts" />}/>
                    <Route path="/create" exact element={<Create/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
     );
}
 
export default App;
