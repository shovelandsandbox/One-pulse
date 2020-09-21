import axios from "axios";
import { pathOr } from "ramda";
class HttpClient {
  constructor(authStore, dynHeaders) {
    this.authStore = authStore;
    this.dynHeaders = dynHeaders;
    this.instance = axios.create({
      timeout: 15000,
    });
  }

  async getAsJson(url) {
    const response = await this.get(url, "json");
    return response;
  }

  async getAsText(url) {
    const response = await this.get(url, "text");
    return response;
  }

  getLastModified(response) {
    return (
      response &&
      (response.headers["etag"] || response.headers["last-modified"])
    );
  }

  async get(url, responseType) {
    try {
      const reqHeaders = { "Accept-Encoding": "gzip,deflate" };
      if (this.authStore && this.authStore.accessToken != null)
        reqHeaders["Authorization"] = "Bearer " + this.authStore.accessToken;
      if (this.authStore && this.authStore.userAgent) {
        reqHeaders["Pulse-User-Agent"] = JSON.stringify(
          this.authStore.userAgent
        );
      }
      if (this.dynHeaders) {
        this.dynHeaders(reqHeaders);
      }
      const config = {
        headers: reqHeaders,
        responseType: responseType,
      };
      const region = pathOr("", ["userAgent", "region"], this.authStore);
      const apiUrl = `${url}?namespace=${region}`;
      console.log("Invoking http request:" + apiUrl);
      const response = await this.instance.get(apiUrl, config);
      // const response = await this.instance.get(url, config);
      //let headers = response.headers;
      /*for(name in headers){
                console.log("Header:" + name + " val:" + headers[name]);
            }*/
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default HttpClient;
