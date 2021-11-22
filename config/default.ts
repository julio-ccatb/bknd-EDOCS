import { config } from "dotenv";
config({ path: "./config/.env" });

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URL,
  saltWorkFactor: 10,
  publicKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXAIBAAKBgHBONWfsXqyuyaTvM0mf667WXxUUNVn2DnK9HCQLI9RY9R8U0nLE
  4f6crJspxMkq5mti4n2n2O50j9moj3DNFudRPtLGtMXrMz0rBPXC6xOf+vkRMBa4
  nx5U5T+m6P7ptf5dlTi+if5fFldEvSM+3RnBV/EoVlFxB9TURLHKvSONAgMBAAEC
  gYBiKGlTYOxK4CaMiyl3o1g6o1HNubD75S0xqgprknUJh4sPVIKwH1cr1EKlB7fg
  4CcvGum9TDQ2Dxkf880TmZ32/CH8FIPMXjnUU6Z5cp4yYM6JTsAfxqsSERdlF6HW
  P4geX8SjJ3un5lemhpcuqx22tfSccYXX7VLXHo718cX2gQJBALyBWoofBb8ddQy8
  kX8HLvcPbWmwa+fJyJFVGjXLFJfKhf4QvmcBvGiThvmL5UxAyPrGThSK3KqklzX2
  N94UFOECQQCYhEfotSf++N42O+04BGOEmEitef96Bjz2sEiOY/GUrvibtomnISWr
  IGlXGqPdyphGfBpHc/Fcqlf3jA4Y7HgtAkEAsqO3RKuvi3UEBuTw0Tvigxmoq38Y
  U1nDbA8FPrNMuaigoKwHdKCNh2E/iV/NFh1TGWwydH9ALaq67dV/DkNjoQJBAIlN
  zU76h99LPQGmQZFEojMkxYknY4//PbL4UNmfsEUioD3Ov23usXK14x+/o/ZwBVav
  MxlQj+HUmQ0K0UYu3KECQD8D+VzkIGIkqECQl2e7UXh67BYvG0U8rY3sla/TMNPI
  NcIcnBBG8onXJe+8Gydv+k7oZ5vctWcKFqIsPPW4sYM=
  -----END RSA PRIVATE KEY-----`,
  privateKey: `-----BEGIN PUBLIC KEY-----
  MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHBONWfsXqyuyaTvM0mf667WXxUU
  NVn2DnK9HCQLI9RY9R8U0nLE4f6crJspxMkq5mti4n2n2O50j9moj3DNFudRPtLG
  tMXrMz0rBPXC6xOf+vkRMBa4nx5U5T+m6P7ptf5dlTi+if5fFldEvSM+3RnBV/Eo
  VlFxB9TURLHKvSONAgMBAAE=
  -----END PUBLIC KEY-----`,
  accesTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
