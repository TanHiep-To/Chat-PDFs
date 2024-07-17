import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true,
};

export default cors(corsOptions);
