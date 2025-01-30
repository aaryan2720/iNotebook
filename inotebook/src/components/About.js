import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>AboutiNotebook</h1>
        <p style={styles.description}>
          Welcome to <strong>iNotebook</strong>! Your one-stop solution for managing your notes efficiently and securely. Whether you're a student, professional, or someone who loves staying organized, iNotebook is designed to simplify your life.
        </p>
        <h2 style={styles.subheading}>Features</h2>
        <ul style={styles.list}>
          <li>📝 Create, save, and organize your notes effortlessly.</li>
          <li>✏️ Edit and update notes whenever you need.</li>
          <li>🗑️ Delete notes you no longer need with ease.</li>
          <li>🔒 Secure your data with state-of-the-art encryption.</li>
          <li>🌐 Access your notes anywhere with a responsive design.</li>
        </ul>
        <h2 style={styles.subheading}>Why Choose iNotebook?</h2>
        <p style={styles.description}>
          iNotebook stands out for its simplicity, reliability, and user-friendly interface. Stay productive and organized without worrying about managing physical notebooks or cluttered apps. With iNotebook, all your notes are just a click away.
        </p>
        <p style={styles.footer}>
          <strong>Start your journey with iNotebook today !</strong>
        </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  subheading: {
    fontSize: "1.8rem",
    color: "#555",
    marginBottom: "10px",
  },
  list: {
    textAlign: "left",
    marginBottom: "20px",
    padding: "0 20px",
    lineHeight: "1.8",
    color: "#555",
  },
  footer: {
    fontSize: "1.3rem",
    color: "#4CAF50",
    fontWeight: "bold",
  },
};

export default About;
