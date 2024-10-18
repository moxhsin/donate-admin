import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import API from '../../utils/API'; // Adjust the path as necessary

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 20px; /* Increased top margin for spacing from navbar */
`;

const SearchInput = styled.input`
  padding: 10px; /* Padding for the input */
  border: 2px solid black; /* Border color */
  border-radius: 5px; /* Rounded corners */
  width: 100%; /* Full width */
  max-width: 400px; /* Max width for larger screens */
  font-size: 1rem; /* Font size for readability */
  color: black;
  &:focus {
    outline: none; /* Remove outline on focus */
    border-color: black; /* Darker border color on focus */
    box-shadow: 0 0 5px rgba(102, 178, 168, 0.5); /* Shadow effect on focus */
  }
`;

const SearchButton = styled.button`
{
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px; /* Added padding for better spacing */
`;

const CampaignCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CampaignImage = styled.img`
  width: 100%;
`;

const CampaignContent = styled.div`
   padding:15px;
`;

const CampaignTitle = styled.h3`
   font-size:1.5rem;
`;

const ProgressBar = styled.div`
   background-color:#e0e0e0;
   border-radius:5px;
   overflow:hidden;
`;

const Progress = styled.div`
   width:${props => props.percent}%;
   height:10px;
   background-color:green; 
`;

const Paragraph = styled.p`
   margin:10px0;
`;

const StyledButton = styled(Link)`
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
`;

// Main Component
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedCampaigns, setDisplayedCampaigns] = useState([]);

    // Fetch campaigns when the component mounts
    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await API.getAllCampaigns(); // Adjust this method based on your API
            setDisplayedCampaigns(response.data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    // Filter campaigns based on search query
    const filteredCampaigns = displayedCampaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2 style={{marginTop:'120px'}}>Our Campaigns</h2>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <SearchButton onClick={() => {}}>Search</SearchButton>
            </SearchContainer>

            {/* Campaign Cards Grid */}
            <Grid>
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => {
                        const { _id, image, title, goal, amountRaised } = campaign;
                        const percent = (amountRaised / goal) * 100;

                        return (
                            <CampaignCard key={_id}>
                                {image && <CampaignImage src={image} alt={title} />}
                                <CampaignContent>
                                    <CampaignTitle>{title}</CampaignTitle>
                                    <ProgressBar>
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
    );
};

export default Search;