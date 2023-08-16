import * as dobby from "./src/index.ts";

declare const global: {
  [x: string]: unknown;
};

global.GPT = dobby.GPT;
global.CFLA = dobby.copywriting_for_listing_advertising;
