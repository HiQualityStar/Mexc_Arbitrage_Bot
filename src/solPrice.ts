import axios from "axios";

const solTrade = async () => {
  try {
    console.log("started");
    while (true) {
      const sendAt = Date.now();
      const res = await Promise.all([
        axios.get("https://api.mexc.com/api/v3/ticker/price?symbol=SOLUSDT"),
        axios.get("https://api.mexc.com/api/v3/ticker/price?symbol=SOLUSDC"),
      ]);
      const receiveAt = Date.now();
      console.log("ping speed", receiveAt - sendAt);
      if (res[0].data && res[1].data) {
        const solPriceUsdt = Number(res[0].data.price);
        const solPriceUsdc = Number(res[1].data.price);
        if (solPriceUsdt - solPriceUsdc > 0.152) {
          console.log(
            "sol price to usdt",
            solPriceUsdt,
            new Date(),
            "sol price to usdc",
            solPriceUsdc
          );
          console.log(solPriceUsdt - solPriceUsdc);
        } else if (solPriceUsdt - solPriceUsdc < -0.152) {
          console.log(
            "sol price to usdt",
            solPriceUsdt,
            new Date(),
            "sol price to usdc",
            solPriceUsdc
          );
          console.log(solPriceUsdt - solPriceUsdc);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } catch (error: any) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

solTrade();
