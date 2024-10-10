"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EmailForm() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        toast.success("Thank you for joining the waitlist! 🚀");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Oops! Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST" className="mt-2 max-w-sm">
        <div className="flex flex-col gap-2 lg:flex-row">
          <label className="sr-only" htmlFor="email-address">
            Email address
          </label>
          <input
            autoComplete="email"
            className="text-accent-500 block h-10 w-full focus:invalid:border-red-400 focus:invalid:text-red-500 focus:invalid:ring-red-500 appearance-none rounded-lg border-2 border-slate-300 px-4 py-2 placeholder-zinc-400 duration-200 focus:outline-none focus:ring-zinc-300 sm:text-sm"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            id="email-address"
            name="email"
            placeholder="johndoe@example.com"
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
            aria-label="Enter your email address"
          />
          <button
            className={`flex h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#000F2D] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <span>{isLoading ? "Submitting..." : "Join the waitlist"}</span>
          </button>
        </div>
      </form>

      <div className="flex items-start gap-2 text-gray-500">
        <InfoCircledIcon aria-hidden="true" />
        <p className="text-xs -mt-[0.5] max-w-sm">
          Access is limited! If selected, you'll receive an email to join us.
        </p>
      </div>
    </>
  );
}