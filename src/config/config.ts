import default_config from "./default";
import dev_config from "./developement";
import prod_config from "./production";
const env = process.env.REACT_APP_ENV || "default";

let config: siteConfig;
if (env.trim() == "development") {
  config = dev_config;
} else if (env.trim() == "production") {
  config = prod_config;
} else {
  config = default_config;
}
export default config;
