
import "./globals.css";

import Layout from "@/components/main/main";
import Footer from "@/components/footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body
      
      >
       <Layout></Layout>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
