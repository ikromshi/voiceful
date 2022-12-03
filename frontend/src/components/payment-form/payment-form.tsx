import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { FormEvent } from "react";
import "./payment-form.css";


const PaymentForm = () => {
  const [success, setSuccess ] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

    

  const handleSubmit = async (e: FormEvent) => {
    if (!stripe || !elements) {
      console.log("errprrreonewknefe");
      return;
    }
    e.preventDefault()
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!
    })


    if(!error) {
      try {
        const {id} = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id
        });

        if(response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
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
    {!success ? 
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Credit Card Payment: </h1>
        <CardElement/>
        <button className="payment-button">Pay</button>
      </form>
    :
    <div className="payment-success">
      <h1>Payment Successful.</h1>
      <h2>Thanks for shopping with us!</h2>
    </div> 
    }
    </div>
  );
}

export default PaymentForm;