const fetch = require('node-fetch');

async function testPropertyAPI() {
    try {
        const response = await fetch('http://localhost:5000/api/properties');
        const properties = await response.json();

        if (properties.length > 0) {
            const id = properties[0].id;
            console.log(`Testing property ID: ${id}`);
            const detailResponse = await fetch(`http://localhost:5000/api/properties/${id}`);
            const detail = await detailResponse.json();
            console.log('--- Property Detail Response ---');
            console.log(JSON.stringify(detail, null, 2));
        } else {
            console.log('No properties found.');
        }
    } catch (err) {
        console.error('Test failed:', err.message);
    }
}

testPropertyAPI();
