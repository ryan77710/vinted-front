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
import OfferUpdate from "./Pages/OfferUpdate/OfferUpdate";

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
  faTrashAlt,
  faEdit,
  faStar,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  faChevronDown,
  faTrashAlt,
  faEdit,
  faStar,
  faChevronUp,
  faTimesCircle
);

function App() {
  let token;
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(Cookies.get("userToken", token) || null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [title, setTitle] = useState("");
  const [titleDebouced] = useDebounce(title, 1000);
  const [toggleOrder, setToggleOrder] = useState(true);

  const [priceValue, setPriceValue] = useState([0, 3000]);
  const [page, setPage] = useState(1);
  const [limit, setLimite] = useState(100);

  const [stripePromise] = useState(() => loadStripe(process.env.REACT_APP_STRIPEKEY));

  const handleLogin = (token, user) => {
    Cookies.set("userToken", token, { expires: 7 });
    setAuthToken(token);
    toast.success("Autorisé");
    toast(`Bonjour ${user}`);
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
    toast.warning("Déconnexion");
  };

  const handleFavoriteClick = async (offer) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}offer/favorite`, offer, { headers: { Authorization: `Bearer ${authToken}` } });
      const tab = [...data.offers];

      tab.map((dataOffer) => {
        if (dataOffer._id === offer._id) {
          dataOffer.favorite = !offer.favorite;
        }
        return "";
      });

      setData({ count: data.count, offers: tab });
      toast.info(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        if (authToken) {
          response = await axios.get(
            `${process.env.REACT_APP_API_URL}offers-auth?title=${titleDebouced}&sort=${toggleOrder ? "price-asc" : "price-desc"}&priceMin=${priceValue[0]}&priceMax=${
              priceValue[1]
            }&page=${page}&limit=${limit}`,

            { headers: { Authorization: `Bearer ${authToken}` } }
          );
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_API_URL}offers?title=${titleDebouced}&sort=${toggleOrder ? "price-asc" : "price-desc"}&priceMin=${priceValue[0]}&priceMax=${
              priceValue[1]
            }&page=${page}&limit=${limit}`
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [titleDebouced, toggleOrder, priceValue, limit, page, authToken]);

  return (
    <div className="App">
      <ToastContainer />
      <button title="Ouvrir le navigateur" className={`buttton-drawer ${showDrawer && "buttton-drawer-isActive"}`} onClick={() => setShowDrawer(!showDrawer)}>
        <FontAwesomeIcon icon={showDrawer ? "times-circle" : "bars"} className={`icon-drawer ${showDrawer && "icon-isActive"}`} inverse spin />
      </button>
      <Router>
        <Drawer showDrawer={showDrawer} authToken={authToken} setShowDrawer={setShowDrawer} handleLogOut={handleLogOut} />
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
            <PublishPage authToken={authToken}></PublishPage>
          </Route>
          <Route exact path="/offer/my-offers">
            <Offers authToken={authToken} />
          </Route>
          <Route exact path="/offer/favors">
            <Favors authToken={authToken} />
          </Route>
          <Route exact path="/offer/update/:id">
            <OfferUpdate authToken={authToken} />
          </Route>
          <Route exact path="/offer/:id">
            <OfferPage authToken={authToken} handleLogin={handleLogin}></OfferPage>
          </Route>
          <Route exact path="/user/messages">
            <Messages />
          </Route>
          <Route exact path="/user/profile">
            <Profile authToken={authToken} />
          </Route>
          <Route exact path="/user/signup">
            <SignUpPage handleLogin={handleLogin}></SignUpPage>
          </Route>
          <Route exact path="/user/login">
            <LoginPage handleLogin={handleLogin}></LoginPage>
          </Route>
          <Route exact path="/payment/donation">
            <Elements stripe={stripePromise}>
              <Donation authToken={authToken} />
            </Elements>
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
              handleFavoriteClick={handleFavoriteClick}
              isLoading={isLoading}
              data={data}
              priceValue={priceValue}
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
