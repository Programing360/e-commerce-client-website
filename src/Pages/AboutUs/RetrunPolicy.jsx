import React from "react";
import banner from '../../assets/bannerHoney.png'
const RetrunPolicy = () => {
  return (
    <div className="">
        <div className="mb-10">
            <img  className="w-full mx-auto object-cover" src={banner} alt="" />
        </div>
      <div className="container w-4/12 mx-auto h-[50%]">
        <details
          className="collapse collapse-arrow bg-base-100 border border-base-300"
          name="my-accordion-det-1"
          open
        >
          <summary className="collapse-title font-semibold w-full">
            <h1 className="w-full text-[#fc8b41] border-b">রিটার্ন পলিসি</h1>
          </summary>
          <div className="collapse-content text-sm">
            <ul>
              <li className="font-bold">
                ডেলিভারির সময় পণ্য যদি ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ, ভুল বা
                অসম্পূর্ণ হয়, তাহলে রিটার্ন বা রিফান্ডের জন্য আমাদের কাস্টমার
                সার্ভিসের সাথে যোগাযোগ করুন।
              </li>
              <li className="font-bold mt-2">
                পন্য গ্রহনের ৭ দিনের মধ্যেই পন্য রিটার্ন করে ব্যাংক পেমেন্ট,
                বিকাশ অথবা ভাউচার এর মাধ্যমে বুঝে নিন রিফান্ড। রির্টান পলিসি
                সম্পর্কে আরও তথ্যের জন্য, দয়া করে আমাদের পন্য ফেরত নীতিমালা
                দেখুন।
              </li>
              <li className="font-bold mt-2">
                নির্বাচিত কিছু পন্যে আপনার সিধান্ত পরিবর্তনকে অগ্রাধিকার দেয়া
                হয়। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে রিটার্ন পলিসির নিচের অংশ
                দেখুন।
              </li>
              <h1 className="font-extrabold mt-5 underline text-xl">পণ্য ফেরত দেওয়ার বৈধ কারণ</h1>
              <li className="font-bold mt-2">
                পণ্য ক্ষতিগ্রস্ত হলে। (ফাটা/ ভাঙা)/ত্রুটিপূর্ণ
              </li>
              <li className="font-bold mt-2">
                ডেলিভার করা পণ্য অসম্পূর্ণ থাকলে । (যদি কোন পন্য পরিমানে কম
                থাকে)
              </li>
              <li className="font-bold mt-2">
                ডেলিভার করা পণ্যটি ভুল হলে। (ভুল পণ্য/আকার/রঙ, অথবা মেয়াদ
                উত্তীর্ণ)
              </li>
              <li className="font-bold mt-2">
                ডেলিভার করা পণ্যটি যদি পণ্যের বিবরণ বা ছবির সাথে না মেলে।
                (বিজ্ঞাপনের সাথে পন্যের মিল না থাকলে।)
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default RetrunPolicy;
