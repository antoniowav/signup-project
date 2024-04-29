/** @jsxImportSource react */
"use client";
import React, { useState } from "react";

type NewsletterSignUpProps = {
  error?: string;
  success?: string;
};

const NewsletterSignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      setSuccess(false);
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
      const data: NewsletterSignUpProps = await response.json();
      console.log(data);
      if (data?.success === "Success") {
        setSuccess(true);
        setError("");
      } else {
        setSuccess(false);
        setError("Failed to sign up.");
      }
    } catch (e) {
      setError("An error occurred while sending your request.");
      setSuccess(false);
      console.error(e);
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const getButtonText = () => {
    if (isLoading) return "signing up…";
    if (error) return "invalid email";
    return "sign up";
  };

  return (
    <div
      className={`px-[24px] py-[72px] mx-auto absolute bottom-8 rounded-[40px] w-[342px] ${
        isLoading
          ? "bg-white"
          : error
          ? "bg-errorPrimary text-errorSecondary"
          : success
          ? "bg-successPrimary text-successSecondary"
          : "bg-white"
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
          className={`font-bold text-2xl absolute bottom-4 left-8 transition-opacity duration-300 ${
            email ? "opacity-0" : "opacity-100"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`w-full p-2 mb-2 h-12 text-black rounded-full ${
            error
              ? "bg-errorPrimary text-errorSecondary border-errorSecondary"
              : success
              ? "bg-successPrimary text-successSecondary border-successSecondary"
              : "bg-white border-black"
          } border-4 outline-none appearance-none px-4 text-2xl font-bold`}
          placeholder=""
          value={email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`absolute whitespace-nowrap right-2 top-2 px-4 h-[32px] rounded-full font-bold ${
            error
              ? "text-errorPrimary bg-errorSecondary"
              : "text-white bg-black"
          }   focus:outline-none transition-colors`}
          disabled={isLoading}
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignUp;
