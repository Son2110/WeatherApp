import React from "react";

const RecentCities = ({
  items = [],
  onPick,
  onPin,
  onUnpin,
  onClearNonPinned,
  onClearAll,
}) => {
  if (!items.length) return null;

  return (
    <div className="mt-4 w-full max-w-md">
      <div className="text-sm mb-2 opacity-70">Recent / Favorites</div>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={onClearNonPinned}
          className="text-xs px-2 py-1 rounded border hover:bg-white/10"
          title="Delete recent (keep favorites)"
        >
          Clear recent
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={onClearAll}
          className="text-xs px-2 py-1 rounded border hover:bg-white/10"
          title="Delete all"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onPick?.(it.label)}
            className={`px-3 py-1 rounded-full border text-sm hover:bg-white/10 ${
              it.pinned ? "border-yellow-400" : ""
            }`}
            title={it.pinned ? "Favorited" : "Recent"}
          >
            {it.label}
            <span
              onClick={(e) => {
                e.stopPropagation();
                it.pinned ? onUnpin?.(it.key) : onPin?.(it.key);
              }}
              className="ml-2 text-xs opacity-70 hover:opacity-100"
            >
              {it.pinned ? "★" : "☆"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentCities;
