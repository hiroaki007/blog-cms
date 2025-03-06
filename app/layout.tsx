import "../app/styles/globals.css";
import Navbar from "../components/Navbar";
import ReactQueryProvider from "@/lib/react-query";

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ja">
      <body>
        <ReactQueryProvider>
          <Navbar/>
          <main className="container mx-auto p4">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
