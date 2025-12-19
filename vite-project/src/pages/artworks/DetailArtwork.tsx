import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import ApiClient from "../../utils/ApiClient"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"

interface Artwork {
  _id: string
  title: string
  description: string
  image: string
  category: string
  createdBy: {
    _id: string
    username: string
  }
}

interface Comment {
  _id: string
  content: string
  user: {
    username: string
  }
  createdAt: string
}

function DetailArtwork() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState("")

  const token = localStorage.getItem("AuthToken")
  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).user_id
    : null

  useEffect(() => {
    fetchArtwork()
    fetchComments()
  }, [id])

  const fetchArtwork = async () => {
    const response = await ApiClient.get(`/artworks/${id}`)
    setArtwork(response.data.data)
  }

  const fetchComments = async () => {
    const response = await ApiClient.get(`/artworks/${id}/comments`)
    setComments(response.data.data)
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    await ApiClient.post(`/artworks/${id}/comments`, {
      content: commentText,
    })

    setCommentText("")
    fetchComments()
  }

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus karya ini?")) return
    await ApiClient.delete(`/artworks/${id}`)
    navigate("/artworks")
  }

  if (!artwork) return <p className="text-center">Loading...</p>

  const isOwner = artwork.createdBy._id === userId

  return (
    <div className="container mx-auto">
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <NavLink to="/artworks" className="btn btn-secondary">
          ← Kembali
        </NavLink>

        {isOwner && (
          <div className="d-flex gap-2">
            <NavLink
              to={`/artworks/edit-artwork/${artwork._id}`}
              className="btn btn-primary"
            >
              Edit
            </NavLink>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>

      <Card>
        <Card.Body>
          <div className="row g-4">
            <div className="col-md-5">
              <img src={artwork.image} className="img-fluid rounded" />
            </div>

            <div className="col-md-7">
              <h3>{artwork.title}</h3>
              <p>{artwork.description}</p>
              <p><strong>Kategori:</strong> {artwork.category}</p>
              <p><strong>Pembuat:</strong> {artwork.createdBy.username}</p>

              <hr />
              <h5>Komentar</h5>

              <Form onSubmit={handleAddComment} className="mb-3">
                <Form.Control
                  placeholder="Tulis komentar..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" className="mt-2">
                  Kirim
                </Button>
              </Form>

              {comments.length === 0 ? (
                <p className="text-muted">Belum ada komentar</p>
              ) : (
                comments.map((comment) => (
                  <Card key={comment._id} className="mb-2">
                    <Card.Body>
                      <span className="fw-bold">{comment.user.username}</span>
                      <span> : {comment.content}</span>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default DetailArtwork
