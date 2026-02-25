import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './App.routes'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/Post.context'
import "./features/shared/global.scss"

const App = () => {


  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router = {router} />
      </PostContextProvider>
      
    </AuthProvider>
  )
}

export default App
