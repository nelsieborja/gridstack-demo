import { useRef, useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/h5/gridstack-dd-native";
import "gridstack/dist/gridstack.css";

let id = 1;
export default function Grid({ children, setWidgets }) {
  const gridRef = useRef();

  useEffect(() => {
    gridRef.current = GridStack.init({
      cellHeight: 70,
      minRow: 4, // don't collapse when empty
      margin: 4,
      resizable: {
        handles: "all"
      },
      acceptWidgets: true,
      dragIn: ".droppable", // class that can be dragged from outside
      dragInOptions: {
        revert: "invalid",
        scroll: false,
        appendTo: "body",
        helper: "clone"
      }
    });

    const grid = gridRef.current;
    if (grid) {
      grid.on("dropped", function (event, previousWidget, newWidget) {
        const { el, w, h, x, y } = newWidget;
        grid.removeWidget(el);
        setWidgets((items) => [
          ...items,
          {
            id: id++,
            type: el.dataset.type,
            w,
            h,
            x,
            y
          }
        ]);
      });
    }
  }, []);

  const handleAdd = (el) => {
    if (el && gridRef.current) {
      gridRef.current.makeWidget(el);
    }
  };
  const handleRemove = (el, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets((items) => items.filter((item) => `${item.id}` !== el.id));
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };

  return (
    <section>
      <div className="grid-stack">
        {children({
          handleAdd,
          handleRemove,
          handleEnableMove
        })}
      </div>
    </section>
  );
}
