import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import API from "../../utils/API";
import Theme from '../../utils/Theme';
import ImageUpload from '../../utils/ImageUpload';

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
  max-width: 600px;
  margin: 0 auto;
  background-color: ${Theme.surface};
  padding: 40px;
  border-radius: 20px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 35px;
`;

const StyledFormLabel = styled(Form.Label)`
  color: ${Theme.text};
`;

const StyledFormControl = styled(Form.Control)`
  background-color: ${Theme.background};
  color: ${Theme.text};
`;

const StyledButton = styled(Button)`
   background-color: rgb(24,65,45);
   border-color: rgb(24,65,45);
   color:white;
   font-weight:bold;
   padding:15px;
   border-radius:10px;
`;

const Category = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State for image URL
    const [showModal, setShowModal] = useState(false);
    const [createdBy, setCreatedBy] = useState({ username: '', email: '' });

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
            setCreatedBy({
                username: userData.name,
                email: userData.email,
            });
        }
    }, []);

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleImageUpload = (url) => {
        setImageUrl(url); // Set the uploaded image URL
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const categoryData = {
            categoryName,
            createdUsername: createdBy.username,
            createdUserEmail: createdBy.email,
            imageUrl // Include the image URL in the data sent to the API
        };

        try {
            await API.createNewCategory(categoryData);
            setShowModal(true);
            setCategoryName(''); // Clear input after submission
            setImageUrl(''); // Clear image URL after submission
        } catch (error) {
            console.error('Error creating category:', error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <PageContainer>
            <Header>Create New Category</Header>
            <StyledForm onSubmit={handleFormSubmit}>
                <StyledFormGroup>
                    <StyledFormLabel>Category Name</StyledFormLabel>
                    <StyledFormControl
                        type="text"
                        value={categoryName}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                    />
                </StyledFormGroup>
                <StyledFormGroup>
                    <StyledFormLabel>Upload an image for your category</StyledFormLabel>
                    <ImageUpload onImageUpload={handleImageUpload} /> {/* Image upload component */}
                    {imageUrl && (
                        <div>
                            <h2>Uploaded Image:</h2>
                            <img src={imageUrl} alt="Uploaded Category" style={{ width: '400px' }} />
                        </div>
                    )}
                </StyledFormGroup>
                <div className="text-center">
                    <StyledButton type="submit">Create Category</StyledButton>
                </div>
            </StyledForm>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Category Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your category has been successfully created!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageContainer>
    );
}

export default Category;