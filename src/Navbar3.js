import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import {
  DashboardOutlined,
  FundOutlined,
  PlusCircleOutlined,
  FileDoneOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { color } from "three/webgpu";

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

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px; /* Width of the sidebar */
  background-color: #5cbf6d;
  box-shadow: 2px 0 5px rgba(0,0,0,0.5);
  transform: translateX(-100%); /* Hide sidebar initially */
  transition: transform 0.3s ease;
  z-index: 1000;

  &.open {
    transform: translateX(0); /* Show sidebar */
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: visibility 0s, opacity 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  
`;

const Logo = styled(Link)`
  color: #008044;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  font-family: ${Theme.fontSecondary};
`;

const MenuButton = styled.button`
   position: absolute; /* Fixed position for the button */
   top: 20px; /* Position at the top */
   right: 20px; /* Position at the right */
   background-color: transparent;
   border: none;
   z-index: 1100; /* Above sidebar */
   cursor: pointer;

   &:focus {
       outline: none; /* Remove outline on focus */
   }
`;

const SquareContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 20px); /* Two squares per row */
   gap: 4px; /* Space between squares */
`;

const Square = styled.span`
   display: block;
   width: 20px; /* Width of each square */
   height: 20px; /* Height of each square */
   background-color: transparent; /* Transparent background */
   border-radius: 8px; /* Curved corners */
   border: 4px solid black; /* Thicker black border */

   &:hover {
       opacity:.8; /* Optional hover effect to indicate interactivity */
   }
`;

const MenuItems = styled.div`
   display: flex;
   flex-direction: column; /* Stack items vertically */
   padding-top: 20px; /* Space between logo and menu items */

   a {
      padding:20px; 
      text-decoration:none; 
      color:#fff; 
      transition:.3s;
      font-weight: 600;
      font-size: 21px;

      &:hover {
         color:${Theme.primary};
      }
   }
`;

const ContactButton = styled(Link)`
   background-color:${Theme.accent}; 
   color:${Theme.background}; 
   padding:.5rem; 
   border-radius:.25rem; 
   text-decoration:none; 

   &:hover {
       background-color:${Theme.primary}; 
       color:${Theme.text}; 
   }
`;

const Navbar = ({ history }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => setIsOpen(!isOpen);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const isAdmin = userData ? userData.isAdmin : false;

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        history.push('/');
        setIsOpen(false); // Close the sidebar on logout
    };

    return (
        <>
            <MenuButton onClick={toggleNav}>
                <SquareContainer>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </SquareContainer>
            </MenuButton>
            <Overlay isOpen={isOpen} onClick={toggleNav} />
            <SidebarContainer className={isOpen ? 'open' : ''}>
                <NavContent>
                    {/* <Logo to="/"> Admin</Logo> */}
                    <MenuItems>
                        <Link to="/"><DashboardOutlined /> Dashboard</Link>
                        <Link to="/create-campaign"><PlusCircleOutlined /> Start a Fundraiser</Link>
                        <Link to="/donate"><FundOutlined /> Campaigns</Link>
                        {isAdmin && <Link to="/reviewCampaigns"> <FileDoneOutlined /> Review Campaigns</Link>}
                        <Link to="/CampaignDetails"><FileDoneOutlined /> Campaign Details</Link>
                        {isAdmin && <Link to="/create-category"><UserOutlined /> Create Category</Link>}
                        <NavDropdown title="Campaign Search" id="charity-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/Map" style={{color:'black'}}>By Map</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Search" style={{color:'black'}}>By Name</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).name : 'Account'} id="account-nav-dropdown">
                            {sessionStorage.getItem('userData') ? (
                                <React.Fragment>
                                    <NavDropdown.Item onClick={handleLogout} style={{color:'black'}}>Logout</NavDropdown.Item>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <NavDropdown.Item as={Link} to="/sign-up" style={{color:'black'}}>Sign Up</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/login" style={{color:'black'}}>Login</NavDropdown.Item>
                                </React.Fragment>
                            )}
                        </NavDropdown>
                        {/* <ContactButton to="/contact">Contact</ContactButton> */}
                    </MenuItems>
                </NavContent>
            </SidebarContainer>
        </>
    );
};

export default withRouter(Navbar);