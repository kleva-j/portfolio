import { AbsoluteFill } from "remotion";

export type PostOgProps = {
  title: string;
  category: string;
  date: string;
  slug: string;
};

export function PostOg({ title, category, date, slug }: PostOgProps) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4f1eb",
        color: "#24221f",
        fontFamily: "Inter, Arial, sans-serif",
        padding: 64,
      }}
    >
      <div
        style={{
          border: "1px solid #d7d1c7",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#9b573a",
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            gap: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>{category}</span>
          <span
            style={{
              backgroundColor: "#9b573a",
              height: 5,
              width: 5,
            }}
          />
          <span style={{ color: "#6d6962", fontWeight: 400 }}>{date}</span>
        </div>

        <div>
          <h1
            style={{
              fontSize: 70,
              fontWeight: 500,
              letterSpacing: -3,
              lineHeight: 1.06,
              margin: 0,
              maxWidth: 950,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "#6d6962",
              fontSize: 24,
              letterSpacing: 1,
              margin: "24px 0 0",
              textTransform: "uppercase",
            }}
          >
            Michael Obasi / Writing
          </p>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: "1px solid #d7d1c7",
            color: "#6d6962",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 16,
            justifyContent: "space-between",
            paddingTop: 18,
          }}
        >
          <span>Michael Obasi</span>
          <span>{slug}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
