import default_config from "./default";
import dev_config from "./developement";
import local_config from "./local";
import prod_config from "./production";
const env = process.env.REACT_APP_ENV || "default";
console.log("environement ", env);
let config: siteConfig;
if (env.trim() == "development") {
  config = dev_config;
} else if (env.trim() == "production") {
  config = prod_config;
} else if (env.trim() == "local") {
  config = local_config;
}else {
  config = default_config;
}
console.log("live config ", config);
export default config;
