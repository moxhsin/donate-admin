import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';


const BASEURL_CAMPAIGN = 'https://donate-backend-alpha.vercel.app/api/campaigns'; // Your actual base URL

const CampaignDetails = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.isAdmin) {
          setIsAdmin(true);
          loadCampaigns();
        } else {
          setError('You must be logged in as an admin to view the campaigns.');
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        setError('Invalid user data format.');
      }
    } else {
      setError('You must be logged in as an admin to view the campaigns.');
    }
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASEURL_CAMPAIGN}/all`); 
      setCampaigns(res.data);
      console.log('Fetched campaigns:', res.data); // Debugging line
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Campaigns not found (404). Please check the API endpoint.');
      } else {
        console.error('Error fetching campaigns:', err); // Debugging line
        setError('Failed to fetch campaigns. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Ensure loading is turned off
    }
  };

  // Group campaigns by email
  const groupCampaignsByEmail = (campaigns) => {
    return campaigns.reduce((acc, campaign) => {
      const { createdUserEmail, title, _id } = campaign; // Assuming each campaign has 'createdUserEmail', 'title', and '_id' fields
      if (!acc[createdUserEmail]) {
        acc[createdUserEmail] = [];
      }
      acc[createdUserEmail].push(campaign); // Push entire campaign object for later access
      return acc;
    }, {});
  };

  const groupedCampaigns = groupCampaignsByEmail(campaigns);

  const handleEditCampaign = (campaignId) => {

  };

  const handleDeleteCampaign = () => {
    // Logic for deleting the campaign
    console.log(`Deleting campaign with ID: ${campaignToDelete}`);
    // Make API call to delete the campaign here...
    setShowDeleteModal(false); // Close modal after deletion
  };

  return (
    <div style={{ paddingTop: '120px' }}> {/* Increased padding */}
      {isLoading && <p>Loading campaigns...</p>}
      
      {isAdmin ? (
        <div>
          <h2>Campaign List</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {Object.keys(groupedCampaigns).length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Title</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
                </tr>

              </thead>
              <tbody>
                {Object.entries(groupedCampaigns).map(([email, userCampaigns]) => (
                  userCampaigns.map((campaign) => (
                    <tr key={campaign._id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <Link to={`/donate-details/${campaign._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                          {campaign.title} {/* Displaying title of each campaign as a link */}
                        </Link>
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <Link to={`/update-campaign/${campaign._id}`} style={{ marginRight: '10px', color: '#28a745' }}>
                        <EditOutlined /> Edit
                      </Link>
                      <Button onClick={() => {
                        setCampaignToDelete(campaign._id);
                        setShowDeleteModal(true);
                      }} variant="link" style={{ color: 'red' }}>
                        <DeleteOutlined /> Delete
                      </Button>
                    </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          ) : (
            <p>No campaigns found.</p>
          )}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default CampaignDetails;