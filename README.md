# Simple Cleanup

Simple Cleanup is a Chrome extension designed to quickly and easily clear various types of browsing data directly from your browser's toolbar. It provides options to selectively clean specific data categories or perform a full cleanup with a single click.

## Features

*   **Selective Cleaning:** Choose to clear only specific data like browsing history, cookies, downloads, cache, and more.
*   **Full Cleanup:** Effortlessly remove all supported browsing data at once.
*   **Toolbar Integration:** Access the cleaning options conveniently from the Chrome toolbar icon.
*   **Data Overview:** See the number of items in your browsing history, cookies, and downloads directly in the extension's popup.

## Functionality Covered

Based on the provided code, Simple Cleanup can clear the following types of browsing data:

*   Browsing History
*   Cookies
*   Downloads
*   Cache (including application cache and cache storage)
*   Other site data including:
    *   File systems
    *   Form data
    *   IndexedDB data
    *   Local storage
    *   Passwords
    *   Plugin data
    *   Server bound certificates
    *   Service workers
    *   WebSQL data

## Installation

Since this is a Chrome extension, you can install it by loading it as an unpacked extension:

1.  Download or clone the project to your local machine.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner.
4.  Click on "Load unpacked" in the top left corner.
5.  Select the `dist` folder from the downloaded project.
6.  The extension should now appear in your list of extensions and its icon will be added to your toolbar.

## Usage

1.  Click on the Simple Cleanup icon in your Chrome toolbar.
2.  The extension's popup will appear, showing counts for your browsing history, cookies, and downloads.
3.  You can select the types of data you wish to clear using the checkboxes.
4.  Click the "Clean" button to remove the selected data.
5.  Alternatively, click the "Clean All" button to clear all supported browsing data.
6.  A message will confirm the cleanup success.

## Technologies Used

*   **TypeScript:** The project's source code is written in TypeScript, providing type safety and improved code structure.
*   **ESLint:** Used for enforcing code style and identifying potential issues.
*   **Prettier:** Used for automatic code formatting to maintain consistent code style.

## Development

If you plan to contribute or modify the extension, you will need Node.js and npm installed.

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Build the project: (You would typically have a build script here, for example, using a build tool like Webpack or Parcel, or a simple `tsc` command to compile TypeScript. This step is not explicitly defined in the provided code but is necessary for generating the `dist` folder from the `src` files.)

## Contributing

(Add information on how to contribute if applicable)

## License

(Add license information if applicable)