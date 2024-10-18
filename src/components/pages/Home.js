import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserAddOutlined, DollarCircleOutlined, BarChartOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Theme from './../../utils/Theme'
import backgroundImage from './../images/background-img.jpg'

gsap.registerPlugin(ScrollTrigger);

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensures full height */
`;

const Section = styled.div`
    font-family: ${Theme.fontPrimary};
  padding: 6rem 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 5rem 0;
  }

  @media (max-width: 992px) {
    padding: 4rem 0;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    font-size: 0.9rem; // Adjust font size for better readability
  }

  @media (max-width: 576px) {
    padding: 2rem 0;
    font-size: 0.8rem; // Further adjust for small screens
  }
`;

const SectionOne = styled(Section)`
    height: 85vh; /* Full viewport height */
    position: fixed; /* Fixes this section in place */
    top: 0; /* Aligns it to the top of the viewport */
    left: 0;
    right: 0;
    background-image: url(${backgroundImage}); /* Set background image */
    background-size: cover; /* Cover the entire section */
    background-position: center; /* Center the image */
`;

const HeroImage = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3; /* Adjust as needed */
`;

const SectionTwo = styled(Section)`
    border-radius: 29px;
    background-color: ${Theme.background}; /* Fully opaque background for Section Two */
    position: relative; /* Allows it to scroll over Section One */
    margin-top: 82vh; /* Start below Section One */
    margin-bottom:-24px;
    display: flex;
    flex-direction: column; /* Stack children vertically */
    font-family: ${Theme.fontPrimary};
    color: ${Theme.textDark};
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 2rem auto; /* Add margin for spacing between ContentWrappers */
    padding: 0 2rem;

    @media (max-width: 768px) {
        padding: 0 1rem; /* Reduce padding on smaller screens */
        margin: 1rem auto; /* Adjust margin for smaller screens */
    }
`;

const Heading = styled.h2`
    font-family: ${Theme.fontSecondary};
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${Theme.hero_text};

    @media (max-width: 768px) {
        font-size: 2.5rem; /* Smaller heading on mobile */
        text-align: center; /* Center align on mobile */
    }
`;

const Paragraph = styled.p`
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: ${Theme.hero_text};

    @media (max-width: 768px) {
        font-size: 1rem; /* Smaller paragraph text on mobile */
        text-align: center; /* Center align on mobile */
        line-height: 1.5; /* Adjust line height for better readability */
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates three equal columns */
    gap: 20px; /* Space between grid items */

   @media (max-width: 768px) {
       grid-template-columns: repeat(2, 1fr); /* Two columns on mobile */
   }

   @media (max-width: 480px) {
       grid-template-columns: 1fr; /* Single column on very small screens */
   }
`;

const IconBox = styled.div`
   padding: 2rem;
   text-align: center;
   transition: all 0.3s ease;
   background-color: ${Theme.cardBackground};
   color: ${Theme.cardFontColor};
   border-radius: 12px;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
   
   &:hover {
       transform: translateY(-10px);
       box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
   }

   @media (max-width: 768px) {
       padding: 1.5rem; /* Less padding on smaller screens */
   }
`;

const IconWrapper = styled.div`
   font-size: 3rem;
   color: ${Theme.primary};
   margin-bottom: 1rem;

   @media (max-width: 768px) {
       font-size: 2.5rem; /* Smaller icon size on mobile */
   }
`;

const CircularButton = styled.button`
   background-color:#008044; 
   color:Black; 
   border-radius :50%; 
   width :50px; 
   height :50px; 
   display:flex; 
   align-items:center; 
   justify-content:center; 
   cursor:pointer; 
   transition:.3s;

   &:hover {
       background-color:${Theme.accent}; 
       transform: scale(1.05); /* Slightly enlarge on hover */
   }
`;

const StyledButton = styled(Link)`
   display:inline-block;
   background-color:${Theme.hero_button_background};
   color:${Theme.hero_button};
   padding:.75rem 1.5rem;
   font-size :1rem;
   font-weight :600;
   text-transform :uppercase;
   text-decoration:none;
   transition :all .3s ease;
   border:none;
   border-radius :50px;

   &:hover {
       background-color:${Theme.secondary};
       transform :translateY(-3px);
       box-shadow :0 5px 15px rgba(0,0,0,.2);
       cursor:pointer;
       opacity:.9; // Slight opacity change on hover
   }

   @media (max-width:768px) {
       width :100%; // Full width on smaller devices
       padding:.75rem; // Adjust padding
       font-size:.9rem; // Slightly smaller text
   }
`;

