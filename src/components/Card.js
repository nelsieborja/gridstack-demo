import { useEffect, useRef, useState } from "react";

export default function Card({
  id,
  title: initialTitle,
  w,
  h,
  x,
  y,
  actions,
  children
}) {
  const ref = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(
    initialTitle || "Double click to change title"
  );

  useEffect(() => {
    actions.handleRemove(ref.current, false);
    actions.handleAdd(ref.current);
  }, []);

  const handleToggle = (flag) => {
    setToggle(flag);
    actions.handleEnableMove(flag);
  };

  return (
    <div
      ref={ref}
      id={`${id}`} // convert to string
      className="grid-stack-item"
      gs-w={w}
      gs-h={h}
      gs-x={x}
      gs-y={y}
    >
      <div className="grid-stack-item-content">
        <header>
          {toggle ? (
            <h2
              title="Double click to change title"
              onDoubleClick={() => handleToggle(false)}
            >
              {title}
            </h2>
          ) : (
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  handleToggle(true);
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onBlur={() => handleToggle(true)}
            />
          )}

          <button
            title="Delete widget"
            onClick={() => {
              actions.handleRemove(ref.current);
            }}
          >
            &#x2715;
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
