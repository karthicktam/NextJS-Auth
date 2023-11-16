"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    setShowAlert(true);

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
      setIsDisabled(false);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col p-5">
      {showAlert && (
        <div
          id="toast-success"
          class={`fixed flex items-center w-full max-w-xs p-4  text-white ${
            errorMessage ? "bg-red-500" : "bg-green-400"
          } divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800`}
          role="alert"
        >
          <div class="text-sm font-normal">
            {errorMessage ? "Error Occured" : "User Successfully Created"}
          </div>
          <button
            type="button"
            class="ms-auto cursor-pointer bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3  items-center justify-center"
      >
        <h1>Create New User</h1>
        <div class="grid grid-cols-2 gap-4 items-center justify-center">
          <label htmlFor="name">Full Name:</label>
          <input
            value={formData.name}
            id="name"
            name="name"
            required
            type="text"
            onChange={handleChange}
            className="m-2 bg-white rounded p-2"
          />
          <label htmlFor="email">Email:</label>
          <input
            value={formData.email}
            id="email"
            name="email"
            required
            type="email"
            onChange={handleChange}
            className="m-2 bg-white rounded p-2"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={formData.password}
            id="password"
            name="password"
            required
            type="password"
            onChange={handleChange}
            className="m-2 bg-white rounded p-2"
          />
        </div>
        <input
          type="submit"
          value="Create User"
          className="mt-3 bg-white hover:bg-blue-100 px-8 py-2 cursor-pointer rounded-lg"
          disabled={isDisabled}
        />
      </form>
      {/* {errorMessage && (
        <p className="text-red-500 text-center mt-10">{errorMessage}</p>
      )} */}
    </div>
  );
}

export default UserForm;
