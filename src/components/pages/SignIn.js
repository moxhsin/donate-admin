import React, { useState } from 'react';
import styled from 'styled-components';
import API from './../../utils/API'; // Assuming API is imported from a file
import { withRouter } from 'react-router-dom'; // Import withRouter
import video from "../videos/people_walking_on_street.mp4";

// Full Page Background Video
const FullPageBackground = styled.div`
    position: relative;
    height: 100vh; /* Full height of the viewport */
    overflow: hidden; /* Hide overflow */
`;

const BackgroundVideo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the entire area */
    z-index: 0; /* Behind other content */
`;

const Container = styled.div`
    position: relative; /* Position relative for z-index */
    background-color: white; /* Semi-transparent overlay */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    margin: auto;
    z-index: 1; /* Above the video */
    margin-top: 225px;

    @media (max-width: 600px) {
        width: 90%; /* Make container responsive on small screens */
        margin-top: 150px; /* Adjust margin for smaller screens */
        padding: 15px; /* Reduce padding for smaller screens */
    }
`;

const Title = styled.h1`
    font-family: 'Playfair Display', serif;
    text-align: center;
    color: rgb(24, 65, 45);

    @media (max-width: 600px) {
        font-size: 24px; /* Adjust font size for smaller screens */
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
    color: black;
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
    border: none;
    border-radius: 4px;
    color: #F2F2F2;
    font-weight: bold;

    &:hover {
        background-color: #C94C31; /* Darker shade on hover */
    }

    @media (max-width: 600px) {
        padding: 8px; /* Adjust padding for smaller screens */
        font-size: 16px; /* Adjust font size for smaller screens */
    }
`;

const imageStyle = {
    width: '100%', // Cover full width
    height: '100%', // Cover full height
    objectFit: 'cover', // Maintain aspect ratio and cover area
};

const SignIn = (props) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const decodeJwt = (token) => {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL safe characters
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')); // Decode base64 and convert to JSON
    
        return JSON.parse(jsonPayload); // Parse JSON string to object
    };
    
   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.login(credentials);
            if (response.status === 200) {
                const token = response.data.token; // Assuming token is in response.data.token
                const decodedPayload = decodeJwt(token); // Decode the JWT
                
                sessionStorage.setItem('userData', JSON.stringify(decodedPayload)); 
                console.log('Sign In successful:', decodedPayload);
                
                props.history.push('/'); // Redirect to home page
            }
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error (e.g., show an error message)
        }
   };

   return (
       <FullPageBackground>
           <BackgroundVideo >
           <img src={'/images/Sign%20bg.jpg'} alt="Background"  style={imageStyle} />
           </BackgroundVideo>
           <Container>
               <Title>Sign In</Title>
               <Form onSubmit={handleSubmit}>
                   <Label htmlFor="email">Email</Label>
                   <Input 
                       type="email" 
                       id="email" 
                       name="email" 
                       value={credentials.email} 
                       onChange={handleChange} 
                       required 
                   />
                   
                   <Label htmlFor="password">Password</Label>
                   <Input 
                       type="password" 
                       id="password" 
                       name="password" 
                       value={credentials.password} 
                       onChange={handleChange} 
                       required 
                   />
                   
                   <Button type="submit">Sign In</Button>
               </Form>
           </Container>
       </FullPageBackground>
   );
};

export default withRouter(SignIn); // Export withRouter