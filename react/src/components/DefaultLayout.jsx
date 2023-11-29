import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider'
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {

  const { user, token, setUser, setToken } = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }



  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data)
    })
  }, [])



  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout').then((data) => {
      setUser({})
      setToken()
    })
  }



  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
