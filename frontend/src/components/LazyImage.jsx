import { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

const LazyImage = ({ src, alt, className, placeholder = 'https://via.placeholder.com/400x225?text=Chargement...' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(imgRef.current);
                }
            },
            { rootMargin: '100px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        };
    }, []);

    return (
        <div
            ref={imgRef}
            className={`lazy-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
        >
            {!isLoaded && <div className="image-placeholder" style={{ backgroundImage: `url(${placeholder})` }} />}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    className={`lazy-image ${isLoaded ? 'visible' : ''}`}
                />
            )}
        </div>
    );
};

export default LazyImage;
