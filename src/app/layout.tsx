import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "./components/NavBar";
import { EcommerceContextProvider } from "./store/context";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata = {
  title: "Zaluskyy shop",
  description: "The best shop",
  verification: {
    google: "VxhVBS9PD1d3IF0B3-bOFskK2NNjdBjZI1bqZe4Je3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <EcommerceContextProvider>
        <body className={poppins.className}>
          <NavBar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </body>
      </EcommerceContextProvider>
    </html>
  );
}
