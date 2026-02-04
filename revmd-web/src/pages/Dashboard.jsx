// ...existing code...
import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

/**
 * Pixel-accurate Dashboard UI (static — clicks do nothing).
 * Replace the file contents with this component.
 */
export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Try to load real data, fall back to the visual sample values from the screenshot.
    authFetch?.("/api/dashboard")
      .then(async (res) => {
        try {
          const d = res?.ok ? await res.json() : null;
          setData(d ?? sampleData);
        } catch {
          setData(sampleData);
        }
      })
      .catch(() => {
        setData(sampleData);
      });
  }, []);

  if (!data) return null;

  const sampleStyle = {
    pageBg:
      "radial-gradient(60% 60% at 10% 10%, rgba(40,48,80,0.18), transparent), linear-gradient(180deg,#06071a 0%, #0b1220 100%)",
    cardBg: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    glassBorder: "1px solid rgba(255,255,255,0.04)",
    muted: "rgba(255,255,255,0.55)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        background: sampleStyle.pageBg,
        color: "#e6eef8",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      <div style={{ maxWidth: 1180 }}>
        {/* top header row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 26 }}>
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

        {/* bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
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

/* ---------- Presentational subcomponents (static; clicks disabled) ---------- */

function StatCard({ title, left, right, rightLabel = "All", icon, tileGradient }) {
  // special case: "Number of Users" - with blue edge glow
  if (title === "Number of Users") {
    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.008))",
          borderRadius: 14,
          border: "1px solid rgba(43, 107, 214, 0.4)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 14px 40px rgba(2,6,23,0.6), 0 0 20px rgba(43, 107, 214, 0.25)",
          padding: 30,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: tileGradient,
              boxShadow: "0 6px 18px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.03)",
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: 16, opacity: 0.92 }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", paddingTop: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#6fb8ff", lineHeight: 1 }}>{formatNumber(left)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>Active Users</div>
          </div>

          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.04)", margin: "0 22px" }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e6eef8", lineHeight: 1 }}>{formatNumber(right)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>{rightLabel}</div>
          </div>
        </div>
      </div>
    );
  }

  // special case: "Number of Mechanics" - with green edge glow
  if (title === "Number of Mechanics") {
    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.014), rgba(255,255,255,0.008))",
          borderRadius: 14,
          border: "1px solid rgba(47, 168, 107, 0.4)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 14px 36px rgba(2,6,23,0.62), 0 0 20px rgba(47, 168, 107, 0.25)",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: tileGradient,
              boxShadow: "0 6px 18px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.02)",
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: 16, opacity: 0.92 }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", paddingTop: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#4fd07a", lineHeight: 1 }}>{formatNumber(left)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>Active Mechanics</div>
          </div>

          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.04)", margin: "0 22px" }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e6eef8", lineHeight: 1 }}>{formatNumber(right)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>{rightLabel}</div>
          </div>
        </div>
      </div>
    );
  }

  // special case: "Number of Premium Users" - with purple edge glow
  if (title === "Number of Premium Users") {
    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.014), rgba(255,255,255,0.008))",
          borderRadius: 14,
          border: "1px solid rgba(138, 72, 219, 0.4)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 14px 36px rgba(2,6,23,0.62), 0 0 20px rgba(138, 72, 219, 0.25)",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: tileGradient,
              boxShadow: "0 6px 18px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.02)",
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: 16, opacity: 0.92 }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", paddingTop: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#c47bff", lineHeight: 1 }}>{formatNumber(left)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>Active Premium Users</div>
          </div>

          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.04)", margin: "0 22px" }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e6eef8", lineHeight: 1 }}>{formatNumber(right)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>{rightLabel}</div>
          </div>
        </div>
      </div>
    );
  }

  // default (other cards) unchanged
  return (
    <div
      role="group"
      tabIndex={-1}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.03)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 28px rgba(3,8,20,0.6)",
        padding: 18,
        display: "flex",
        gap: 16,
        alignItems: "center",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: tileGradient,
          boxShadow: "0 6px 20px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, opacity: 0.88, marginBottom: 10 }}>{title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#9fd6ff" }}>{formatNumber(left)}</div>

          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.04)", paddingLeft: 22 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{formatNumber(right)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{rightLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LargeStat({ title, total, change, sparkline = [], tileGradient, icon }) {
  // special case: "Number of Appeals" - accurate to provided image
  if (title === "Number of Appeals") {
    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: "linear-gradient(180deg, rgba(200,120,60,0.08), rgba(200,80,60,0.03))",
          borderRadius: 16,
          border: "1px solid rgba(200, 120, 80, 0.5)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.01), 0 16px 40px rgba(200,120,80,0.15), 0 0 28px rgba(200, 120, 80, 0.35)",
          padding: 28,
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 300,
        }}
      >
        {/* Header: Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #c97a3a, #7a4a25)",
              boxShadow: "0 10px 24px rgba(200,120,60,0.4), inset 0 1px rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: 20, fontWeight: 500, opacity: 0.96, color: "#e6eef8" }}>{title}</div>
        </div>

        {/* Number + Label Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#ffb84d", lineHeight: 1 }}>{formatNumber(total)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>Appeals</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{change}</div>
        </div>

        {/* Sparkline */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", marginBottom: 24 }}>
          <div style={{ width: "100%", height: 88 }}>
            <Sparkline points={sparkline} stroke="#ffb84d" strokeWidth="3" />
          </div>
        </div>

        {/* Date labels */}
        <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.5px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>Th</div>
          <div style={{ flex: 1, textAlign: "center" }}>Fri</div>
          <div style={{ flex: 1, textAlign: "center" }}>Sat</div>
          <div style={{ flex: 1, textAlign: "center" }}>Sun</div>
          <div style={{ flex: 1, textAlign: "center" }}>Apr</div>
          <div style={{ flex: 1, textAlign: "center" }}>Jul</div>
        </div>
      </div>
    );
  }

  // special case: "Number of Reports" - accurate to provided image
  if (title === "Number of Reports") {
    return (
      <div
        role="group"
        tabIndex={-1}
        style={{
          background: "linear-gradient(180deg, rgba(200,80,60,0.08), rgba(200,80,60,0.03))",
          borderRadius: 16,
          border: "1px solid rgba(220, 80, 60, 0.5)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.01), 0 16px 40px rgba(220,80,60,0.15), 0 0 28px rgba(220, 80, 60, 0.35)",
          padding: 28,
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 300,
        }}
      >
        {/* Header: Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #d45a42, #8a3528)",
              boxShadow: "0 10px 24px rgba(212,90,66,0.4), inset 0 1px rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          <div style={{ fontSize: 20, fontWeight: 500, opacity: 0.96, color: "#e6eef8" }}>{title}</div>
        </div>

        {/* Number + Label Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#ff8a66", lineHeight: 1 }}>{formatNumber(total)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>Reports</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{change}</div>
        </div>

        {/* Sparkline */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", marginBottom: 24 }}>
          <div style={{ width: "100%", height: 88 }}>
            <Sparkline points={sparkline} stroke="#ff8a66" strokeWidth="3" />
          </div>
        </div>

        {/* Date labels */}
        <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.5px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>Th</div>
          <div style={{ flex: 1, textAlign: "center" }}>Fri</div>
          <div style={{ flex: 1, textAlign: "center" }}>Sat</div>
          <div style={{ flex: 1, textAlign: "center" }}>Man</div>
          <div style={{ flex: 1, textAlign: "center" }}>Apr</div>
          <div style={{ flex: 1, textAlign: "center" }}>Jul</div>
        </div>
      </div>
    );
  }

  // default (other large stats) unchanged
  return (
    <div
      role="group"
      tabIndex={-1}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.03)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 28px rgba(3,8,20,0.6)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 220,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: tileGradient,
              boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          <div>
            <div style={{ fontSize: 16, opacity: 0.9 }}>{title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{change ? `${change} Today` : "+0 Today"}</div>
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: totalColor(tileGradient) }}>{formatNumber(total)}</div>
        <div style={{ color: "rgba(255,255,255,0.75)" }}>{title.replace("Number of ", "")}</div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height: 72 }}>
          <Sparkline points={sparkline} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
        <div style={{ flex: 1 }}>Th</div>
        <div style={{ flex: 1 }}>Fri</div>
        <div style={{ flex: 1 }}>Sat</div>
        <div style={{ flex: 1 }}>Sun</div>
        <div style={{ flex: 1 }}>Mar</div>
        <div style={{ flex: 1 }}>Apr</div>
        <div style={{ flex: 1 }}>Jul</div>
      </div>
    </div>
  );
}

