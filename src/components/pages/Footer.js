import React from "react";
import { Link } from "react-router-dom";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Theme from './../../utils/Theme'

const FooterContainer = styled.footer`
  background-color: ${Theme.background};
  color: ${Theme.text};
  padding: 60px 0 30px;
  font-family: ${Theme.fontPrimary};
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
`;

const Heading = styled.h3`
  color: ${Theme.primary};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  font-family: ${Theme.fontSecondary};
`;

const StyledLink = styled(Link)`
  color: ${Theme.text};
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
  transition: color 0.3s;

  &:hover {
    color: ${Theme.primary};
  }
`;

const SocialIcon = styled.span`
  font-size: 24px;
  margin-right: 15px;
  color: ${Theme.text};
  transition: color 0.3s;

  &:hover {
    color: ${Theme.primary};
  }
`;

const Copyright = styled.div`
  border-top: 1px solid ${Theme.textDark};
  padding-top: 20px;
  text-align: center;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: ${Theme.surface};
  color: ${Theme.text};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${Theme.primary};
  color: ${Theme.background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${Theme.accent};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <p style={{paddingRight:'15px'}}>Donation is a platform dedicated to connecting donors with meaningful causes.</p>
            </Column>
          <Column>
            <Heading>Quick Links</Heading>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/create-campaign">Start a Fundraiser</StyledLink>
            <StyledLink to="/donate">Donate</StyledLink>
            <StyledLink to="/News">News</StyledLink>
          </Column>
          <Column>
            <Heading>Support</Heading>
            <StyledLink to="/contact">Contact Us</StyledLink>
            <StyledLink to="/faq">FAQ</StyledLink>
            <StyledLink to="/privacy">Privacy Policy</StyledLink>
            <StyledLink to="/terms">Terms of Service</StyledLink>
          </Column>
          <Column>
            <Heading>Stay Connected</Heading>
            <p>Subscribe to our newsletter for updates:</p>
            <Input type="email" placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </Column>
        </Row>
        <Row style={{ justifyContent: "center", marginBottom: "20px" }}>
          <SocialIcon as={LinkedinOutlined} />
          <SocialIcon as={FacebookOutlined} />
          <SocialIcon as={TwitterOutlined} />
          <SocialIcon as={InstagramOutlined} />
        </Row>
        <Copyright>
          <p>Copyright © {new Date().getFullYear()} Donation. All rights reserved.</p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
