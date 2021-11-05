# Image Processor API
A simple API to generate different sizes of images

## How to start?
Download the project
```bash
git clone git@github.com:vcgtz/image-processor-api.git
```
Install dependencies

```bash
cd image-processor-api
npm install
```
Run the project
```bash
npm run start
```

## Analize and improve your coding style
Run the linter to analize the possible errors in the code using a configuration with `eslint` and `prettier`
```bash
npm run lint
```
Fix errors using the rules using `eslint` or `prettier`
```bash
npm run lint:fix # To clean the code using elint

npm run prettier # To clean the code using prettier
```

## Testing
Run the tests
```bash
# This command compile the code and run the tests
npm run test
```

## Compile the application
Compile the `typescript` files to `javascript` files
```bash
npm run build
```

## How to use it?
1. Add your images to the `images` folder
2. Make a `GET` request to `http://localhost:3000/api/images?filename=<filename>` to get the original file, for example:
```
http://localhost:3000/api/images?filename=santamonica.jpg
```
3. If you want a resized image you need to specify the `width` and the `height` like this:
```
http://localhost:3000/api/images?filename=santamonica.jpg&width=450&height=450
```

**NOTE**: `santamonica.jpg` is a sample image including in the project
