import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";



export default function Users() {


  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users').then(({ data }) => {
      setLoading(false);
      console.log(data);
      setUsers(data.data)
    }).catch(() => {
      setLoading(false)
    })
  }

  const onDelete = (u) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    axiosClient.delete(`/users/${u.id}`).then(() => {
      getUsers()
      setNotification('User was successfully deleted')
    })

  }


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add" >Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody >
              <tr>
                <td colSpan="5" className="text-center" style={{ color: 'orange', fontWeight: 'bold' }} > Loading...</td>
              </tr>
            </tbody>
          )}

          {!loading && <tbody>
            {users.map((u, index) => (
              <tr key={index}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  <button onClick={ev => onDelete(u)} className="btn-delete" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}
