import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router"
import ApiClient from "../../../utils/ApiClient"


interface SignInForm {
    email : string,
    password : string
}


function SignIn() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<SignInForm>({
        email : "",
        password : ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true)

            try {
                const response = await ApiClient.post('/users/signin', form)
                console.log(response.data);

                if(response.status === 200){
                    // Redirect user ke halaman artworks
                    localStorage.setItem("AuthToken", response.data.data.token)
                    navigate('/artworks', {
                        replace : true
                    })
                }
                
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
    }

    return (
    <div className="container-fluid bg-primary min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white mb-4">Sign In</h1>

        <div
            className="bg-white p-4"
            style={{
                width: "420px",
                borderRadius: "24px"
            }}
        >
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onHandleChange}
                        style={{ borderRadius: "5px" }}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onHandleChange}
                        style={{ borderRadius: "5px" }}
                    />
                </Form.Group>

                <div className="text-center mb-2">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        style={{
                            borderRadius: "8px",
                            padding: "6px 24px"
                        }}
                    >
                        {isLoading ? "Loading..." : "Sign In"}
                    </Button>
                </div>

                <div className="text-center">
                    <NavLink to="/signUp" style={{ fontSize: "14px" }}>Sign Up</NavLink>
                </div>
            </Form>
        </div>
    </div>
    )
}

export default SignIn