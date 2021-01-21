import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./Pages/OfferPage";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/offer/:id">
            <OfferPage></OfferPage>
          </Route>
          <Route exact path="/user/signup">
            <SignUpPage></SignUpPage>
          </Route>
          <Route exact path="/user/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
