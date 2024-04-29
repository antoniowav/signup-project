import Head from "next/head";
import NewsletterSignUp from "./components/NewsletterSignup";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <NewsletterSignUp />
    </>
  );
};

export default Home;