const CampaignCard = styled.div`
   background-color:${Theme.surface};
   border-radius :12px;
   overflow:hidden;
   box-shadow :0 5px 15px rgba(0,0,0,.1);
   transition :all .3s ease;

   &:hover {
       transform :translateY(-10px);
       box-shadow :0 15px 30px rgba(0,0,0,.2);
   }

   @media (max-width :768px) {
       margin-bottom :20px; // Add spacing between cards
       width :100%; // Full width on smaller devices
       max-width :none; // Remove max width constraint
   }
`;

const CampaignImage = styled.img`
     width :100%;
     height :200px;
     object-fit :cover;

     @media (max-width :768px) {
         height :150px; // Smaller image height on mobile
     }
`;

const CampaignContent = styled.div`
     padding :1.5rem;

     @media (max-width :768px) {
         padding :1rem; // Less padding on smaller screens
     }
`;

const CampaignTitle = styled.h3`
     font-family:${Theme.fontSecondary};
     font-size :1.5rem;
     margin-bottom :1rem;
     color:black;

     @media (max-width :768px) {
         font-size :1.25rem; // Smaller title size on mobile
         text-align:center; // Center align title
     }
`;

const ProgressBar = styled.div`
     width :100%;
     height :10px;
     background-color:${Theme.background};
     border-radius :5px;
     overflow:hidden;
     margin-bottom :1rem;

     @media (max-width :768px) {
         height :8px; // Smaller progress bar height on mobile
     }
`;

const Progress = styled.div`
     width:${props => props.percent}%;
     height :100%;
     background-color:rgb(24, 65, 45);
`;

