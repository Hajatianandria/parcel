import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { users } from "../assets/data";

const LoginForm: React.FC<{
  setShowLoggingForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowLoggingForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  //
  const [email, setEmail] = useState("tomas@memail.com");
  const [password, setPassword] = useState("123");

  const [error, setError] = useState<string | null>(null);
  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const isUserPresent = users.some(
        (user) => user.email === email && user.password === password
      );
      if (isUserPresent) {
        console.log("User with the given email and password is in the array.");
        localStorage.setItem(
          "awx4a5_user",
          JSON.stringify({ email, password, messagesSent: [] })
        );
        setShowLoggingForm(false);
      } else {
        console.log(
          "User with the given email and password is not in the array."
        );
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="w-screen h-screen bg-black absolute top-0 left-0 z-50 bg-opacity-30 flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-50 mx-auto h-fit shadow-sm rounded-2xl p-10">
        <div className="w-full text-red-600 flex justify-end">
          <button
            onClick={() => setShowLoggingForm(false)}
            className="ml-auto static"
          >
            <RxCross1 size={25} />
          </button>
        </div>
        <div className="w-11/12 mx-auto mt-5 prose">
          <h1>Log to unlock features </h1>
          <div>
            <label htmlFor="">Email : </label>
            <input
              type="text"
              className="border-stone-300 border-2 py-2 px-2 w-full hover:outline-none focus:outline-none focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Password : </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border-stone-300 border-2 py-2 px-2 w-full hover:outline-none focus:outline-none focus:border-blue-400"
            />
          </div>
          {error && (
            <p className="text-red-500 text-right">
              {"User with the given email and password"}
            </p>
          )}

          <div className="flex justify-end mt-7">
            <button
              className={`py-2 text-white w-36 font-bold rounded-lg ${
                isLoading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500"
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
