import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext"; // for global state management
import Footer from "./components/Footer";
import Header from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;