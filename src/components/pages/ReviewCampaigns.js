import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import API from './../../utils/API'; // Assuming API is imported from a file
import DeleteBtn from '../DeleteBtn'; // Assuming DeleteBtn is a custom component
import formatDate from './../../utils/DateFormatter'; // Assuming formatDate is a utility function
import Theme from '../../utils/Theme';

class ReviewCampaigns extends Component {
    state = {
        donateForm: [],
        open: false,
        width: window.innerWidth,
        show: false,
    };

    componentDidMount() {
        this.loadCampaigns();
    }

    loadCampaigns = async () => {
        try {
            const res = await API.getAllPendingCampaigns();
            this.setState({ donateForm: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    handleAction = async (id, action) => {
        try {
            action === 'approve' ? await API.approveCampaign(id) : await API.rejectCampaign(id);
            this.loadCampaigns(); // Reload campaigns after action
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const { donateForm } = this.state;

        return (
            <Container fluid style={{ backgroundColor: Theme.background, color: Theme.text, padding: '20px' }}>
                <Row>
                    <Col md={10} sm={12} style={{ margin: '100px auto 0' }}>
                        <h1 style={{ fontWeight: 900, textAlign: 'center', marginTop:'10px',marginBottom: '20px', fontFamily: Theme.fontSecondary, fontSize: '2.5rem', color: 'rgb(24, 65, 45)' }}>
                            All Pending Campaigns
                        </h1>
                        {donateForm.length ? (
                            <div className="table-responsive">
                                <Table 
                                    striped 
                                    bordered  
                                    style={{ 
                                        backgroundColor: Theme.surface, 
                                        color: 'black',
                                        borderRadius: '10px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ color: 'black' }}>Title</th>
                                            <th style={{ color: 'black' }}>Description</th>
                                            <th style={{ color: 'black' }}>Goal</th>
                                            <th style={{ color: 'black' }}>Created By</th>
                                            <th style={{ color: 'black' }}>Created On</th>
                                            <th style={{ color: 'black' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donateForm.map(({ _id, title, description, goal, createdUsername, createdOn }) => (
                                            <tr 
                                                key={_id} 
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-5px)'; // Move up on hover
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)'; // Reset position
                                                }}
                                            >
                                                <td>{title}</td>
                                                <td>{description}</td>
                                                <td>{goal}</td>
                                                <td>{createdUsername}</td>
                                                <td>{formatDate(createdOn)}</td>
                                                <td>
                                                    {/* Approve Button */}
                                                    <Button 
                                                        variant="outline-dark" 
                                                        onClick={() => this.handleAction(_id, 'approve')}
                                                        style={{
                                                            borderColor: Theme.primary,
                                                            color: Theme.primary,
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.backgroundColor = Theme.primary;
                                                            e.target.style.color = Theme.background; // Change text color to background
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.backgroundColor = Theme.surface; // Reset background
                                                            e.target.style.color = Theme.primary; // Reset text color
                                                        }}
                                                    >
                                                        Approve
                                                    </Button>

                                                    {/* Delete Button */}
                                                    <DeleteBtn 
                                                        onClick={() => this.handleAction(_id, 'reject')} 
                                                        style={{ marginLeft: '10px' }} 
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <h3 style={{ textAlign: 'center', color: Theme.accent }}>No Results to Display</h3>
                        )}
                    </Col>
                </Row>

                {/* Optional Media Queries for additional styling */}
                <style jsx>{`
                    @media (max-width: 768px) {
                        h1 {
                            font-size: 2rem;
                        }
                        .table-responsive {
                            overflow-x: auto;
                        }
                    }
                `}</style>

            </Container>
        );
    }
}

export default ReviewCampaigns;