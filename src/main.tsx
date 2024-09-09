import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";
import { FavoriteProvider } from "./context/FavoriteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <FavoriteProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </FavoriteProvider>
    </Router>
  </React.StrictMode>
);
