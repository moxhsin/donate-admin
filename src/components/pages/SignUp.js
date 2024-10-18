// src/components/pages/SignUp.js
import React, { useState } from 'react';
import styled from 'styled-components';

import API from './../../utils/API'; // Assuming API is imported from a file
import { withRouter } from 'react-router-dom'; // Import withRouter

// Styled Components
const FullPageBackground = styled.div`
    position: relative;
    height: 100vh; /* Full height of the viewport */
    overflow: hidden; /* Hide overflow */

    @media (max-width: 768px) {
        height: auto; /* Allow height to adjust on smaller screens */
    }
`;

const BackgroundVideo = styled.div`
      position: fixed; /* Use fixed to cover the viewport */
    top: 0;
    left: 0;
    width: 100vw; /* Use viewport width */
    height: 100vh; /* Use viewport height */
    object-fit: cover; /* Maintain aspect ratio and cover area */
    z-index: -1; /* Ensure it's behind other content */
`;

const Container = styled.div`
    position: relative; /* Position relative for z-index */
    background-color: White; /* Semi-transparent overlay */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    margin: auto;
    margin-top: 140px; /* Center vertically */
    z-index: 1; /* Above the video */

    @media (max-width: 768px) {
        width: 90%; /* Make it responsive on smaller screens */
        margin-top: 102px; /* Adjust top margin for better positioning */
        margin-bottom: 60px; /* Add bottom margin to prevent overlap with footer */
        padding: 15px; /* Slightly reduce padding */
    }
`;

const Title = styled.h1`
    font-family: 'Playfair Display', serif;
    text-align: center;
    color: rgb(24, 65, 45);

    @media (max-width: 768px) {
        font-size: 24px; /* Adjust font size for mobile */
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
    color: Black;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    color: black;
    margin-bottom: 15px;

    &::placeholder {
        color: black;
    }

    border-color: black;

    @media (max-width: 768px) {
        padding: 8px; /* Slightly reduce padding for mobile */
        font-size: 14px; /* Adjust font size for mobile */
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #D64C31;
    border-radius: 4px;
    color: #F2F2F2;
    font-weight: bold;

    &:hover {
        background-color: #C94C31; /* Darker shade on hover */
    }

    @media (max-width: 768px) {
        padding: 8px; /* Slightly reduce padding for mobile */
        font-size: 16px; /* Adjust font size for mobile */
    }
`;
const imageStyle = {
    width: '100%', // Cover full width
    height: '100%', // Cover full height
    objectFit: 'cover', // Maintain aspect ratio and cover area
};

// SignUp Component
const SignUp = ({ history }) => {
   const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
   });
   
   const [errorFields, setErrorFields] = useState({});

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
       setErrorFields(prev => ({ ...prev, [name]: false }));
   };

   const validateForm = () => {
       const errors = {};
       if (!formData.firstName) errors.firstName = true;
       if (!formData.lastName) errors.lastName = true;
       if (!formData.email) errors.email = true;
       if (!formData.password) errors.password = true;

       if (formData.password !== formData.confirmPassword) {
           errors.confirmPassword = true; // Passwords do not match
       }

       return errors;
   };

   const handleSubmit = async (e) => {
       e.preventDefault();

       const validationErrors = validateForm();
       if (Object.keys(validationErrors).length > 0) {
           setErrorFields(validationErrors);
           return; // Prevent submission if there are validation errors
       }

       const { firstName, lastName, email, password } = formData;

       try {
           const response = (await API.registerUser({ name: `${firstName} ${lastName}`, email, password })).data;

           // Check if response is an object and contains a message
           if (response && typeof response === 'object' && response.message) {
               console.log(response.message); // Log success message
               history.push('/login'); // Navigate to login page on success
           } else {
               throw new Error('Unexpected response format');
           }

       } catch (error) {
           console.error('Error during signup:', error);
           setErrorFields({ email: true }); // Highlight email field on error
       }
   };

   return (
       <FullPageBackground>
           <BackgroundVideo>
    <img src={'/images/Sign%20bg.jpg'} alt="Background"  style={imageStyle} />
</BackgroundVideo>
           <Container>
               <Title>Sign Up</Title>
               <Form onSubmit={handleSubmit}>
                   <Label htmlFor="firstName">First Name</Label>
                   <Input 
                       type="text" 
                       id="firstName" 
                       name="firstName" 
                       value={formData.firstName} 
                       onChange={handleChange} 
                       error={errorFields.firstName} 
                       placeholder="Enter your first name"
                   />
                   
                   <Label htmlFor="lastName">Last Name</Label>
                   <Input 
                       type="text" 
                       id="lastName" 
                       name="lastName" 
                       value={formData.lastName} 
                       onChange={handleChange} 
                       error={errorFields.lastName} 
                       placeholder="Enter your last name"
                   />
                   
                   <Label htmlFor="email">Email</Label>
                   <Input 
                       type="email" 
                       id="email" 
                       name="email" 
                       value={formData.email} 
                       onChange={handleChange} 
                       error={errorFields.email} 
                       placeholder="Enter your email"
                   />
                   
                   <Label htmlFor="password">Password</Label>
                   <Input 
                       type="password" 
                       id="password" 
                       name="password" 
                       value={formData.password} 
                       onChange={handleChange} 
                       error={errorFields.password} 
                       placeholder="Enter your password"
                   />
                   
                   <Label htmlFor="confirmPassword">Confirm Password</Label>
                   <Input 
                       type="password" 
                       id="confirmPassword" 
                       name="confirmPassword" 
                       value={formData.confirmPassword} 
                       onChange={handleChange} 
                       error={errorFields.confirmPassword}
                       placeholder="Confirm your password"
                   />
                   
                   <Button type="submit">Create Account</Button>
               </Form>
           </Container>
       </FullPageBackground>
   );
};

export default withRouter(SignUp); // Wrap with withRouter to get access to history