/* Simple sparkline (SVG) - updated for stroke width parameter */
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

  /* ---------- Icons (accurate gradients, tiled background) ---------- */

  function IconUser() {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <defs>
          <linearGradient id="gUserDash" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#7dd3fc" />
            <stop offset="1" stopColor="#2b6bd6" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="24" height="24" rx="6" fill="url(#gUserDash)" opacity="0.14" />
        <circle cx="12" cy="9" r="3.5" fill="#fff" fillOpacity="0.96" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#fff" fillOpacity="0.90" />
      </svg>
    );
  }

  function IconWrench({ size = 24 }) {
    // force the SVG to fill its parent tile and let the image occupy the full viewBox
    const pad = 0;
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gWrenchDash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9ae6b4" />
            <stop offset="100%" stopColor="#2fa86b" />
          </linearGradient>
        </defs>


        {/* IMAGE ICON - fills the SVG area (uses slice so it covers edges) */}
        <image
          href="/icon/wrench.png"
          x={pad}
          y={pad}
          width={24}
          height={24}
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    );
  }




  function IconCrown() {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gCrownDash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

      

        {/* CROWN IMAGE */}
        <image
          x="3"
          y="3"
          width="18"
          height="18"
          xlinkHref="/icon/diamond.png"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    );
  }

  function IconFlag() {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gFlagDash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd08a" />
            <stop offset="100%" stopColor="#ff9f43" />
          </linearGradient>
        </defs>


        {/* BIGGER FLAG */}
        <image
          x="2"
          y="2"
          width="20"
          height="20"
          xlinkHref="/icon/flag.png"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    );
  }

  function IconChart() {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <defs>
          <linearGradient id="gChartDash" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff9966" />
            <stop offset="100%" stopColor="#d45a42" />
          </linearGradient>
        </defs>

      
        {/* Embedded chart image */}
        <image
          href="icon/report.png"   // <-- place image in public/chart.png
          x="2"
          y="2"
          width="20"
          height="20"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    );
  }
// Media Query for responsive layout
const mediaQuery = `
@media (max-width: 1200px) {
  .container {
    padding: 20px;
  }

  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .card {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    align-items: center;
  }
}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${mediaQuery}</style>`);

  /* ---------- Helpers & sample data ---------- */

  const formatNumber = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : n ?? "—");

  const totalColor = (gradient) => {
    // choose a readable highlight color based on gradient argument
    if (!gradient) return "#9fd6ff";
    if (gradient.includes("#ff")) return "#ffb84d";
    if (gradient.includes("#8a48db") || gradient.includes("#7c3aed")) return "#d5a6ff";
    if (gradient.includes("#2fa86b")) return "#7ee29b";
    return "#9fd6ff";
  };

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