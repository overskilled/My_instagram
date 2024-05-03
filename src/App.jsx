import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./PrivateRoute"
import PageLayout from "./layouts/PageLayout/PageLayout"


function App() {

  return (
    <>

      <AuthProvider>
        <PageLayout>
          <Routes>
            {/**<Route path='/' element={<PrivateRoute />}></Route>*/}
            <Route exact path='/' element={<Home />} /> 
            <Route exact path="/auth" element={<Auth />} />
          </Routes>
        </PageLayout>
      </AuthProvider>
    </>
  )
}

export default App
