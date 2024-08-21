import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-stone-900 h-screen p-10">
      <nav className="flex justify-between">
        <div className="logo">
          <img src="/lock.png" className="w-[80px] rotate-[0deg]" alt="logo" />
        </div>

        <div className=" flex gap-10 text-white contact text-xl">
          <a href="/app.apk" download={true}>
            Download
          </a>
          <a href="">Contact</a>
        </div>
      </nav>

      <div className="flex  justify-center items-center mt-10 px-40 py-10 gap-32 ">
        <div className="hero flex justify-center items-center">
          <img src="/screen1.png" width={150} alt="" />
          <img src="/screen2.png" width={150} alt="" />
          <img src="/screen3.png" width={150} alt="" />
        </div>

        <div className="description flex flex-col justify-center items-center">
          <p className="text-slate-100 text-center mb-5 text-3xl ">
            Easily Store And Acess Your Password With This Intuitive App.
          </p>
          <p className=" text-3xl text-green-600">Your Security Simplified.</p>

          <a
            href="/app.apk"
            className="text-center mt-5  rounded bg-green-600 text-slate-100 py-3 text-l w-[300px]"
            download={true}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
