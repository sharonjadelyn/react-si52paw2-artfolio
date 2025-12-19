import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : "/",
        children : [
            {
                index : true,
                lazy : {
                    Component : async () => {
                        const component = await import("../pages/auth/signup/SignUp.tsx")

                        return component.default
                    }
                }
            },
            {
                path : "signIn",
                lazy : {
                    Component : async () => {
                        const component = await import("../pages/auth/signin/SignIn.tsx")

                        return component.default
                    }
                }
            }
        ]
    },
    {
        path : "/artworks", //alamat dari sebuah page
        children : [
            {
                index : true,
                lazy : {
                    Component : async () => {
                        const component = await import("../pages/artworks/Artwork.tsx")
                        return component.default
                    }
                }
            },
            {
                path : "add-artwork",
                lazy : {
                    Component : async () => {
                        const component = await import("../pages/artworks/AddArtwork.tsx")
                        return component.default
                    }
                }
            },
            {
                path : "edit-artwork/:id",
                lazy : {
                    Component : async () => {
                        const component = await import ('../pages/artworks/EditArtwork.tsx')

                        return component.default
                    }
                }
            },
            {
                path: "detail-artwork/:id",
                lazy: {
                    Component: async () => {
                    const component = await import("../pages/artworks/DetailArtwork.tsx")
                    return component.default
                    }
                }
            }
        ]
    }
])

export default router