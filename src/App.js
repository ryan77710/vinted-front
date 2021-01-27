import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./Pages/OfferPage";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faChartLine,
  faSortNumericDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
library.add(faSearch, faChartLine, faSortNumericDown);

function App() {
  const token = "tt";
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    Cookies.get("userToken", token) || null
  );
  const [title, setTitle] = useState("");
  const [ordre, setOrdre] = useState(true);
  const [valueMin, setValueMin] = useState("");
  const [valueMax, setValueMax] = useState("");
  const handleLogin = (token, user) => {
    Cookies.set("userToken", token, { expires: 1 });
    setAuthToken(token);
    alert(`bonjour ${user}`);
  };
  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleOrdreChange = () => {
    const value = !ordre;
    setOrdre(value);
  };
  const handleValueMinChange = (event) => {
    const value = event.target.value;
    setValueMin(value);
  };
  const handleValueMaxChange = (event) => {
    const value = event.target.value;
    setValueMax(value);
  };

  const handleLogOut = () => {
    Cookies.remove("userToken");
    setAuthToken(null);
  };
  useEffect(() => {
    let sort;
    if (ordre === true) {
      sort = "price-asc";
    } else {
      sort = "price-desc";
    }
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3100/offers?title=${title}&sort=${sort}&priceMin=${valueMin}&priceMax=${valueMax}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, ordre, valueMin, valueMax]);
  return (
    <div className="App">
      <Router>
        <Header
          handleLogOut={handleLogOut}
          authToken={authToken}
          handleTitle={handleTitle}
          title={title}
          handleOrdreChange={handleOrdreChange}
          ordre={ordre}
          valueMin={valueMin}
          valueMax={valueMax}
          handleValueMinChange={handleValueMinChange}
          handleValueMaxChange={handleValueMaxChange}
        />
        <Switch>
          <Route exact path="/offer/:id">
            <OfferPage></OfferPage>
          </Route>
          <Route exact path="/user/signup">
            <SignUpPage handleLogin={handleLogin}></SignUpPage>
          </Route>
          <Route exact path="/user/login">
            <LoginPage handleLogin={handleLogin}></LoginPage>
          </Route>
          <Route exact path="/">
            <Home isLoading={isLoading} data={data}></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
