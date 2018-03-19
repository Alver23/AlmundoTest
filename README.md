
## Getting Started
First, ensure you have node and mongo installed on your system.

```sh
# clone it
git clone https://github.com/Alver23/ApiRestHotels.git
cd ApiRestHotels

# Install dependencies
npm install

# Run it
npm start
```

## Environment Variables
Place a `.env` file in the top level of the directory you've cloned. These variables will be automatically assigned to `process.env` when the application boots. It is gitignored by default as it's not good practice to store your environment variables in your remote repository.
Your `.env` file can look something like this:

```shell
MONGO_URI=mongodb://somewhere:27017
SESSION_SECRET=lolthisissecret
```

Now we can access one of these variables with something like `process.env.MONGO_URI`!

## NPM Scripts

- **`npm start`** - Start live-reloading development server
- **`npm run build`** - Generate production ready application in `./build`
