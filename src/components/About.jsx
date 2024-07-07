import React from "react";

const About = () => {
  const aboutStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4rem 2rem",
    backgroundColor: "#f9f9f9",
    color: "#333",
    textAlign: "center",
    borderRadius: "10px", 
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", 
    maxWidth: "800px",
    margin: "0 auto", 
  };

  const headingStyle = {
    fontSize: "3rem", 
    marginBottom: "1rem",
    color: "#333",
    textTransform: "uppercase", 
  };

  const paragraphStyle = {
    fontSize: "1.3rem",
    lineHeight: "1.8",
    marginTop: "1.5rem",
    color: "#666",
  };

  const highlightStyle = {
    fontWeight: "bold", 
    color: "#555",
  };

  return (
    <main style={aboutStyle}>
      <h2 style={headingStyle}>Welcome to Our Blog</h2>
      <p style={paragraphStyle}>
        Our blog app is designed to showcase the latest in web development,
        including React and its ecosystem. We aim to provide{" "}
        <span style={highlightStyle}>insightful articles</span> and tutorials
        that help you master React and build amazing applications.
      </p>
      <p style={paragraphStyle}>
        Whether you're new to React or a seasoned developer, you'll find{" "}
        <span style={highlightStyle}>valuable resources</span> here to enhance
        your skills and stay updated with the latest trends in front-end
        development.
      </p>
      <p style={paragraphStyle}>
        Join our community of developers and enthusiasts as we explore the
        endless possibilities of React and JavaScript. Let's{" "}
        <span style={highlightStyle}>create something incredible</span>{" "}
        together!
      </p>
    </main>
  );
};

export default About;
