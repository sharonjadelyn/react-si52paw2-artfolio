import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import ApiClient from "../../utils/ApiClient";
import Card from 'react-bootstrap/Card';

export interface Artwork {
    _id : string
    title : string
    description : string
    image : string
    category : string
    createdBy: {
        _id: string;
        username: string;
    }
    createdAt : string
    updatedAt : string
}

function Artwork() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    const fetchArtworks = useCallback(async () => {
        setLoading(true);
        const response = await ApiClient.get('/artworks');
        if(response.status === 200){
            setArtworks(response.data.data);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArtworks();
    }, [fetchArtworks]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("AuthToken");
        navigate("/", { replace: true });
    };


    return (
    <>
        <div className="container-fluid bg-primary text-white py-4 position-relative">
            <span
                onClick={handleSignOut}
                role="button"
                className="position-absolute top-0 end-0 m-3"
                style={{
                    fontSize: "14px",
                    textDecoration: "underline"
                }}
            >Sign Out</span>
            
            <h1 className="text-center">Pameran Digital</h1>
            <h6 className="text-center">Portofolio online khusus seniman digital untuk memamerkan karya.</h6>
        </div>

        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h4>Karya-Karya Digital</h4>
                <NavLink to="/artworks/add-artwork" className="btn btn-primary">Upload Karya</NavLink>
            </div>

            {loading ? (
                <p className="text-center">Loading.....</p>
            ) : (
                <div className="row g-4">
                    {artworks.map((artwork) => (
                        <div className="col-md-4 col-lg-3" key={artwork._id}>
                            <NavLink to={`/artworks/detail-artwork/${artwork._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <Card className="h-100">
                                    <Card.Img 
                                        variant="top" 
                                        src={artwork.image} 
                                        alt={artwork.title} 
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{artwork.title}</Card.Title>
                                        <Card.Text className="text-truncate">
                                            {artwork.description}
                                        </Card.Text>
                                        <p className="mb-1">
                                            <small className="text-muted">{artwork.category}</small>
                                        </p>
                                        <p className="mb-2">
                                            <small className="text-muted">
                                                Oleh: {artwork.createdBy.username}
                                            </small>
                                        </p>
                                    </Card.Body>
                                </Card>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
    );
}

export default Artwork;