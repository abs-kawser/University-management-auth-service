import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connection established`);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);

    console.log(`Database connection error: ${config.port}`);
  }
}
bootstrap();
