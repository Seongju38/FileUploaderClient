/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind 적용 범위
    "node_modules/antd/es/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Ant Design의 기본 스타일과 충돌 방지 -> Ant Design의 클래스에 우선순위 부여
  },
}

