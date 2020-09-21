/**
 * Temporary solution to create env.json fron .env file
 * Below command needs to set in xcode for Debug and Release respectively:
 *       - in edit scheme --> build -> pre-actions : cp ../env/dev/.env /tmp/pulse/
 *       - in edit scheme --> build -> pre-actions : cp ../env/prod/.env /tmp/pulse/
 *
 * From pipe line below commands needs to be executed
 *   - copy dev, uat or release .env file to /tmp/pulse
 *   - run "node ConfigAdaptor.js"
 *   - run build command
 */

const LineReaderSync = require("line-reader-sync");
const envFile = process.env.ENVFILE ? process.env.ENVFILE : "./env/.dev";
const lrs = new LineReaderSync(envFile);
const properties = {};

let line = "";
while (line != null) {
  line = lrs.readline();
  if (line) {
    let key_value = line.split("=");
    properties[key_value[0].trim()] = key_value[1].trim();
  }

  require("fs").writeFileSync(
    "./app/config/env.json",
    JSON.stringify(properties)
  );
}
