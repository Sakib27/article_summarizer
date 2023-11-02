import React from "react";

import { logo } from "../assets";

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='object-fill w-10 ml-15 opacity-70' />

        <button
          type='button'
          onClick={() =>
            window.open("https://github.com/Sakib27", "_blank")
          }
          className='black_btn mr-5'
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text opacity-75'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='pink_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc opacity-90'>
      Make reading articles easier with Synopsis, an open-source article summarizer that gives you a clear and concise synopsis of any article.
      </h2>
    </header>
  );
};

export default Hero;