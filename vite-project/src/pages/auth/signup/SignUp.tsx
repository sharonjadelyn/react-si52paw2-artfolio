import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import ApiClient from "../../../utils/ApiClient"
import { Navigate, NavLink, useNavigate } from "react-router"

interface SignUpForm {
    username : string,
    email : string,
    password : string
}

function SignUp() {
    const [form, setForm] = useState<SignUpForm>({
            username : "",
            email : "",
            password : ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const navigate = useNavigate()
    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const response = await ApiClient.post('/users/signup', form)
                
                alert("Berhasil membuat akun, silakan sign in")
                navigate("/")
                
            } catch (error) {
                console.log(error);
            }
    }

    return<div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h1>Sign Up</h1>
        </div>
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={form.username}
                        onChange={onHandleChange}
                        name= "username"
                        type="username" 
                        placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={form.email}
                        onChange={onHandleChange}
                        name= "email"
                        type="email" 
                        placeholder="Email Address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={form.password}
                        onChange={onHandleChange}
                        name= "password"
                        type="password" 
                        placeholder="Password" />
                </Form.Group>

                <Button type="submit" variant="primary">Sign Up</Button>
                <br></br>
                <NavLink to="/">Sign In</NavLink>
            </Form>
        </div>
</div>
}


export default SignUp