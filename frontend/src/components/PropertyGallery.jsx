import { useState } from 'react';
import './PropertyGallery.css';

const PropertyGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="property-gallery">
            <div className="main-image-container">
                <img
                    src={images[activeIndex]}
                    alt={`Property image ${activeIndex + 1}`}
                    className="main-image"
                    onClick={() => setIsLightboxOpen(true)}
                />
                <div className="gallery-nav">
                    <button className="nav-btn prev" onClick={prevImage}>❮</button>
                    <button className="nav-btn next" onClick={nextImage}>❯</button>
                </div>
                <div className="image-counter">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            <div className="thumbnail-grid">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                ))}
            </div>

            {isLightboxOpen && (
                <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>×</button>
                        <img src={images[activeIndex]} alt="Property full screen" />
                        <button className="lightbox-nav prev" onClick={prevImage}>❮</button>
                        <button className="lightbox-nav next" onClick={nextImage}>❯</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyGallery;
