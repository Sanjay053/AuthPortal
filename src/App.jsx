import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./Components/signInPage";
import SignUp from "./Components/signUpPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
