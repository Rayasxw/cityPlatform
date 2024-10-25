
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/myAccount/MyAccount";
import AdminAccount from "./pages/adminAccount/AdminAccount";
import AddPost from "./pages/addPost/AddPost";
import AnotherAccount from "./pages/anotherAccount/AnotherAccount";
import Header from "./layout/Header/Header";
import {useState} from "react";

function App() {
    const [user, setUser] = useState({
    })
  return (
    <div className="App">

        <Header user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home user={user}/>}/>
          <Route path='/myaccount' element={<MyAccount user={user}/>}/>
          <Route path='/admin' element={<AdminAccount/>}/>
          <Route path='/addpost' element={<AddPost/>}/>
          <Route path='/anotheraccount' element={<AnotherAccount/>}/>
        </Routes>
    </div>
  );
}

export default App;
