import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "./components/atoms/LoadingSpinner/LoadingSpinner";
import Routes from "./routes/Routes";
function App() {
  return (
    <Suspense fallback={LoadingSpinner}>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
}

export default App;
