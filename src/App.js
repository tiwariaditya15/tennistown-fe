import { useState } from "react";
import { useInteractions } from "./context/InteractionProvider";
import { Navbar } from "./components/Navbar/";
import { Sidebar } from "./components/Sidebar";
import { Router } from "./components/Router";
import { IDLE } from "./constants/interactions";
import { Snackbar } from "./components/Atoms/Snackbar";
import axios from "axios";
import { useInterceptors } from "./hooks";
import "./index.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useInteractions();
  // useInterceptors(axios);
  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Router />
      {status !== IDLE && <Snackbar status={status} />}
    </div>
  );
}
