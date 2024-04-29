import React, { useState } from "react";

const NewsletterSignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://simmalugnt.proxy.beeceptor.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Handle success here
    } catch (e) {
      setError("An error occurred while sending your request.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "signing up…";
    if (error) return "invalid email";
    return "sign up";
  };

  return (
    <div
      className={`px-[24px] py-[72px] mx-auto absolute bottom-8 rounded-[40px] w-[342px] ${
        isLoading ? "bg-black" : error ? "bg-red-600" : "bg-white"
      }`}
    >
      <h1 className="font-bold text-left">Sign up to our newsletter</h1>
      <p className="text-base leading-5 text-left font-bold">
        Lorem ipsum dolor sit amet, consecte adipiscing elit praesent sodales
        purus magna, eget lacinia sapien hendrerit.
      </p>
      <form className="mt-4 relative" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="font-bold text-2xl absolute bottom-4 left-8"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 mb-2 h-12 text-black rounded-full border-black border-4 outline-none px-4"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute whitespace-nowrap right-2 top-2 px-4 h-[32px]  bg-black rounded-full font-bold text-white bg-blackfocus:outline-none transition-colors"
          disabled={isLoading}
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignUp;
