import { createContext, useState } from "react";

export const MyContextVar = createContext();

export const MyProvideFun = (props) => {
  const [userName, setUsername] = useState("");

  return (
    <MyContextVar.Provider value={{ userName, setUsername }}>
      {props.children}
    </MyContextVar.Provider>
  );
};
