import { Publish } from "./publish";

//To execute, it's necessary to have tokens set as arguments
//npx ts-node --files ./scripts/index.ts --npm-token=token1 --npm-gh-token=token2

const publish = new Publish();

publish.initialize();
