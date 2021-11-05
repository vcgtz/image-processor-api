# Image Processor API
API to process images and get new rezised images

## How to start?
1. Download the project
2. Install dependencies:
```bash
cd image-processor-api

npm install
```
3. Run the project:
```bash
npm run start
```

## Commands
1. Run the linter:
```bash
npm run lint
```
2. Fix errors using `eslint`:
```bash
npm run lint:fix
```
3. Compile the application to JS files:
```bash
npm run build
```
4. Run the tests:
```bash
# This command compile the code and run the tests
npm run test
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
