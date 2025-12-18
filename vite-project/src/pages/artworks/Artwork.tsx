import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import ApiClient from "../../utils/ApiClient";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";

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
    const [artworks, setArtworks] = useState<Artwork[]>([])

    const [loading, setLoading] = useState<Boolean>(true)

    const fetchArtworks = useCallback(async () => {
        setLoading(true)
        const response = await ApiClient.get('/artworks')

        if(response.status == 200){
            setArtworks(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchArtworks()
    }, [fetchArtworks])

    const handleDelete = async (artworkId : string) => {
        const response = await ApiClient.delete(`/artworks/${artworkId}`)

        if(response.status == 200){
            fetchArtworks()
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h4>Artworks Page</h4>
            <NavLink to="/artworks/add-artwork" className="btn btn-primary">Add Artwork</NavLink>
        </div>
        <div>
            <Table striped bordered hover>
                <thead>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Karya Seni</th>
                    <th>Kategori</th>
                    <th>Pembuat</th>
                    <th>Aksi</th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={7}>Loading.....</td>
                        </tr>
                    }
                    {
                        artworks.length > 0 && artworks.map((artworks, index) => {
                            return <tr key={artworks._id}>
                                <td>{index + 1}</td>
                                <td>{artworks.title}</td>
                                <td>{artworks.description}</td>
                                <td>{artworks.image}</td>
                                <td>{artworks.category}</td>
                                <td>{artworks.createdBy.username}</td>
                                <td>
                                    <NavLink to={`/artworks/edit-artwork/${artworks._id}`} className="btn btn-primary">Edit</NavLink>
                                    <Button variant="danger" onClick={() => handleDelete(artworks._id)}>Delete</Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}

export default Artwork;