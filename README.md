# Simple CleanUp

A Chrome extension for quick and easy browser data cleanup. Clean your browsing history, cookies, cache, downloads, and more with just a few clicks.

## Features

- 🧹 **Selective Cleanup**: Choose what to clean (history, cookies, cache, downloads, personal data)
- ⚡ **Quick Clean All**: One-click cleanup of all data
- 🔢 **Smart Counters**: See how many items will be cleaned before you do it
- 🎯 **Privacy Focused**: All operations happen locally, no data sent anywhere
- 🔓 **Open Source**: Transparent code you can review and trust

## Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store listing](link-to-be-added)
2. Click "Add to Chrome"
3. Confirm the installation

### From Source (Development)
1. Clone this repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. Load the `dist/` folder as an unpacked extension in Chrome

## Usage

1. Click the Simple CleanUp icon in your browser toolbar
2. Select the data types you want to clean:
   - **Browsing History**: Your visited pages
   - **Cache**: Temporary website files
   - **Cookies**: Website login data
   - **Download History**: Your download records
   - **Personal Data**: Local storage, passwords, etc.
3. Click "Clean" to remove selected data, or "Clean All" for everything

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
git clone https://github.com/yourusername/simplecleanup.git
cd simplecleanup
npm install
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

### Project Structure
```
src/
├── components/      # React components
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── manifest.json   # Extension manifest
└── index.tsx       # Main entry point

docs/
└── publishing/     # Publishing documentation

assets/
├── icons/          # Extension icons
├── screenshots/    # Store screenshots
└── promotional/    # Promotional images
```

## Privacy

This extension:
- ✅ Operates entirely locally
- ✅ Does not collect or transmit any data
- ✅ Does not track user behavior
- ✅ Is open source for transparency

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Publishing

For information about publishing to the Chrome Web Store, see:
- [Publishing Guide](docs/publishing/publishing-guide.md)
- [Web Store Listing Details](docs/publishing/webstore-listing.md)
- [Assets Guidelines](assets/README.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [Chrome Web Store listing](link-to-be-added) for user support
