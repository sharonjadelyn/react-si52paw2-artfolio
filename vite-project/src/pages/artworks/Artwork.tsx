import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import ApiClient from "../../utils/ApiClient";
import Button from 'react-bootstrap/Button';
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

    const handleDelete = async (artworkId : string) => {
        const response = await ApiClient.delete(`/artworks/${artworkId}`);
        if(response.status === 200){
            fetchArtworks();
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-center">Pameran Digital</h1>
            <h6 className="text-center mb-4">Portofolio online khusus seniman digital untuk memamerkan karya.</h6>

            <div className="d-flex justify-content-between mb-3">
                <h4 className="text-center display">Karya-Karya Digital</h4>
                <NavLink to="/artworks/add-artwork" className="btn btn-primary">Add Artwork</NavLink>
            </div>

            {loading ? (
                <p className="text-center">Loading.....</p>
            ) : (
                <div className="row g-4">
                    {artworks.map((artwork) => (
                        <div className="col-md-4 col-lg-3" key={artwork._id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={artwork.image} 
                                    alt={artwork.title} 
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{artwork.title}</Card.Title>
                                    <Card.Text className="text-truncate">
                                        {artwork.description}
                                    </Card.Text>
                                    <p className="mb-1"><small className="text-muted">{artwork.category}</small></p>
                                    <p className="mb-2"><small className="text-muted">By {artwork.createdBy.username}</small></p>

                                    <div className="mt-auto d-flex gap-2">
                                        <NavLink
                                            to={`/artworks/edit-artwork/${artwork._id}`}
                                            className="btn btn-sm btn-primary flex-grow-1"
                                        >
                                            Edit
                                        </NavLink>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            className="flex-grow-1"
                                            onClick={() => handleDelete(artwork._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Artwork;