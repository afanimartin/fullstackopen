import app from "./src/app.js";
import { PORT } from "./src/utils/config.js";
import { info } from "./src/utils/logger.js";

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
