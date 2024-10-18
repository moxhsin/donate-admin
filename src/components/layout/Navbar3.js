import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const Theme = {
    cardBackground: "#FFFFFF",
    cardFontColor: "#333333",
    fontPrimary: "'Poppins', sans-serif",
    fontSecondary: "'Playfair Display', serif",
    primary: "#4A90E2",
    secondary: "#7D7D7D",
    accent: "#D64C31",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#333333",
    textDark: "#000000",
};

const NavbarContainer = styled.nav`
  background-color: ${Theme.surface};
  padding: 15px 15px; /* Increased padding for bubble effect */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px; /* Added margin-top for bubble navbar */
  left: 50%;
  transform: translateX(-50%); /* Center the navbar */
  width: 1000px; /* Initially auto for bubble effect */
  z-index: 1000;
  border-radius: 50px; /* Bubble effect */
  transition: all 0.4s ease;

  &.scrolled {
    width: 100%; /* Full width on scroll */
    border-radius: 0; /* Remove bubble effect */
    background-color: ${Theme.background}; /* Change background on scroll */
    padding: 10px; /* Adjust padding on scroll */
    top: 0; /* Align to the top when scrolled */
    transform: none; /* Remove transform when scrolled */
    left: 0; /* Align to the left when scrolled */
  }

  @media (max-width: 768px) {
    padding: 10px; /* Less padding on mobile */
    border-radius: 30px; /* Slightly rounded corners on mobile */
    top: 10px; /* Adjust top position for mobile */
    left: 20px; /* Align to the left for mobile */
    transform: none; /* Remove transform for mobile view */
    width: calc(100% - 40px); /* Full width with margins on mobile */
    margin-left: auto; 
    margin-right: auto; 
    max-width: none; /* Remove max-width constraint for mobile */
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #008044;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  font-family: ${Theme.fontSecondary};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #008044;
  font-size: 24px;

   @media (max-width: 991px) {
     display: block;
   }
`;

const MenuItems = styled.div`
   display: flex;
   align-items: center;

   @media (max-width: 991px) {
     display: ${props => (props.isOpen ? 'flex' : 'none')};
     flex-direction: column;
     align-items: flex-start;
     position: absolute;
     top: calc(100% + 10px); 
     left: -20px; 
     right: -20px; 
     background-color:${Theme.surface}; 
     padding:${props => (props.isOpen ? '20px' : '0')}; 
     box-shadow:${props => (props.isOpen ? 'rgba(0,0,0,0.1) -1px -1px' : 'none')}; 
   }
`;

const commonFontStyles = `
   font-size:${Theme.fontPrimary};
   font-family:${Theme.fontPrimary};
   font-weight:500;
   color:${Theme.text};
`;

const StyledNavDropdown = styled(NavDropdown)`
   .dropdown-toggle {
     ${commonFontStyles}
     padding:10px; 
     transition:.3s; 

     &:hover {
       color:${Theme.primary} !important; 
     }
   }

   .dropdown-menu {
     background-color:${Theme.surface}; 
     border:none; 
     border-radius:.25rem; 
     padding:.5rem; 
   }

   .dropdown-item {
     ${commonFontStyles}
     transition:.3s; 

     &:hover {
       background-color:${Theme.primary}; 
       color:${Theme.background}; 
     }
   }
`;

const NavLink = styled(Link)`
   ${commonFontStyles}
   text-decoration:none;
   padding:10px 15px;
   transition=color .3s;

   &:hover {
       color:${Theme.primary};
   }
`;

const ContactButton = styled(Link)`
   background-color:rgb(24, 65, 45); 
   color:${Theme.background}; 
   padding:.5rem; 
   border-radius:.25rem; 
   text-decoration:none; 

   &:hover {
       background-color:${Theme.accent}; 
       color:${Theme.text}; 
   }
`;

const Navbar = ({ history }) => {
    const isLoggedIn = !!sessionStorage.getItem('userData');

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // Change threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleNav = () => setIsOpen(!isOpen);

    // Retrieve user data from local storage
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const isAdmin = userData ? userData.isAdmin : false;

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        history.push('/');
    };

    return (
        <NavbarContainer className={scrolled ? 'scrolled' : ''}>
            <NavContent>
                <Logo to="/">DONATION</Logo>
                <MenuButton onClick={toggleNav}>☰</MenuButton>
                <MenuItems isOpen={isOpen}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/create-campaign">Start a Fundraiser</NavLink>
                    <NavLink to="/donate">Donate</NavLink>
                    {isAdmin && <NavLink to="/reviewCampaigns">Review Campaigns</NavLink>}
                    <NavLink to="/CampaignDetails">Campaign Details</NavLink>
                    <StyledNavDropdown title="Campaign Search" id="charity-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/Map">By Map</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Search">By Name</NavDropdown.Item>
                    </StyledNavDropdown>
                    <StyledNavDropdown title={sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).name : 'Account'} id="account-nav-dropdown">
                        {sessionStorage.getItem('userData') ? (
                            <React.Fragment>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                            </React.Fragment>
                        )}
                    </StyledNavDropdown>
                    <ContactButton to="/contact">Contact</ContactButton>
                </MenuItems>
            </NavContent>
        </NavbarContainer>
    );
};

export default withRouter(Navbar);