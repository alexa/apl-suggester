import ajv from 'ajv/dist/2019';

const ajvInstance = new ajv({
    allErrors: true,
    strict: false,
    verbose: true
});

export default ajvInstance;
