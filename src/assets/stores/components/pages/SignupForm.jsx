import { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "An unknown error occurred." }));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      alert("Signup successful!");

      // Reset form
      setFormData({ email: "", password: "" });
      e.target.reset();

    } catch (error) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>SIGN UP</h1>
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        type="email"
        name="email"
        value={formData.email}
      />

      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        type="password"
        name="password"
        value={formData.password}
      />

      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
