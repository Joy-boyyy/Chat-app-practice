import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Components/Chats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
