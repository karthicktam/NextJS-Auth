import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-red-100 h-full min-h-screen">
          <Nav />
          <div className="h-full">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
