// UniqueDonorsPage.js
import React from 'react';
import styled from 'styled-components';
import Theme from './../../utils/Theme';

const PageContainer = styled.div`
   padding-top :20px;
   max-width :800px;
   margin:auto; 
`;

const TableContainer = styled.div`
   margin-top :20px;
`;

const Table = styled.table`
   width :100%;
   border-collapse :collapse;

   th,
   td {
      padding :12px;
      text-align :left;
      border-bottom :1px solid ${Theme.borderColor};
   }

   th {
      background-color :${Theme.headerBackground};
      color :${Theme.headerTextColor};
   }

   tr:hover {
      background-color :${Theme.hoverBackground};
   }
`;

const Title = styled.h3`
   text-align:center;
`;

const UniqueDonorsPage = ({ location }) => {
   // Extract the donors passed through location state
   const donors = location.state ? location.state.donors : [];

   return (
      <PageContainer>
         <Title>Unique Donor Names</Title>

         {/* Displaying donor names in a table format */}
         {donors.length > 0 ? (
            <>
               <TableContainer >
                  <Table >
                     <thead >
                        <tr >
                           <th>Name</th> 
                        </tr >
                     </thead >
                     <tbody >
                        {donors.map((donor, index) => (
                           // Displaying each unique donor name
                           <tr key={index}>
                              <td>{donor}</td> 
                           </tr> 
                        ))}
                     </tbody >
                  </Table >
               </TableContainer >
            </>
         ) : (
            // Message if no donors are found
            <>No unique donors found.</> 
         )}
      </PageContainer >
   );
};

export default UniqueDonorsPage;
