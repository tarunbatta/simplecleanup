# Simple Cleanup

Simple Cleanup is a Chrome extension designed to quickly and easily clear various types of browsing data directly from your browser's toolbar. It provides options to selectively clean specific data categories or perform a full cleanup with a single click.

## Features

* **Selective Cleaning:** Choose to clear only specific data like browsing history, cookies, downloads, cache, and more.
* **Full Cleanup:** Effortlessly remove all supported browsing data at once.
* **Toolbar Integration:** Access the cleaning options conveniently from the Chrome toolbar icon.
* **Data Overview:** See the number of items in your browsing history, cookies, and downloads directly in the extension's popup.
* **Modern UI:** Clean and intuitive interface built with Material-UI components.

## Functionality Covered

The extension can clear the following types of browsing data:

* Browsing History
* Cookies
* Downloads
* Cache (including application cache and cache storage)
* Other site data including:
  * File systems
  * Form data
  * IndexedDB data
  * Local storage
  * Passwords
  * Plugin data
  * Server bound certificates
  * Service workers
  * WebSQL data

## Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation
1. Download or clone the project to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" in the top left corner.
5. Select the `dist` folder from the downloaded project.
6. The extension should now appear in your list of extensions and its icon will be added to your toolbar.

## Usage

1. Click on the Simple Cleanup icon in your Chrome toolbar.
2. The extension's popup will appear, showing counts for your browsing history, cookies, and downloads.
3. Select the types of data you wish to clear using the checkboxes.
4. Click the "Clean" button to remove the selected data.
5. Alternatively, click the "Clean All" button to clear all supported browsing data.
6. A message will confirm the cleanup success.

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/tarunbatta/simplecleanup.git
   cd simplecleanup
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

* **React:** Frontend library for building the user interface
* **TypeScript:** For type safety and improved code structure
* **Material-UI:** For modern, responsive UI components
* **Vite:** For fast development and optimized builds
* **ESLint:** For code linting
* **Prettier:** For code formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Tarun Batta](https://www.linkedin.com/in/tarunbatta/)

## Acknowledgments

* [Material-UI](https://mui.com/) for the beautiful UI components
* [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/) for the browser integration

## Support

If you find this package helpful, please consider giving it a ⭐️ on GitHub!
