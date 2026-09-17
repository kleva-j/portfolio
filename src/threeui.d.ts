// The configured ThreeUI usage imports its stylesheet through the package
// specifier as a side-effect. Vite resolves it via a resolve.alias; this ambient
// declaration lets TypeScript accept the side-effect import.
declare module "@designcodeio/threeui/style.css";
