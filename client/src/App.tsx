import { ChangeEvent, useState } from 'react'
import './App.css'

import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import useAxios from './hooks/useAxios';
import { setAccessToken } from './redux/features/authSlice';
import axios from 'axios';

interface LoginProps {
  username: string;
  password: string;
}
const App = () => {

  const axiosInstance = useAxios()

  const auth = useAppSelector((state) => state.auth);
  console.log(auth);

  const dispatch = useAppDispatch()

  const [login, setLogin] = useState<LoginProps>({ username: "", password: "" })

  const handleSubmit = async () => {
    console.log(login);
    const { username, password } = login
    if (!username || !password)
      return

    try {
      const response = await axiosInstance.post('user/login', {
        username,
        password
      });
      console.log(response)
      if (response.status === 200)
        dispatch(setAccessToken(response.data.accessToken))

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && typeof error.response.data.message === 'string') {
          console.log(error.response.data.message);
        } else {
          console.log("fail")
        }
      } else {
        console.log("An unexpected error occurred!")
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    setLogin((prev: LoginProps) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <div>
        {auth && auth.accessToken}
      </div>

      <div>
        <input type="text" name="username" placeholder="username" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="password" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default App