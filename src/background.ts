/**
 * @file This file contains the background script for the Chrome extension.
 * @author [Your Name Here]
 * @since 1.0.0
 */

/**
 * Adds a listener to the browser action button click.
 * When the button is clicked, it executes a script in the current tab
 * to change the background color of the body to red.
 *
 * @param tab - The Tab object representing the tab that was active when the button was clicked.
 *              Provided by the Chrome extension API.
 */
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.style.backgroundColor = 'red';
      },
    });
  }
});

chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });

export {};
