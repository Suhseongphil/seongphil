import { Nanum_Gothic } from "next/font/google";
import "./globals.css";

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "seongphil_포트폴리오",
  description: "seongphil 포트폴리오",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${nanumGothic.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
