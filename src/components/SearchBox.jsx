import React, { useEffect, useState, useRef } from "react";
import { useCitySuggest } from "../hooks/useCitySuggest";

const SearchBox = ({ onSubmit, initial = "Hanoi" }) => {
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);

  const { data: suggestions = [], isFetching } = useCitySuggest(value, 5);

  //dong dropdown khi click ra ngoai
  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  //mo? dropdown khi co du lieu
  useEffect(() => {
    if (suggestions.length && value.length >= 2) setOpen(true);
    else setOpen(false);
    setActive(-1);
  }, [suggestions, value]);

  const pick = (label) => {
    setValue(label);
    setOpen(false);
    onSubmit?.(label);
  };

  const onKeyDown = (e) => {
    if (!open) return;
    const max = suggestions.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i < max ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i > 0 ? i - 1 : max));
    } else if (e.key === "Enter") {
      if (active >= 0 && active <= max) {
        e.preventDefault();
        const s = suggestions[active];
        pick(labelOf(s));
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (v) onSubmit?.(v);
  };

  return (
    <div ref={boxRef} className="w-full max-w-md relative">
      <form onSubmit={onFormSubmit} className="w-full max-w-md flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter city"
          className="flex-1 rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-800"
        />
        <button className="rounded-xl border px-4 py-2 font-medium hover:bg-white/60 dark:hover:bg-zinc-800/60">
          Find
        </button>
      </form>

      {/*  dropdown */}
      {open && (
        <div>
          {isFetching && <div>Loading sugesstions...</div>}
          {!isFetching && suggestions.length === 0 && (
            <div>Do not have suggestions</div>
          )}

          {!isFetching &&
            suggestions.map((s, idx) => {
              const label = labelOf(s);
              const hot = idx === active;
              return (
                <button
                  type="button"
                  key={`${s.name}-${s.lat}-${s.lon}`}
                  onClick={() => pick(label)}
                  className={
                    "w-full text-left px-3   py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" +
                    (hot ? " bg-zinc-100 dark:bg-zinc-800" : "")
                  }
                >
                  {label}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

function labelOf(s) {
  return `${s.name}${s.country ? ", " + s.country : ""}`;
}
