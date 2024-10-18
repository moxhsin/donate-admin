import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar3 from './components/layout/Navbar3';
import Home from './components/pages/Home';
import Portal from './components/pages/Portal';
import Map from './components/pages/Map';
import Layout from './components/layout/Layout';
import About from './components/pages/About';
import Footer from './components/pages/Footer';
import Contact from './components/pages/Contact';
import Charity from './components/pages/Charity';
import Search from './components/pages/Search';
import Saved from './components/pages/Saved';
import DonateForm from './components/pages/DonateForm';
import Donation from './components/pages/Donation';
import CreateCampaign from './components/pages/CreateCampaign';
import ReviewCampaigns from './components/pages/ReviewCampaigns';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import CampaignDetails from './components/pages/CampaignDetails';


import "./App.css";
import SearchNews from "./components/pages/News";
import DonateDetails from './components/pages/DonateDetails';
import UpdateCampaign from './components/pages/UpdateCampaign';

class App extends Component {
  
  render() {
    return (
      <div>
        {<Router>
          <div className="App">
            <Navbar3 />
            <Layout>
              <div>
                <Route path="/" exact={true} component={Home} />
                <Route path="/about" exact={true} component={About} />
                <Route path="/create-campaign" exact={true} component={CreateCampaign} />
                <Route path="/update-campaign/:id" exact={true} component={UpdateCampaign} />
                <Route path="/donate" exact={true} component={DonateForm} />
                <Route path="/donate-details/:id" exact={true} component={DonateDetails} />
                <Route path="/donation" exact={true} component={Donation} />
                <Route path="/reviewCampaigns" exact={true} component={ReviewCampaigns} />
                <Route path="/CampaignDetails" exact={true} component={CampaignDetails} />
                <Route path="/Charity" exact={true} component={Charity} />
                <Route path="/Search" exact={true} component={Search} />
                <Route path="/Saved" exact={true} component={Saved} />
                <Route path="/contact" exact={true} component={Contact} />
                <Route path="/portal" exact={true} component={Portal} />
                <Route path="/map" exact={true} component={Map} />
                <Route path="/sign-up" exact={true} component={SignUp} />
                <Route path="/login" exact={true} component={SignIn} />
              </div>
            </Layout>
            <Footer />
          </div>
      </Router>}
      </div>
    );
  }
}

export default App;