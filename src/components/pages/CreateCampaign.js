import React, { useState , useEffect} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import styled from 'styled-components';
import API from "../../utils/API";
import ImageUpload from '../../utils/ImageUpload';
import Theme from '../../utils/Theme';


const PageContainer = styled.div`
  background-color: ${Theme.background};
  min-height: 100vh;
  padding: 150px 40px;
  color: ${Theme.text};
  font-family: ${Theme.fontPrimary};

  @media (max-width: 768px) {
    padding: 80px 20px; // Reduce padding for mobile
  }
`;

const Header = styled.h1`
  font-family: ${Theme.fontSecondary};
  color: rgb(24, 65, 45);
  margin-bottom: 60px;
  font-size: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem; // Smaller font size for mobile
    margin-bottom: 30px; // Reduce margin for mobile
  }
`;

const StyledForm = styled(Form)`
  max-width: 900px;
  margin: 0 auto;
  background-color: ${Theme.surface};
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 30px; // Reduce padding for mobile
    border-radius: 10px; // Adjust border radius for mobile
    box-shadow: none; // Remove shadow for mobile
    width: calc(100% - 40px); // Full width with some margin
    max-width: none; // Remove max-width constraint
    margin-top: -20px; // Adjust top margin for better spacing
    margin-bottom: -20px; // Adjust bottom margin for better spacing
   }
`;

const FormSection = styled.div`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h3`
   color: rgb(24,65,45);
   margin-bottom:30px;
   font-family:${Theme.fontSecondary};
   font-size:2rem;

   @media (max-width:768px) {
      font-size:1.5rem; // Smaller font size for mobile
      margin-bottom:15px; // Reduce margin for mobile
   }
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
`;

const StyledFormLabel = styled(Form.Label)`
  color: ${Theme.text};
  font-weight: 500;
  margin-bottom: 12px;
  font-size: 1.1rem;
  width: 100%;
  text-align:left
`;

const StyledFormControl = styled(Form.Control)`
  background-color: ${Theme.background};
  color: ${Theme.text};
  border: 1px solid ${Theme.textDark};
  border-radius: 10px;
  padding: 15px 20px;
  font-size: 1rem;

  &:focus {
    background-color: ${Theme.background};
    color: ${Theme.text};
    border-color: ${Theme.primary};
    box-shadow: 0 0 0 0.2rem rgba(201, 168, 106, 0.25);
  }
`;

const StyledButton = styled(Button)`
   background-color: rgb(24,65,45);
   border-color: rgb(24,65,45);
   color:white;
   font-weight:bold;
   padding:15px 40px;
   border-radius:10px;
   transition: all .3s ease;
   font-size:1.1rem;

   @media (max-width:768px) {
      padding:10px; // Reduce padding for mobile
      font-size:.9rem; // Smaller font size for mobile
      width:100%; // Full width button on mobile
   }
`;

const ViewAgreementButton = styled(Button)`
   background-color: rgb(24,65,45);
   border-color:${Theme.secondary};
   color:white;
   font-weight:bold;
   padding:10px;
   border-radius:10px;
   margin-right:20px;
   transition: all .3s ease;
   font-size:.7rem;

   @media (max-width:768px) {
      width:auto; // Allow button to fit content on mobile
      margin-right:auto; // Center button on mobile
      margin-left:auto; // Center button on mobile
      display:block; // Stack buttons vertically on mobile
      margin-bottom:.5rem; // Add some space below button on mobile
   }
