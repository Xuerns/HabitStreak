import svgPaths from "./svg-1k1az2jwy3";

export default function Logo() {
  return (
    <div className="relative size-full" data-name="Logo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 127.5">
        <g clipPath="url(#clip0_1_13)" id="Logo">
          <path d={svgPaths.p3a985780} fill="url(#paint0_radial_1_13)" id="Vector" />
          <path d={svgPaths.p1809500} fill="url(#paint1_radial_1_13)" id="Vector_2" />
        </g>
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-75.0164 -0.325516 -0.534867 123.066 48.1179 127.83)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_13" r="1">
            <stop offset="0.314" stopColor="#FF9800" />
            <stop offset="0.662" stopColor="#FF6D00" />
            <stop offset="0.972" stopColor="#F44336" />
          </radialGradient>
          <radialGradient cx="0" cy="0" gradientTransform="matrix(-0.781302 79.5165 58.2109 0.604386 51.7 51.6944)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_13" r="1">
            <stop offset="0.214" stopColor="#FFF176" />
            <stop offset="0.328" stopColor="#FFF27D" />
            <stop offset="0.487" stopColor="#FFF48F" />
            <stop offset="0.672" stopColor="#FFF7AD" />
            <stop offset="0.793" stopColor="#FFF9C4" />
            <stop offset="0.822" stopColor="#FFF8BD" stopOpacity="0.804" />
            <stop offset="0.863" stopColor="#FFF6AB" stopOpacity="0.529" />
            <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209" />
            <stop offset="0.941" stopColor="#FFF176" stopOpacity="0" />
          </radialGradient>
          <clipPath id="clip0_1_13">
            <rect fill="white" height="127.5" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}