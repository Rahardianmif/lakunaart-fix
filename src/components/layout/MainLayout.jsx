import Navbar from "./Navbar";
import Footer from "./Footer";
import PageContainer from "./PageContainer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        <PageContainer>
          {children}
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;