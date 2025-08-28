import React from "react";

const MyLocationButton = ({ onPickCoords, className = "" }) => {
  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    if (!navigator.geolocation) {
      return alert("Not support position");
    }
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      onPickCoords(position.coords.latitude, position.coords.longitude);
    } catch (err) {
      alert("Cant take postion");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Use my location"
      className={`rounded-xl border px-4 py-2 font-medium 
        hover:bg-white/60 dark:hover:bg-zinc-800/60
        flex items-center gap-2 justify-center
        w-[120px] whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      My location
    </button>
  );
};

export default MyLocationButton;
