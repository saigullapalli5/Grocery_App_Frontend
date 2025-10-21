import React from 'react';
import { HomeContainer, Container, CenteredRow, ContentColumn, Heading, Paragraph, PrimaryButton } from "./styledComponents";
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import About from '../About';
import ContactUs from '../Contact';
import Header from '../Header';

const Home = () => {
  const onShop = () => {
    console.log('Shop Now clicked');
  };

  return (
    <div>
      <Header />
      <HomeContainer className="home-container" src="https://img.freepik.com/free-vector/online-grocery-store-banner-design_23-2150089535.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712534400&semt=ais">
        <Container>
          <CenteredRow>
            <ContentColumn>
              <Heading className="mb-3 text-white text-shadow-lg text-uppercase">
                Welcome to Our Grocery Web App
              </Heading>
              <Paragraph className="mb-4 text-light fs-5">
                Discover a wide range of groceries and fresh items for all your needs.
              </Paragraph>
              <PrimaryButton>
                <Link
                  to='/login'
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'block',
                    padding: '10px 20px'
                  }}
                >
                  Shop Now
                </Link>
              </PrimaryButton>
            </ContentColumn>
          </CenteredRow>
        </Container>
      </HomeContainer>
      <About />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
