import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

 useEffect(() => {
  fetch("http://localhost:5000/api/dashboard")
    .then(async (res) => {
      const d = res.ok ? await res.json() : null;
      console.log("DASHBOARD API RESPONSE:", d);
      setData(d ?? sampleData);
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      setData(sampleData);
    });
}, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!data) return null;

  return (
    <div
      style={{
        height: "90vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(12px, 2vw, 24px)",
        color: "#e6eef8",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 2vh, 20px)",
        }}
      >
        {/* Top stat cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 30vw, 360px), 1fr))",
            gap: "clamp(12px, 2vw, 20px)",
            flexShrink: 0,
          }}
        >
          <StatCard
            title="Number of Users"
            left={data.usersActive}
            right={data.usersAll}
            rightLabel="All Users"
            icon={<IconUser />}
            tileGradient="linear-gradient(180deg,#2b6bd6,#1a3b6b)"
          />

          <StatCard
            title="Number of Mechanics"
            left={data.mechanicsActive}
            right={data.mechanicsAll}
            rightLabel="All Mechanics"
            icon={<IconWrench />}
            tileGradient="linear-gradient(180deg,#2fa86b,#174c3f)"
          />

          <StatCard
            title="Number of Premium Users"
            left={data.premiumActive}
            right={data.premiumAll}
            rightLabel="All Premium Users"
            icon={<IconCrown />}
            tileGradient="linear-gradient(180deg,#8a48db,#3a1e5a)"
          />
        </div>

        {/* Bottom large stat cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(clamp(300px, 45vw, 600px), 1fr))",
            gap: "clamp(12px, 2vw, 20px)",
            flex: 1,
            minHeight: 0,
          }}
        >
          <LargeStat
            title="Number of Appeals"
            total={data.appeals}
            change={data.appealsChange}
            sparkline={data.appealsSparkline}
            tileGradient="linear-gradient(180deg,#ffb84d,#9d6b2e)"
            icon={<IconFlag />}
          />

          <LargeStat
            title="Number of Reports"
            total={data.reports}
            change={data.reportsChange}
            sparkline={data.reportsSparkline}
            tileGradient="linear-gradient(180deg,#6fb0ff,#294d7a)"
            icon={<IconChart />}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Presentational subcomponents ---------- */

function StatCard({ title, left, right, rightLabel = "All", icon, tileGradient }) {
  const isSpecial = ["Number of Users", "Number of Mechanics", "Number of Premium Users"].includes(title);

  const baseStyle = {
    borderRadius: "clamp(10px, 2vw, 16px)",
    padding: "clamp(16px, 3vw, 30px)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(8px, 1.5vw, 16px)",
    cursor: "default",
  };

  const titleColors = {
    "Number of Users": {
      border: "rgba(43, 107, 214, 0.4)",
      glow: "rgba(43, 107, 214, 0.25)",
      numColor: "#6fb8ff",
    },
    "Number of Mechanics": {
      border: "rgba(47, 168, 107, 0.4)",
      glow: "rgba(47, 168, 107, 0.25)",
      numColor: "#4fd07a",
    },
    "Number of Premium Users": {
      border: "rgba(138, 72, 219, 0.4)",
      glow: "rgba(138, 72, 219, 0.25)",
      numColor: "#c47bff",
    },
  };

  const colors = titleColors[title] || {};

  return (
    <div
      role="group"
      tabIndex={-1}
      style={{
        ...baseStyle,
        background: isSpecial
          ? "linear-gradient(135deg, rgba(59,130,246,0.014), rgba(255,255,255,0.008))"
          : "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: `1px solid ${colors.border || "rgba(255,255,255,0.03)"}`,
        boxShadow: isSpecial
          ? `inset 0 1px 0 rgba(255,255,255,0.02), 0 clamp(10px, 2vw, 16px) clamp(24px, 5vw, 40px) rgba(2,6,23,0.6), 0 0 clamp(14px, 3vw, 20px) ${colors.glow || "rgba(255,255,255,0.1)"}`
          : "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 28px rgba(3,8,20,0.6)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 12px)" }}>
        <div
          style={{
            width: "clamp(40px, 6vw, 56px)",
            height: "clamp(40px, 6vw, 56px)",
            borderRadius: "clamp(8px, 1.5vw, 12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: tileGradient,
            boxShadow: "0 6px 18px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.03)",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.92 }}>{title}</div>
      </div>

      {isSpecial ? (
        <div style={{ display: "flex", alignItems: "center", paddingTop: "clamp(4px, 1vw, 8px)" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 700,
                color: colors.numColor,
                lineHeight: 1,
              }}
            >
              {formatNumber(left)}
            </div>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "rgba(255,255,255,0.65)", marginTop: 8 }}>
              Active {title.replace("Number of ", "")}
            </div>
          </div>

          <div
            style={{
              width: 1,
              height: "clamp(40px, 6vw, 48px)",
              background: "rgba(255,255,255,0.04)",
              margin: "0 clamp(12px, 2vw, 22px)",
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 700, color: "#e6eef8", lineHeight: 1 }}>
              {formatNumber(right)}
            </div>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "rgba(255,255,255,0.65)", marginTop: 8 }}>
              {rightLabel}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 28px)" }}>
          <div style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#9fd6ff" }}>{formatNumber(left)}</div>

          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.04)", paddingLeft: "clamp(12px, 2vw, 22px)" }}>
            <div style={{ fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 600 }}>{formatNumber(right)}</div>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              {rightLabel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LargeStat({ title, total, change, sparkline = [], tileGradient, icon }) {
  const isSpecial = ["Number of Appeals", "Number of Reports"].includes(title);

  if (isSpecial) {
    const config = {
      "Number of Appeals": {
        bgGradient: "linear-gradient(180deg, rgba(200,120,60,0.08), rgba(200,80,60,0.03))",
        border: "rgba(200, 120, 80, 0.5)",
        boxShadow: "0 clamp(12px, 2vw, 16px) clamp(32px, 5vw, 40px) rgba(200,120,80,0.15), 0 0 clamp(20px, 3vw, 28px) rgba(200, 120, 80, 0.35)",
        iconGradient: "linear-gradient(180deg, #c97a3a, #7a4a25)",
        iconShadow: "0 10px 24px rgba(200,120,60,0.4), inset 0 1px rgba(255,255,255,0.08)",
        numColor: "#ffb84d",
        strokeColor: "#ffb84d",
      },
      "Number of Reports": {
        bgGradient: "linear-gradient(180deg, rgba(200,80,60,0.08), rgba(200,80,60,0.03))",
        border: "rgba(220, 80, 60, 0.5)",
        boxShadow: "0 clamp(12px, 2vw, 16px) clamp(32px, 5vw, 40px) rgba(220,80,60,0.15), 0 0 clamp(20px, 3vw, 28px) rgba(220, 80, 60, 0.35)",
        iconGradient: "linear-gradient(180deg, #d45a42, #8a3528)",
        iconShadow: "0 10px 24px rgba(212,90,66,0.4), inset 0 1px rgba(255,255,255,0.08)",
        numColor: "#ff8a66",
        strokeColor: "#ff8a66",
      },
    };

    const cfg = config[title];

    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: cfg.bgGradient,
          borderRadius: "clamp(12px, 2.5vw, 20px)",
          border: `1px solid ${cfg.border}`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.01), ${cfg.boxShadow}`,
          padding: "clamp(20px, 3.5vw, 32px)",
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "clamp(240px, 30vh, 320px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 18px)",
            marginBottom: "clamp(12px, 2vw, 20px)",
            paddingBottom: "clamp(12px, 2vw, 16px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: "clamp(50px, 8vw, 68px)",
              height: "clamp(50px, 8vw, 68px)",
              borderRadius: "clamp(10px, 2vw, 16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: cfg.iconGradient,
              boxShadow: cfg.iconShadow,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 500, opacity: 0.96, color: "#e6eef8" }}>
            {title}
          </div>
        </div>

        {/* Number + Label Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 14px)", marginBottom: "clamp(12px, 2vw, 20px)" }}>
          <div style={{ fontSize: "clamp(36px, 7vw, 52px)", fontWeight: 700, color: cfg.numColor, lineHeight: 1 }}>
            {formatNumber(total)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontSize: "clamp(12px, 1.8vw, 16px)", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
              {title.replace("Number of ", "")}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: "clamp(12px, 1.8vw, 14px)", color: "rgba(255,255,255,0.65)" }}>
            {change}
          </div>
        </div>

        {/* Sparkline */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", marginBottom: "clamp(16px, 2.5vw, 24px)" }}>
          <div style={{ width: "100%", height: "clamp(60px, 12vh, 100px)" }}>
            <Sparkline points={sparkline} stroke={cfg.strokeColor} strokeWidth="3" />
          </div>
        </div>

        {/* Date labels */}
        <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 14px)", color: "rgba(255,255,255,0.5)", fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: "0.5px" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} style={{ flex: 1, textAlign: "center" }}>
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function Sparkline({ points = [], stroke = "#7dd3fc", strokeWidth = "2.6" }) {
  if (!points || points.length < 2) {
    return <svg viewBox="0 0 100 40" preserveAspectRatio="none" />;
  }

  const w = 340,
    h = 88;
  const mx = Math.max(...points),
    mn = Math.min(...points);
  const step = w / Math.max(1, points.length - 1);
  const coords = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - mn) / Math.max(1, mx - mn)) * (h - 12) - 6;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <polyline fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" points={coords} />
    </svg>
  );
}

/* Icon components */
function IconUser() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" fill="#fff" fillOpacity="0.96" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#fff" fillOpacity="0.90" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <image href="/icon/wrench.png" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}

function IconCrown() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <image x="3" y="3" width="18" height="18" xlinkHref="/icon/diamond.png" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

function IconFlag() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <image x="2" y="2" width="20" height="20" xlinkHref="/icon/flag.png" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" aria-hidden>
      <image href="/icon/report.png" x="2" y="2" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}

/* Helpers */
const formatNumber = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : n ?? "—");

const sampleData = {
  user: "Admin",
  usersActive: 1250,
  usersAll: 5320,
  mechanicsActive: 420,
  mechanicsAll: 1140,
  premiumActive: 980,
  premiumAll: 2310,
  appeals: 73,
  appealsChange: "+3",
  appealsSparkline: [6, 8, 7, 8, 9, 10, 12],
  reports: 285,
  reportsChange: "+7",
  reportsSparkline: [4, 6, 5, 7, 8, 9, 11],
};