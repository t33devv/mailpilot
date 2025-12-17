console.log('[MailPilot background] loaded');

chrome.tabs.onUpdated.addListener(async (tabId, _info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (url.origin === 'https://mail.google.com') {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  if (message?.type === 'OPEN_SIDE_PANEL') {
    // Prefer tab-scoped panel when tab info exists
    if (sender.tab?.id !== undefined) {
      chrome.sidePanel.open({ tabId: sender.tab.id });
    } else if (sender.tab?.windowId !== undefined) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId });
    }
  }
});