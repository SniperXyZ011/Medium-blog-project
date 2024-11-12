import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@sniperxyz/medium-common";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-col">
        <div className="w-[350px]">
          <div className="max-w-md text-4xl font-extrabold text-center">
            Create an account
          </div>
          <div className="text-slate-400 text-center">
            Already have an account?
            <Link to={"/signin"} className="px-2 underline text-sky-500">
              Login
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <InputForm
              lable="Name"
              placeholder="Enter your name ..."
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
            <InputForm
              lable="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  username: e.target.value,
                });
              }}
            />

            <InputForm
              lable="Password"
              type={"password"}
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <button className="bg-slate-950 text-white p-2 rounded-lg mt-4">{type === "signup" ? "Sign Up" : "Sign In"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputType {
  lable: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputForm({ lable, placeholder, onChange, type }: InputType): any {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-grey-900 dark:text-black">
        {lable}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-grey-950 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
