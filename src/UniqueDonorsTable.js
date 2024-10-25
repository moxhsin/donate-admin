// UniqueDonorsTable.js
import React from 'react';
import styled from 'styled-components';
import Theme from './../../utils/Theme';

const TableContainer = styled.div`
    margin-top: 2rem;
`;

const ListContainer = styled.div`
    background-color: ${Theme.cardBackground};
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.div`
    padding: 12px;
    border-bottom: 1px solid ${Theme.borderColor};
    
    &:last-child {
        border-bottom: none; /* Remove border for last item */
    }

    &:hover {
        background-color:${Theme.hoverBackground}; /* Hover effect */
    }
`;

const Title = styled.h3`
    text-align:center;
`;

const UniqueDonorsTable = ({ donors }) => {
    return (
        <TableContainer>
            <Title>Unique Donor Names</Title>
            <ListContainer>
                {donors.length > 0 ? (
                    donors.map((donor, index) => (
                        <ListItem key={index}>
                            {donor} {/* Displaying each unique donor name */}
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No unique donors found.</ListItem> 
                )}
            </ListContainer>
        </TableContainer>
    );
};

export default UniqueDonorsTable;