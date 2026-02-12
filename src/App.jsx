import { useState } from "react";
function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Patient",
    message: "",
  });
  const [summary, setSummary] = useState("");
  const [autoReply, setAutoReply] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //  AI automation 
  const generateAIResponse = (data) => {
    const shortMessage =
      data.message.length > 60
        ? data.message.substring(0, 60) + "..."
        : data.message;

    const generatedSummary = `User (${data.role}) needs help regarding: "${shortMessage}"`;
    const generatedReply =
      data.role === "Patient"
        ? `Dear ${data.name}, thank you for reaching out. Our healthcare support team will contact you soon with relevant assistance.`
        : `Dear ${data.name}, thank you for volunteering! Our team will contact you with upcoming healthcare initiatives.`;

    return { generatedSummary, generatedReply };
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { generatedSummary, generatedReply } =
      generateAIResponse(formData);

    setSummary(generatedSummary);
    setAutoReply(generatedReply);
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Healthcare Support Portal</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Patient">Patient Support</option>
          <option value="Volunteer">Volunteer Registration</option>
        </select>
        <textarea
          name="message"
          placeholder="Describe your issue or interest..."
          value={formData.message}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: "100px" }}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      {summary && (
        <div style={styles.outputBox}>
          <h3>AI Generated Summary</h3>
          <p>{summary}</p>

          <h3>Automated Response Preview</h3>
          <p>{autoReply}</p>
        </div>
      )}
    </div>
  );
}
const styles = {
  container: {
  minHeight: "100vh",
  backgroundColor: "#eef3f8",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
},
  heading: {
    marginBottom: "20px",
  },
  form: {
  display: "flex",
  flexDirection: "column",
  width: "320px",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
},
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2c7be5",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  outputBox: {
    marginTop: "30px",
    width: "320px",
    padding: "15px",
    backgroundColor: "#f4f6f9",
    borderRadius: "8px",
  },
};
export default App;
