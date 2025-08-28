import React from "react";
import { useUnits } from "../lib/units.jsx";

const UnitsToggle = () => {
  const { units, setUnits, tempSymbol, windLabel } = useUnits();

  const toggle = () => setUnits(units === "metric" ? "imperial" : "metric");
  return (
    <button
      onClick={toggle}
      className="mt-2 text-xs px-3 py-1 rounded-full border hover:bg-white/10"
      title="Change unit temperature and wind"
    >
      {tempSymbol} - {windLabel}
    </button>
  );
};

export default UnitsToggle;
