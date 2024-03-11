# Alexa APL Suggester

## Overview
This package aims at enhancing APL (Alexa Presentation Language) authoring experience with accurate linting results. With the suggestions and validations provided by APL Suggester, developers can write quality APL templates more easily. The output warnings are suggestions on syntactical validity and best practices, but they don't necessarily indicate that the template can't be rendered.

For more information of how to build APL templates, please visit https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/understand-apl.html

## Installation and usage
The easiest way to use apl-suggester is to install it from npm and build it into your app with webpack.
```
npm install apl-suggester --save
```

Since March 11 2024, APL Suggester's latest version is `2024.1.0`, following APL 2024.1 release.  Existing users please make sure to pull the latest and update your `package.json`:
```
npm install apl-suggester@2024 --save
```

Then use it in your app:
```
const validator = new StaticAplTemplateValidator();
validator.validate(aplTemplate).then(validationResults => {
    // do something with your validaiton results
});
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 license, except APL Templates are licensed under the Amazon Software License [hyperlink to:  https://aws.amazon.com/asl/ ].  For more detail,  please see the LICENSE file in the [src/configs/templates] sub-folder.
