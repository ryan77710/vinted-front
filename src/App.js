import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./Pages/OfferPage";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import PublishPage from "./Pages/PublishPage";
import PaymentPage from "./Pages/PaymentPage";
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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
library.add(faSearch, faChartLine, faSortNumericDown);

function App() {
  let token;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    Cookies.get("userToken", token) || null
  );
  const [title, setTitle] = useState("");
  const [ordre, setOrdre] = useState(true);
  const [valueMin, setValueMin] = useState("");
  const [valueMax, setValueMax] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimite] = useState(100);

  // redirection for PublishPage
  const [redirect, setRedirect] = useState(false);
  // chek for payment way
  // ?
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
  const handlePageChange = (event) => {
    const value = event.target.value;
    setPage(value);
  };
  const handleLimitChange = (event) => {
    const value = event.target.value;
    setLimite(value);
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
        `http://localhost:3100/offers?title=${title}&sort=${sort}&priceMin=${valueMin}&priceMax=${valueMax}&page=${page}&limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, ordre, valueMin, valueMax, limit, page]);
  const publicKey =
    "pk_test_51IFvF7LU3nUcxY4gi3B0nGBBlRmtyU3R3OHkCAMUjDgCQ5i6gPWwBf4xcHXMziAqWhpfSDBZ3neJMKhUEUClx2kJ009iRtBTz4";
  const stripePromise = loadStripe(publicKey);

  return (
    <div className="App">
      <Router>
        <Elements stripe={stripePromise}>
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
            <Route exact path="/offer/publish">
              <PublishPage
                authToken={authToken}
                redirect={redirect}
                setRedirect={setRedirect}
              ></PublishPage>
            </Route>
            <Route exact path="/offer/:id">
              <OfferPage
                authToken={authToken}
                handleLogin={handleLogin}
              ></OfferPage>
            </Route>

            <Route exact path="/user/signup">
              <SignUpPage handleLogin={handleLogin}></SignUpPage>
            </Route>
            <Route exact path="/user/login">
              <LoginPage
                handleLogin={handleLogin}
                redirect={redirect}
                setRedirect={setRedirect}
                red={"/"}
              ></LoginPage>
            </Route>
            <Route exact path="/paymentPage">
              <PaymentPage authToken={authToken}></PaymentPage>
            </Route>
            <Route exact path="/">
              <Home
                isLoading={isLoading}
                data={data}
                limit={limit}
                handleLimitChange={handleLimitChange}
                page={page}
                handlePageChange={handlePageChange}
              ></Home>
            </Route>
          </Switch>
        </Elements>
      </Router>
    </div>
  );
}

export default App;
