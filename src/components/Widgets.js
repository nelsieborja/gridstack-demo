export const WIDGETS = {
  grid: {
    component: () => <div style={{ textAlign: "center" }}>GRID</div>,
    label: "Grid"
  },
  chart: {
    component: () => <div style={{ textAlign: "center" }}>CHART</div>,
    label: "Chart"
  }
};

export default function Widgets() {
  return (
    <aside>
      {Object.entries(WIDGETS).map(([key, value]) => (
        <div
          key={key}
          data-type={key}
          className="droppable grid-stack-item"
          gs-h="4"
          gs-w="6"
        >
          {value.label}
        </div>
      ))}
    </aside>
  );
}
