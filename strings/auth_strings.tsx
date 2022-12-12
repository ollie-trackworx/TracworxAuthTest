// ES6 module syntax
import LocalizedStrings from "react-native-localization";

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let LoginStrings = new LocalizedStrings({
  "en-US": {
    welcome: "Welcome back!",
  },
  en: {
    welcome: "Welcome back!",
  },
  fr: {
    welcome: "Bienvenue de retour!",
  },
});
