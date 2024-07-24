import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContextVar } from "../../ContextApi/Context";

const Home = () => {
  const [userName, userNameModi] = useState("");
  const Intance = useContext(MyContextVar);

  const navigate = useNavigate();
  const [mess, messSho] = useState(false);

  const btnClicked = () => {
    if (userName === "") {
      messSho(true);
    } else {
      messSho(false);
      Intance.setUsername(userName);
      navigate("/chat");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="md:w-1/2 md:h-1/2 bg-white flex flex-col p-10 items-center">
        <h1 className="text-xl mb-8 font-bold font-sans">Your Name</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => {
            userNameModi(e.target.value);
          }}
          className="outline-none border border-black mb-5 h-12 text-xl pl-3 w-[100%]"
        />

        <button
          type="button"
          className="bg-blue-500 text-white h-10 w-[100%]"
          onClick={btnClicked}
        >
          Enter
        </button>
        {mess && (
          <h1 className={mess && `text-red-500`}>Please Enter Your Name</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
