import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { pingVisitor } from "./lib/visitor-ping";

pingVisitor();

createRoot(document.getElementById("root")!).render(<App />);
