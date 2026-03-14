const client = require('./index')('YOUR_API_KEY');

// Async example
(async function() {
    try {
        // Reverse geocode (works with free client-side endpoint too)
        const result = await client.getReverseGeocodeClient({
            latitude: -34.9285,
            longitude: 138.6007
        });
        console.log('Reverse geocode result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
})();
