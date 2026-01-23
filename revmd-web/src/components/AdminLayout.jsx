import SidePanelCard from "./SidePanelCard";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={shell}>
      <div style={sidebarWrapper}>
        <SidePanelCard />
      </div>
      <main style={main}>
        <div style={mainInner}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const shell = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  background: "#020617",
};

const sidebarWrapper = {
  flexShrink: 0,
};

const main = {
  flex: 1,
  minWidth: 0,
  overflowY: "auto",
  background: "#020617",
};

const mainInner = {
  minHeight: "100%",
  padding: 24,
  boxSizing: "border-box",
};

