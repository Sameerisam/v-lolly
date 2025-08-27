import { NextResponse } from "next/server";
import User from "../db/models/user";
import axios from 'axios'

async function shortenUrl(link) {
  try {
    const response = await axios.post(
      "https://api.t.ly/api/v1/link/shorten",
      {
        long_url: link,
        domain: "https://t.ly/",
        expire_at_datetime: "2035-01-17 15:00:00",
        description: "Social Media Link",
        public_stats: true,
        meta: {
          expiration_url: "https://example.com/",
          smart_urls: [
            {
              type: "US",
              url: "usa.com",
            },
            {
              type: "iPhone",
              url: "apple.com",
            },
          ],
        },
      },
      {
        headers: {
          Authorization: "Bearer 6mMslBFz58kPgRIUBjG45wa6mB88LrAqWroJ0Zpcmj6aP7WY9D1ou0Q3Hwuh",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data.short_url;
  } catch (error) {
    console.error("Error shortening URL:", error.response?.data || error.message);
  }
}


export async function PUT(req){
let mairaData=await req.json();

console.log("####", mairaData)

let user =await  User.findById(mairaData.id);
  return NextResponse.json(user)


}

export async function POST(req){
let mairaData=await req.json();
console.log(mairaData)
let newUser=await User(mairaData)

  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["host"];
  const domain = `${protocol}://${host}`;
  // const domain = `http://example.com`;



    let link = await shortenUrl(domain+'/receiver?id='+newUser._id);
    newUser.link = link;
  await newUser.save();

  return NextResponse.json(newUser)
}
