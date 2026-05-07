import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  size?: number;
  variant?: "mark" | "wordmark";
};

export default function Logo({
  size = 32,
  variant = "mark",
  ...props
}: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        width={size * 2.6}
        height={size}
        viewBox="0 0 130 50"
        fill="none"
        role="img"
        aria-label="Wissem Karboub"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <defs>
          <linearGradient id="wk-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5F3EE" />
            <stop offset="55%" stopColor="#C8B89A" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="38"
          fontFamily="Syne, system-ui, sans-serif"
          fontWeight="800"
          fontSize="44"
          letterSpacing="-2"
          fill="url(#wk-grad)"
        >
          WK
        </text>
        <circle cx="62" cy="38" r="3" fill="#C8B89A" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Wissem Karboub"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="wk-mark-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0D0D0D" />
        </linearGradient>
        <linearGradient id="wk-mark-fg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5F3EE" />
          <stop offset="55%" stopColor="#C8B89A" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        fill="url(#wk-mark-bg)"
        stroke="#C8B89A"
        strokeWidth="2"
      />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-1.5"
        fill="url(#wk-mark-fg)"
      >
        WK
      </text>
    </svg>
  );
}
