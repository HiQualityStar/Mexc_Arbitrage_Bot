import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const accessKey = process.env.AccessKey as string;
const secretKey = process.env.SecretKey as string;

const newOrder = async () => {
  try {
    const { data } = await axios.get("https://api.mexc.com/api/v3/time");
    const timestamp = data.serverTime.toString(); // must be string
    console.log("started", new Date(data.serverTime));
    // 2. Prepare query parameters
    const params = {
      symbol: "SOLUSDT",
      side: "BUY",
      type: "MARKET",
      quantity: "0.01",
      //   price: "145",
      recvWindow: "180",
      timestamp,
    };

    // 3. Convert to query string
    const query = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    // 4. Create signature using query string
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(query)
      .digest("hex");

    // 5. Final URL with signature
    const finalUrl = `https://api.mexc.com/api/v3/order?${query}&signature=${signature}`;

    // 6. Axios config with headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-MEXC-APIKEY": accessKey,
      },
    };

    // 7. Send POST request
    const res = await axios.post(finalUrl, {}, config);
    console.log("✅ Success:", res.data);
  } catch (error: any) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

newOrder();
