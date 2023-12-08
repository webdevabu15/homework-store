import { useEffect , useState } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/sidebar/Sidebar"
import {useValue} from "../../context/AppProvider"
import instance from "../../services/api"

const Admin = () => {
  const [state] = useValue()
  const [user, setUser] = useState({})
  console.log(user);
  console.log(state.auth.user_id);
  useEffect(() => {
    instance(`api/users/${state.auth.user_id}`)
    .then(res => setUser(res.data.data))
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      <h2>Email: {user.email}</h2>
      <p>Firstname: {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default Admin