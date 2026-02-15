import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";
export const alt = "Tobias Lippert - Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#fafafa",
            margin: 0,
          }}
        >
          YourName
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            margin: 0,
          }}
        >
          Software Engineer & Technical Writer
        </p>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
