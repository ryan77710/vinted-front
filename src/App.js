import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import OfferPage from "./Pages/OfferPage/OfferPage";
import Home from "./Pages/Home/Home";
import SignUpPage from "./Pages/LoginAndSignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginAndSignUpPage/LoginPage";
import PublishPage from "./Pages/PublishPage/PublishPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import Header from "./Components/Header/Header";
import Drawer from "./Components/Drawer/Drawer";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Donation from "./Pages/Donation/Donation";
import Favors from "./Pages/Favors/Favors";
import Messages from "./Pages/Messages/Messages";
import Offers from "./Pages/Offers/Offers";
import Profile from "./Pages/Profile/Profile";
import Support from "./Pages/Support/Support";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faChartLine,
  faSortNumericDown,
  faImages,
  faBars,
  faSpinner,
  faTimesCircle,
  faHeartbeat,
  faCommentDots,
  faUser,
  faExclamationCircle,
  faHandHoldingMedical,
  faAdjust,
  faEnvelope,
  faDonate,
  faPowerOff,
  faChevronDown,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faSearch,
  faChartLine,
  faSortNumericDown,
  faImages,
  faBars,
  faTimesCircle,
  faHome,
  faSpinner,
  faHeartbeat,
  faCommentDots,
  faUser,
  faExclamationCircle,
  faHandHoldingMedical,
  faAdjust,
  faEnvelope,
  faDonate,
  faPowerOff,
  faChevronDown
);

function App() {
  let token;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    Cookies.get("userToken", token) || null
  );

  const [showDrawer, setShowDrawer] = useState(false);

  const [title, setTitle] = useState("");
  const [titleDebouced] = useDebounce(title, 1000);
  const [toggleOrder, setToggleOrder] = useState(true);

  const [priceValue, setPriceValue] = useState([0, 3000]);
  const [page, setPage] = useState(1);
  const [limit, setLimite] = useState(100);

  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPEKEY)
  );

  // redirection for PublishPage
  const [redirect, setRedirect] = useState(false);
  // chek for payment way
  // ?
  const handleLogin = (token, user) => {
    Cookies.set("userToken", token, { expires: 7 });
    setAuthToken(token);
    alert(`bonjour ${user}`);
  };
  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
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
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}offers?title=${titleDebouced}&sort=${
          toggleOrder ? "price-asc" : "price-desc"
        }&priceMin=${priceValue[0]}&priceMax=${
          priceValue[1]
        }&page=${page}&limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [titleDebouced, toggleOrder, priceValue, limit, page]);

  return (
    <div className="App">
      <button
        title="Ouvrir le navigateur"
        className={`btest ${showDrawer && "btest-isActive"}`}
        onClick={() => setShowDrawer(!showDrawer)}
      >
        <FontAwesomeIcon
          icon={showDrawer ? "times-circle" : "bars"}
          className={`icon-drawer ${showDrawer && "icon-isActive"}`}
          inverse
          spin
        />
      </button>
      <Router>
        <Drawer
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          handleLogOut={handleLogOut}
        />
        <Header
          handleLogOut={handleLogOut}
          authToken={authToken}
          handleTitle={handleTitle}
          title={title}
          toggleOrder={toggleOrder}
          setToggleOrder={setToggleOrder}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
        />
        <Switch>
          <Route exact path="/offer/publish">
            <PublishPage
              authToken={authToken}
              redirect={redirect}
              setRedirect={setRedirect}
            ></PublishPage>
          </Route>
          <Route exact path="/offer/my-offers">
            <Offers />
          </Route>
          <Route exact path="/offer/favors">
            <Favors />
          </Route>
          <Route exact path="/offer/:id">
            <OfferPage
              authToken={authToken}
              handleLogin={handleLogin}
            ></OfferPage>
          </Route>
          <Route exact path="/user/messages">
            <Messages />
          </Route>
          <Route exact path="/user/profile">
            <Profile />
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
          <Route exact path="/payment/donation">
            <Donation />
          </Route>
          <Route exact path="/paymentPage">
            <Elements stripe={stripePromise}>
              <PaymentPage authToken={authToken} />
            </Elements>
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>

          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="/about">
            <About />
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
      </Router>
    </div>
  );
}

export default App;
