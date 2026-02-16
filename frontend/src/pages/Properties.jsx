import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TelegramButton from '../components/TelegramButton';
import './Properties.css';

const Properties = () => {
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        location: '',
        status: '' // 'For Sale' or 'For Rent'
    });

    const [sortBy, setSortBy] = useState('price-asc');

    const [propertiesData, setPropertiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/properties');
                const data = await response.json();
                setPropertiesData(data.map(p => ({
                    ...p,
                    image: p.photos && p.photos.length > 0 ? p.photos[0] : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                    location: p.adresse,
                    area: p.surface,
                    bedrooms: p.chambres,
                    bathrooms: p.salles_de_bain,
                    date: p.date_creation
                })));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleReset = () => {
        setFilters({
            search: '',
            type: '',
            minPrice: '',
            maxPrice: '',
            bedrooms: '',
            location: '',
            status: ''
        });
        setSortBy('price-asc');
    };

    const filteredProperties = useMemo(() => {
        let result = propertiesData.filter(property => {
            const matchesSearch = property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                property.location.toLowerCase().includes(filters.search.toLowerCase());
            const matchesType = filters.type === '' || property.type === filters.type;
            const matchesLocation = filters.location === '' || property.location === filters.location;
            const matchesBedrooms = filters.bedrooms === '' || property.bedrooms >= parseInt(filters.bedrooms);
            const matchesStatus = filters.status === '' || property.status === filters.status;

            const price = parseFloat(property.price);
            const matchesMinPrice = filters.minPrice === '' || price >= parseInt(filters.minPrice);
            const matchesMaxPrice = filters.maxPrice === '' || price <= parseInt(filters.maxPrice);

            return matchesSearch && matchesType && matchesLocation && matchesBedrooms && matchesStatus && matchesMinPrice && matchesMaxPrice;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
            if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
            if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'bedrooms') return b.bedrooms - a.bedrooms;
            return 0;
        });

        return result;
    }, [filters, sortBy, propertiesData]);

    return (
        <div className="properties-page">
            <div className="page-header">
                <div className="container">
                    <h1>Luxury Properties in Dubai</h1>
                    <p>Discover your perfect home among our exclusive collection</p>
                </div>
            </div>

            <div className="container">
                <div className="properties-layout">
                    <aside className="filters-sidebar">
                        <div className="filters-header">
                            <h3>Filter Properties</h3>
                            <button className="btn-reset" onClick={handleReset}>Reset All</button>
                        </div>

                        <div className="filter-group">
                            <label>Search</label>
                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="filter-input"
                            />
                        </div>

                        <div className="filter-group">
                            <label>Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">Any Status</option>
                                <option value="For Sale">For Sale</option>
                                <option value="For Rent">For Rent</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Property Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Types</option>
                                <option value="Villa">Villa</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Townhouse">Townhouse</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Location</label>
                            <select
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Locations</option>
                                <option value="Downtown Dubai">Downtown Dubai</option>
                                <option value="Dubai Marina">Dubai Marina</option>
                                <option value="Palm Jumeirah">Palm Jumeirah</option>
                                <option value="Emirates Hills">Emirates Hills</option>
                                <option value="Arabian Ranches">Arabian Ranches</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Min Bedrooms</label>
                            <select
                                value={filters.bedrooms}
                                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                                <option value="6">6+</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Price Range (AED)</label>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                    className="filter-input"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    className="filter-input"
                                />
                            </div>
                        </div>
                    </aside>

                    <main className="properties-main">
                        <div className="properties-toolbar">
                            <div className="results-count">
                                <strong>{filteredProperties.length}</strong> properties found
                            </div>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="bedrooms">Bedrooms: Most to Least</option>
                            </select>
                        </div>

                        {filteredProperties.length > 0 ? (
                            <div className="properties-grid">
                                {filteredProperties.map(property => (
                                    <div key={property.id} className="property-card">
                                        <div className="property-image">
                                            <img src={property.image} alt={property.title} loading="lazy" />
                                            <div className="property-badge">{property.type}</div>
                                            <div className={`property-status ${property.status?.toLowerCase().replace(' ', '-')}`}>
                                                {property.status}
                                            </div>
                                            <button className="property-favorite" aria-label="Add to favorites">
                                                ♡
                                            </button>
                                        </div>
                                        <div className="property-content">
                                            <div className="property-location">📍 {property.location}</div>
                                            <h3 className="property-title">{property.title}</h3>
                                            <div className="property-features">
                                                <span>🛏️ {property.bedrooms} Beds</span>
                                                <span>🚿 {property.bathrooms} Baths</span>
                                                <span>📐 {property.area} sqft</span>
                                            </div>
                                            <div className="property-footer">
                                                <div className="property-price">
                                                    <span className="price-value">{formatPrice(property.price)}</span>
                                                </div>
                                                <div className="card-actions">
                                                    <Link to={`/properties/${property.id}`} className="btn btn-primary">
                                                        View Details
                                                    </Link>
                                                    <TelegramButton property={property} compact={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <div className="no-results-content">
                                    <h3>No properties found</h3>
                                    <p>Try adjusting your filters to find what you're looking for.</p>
                                    <button className="btn btn-primary" onClick={handleReset}>Clear All Filters</button>
                                </div>
                            </div>
                        )}

                        <div className="pagination">
                            <button className="pagination-btn" disabled>Previous</button>
                            <button className="pagination-btn active">1</button>
                            <button className="pagination-btn">2</button>
                            <button className="pagination-btn">Next</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Properties;
