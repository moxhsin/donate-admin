import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FundOutlined, DollarOutlined, UserOutlined, InfoCircleOutlined, PlusOutlined, FileDoneOutlined } from '@ant-design/icons'; // Importing icons
import API from "../../utils/API"; // Ensure this is correct
import Theme from './../../utils/Theme';
import UniqueDonorsTable from './UniqueDonorsTable'; // Import the new component
import UniqueDonorsPage from "./UniqueDonorsPage";
import CampaignDetails from "./CampaignDetails";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
`;

const Section = styled.div`
    padding: 6rem 1rem; /* Padding for larger screens */
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
        padding: 4rem 1rem; /* Padding for mobile */
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 2rem auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr); /* Keep two columns on mobile */
        margin: 1rem auto; /* Adjust margin for mobile */
    }
`;

const Card = styled.div`
    background-color: #F8F9FA;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all .3s ease;
    padding: 20px;
    text-align: left; /* Align text to left */

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        padding: 15px; /* Padding for mobile */
        margin-bottom: 1rem; /* Add margin between cards on mobile */
        border-radius: 0; /* Remove rounded corners on mobile */
    }
`;

const CardContent = styled.div`
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Center items vertically */
`;

const IconWrapper = styled.div`
    font-size: 2rem; /* Adjust icon size */
    margin-right: 10px; /* Space between icon and text */
`;

const CardDetails = styled.div`
    flex-grow: 1; /* Allow this to grow and take available space */
`;

const CardTitle = styled.h3`
    font-family: ${Theme.fontSecondary};
    font-size: 1.5rem;
    margin-bottom: 0.5rem; /* Space between title and description */

    @media (max-width: 768px) {
        font-size: 1.25rem; /* Smaller title size on mobile */
        
    }
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: ${Theme.textDark};
`;

const NumberDisplay = styled.p`
   font-size: 1.2rem; /* Size for number display */
   font-weight: bold; /* Make it bold for emphasis */
   margin-top: -5px; /* Slightly adjust position if needed */

   @media (max-width: 768px) {
       font-size: 1rem; /* Smaller size on mobile */
   }
`;

const Home = () => {
   const [stats, setStats] = useState({
       totalCampaigns: 0,
       totalDonationAmount: 0,
       totalUniqueDonors: 0,
       uniqueDonorNames: [] // Added to hold unique donor names
   });
    
   const [donors, setDonors] = useState([]); // State to hold unique donor names
   const [showDonorsTable, setShowDonorsTable] = useState(false); // State to toggle table visibility

   useEffect(() => {
       const fetchCampaignStats = async () => {
           try {
               const response = await API.campaignStats();
               setStats(response.data); // Assuming response.data contains the required fields
           } catch (error) {
               console.error('Error fetching campaign stats:', error);
           }
       };

       fetchCampaignStats();
   }, []);

   

   return (
       <MainContainer>
           <Section>
               <h2 style={{ textAlign: 'left', marginBottom: '6rem', fontFamily: 'Times New Roman', marginTop:'-48px' }}><strong>Dashboard</strong></h2>
               
               {/* First Row of Cards (2x2 Grid) */}
               <GridContainer>
                   <Card className="grid-item">
                       <Link to="/donate" style={{ textDecoration:'none', color:'inherit' }}>
                           <CardContent>
                               <IconWrapper><FundOutlined /></IconWrapper>
                               <CardDetails>
                                   <CardTitle>Campaigns</CardTitle>
                                   <NumberDisplay>{stats.totalCampaigns}</NumberDisplay>
                               </CardDetails>
                           </CardContent>
                       </Link>
                   </Card>
                   <Card className="grid-item">
                       <Link to="/donations" style={{ textDecoration:'none', color:'inherit' }}>
                           <CardContent>
                               <IconWrapper><DollarOutlined /></IconWrapper>
                               <CardDetails>
                                   <CardTitle>Amount</CardTitle>
                                   <NumberDisplay>${stats.totalDonationAmount.toLocaleString()}</NumberDisplay>
                               </CardDetails>
                           </CardContent>
                       </Link>
                   </Card>
                   {/* Link to Unique Donors Page with state */}
                   <Card className="grid-item">
                       <Link 
                           to={{
                               pathname: "/unique-donors",
                               state: { donors: stats.uniqueDonorNames } // Pass unique donor names as state
                           }} 
                           style={{ textDecoration:'none', color:'inherit' }}
                       >
                        <CardContent>
                           <IconWrapper><UserOutlined /></IconWrapper>
                           <CardDetails>
                           <CardTitle>Donors</CardTitle>
                           <NumberDisplay>{stats.totalUniqueDonors}</NumberDisplay>
                           </CardDetails>
                        </CardContent>   
                       </Link>
                   </Card>

                   {/* Placeholder Cards for Layout */}
                   <Card className="grid-item">
                       <Link to="/reviewCampaigns" style={{ textDecoration:'none', color:'inherit' }}>
                           <CardContent>
                               <IconWrapper><FileDoneOutlined /></IconWrapper>
                               <CardDetails>
                                   <CardTitle>Review Campaigns</CardTitle>
                                   {/* You can add a description here if needed */}
                               </CardDetails>
                           </CardContent>
                       </Link>
                   </Card>
               </GridContainer>

               {/* Additional Cards Below (Stacked Vertically) */}
               <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                   <Card className="grid-item" style={{ marginBottom:'20px', width:'80%' }}>
                       <Link to="/CampaignDetails" style={{ textDecoration:'none', color:'inherit' }}>
                       <CardContent>
                           <IconWrapper><InfoCircleOutlined /></IconWrapper>
                        <CardDetails>   
                           <CardTitle>Campaign Details</CardTitle>
                           {/* You can add a description here if needed */}
                        </CardDetails>   
                        </CardContent>   
                       </Link>
                   </Card>
                   <Card className="grid-item" style={{ width:'80%' }}>
                       <Link to="/create-category" style={{ textDecoration:'none', color:'inherit' }}>
                       <CardContent>
                           <IconWrapper><PlusOutlined /></IconWrapper>
                        <CardDetails>
                           <CardTitle>Upload New Category</CardTitle>
                           {/* You can add a description here if needed */}
                           </CardDetails>
                        </CardContent>   
                       </Link>
                   </Card>
               </div>
                 
               <CampaignDetails />
           </Section>
           
       </MainContainer>

       
   
);
   
};

export default Home;