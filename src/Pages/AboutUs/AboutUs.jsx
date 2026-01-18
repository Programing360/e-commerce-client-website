import React from "react";
import banner from "../../assets/post banner.png";
import img1 from "../../assets/post2.png";
import person from "../../assets/personme.png";
const AboutUs = () => {
  return (
    <div className="">
      <div className="h-160">
        <img className="h-[100%] w-full object-cover" src={banner} alt="" />
      </div>

      <div className="hero bg-base-200 min-h-screen ">
        <div className="hero-content flex-col lg:flex-row lg:gap-30">
          <img
            src={img1}
            className="md:max-w-sm lg:max-w-2xl rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              Organic Sunnah Shop সম্পর্কে
            </h1>
            <p className="text-gray-400">
              Pure from Nature, Inspired by Sunnah
            </p>
            <p className="py-6">
              “Organic Sunnah Shop” একটি বিশ্বস্ত ও নির্ভরযোগ্য প্রতিষ্ঠান, যা
              সুন্নাহসম্মত ও প্রাকৃতিক খাদ্যপণ্য সরবরাহের মাধ্যমে মানুষের সুস্থ
              জীবনযাপন নিশ্চিত করতে কাজ করে। দেশের প্রত্যন্ত অঞ্চল থেকে সরাসরি
              খাঁটি ও ভেজালমুক্ত খাদ্য সংগ্রহ করে, পুষ্টিগুণ অক্ষুণ্ণ রেখে তা
              গ্রাহকের হাতে পৌঁছে দেওয়াই আমাদের মূল উদ্দেশ্য। আমাদের পণ্যের
              মধ্যে রয়েছে খাঁটি কালোজিরা ফুলের মধু, সরিষা ফুলের মধু, লিচু ফুলের
              মধু, পাশাপাশি ঐতিহ্যবাহী ফয়েল পাতালি গুড়, বিজ গুড় ও ঝোলা গুড়—যা
              সম্পূর্ণ প্রাকৃতিক ও স্বাস্থ্যসম্মত। আমরা বিশ্বাস করি, সুস্থ শরীর
              গঠনের জন্য বিশুদ্ধ খাদ্যের কোনো বিকল্প নেই। তাই প্রতিটি পণ্য
              বাছাই, সংরক্ষণ ও সরবরাহের ক্ষেত্রে সর্বোচ্চ সততা ও যত্ন বজায় রাখা
              হয়। খাঁটি পণ্য, বিশ্বাসযোগ্য সেবা এবং গ্রাহকের সন্তুষ্টিই আমাদের
              সবচেয়ে বড় অর্জন। বিশুদ্ধ ও নিরাপদ খাদ্য সরবরাহে আমরা
              প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-5xl text-center mt-20">Executive Team</h1>
        <img
          className="md:w-[60%] lg:w-[30%] flex justify-center mx-auto mt-8 rounded-2xl px-4"
          src={person}
          alt=""
        />
        <div className="text-center">
          <h3>FARDHAN HASAN LIMON</h3>
          <p>MANAGING DIRECTOR</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
