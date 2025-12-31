import React from 'react';

const SpecialOffers = () => {
    // INTERNAL CSS: Define the styles right here in a variable
    const styles = {
        container: {
            backgroundColor: '#fffae6',  // Light yellow background
            border: '2px solid #ffcc00', // Gold border
            borderRadius: '10px',          // Rounded corners
            padding: '20px',               // Space inside the box
            textAlign: 'center',           // Center the text
            marginBottom: '30px',          // Space below this section
            color: '#333'                // Dark grey text
        },
        heading: {
            color: '#d32f2f',            // Red color for the title
            fontSize: '24px',
            marginBottom: '10px'
        },
        text: {
            fontSize: '16px',
            marginBottom: '15px'
        },
        button: {
            backgroundColor: '#d32f2f',  // Red button
            color: 'white',                // White text
            padding: '10px 20px',          // Size of the button
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    };

    return (
        // Apply the styles using style={styles.variableName}
        <div style={styles.container}>
            <h2 style={styles.heading}>🎄 Christmas & New Year Sale! 🎅</h2>
            <p style={styles.text}>
                Get flat <strong>30% OFF</strong> on all products.
                <br />
                Offer valid until January 1st!
            </p>
            <button 
                style={styles.button}
                onClick={() => alert("Use code NEWYEAR2025 at checkout!")}
            >
                Get Coupon Code
            </button>
        </div>
    );
};

export default SpecialOffers;
