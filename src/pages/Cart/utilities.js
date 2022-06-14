export function fetchRazorpayScript(src) {
  return new Promise((res, rej) => {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => res(script);
    script.onerror = () => rej(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

export const options = {
  key: "rzp_test_Am7biTvI27QS9I",
  amount: 100,
  currency: "INR",
  name: "TennisTown",
  description: "Test Transaction",
  image: "https://example.com/your_logo",
  //   order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  handler: function (response) {
    console.log(response.razorpay_payment_id);
    console.log(response.razorpay_order_id);
    console.log(response.razorpay_signature);
  },
  prefill: {
    name: "Test",
    email: "test@example.com",
    contact: "9999999999",
  },
  notes: {
    address: "United States",
  },
  theme: {
    color: "#3399cc",
  },
};
