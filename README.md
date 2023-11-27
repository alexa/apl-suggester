# Alexa APL Suggester

## Overview
This package is developed for providing suggestions and validations on APL (Alexa Presentation Language) templates. Currently it performs static instead of runtime checks. The output warnings are aimed for suggesting best practice of writing APL templates but don't indicate that the template can't be rendered.

For more information of how to build APL templates, please visit https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/understand-apl.html

## Installation and usage
The easiest way to use apl-suggester is to install it from npm and build it into your app with webpack.
```
npm install apl-suggester --save
```

Since November 27 2023, APL Suggester's latest version is `2023.3.0`, following APL 2023.3 release.  Existing users please make sure to pull the latest and update your `package.json`:
```
npm install apl-suggester@2023 --save
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
