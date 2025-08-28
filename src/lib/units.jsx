import { createContext, useContext, useEffect, useState } from "react";

//metric = C + m/s
// imperial = F + mph
const UnitsContext = createContext(null);

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState(() => {
    try {
      return localStorage.getItem("wx_units") || "metric";
    } catch {
      return "metric";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wx_units", units);
    } catch {}
  }, [units]);

  const isMetric = units === "metric";
  const tempSymbol = isMetric ? "°C" : "°F";
  const windLabel = isMetric ? "km/h" : "mph";

  const value = { units, setUnits, isMetric, tempSymbol, windLabel };
  return (
    <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
  );
}

export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used within UnitsProvider");
  return ctx;
}
