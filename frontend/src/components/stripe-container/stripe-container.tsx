import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../payment-form/payment-form";

const PUBLIC_KEY = "pk_test_51LOluIJqNV7gNhmtacoS16SOp8szVp6GvDw6pbqzsucJGtZTLSNntHhxV0jaQzaiyOW48yarHNTJi7nnlyAiO9Se00GZggGq94";
const stripeTestPromsie = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromsie}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;