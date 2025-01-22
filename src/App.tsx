import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import History from './pages/History';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div className="select-none max-w-[1400px] min-h-screen font-sans bg-primary-dark m-auto">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnHover={false}
        draggable
        pauseOnFocusLoss={false}
        theme="dark"
      />
    </div>
  );
}

export default App;
