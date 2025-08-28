import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { UnitsProvider } from "./lib/units.jsx";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UnitsProvider>
          <Home />
        </UnitsProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
