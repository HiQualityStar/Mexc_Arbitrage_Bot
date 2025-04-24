import axios from "axios";

const usdcTrade = async () => {
  let prevPrice = 0;
  try {
    console.log("started");
    while (true) {
      const res = await axios.get(
        "https://api.mexc.com/api/v3/ticker/price?symbol=USDCUSDT"
      );
      if (res.data ) {
        const price = Number(res.data.price);
        if (price !== prevPrice) {
          console.log(price, new Date());
        }
        prevPrice = price;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } catch (error: any) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

usdcTrade();
