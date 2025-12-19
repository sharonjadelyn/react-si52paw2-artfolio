import { Await, NavLink, useNavigate, useParams } from "react-router" 
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ApiClient from "../../utils/ApiClient";

interface FormArtwork {
    title : string,
    description : string,
    category : string,
    image : string
}


interface ResponseData {
    data : {
        _id : string,
        title : string,
        description : string,
        image : string,
        category : string,
        createdBy : string,
        createdAt : string,
        updatedAt : string,
        __v : string
    }
}


function EditArtwork (){
    const params = useParams ()
    const navigate = useNavigate()
    const [form, setForm] = useState<FormArtwork>({
        title : "",
        description : "",
        category : "",
        image : ""
    })

    const fetchArtworks = useCallback(async() => {
        const response = await ApiClient.get(`/artworks/${params.id}`)

        if(response.status === 200){
            const responseData : ResponseData = response.data
            setForm({
                title: responseData.data.title,
                description : responseData.data.description,
                category : responseData.data.category,
                image : responseData.data.image
            })
        }
    },[])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiClient.put(`/artworks/${params.id}`, form)
           
            navigate("/artworks", {
                replace : true
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchArtworks()
    }, [fetchArtworks])

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
        <h3> Edit Karya</h3>
        <NavLink to = {`/artworks/detail-artwork/${params.id}`} className="btn btn-primary"> Kembali </NavLink>
        </div>

        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control 
                        value={form.title}
                        onChange={handleInputChange}
                        name="title" 
                        type="text" 
                        placeholder="Judul Karya"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDeskripsi">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control 
                        value={form.description}
                        onChange={handleInputChange}
                        name="description" 
                        type="text" 
                        placeholder="Deskripsi"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formKategori">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control 
                        value={form.category}
                        onChange={handleInputChange}
                        name="category" 
                        type="text" 
                        placeholder="Kategori"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Karya</Form.Label>
                    <Form.Control 
                        value={form.image}
                        onChange={handleInputChange}
                        name="image" 
                        type="text" 
                        placeholder="Karya"/>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Simpan
                </Button>
            </Form>
        </div>
    </div>
}

export default EditArtwork