`;

const CreateCampaign = () => {
    const [formData, setFormData] = useState({
        title: '',
        country: '',
        zipCode: '',
        description: '',
        recipient: '',
        goal: '',
        status: 'Pending',
        amountRaised: '',
        topDonor: '',
        donations: [{ donorName: '', amount: '' }],
        agreementAccepted: false,
        createdUsername: '',
        createdUserEmail: '',
        image: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [showAgreementModal, setShowAgreementModal] = useState(false);

    const [image, setImage] = useState("");

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
            setFormData(prevState => ({
                ...prevState,
                createdUserEmail: userData.email,
                createdUsername: userData.name,
            }));
        } else {
            // window.location.href = '/login';
        }
    }, []);

    const handleImageUpload = (url) => {
        setImage(url);
        setFormData((prevState) => ({
            ...prevState,
            image: url, // Update the image property in formData
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name == 'goal') {
            const newValue = event.target.value;
            // Allow only numbers (optional)
            if (!(/^\d*$/.test(newValue))) {
                return;
            }
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [redirectToDonate, setRedirectToDonate] = useState(false)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            API.saveCampaign(formData)
                .then((res) => {
                    setShowModal(true);
                    setRedirectToDonate(true); // Set redirect state
                })
                .catch((err) => console.log(err));
        }
    };

    const validateForm = () => {
        return formData.agreementAccepted && formData.country && formData.zipCode &&
            formData.description && formData.recipient && formData.goal;
    };

    if (redirectToDonate) {
        return <Redirect to="/donate" />; // Redirect to /donate
    }

    return (
        <PageContainer>
            <Header>Start a Campaign</Header>
            <StyledForm onSubmit={handleFormSubmit}>
                <FormSection>
                    <SectionTitle>Campaign Details</SectionTitle>
                    <StyledFormGroup>
                        <StyledFormLabel>Title</StyledFormLabel>
                        <StyledFormControl
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter title"
                        />
                    </StyledFormGroup>

                    <StyledFormGroup>
                        <StyledFormLabel>Country</StyledFormLabel>
                        <StyledFormControl
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Enter your country"
                        />
                    </StyledFormGroup>

                    <StyledFormGroup>
                        <StyledFormLabel>Zip Code</StyledFormLabel>
                        <StyledFormControl
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="Enter your zip code"
                        />
                    </StyledFormGroup>
                </FormSection>

                <FormSection>
                    <SectionTitle>Campaign Information</SectionTitle>
                    <StyledFormGroup>
                        <StyledFormLabel>Description</StyledFormLabel>
                        <StyledFormControl
                            as="textarea"
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your campaign"
                        />
                    </StyledFormGroup>

                    <StyledFormGroup>
    <StyledFormLabel>Recipient</StyledFormLabel>
    <StyledFormControl
        as="select" // Change to a select dropdown
        name="recipient"
        value={formData.recipient}
        onChange={handleInputChange}
    >
        <option value="">Select a recipient...</option> {/* Default empty option */}
        <option value="Education">Education</option>
        <option value="Medical">Medical</option>
    </StyledFormControl>
</StyledFormGroup>

                    <StyledFormGroup>
                        <StyledFormLabel>Goal Amount</StyledFormLabel>
                        <StyledFormControl
                            type="text"
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            placeholder="Enter your fundraising goal"
                        />
                    </StyledFormGroup>

                    <StyledFormGroup>
                        <StyledFormLabel>Upload an image for your campaign</StyledFormLabel>
                        <ImageUpload onImageUpload={handleImageUpload}/>
                        {image && (
                            <div>
                                <h2>Uploaded Image:</h2>
                                <img src={image} alt="Uploaded Campaign" style={{ width: '400px' }} />
                            </div>
                        )}
                    </StyledFormGroup>
                    
                </FormSection>

                <FormSection>
                    <SectionTitle>Terms and Conditions</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' ,alignItems:'center'}} className="">

                        <Form.Check
                            type="checkbox"
                            label="I agree to the terms and conditions"
                            name="agreementAccepted"
                            checked={formData.agreementAccepted}
                            onChange={handleInputChange}
                        />
                         <ViewAgreementButton onClick={() => setShowAgreementModal(true)}>
                            View Agreement
                        </ViewAgreementButton>
                    </div>
                </FormSection>

                <div className="text-center">
                    <StyledButton type="submit" disabled={!validateForm()}>
                        Create Campaign
                    </StyledButton>
                </div>
            </StyledForm>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Campaign Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your campaign has been successfully created!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Link to="/campaigns">
                        <Button variant="primary">View Campaigns</Button>
                    </Link>
                </Modal.Footer>
            </Modal>

            <Modal show={showAgreementModal} onHide={() => setShowAgreementModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This Gift/ Donation Agreement ("Agreement") is made this ____ day of _______ between [Donor's Names] and their assignee (hereinafter referred to as "the Donor"), and [Your Organization] an [arts nonprofit organization located in Indianapolis, Indiana].</p>
                    <p>The Donor and [Your Organization] agree as follows:</p>
                    <ol>
                        <li>Donor Commitment. The Donor hereby pledges to [Your Organization] the sum of [insert amount] or more, which as provided for herein is designated for the benefit of [Fund Name] Endowment.</li>
                        <li>Donor Purpose. It is understood and agreed that the gift will be used for the following purpose or purposes: To establish an endowment from which the annual interest earnings will be used to [state purpose].</li>
                        <li>Payment. It is further understood and agreed that the gift will be paid in full on or before [insert date].</li>
                    </ol>
                    {/* Add more agreement content as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAgreementModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageContainer>
    );
};

export default CreateCampaign;
