import { dobby } from "./src/index.ts";

declare const global: {
  [x: string]: unknown;
};

global.GPT4_100 = dobby.GPT4_100;
global.GPT4_250 = dobby.GPT4_250;
global.GPT4_500 = dobby.GPT4_500;
global.GPT4_1000 = dobby.GPT4_1000;
global.GPT35_2000 = dobby.GPT35_2000;
global.CFLA = dobby.copywriting_for_listing_advertising;
