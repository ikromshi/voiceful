import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { FormEvent } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import "./payment-form.css";


const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const CARD_OPTIONS = {
    style: {
      base: {
        color: "white",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "20px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#D1D5DB",
        },
      },
      invalid: {
        iconColor: "#ef2961",
        color: "#ef2961",
      },
    },
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    })


    if(!error) {
      try {
        const {id} = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id
        });
        setIsProcessingPayment(false);

        if(response.data.success) {
          console.log("Successful payment");
          setPaymentProcessed(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  }

  return (
    <div className="payment-form-div">
    {!paymentProcessed ? 
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Credit Card Payment: </h1>
        <CardElement options={CARD_OPTIONS}/>
        <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay $10</Button>
      </form>
    :
    <div className="payment-success">
      <h1>Payment Successful.</h1>
      <h2>Thank you for your donation!</h2>
    </div> 
    }
    </div>
  );
}

export default PaymentForm;