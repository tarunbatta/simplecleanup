# Publishing Guide for Chrome Web Store

## Prerequisites

1. Google Developer Account ($5 one-time fee)
2. Extension package ready for upload
3. Screenshots and promotional images
4. Privacy policy (if required)

## Build for Production

```bash
npm run build
```

## Package Structure

The built extension will be in the `dist/` folder with the following structure:

```text
dist/
├── manifest.json
├── index.html
├── assets/
│   └── index-[hash].js
└── icon.png
```

## Required Assets

### Screenshots (Required)

- **Small**: 1280x800 or 640x400
- **Large**: 1280x800
- **Promotional**: 1400x560 (optional but recommended)

### Icons

- **16x16**: Toolbar icon
- **32x32**: Windows computers
- **48x48**: Display in extension management page
- **128x128**: Chrome Web Store and installation

## Upload Process

1. **Go to Chrome Web Store Developer Dashboard**
   - Visit: <https://chrome.google.com/webstore/devconsole/>
   - Sign in with your Google account

2. **Add New Item**
   - Click "Add new item"
   - Upload your extension package (zip the dist folder)

3. **Fill Store Listing**
   - Use content from `webstore-listing.md`
   - Add screenshots from `assets/screenshots/`
   - Add promotional images from `assets/promotional/`

4. **Privacy & Security**
   - Confirm no remote code
   - Add privacy policy if required
   - Justify all permissions

5. **Review & Publish**
   - Review all information
   - Submit for review
   - Wait for Google's approval (usually 1-3 days)

## Version Updates

1. **Update version in package.json**
2. **Build new package**: `npm run build`
3. **Upload to Chrome Web Store**
4. **Update release notes**

## Common Issues

### Permission Denied

- Ensure all permissions are justified in the listing
- Provide clear explanations for each permission

### Rejected for Privacy

- Ensure privacy policy is clear
- Confirm no data collection
- Emphasize local-only operation

### Screenshot Requirements

- Screenshots must be actual extension screenshots
- No mockups or designs
- Must show real functionality

## Best Practices

1. **Clear Description**: Explain what the extension does simply
2. **Good Screenshots**: Show the extension in action
3. **Open Source**: Mention if the code is open source
4. **Privacy First**: Emphasize privacy and local operation
5. **Regular Updates**: Keep the extension updated

## Support

For issues with the Chrome Web Store:

- Check the [Developer Documentation](https://developer.chrome.com/docs/webstore/)
- Review [Policies](https://developer.chrome.com/docs/webstore/program_policies/)
- Contact [Developer Support](<https://support.google.com/chrome_webstore/>)
- 