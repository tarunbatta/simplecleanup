# Chrome Web Store Listing Details

## Product Details

Simple Cleanup is a Chrome extension designed to quickly and easily clear various types of browsing data directly from your browser's toolbar. It provides options to selectively clean specific data categories or perform a full cleanup with a single click.

## Category

Tools

## Single Purpose Description

Simple Cleanup is a Chrome extension designed to provide users with a quick and easy way to clear various types of Browse data (e.g., history, cookies, cache, downloads, local storage) directly from their browser's toolbar. Its sole purpose is to enhance user privacy and improve browser performance by facilitating the removal of unwanted or unnecessary Browse data with a few clicks.

## Permission Justifications

### BrowseData

The BrowseData permission is fundamental to Simple Cleanup's core functionality. It allows the extension to access and clear specific types of Browse data, such as app cache, cache, cookies, downloads, file systems, history, indexedDB, localStorage, plugin data, service workers, and webSQL. This permission is essential for enabling users to selectively or fully clear their Browse data as advertised.

### cookies

The cookies permission is necessary for Simple Cleanup to specifically target and clear browser cookies as part of its data cleaning functionality. While BrowseData can clear cookies, explicitly requesting cookies might be needed if you offer more granular cookie management outside the standard BrowseData API (e.g., listing specific cookies before deleting). If you only use BrowseData to clear cookies, you might not need this separate permission. Only include it if your extension uses the chrome.cookies API directly.

### downloads

The downloads permission is required to allow Simple Cleanup to clear the user's download history and/or remove downloaded files (if your extension offers that specific functionality). This is part of the comprehensive data cleanup options provided by the extension.

### history

The history permission is essential for Simple Cleanup to access and clear the user's Browse history, a core feature of its data cleanup capabilities. This allows users to remove records of visited webpages.

## Data Usage

- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

## Remote Code

No - This extension does not use any remote code.

## Privacy Policy

This extension operates entirely locally and does not collect, store, or transmit any user data. All cleanup operations are performed locally within the user's browser.

## Open Source

This extension is open source and available on GitHub: [Repository Link]
Users can review the source code to verify privacy and security.
