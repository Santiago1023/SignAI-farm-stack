import { Flex, Spinner } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Authenticated } from './components/Auth/Authenticated';
import { Login } from "./components/Auth/Login"
import { PublicRoute } from './components/Auth/PublicRoute';
import { Register } from './components/Auth/Register';
import { PersonImageDetail } from './components/PersonImage/PersonImageDetail'
import { PersonImageList } from './components/PersonImage/PersonImageList'
import { AuthProvider, AuthConsumer } from './context/JWTAuthContext';
import { NavBar } from './components/Navbar/NavBar';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {(auth) => !auth.isInitialized ? (
            <Flex height="100vh" alignItems="center" justifyContent="center">
              <Spinner thickness="4px" speed="0.65s" emptyColor="green.200" color="green.500" size="xl"/>
            </Flex>
          ): (
          <Routes>
            <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>} />
            <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />

            {/*<Route path='/' element={<NavBar/>}>
              <Route path='/' element={<Authenticated> <PersonImageList/> </Authenticated>}/>
              <Route path='/:personImageId' element={<Authenticated> <PersonImageDetail/> </Authenticated>}/>
          </Route>*/}
          <Route path='/' element={<NavBar/>}>
              <Route
                path='/'
                element={(
                  <Flex bg="green.900" minHeight="100vh" flexDirection="column">
                    <Authenticated> <PersonImageList/> </Authenticated>
                  </Flex>
                )}
              />
              <Route
                path='/:personImageId'
                element={(
                  <Flex bg="green.900" minHeight="100vh" flexDirection="column">
                    <Authenticated> <PersonImageDetail/> </Authenticated>
                  </Flex>
                )}
              />
            </Route>

            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
          )}
        </AuthConsumer>
      </Router>
    </AuthProvider>
    
    </>
  );
}

export default App;
