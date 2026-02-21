const fetch = require('node-fetch');

async function testFirstProperties() {
    try {
        const response = await fetch('http://localhost:5000/api/properties');
        const properties = await response.json();

        console.log(`Total properties: ${properties.length}`);

        for (let i = 0; i < Math.min(5, properties.length); i++) {
            const prop = properties[i];
            console.log(`\nProperty ID: ${prop.id}`);
            console.log(`Titre: ${prop.titre}`);
            console.log(`Description: ${prop.description}`);
            console.log(`Photos: ${prop.photos}`);
            console.log(`Amenities: ${prop.amenities}`);
        }
    } catch (err) {
        console.error('Test failed:', err.message);
    }
}

testFirstProperties();
