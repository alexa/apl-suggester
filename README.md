# Alexa APL Suggester

## Overview
This package is developed for providing suggestions and validations on APL (Alexa Presentation Language) templates. Currently it performs static instead of runtime checks. The output warnings are aimed for suggesting best practice of writing APL templates but don't indicate that the template can't be rendered.

For more information of how to build APL templates, please visit https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/understand-apl.html

## Installation and usage
The easiest way to use apl-suggester is to install it from npm and build it into your app with webpack.
```
npm install apl-suggester
```

Then use it in your app:
```
const validator = new StaticAplTemplateValidator();
validator.validate(aplTemplate).then(validationResults => {
    // do something with your validaiton results
});
```
