import React, { useState } from "react";
import classes from "./CheckOutForm.module.scss";

const CheckOutForm = () => {
  // Simple state for each field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Simple form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", { firstName, lastName, email, address });
  };

  return (
    <form className={classes.checkoutForm} onSubmit={handleSubmit}>
      <h2>Checkout Form</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <button type="submit">Place Order</button>
    </form>
  );
};

export default CheckOutForm;
