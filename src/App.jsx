import { Route, Routes } from "react-router";
import "./App.css";
import AuthPage from "./pages/Auth/AuthPage";
import VerifyUserPage from "./pages/Auth/VerifyUserPage";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import BooksPage from "./pages/Student/BooksPage";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        {/* {auth routes - public routes} */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/verify-page" element={<VerifyUserPage />} />

        {/* Private routes - admin routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
          {/* <Route path="books" element={<AdminBooksPage />} /> */}
          <Route path="burrows" element={<h1>Burrows Page</h1>} />
          <Route path="reviews" element={<h1>Reviews Page</h1>} />
          <Route path="students" element={<h1>Students Page</h1>} />
        </Route>

        {/* Private Route - Student Route */}
        <Route
          path="/books"
          element={
            <StudentPrivateRoute>
              <BooksPage />
            </StudentPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