const H3 = styled.h3`
     font-family:${Theme.fontSecondary};
     font-size :1.5rem;
     margin-bottom :1rem;

     @media (max-width :768px) {
         font-size :1.25rem; // Smaller H3 size on mobile
         text-align:center; // Center align H3
     }

     color:Black; // Soft gold color
`;
const Home = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [recipientType, setRecipientType] = useState('Education'); // Default selection

    const heroRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(campaigns.length / itemsPerPage);

    // Get the current campaigns to display based on the current page
    const displayedCampaigns = campaigns.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    // Fetch campaigns based on selected recipient type
    const fetchCampaigns = async (type) => {
        try {
            const response = await API.getFilteredCampaigns(type);
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    // Effect to fetch campaigns when component mounts or recipientType changes
    useEffect(() => {
        fetchCampaigns(recipientType);
    }, [recipientType]);

    useEffect(() => {
        const tl = gsap.timeline();

        // Hero section animations
        tl.from(headingRef.current, {
            opacity: 0,
            y: 50,
            duration: 1
        })
            .from(paragraphRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.3
            }, "-=0.5")
            .from(buttonRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5
            }, "-=0.3");

        // Scroll-triggered animations
        gsap.utils.toArray('.fade-in').forEach((element) => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Parallax effect for images
        gsap.utils.toArray('.parallax-image').forEach(img => {
            gsap.to(img, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Staggered animation for grid items
        gsap.utils.toArray('.grid-item').forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Progress bar animation
        gsap.utils.toArray('.progress-bar').forEach(bar => {
            gsap.to(bar.querySelector('.progress'), {
                width: bar.dataset.progress + '%',
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <MainContainer>
           <SectionOne>
               <ContentWrapper style={{marginTop:'10%'}}>
                   <Heading>Ignite Change Through Giving</Heading>
                   <Paragraph>Join our mission to create lasting impact. Together, we can illuminate lives and build a brighter future for all.</Paragraph>
                   <StyledButton to="/donate">Start Giving</StyledButton>
               </ContentWrapper>
           </SectionOne>

           <SectionTwo>
               {/* <ContentWrapper>
                   <Heading className="fade-in">Why Choose Us</Heading>
                   <Grid>
                       <IconBox className="grid-item">
                           <IconWrapper><TeamOutlined /></IconWrapper>
                           <H3>Community</H3>
                           <Paragraph>Join a network of compassionate individuals dedicated to making a difference.</Paragraph>
                       </IconBox>
                       <IconBox className="grid-item">
                           <IconWrapper><BarChartOutlined /></IconWrapper>
                           <H3>Transparency</H3>
                           <Paragraph>We ensure honesty and fairness in all our actions, always doing what's right.</Paragraph>
                       </IconBox>
                       <IconBox className="grid-item">
                           <IconWrapper><HeartOutlined /></IconWrapper>
                           <H3>Impact</H3>
                           <Paragraph>See the real-world impact of your donations and how they change lives.</Paragraph>
                       </IconBox>
                   </Grid>
               </ContentWrapper> */}

               {/* Featured Campaigns Section */}
               <Section>
            <ContentWrapper>
                <Heading className="fade-in">Featured Campaigns</Heading>
                <div className="fade-in" style={{textAlign:'left'}}>
                    <select
                        value={recipientType}
                        onChange={(e) => setRecipientType(e.target.value)}
                        style={{
                            textAlign:'left',
                            marginBottom: '20px',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: 'White',
                            color: 'black',
                            borderRadius: '21px',
                            fontFamily: "'Playfair Display', serif",
                            width: '100%', // Full width on mobile
                            maxWidth: '300px', // Limit width on larger screens
                        }}
                    >
                        <option value="Education">Education</option>
                        <option value="Medical">Medical</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Campaign Cards Grid */}
                    <Grid>
                        {displayedCampaigns.length > 0 ? (
                            displayedCampaigns.map((campaign) => {
                                const { _id, image, title, goal, amountRaised } = campaign;
                                const percent = (amountRaised / goal) * 100;

                                return (
                                    <CampaignCard key={_id} className="grid-item">
                                        {image && <CampaignImage src={image} alt={title} className="parallax-image" />}
                                        <CampaignContent>
                                            <CampaignTitle>{title}</CampaignTitle>
                                            <ProgressBar className="progress-bar" data-progress={percent}>
                                                <Progress percent={percent} />
                                            </ProgressBar>
                                            <Paragraph>${amountRaised} raised of ${goal} goal</Paragraph>
                                            <StyledButton to={`/donate-details/${_id}`}>Donate Now</StyledButton>
                                        </CampaignContent>
                                    </CampaignCard>
                                );
                            })
                        ) : (
                            <Paragraph>No campaigns available for this category.</Paragraph>
                        )}
                    </Grid>
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    {currentPage > 0 && (
                        <CircularButton onClick={() => setCurrentPage(currentPage - 1)} style={{ marginRight: '10px' }}>
                            &lt; {/* Previous arrow */}
                        </CircularButton>
                    )}

                    {currentPage < totalPages - 1 && (
                        <CircularButton onClick={() => setCurrentPage(currentPage + 1)} style={{ marginLeft: '10px' }}>
                            &gt; {/* Next arrow */}
                        </CircularButton>
                    )}
                </div>
            </ContentWrapper>
        </Section>

               {/* How It Works Section
               <ContentWrapper>
                   <Heading className="fade-in">How It Works</Heading>
                   <Grid>
                       <IconBox className="grid-item">
                           <IconWrapper><UserAddOutlined /></IconWrapper>
                           <H3>Choose a Cause</H3>
                           <Paragraph>Browse our campaigns and find a cause that resonates with you.</Paragraph>
                       </IconBox>
                       <IconBox className="grid-item">
                           <IconWrapper><DollarCircleOutlined /></IconWrapper>
                           <H3>Make a Donation</H3>
                           <Paragraph>Contribute any amount you're comfortable with, securely and easily.</Paragraph>
                       </IconBox>
                       <IconBox className="grid-item">
                           <IconWrapper><BarChartOutlined /></IconWrapper>
                           <H3>Share & Inspire</H3>
                           <Paragraph>Spread the word and inspire others to join the movement.</Paragraph>
                       </IconBox>
                   </Grid>
               </ContentWrapper> */}

               {/* Start Your Own Fundraiser Section */}
               <ContentWrapper>
                   <Heading className="fade-in">Start Your Own Fundraiser</Heading>
                   <Paragraph>Have a cause you're passionate about? Start your own fundraising campaign and make a difference today.</Paragraph>
                   {/* Uncomment when ready to link */}
                   {/*<StyledButton to="/create-campaign">Create Campaign</StyledButton>*/}
                   {/* For now just show button without link */}
                   <StyledButton to="/create-campaign">Create Campaign</StyledButton> 
               </ContentWrapper>

               {!userData && (
                   <ContentWrapper>
                       <Heading className="fade-in">Join Our Community</Heading>
                       <Paragraph>Connect with like-minded individuals, share your experiences, and amplify your impact.</Paragraph>
                       {/* Uncomment when ready to link */}
                       {/*<StyledButton to="/sign-up">Become a Member</StyledButton>*/}
                       {/* For now just show button without link */}
                       <StyledButton to="/sign-up">Become a Member</StyledButton> 
                   </ContentWrapper>
               )}
           </SectionTwo >
       </MainContainer >
    );
};

export default Home;