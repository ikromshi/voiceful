import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import "./payment-form.css";

const PaymentForm = () => {
const stripe = useStripe();
const elements = useElements();

  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

  }

  return (
    <div className="payment-form-div">
      <form className="form-container">
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <button className="payment-button">Pay Now</button>
      </form>
    </div>
  )
}

export default PaymentForm;