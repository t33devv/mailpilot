function addMailPilotButton(anchorEl: HTMLElement) {
  const composeRow = anchorEl.closest('.btC');
  if (!composeRow) return;

  const td = anchorEl.closest('td') as HTMLTableCellElement | null;
  if (!td) return;

  if (composeRow.querySelector('td.mailpilot-cell')) return;

  // Clone the Aa <td> for identical styling
  const mailpilotTd = td.cloneNode(false) as HTMLTableCellElement;
  mailpilotTd.classList.add('mailpilot-cell');

  // Create button with icon
  const btn = document.createElement('div');
  btn.className = 'mailpilot-button';
  btn.style.cursor = 'pointer';
  btn.style.userSelect = 'none';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.marginLeft = '4px';
  btn.style.marginRight = '4px';

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('icons/icon32.png');
  img.alt = 'Mail Pilot';
  img.width = 25;
  img.height = 25;
  img.style.width = '25px';
  img.style.height = '25px';
  img.style.display = 'block';
  img.style.objectFit = 'contain';
  img.style.filter = 'none';

  btn.appendChild(img);
  mailpilotTd.appendChild(btn);

  btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
  });

  const tr = td.parentElement;
  if (tr && tr.tagName === 'TR') {
    tr.insertBefore(mailpilotTd, td);
  }
}

function findComposeAnchors(root: ParentNode): HTMLElement[] {
  const anchors: HTMLElement[] = [];
  const rows = root.querySelectorAll<HTMLElement>('.btC');
  rows.forEach((row) => {
    const dvNodes = row.querySelectorAll<HTMLElement>('div.dv > div.a3I');
    dvNodes.forEach((a3I) => {
      const dv = a3I.parentElement as HTMLElement | null;
      if (dv) anchors.push(dv);
    });
  });
  return anchors;
}

function watchForGmailCompose() {
  const maybeAddButtons = (root: ParentNode) => {
    const anchors = findComposeAnchors(root);
    anchors.forEach(addMailPilotButton);
  };

  maybeAddButtons(document);

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement || node instanceof DocumentFragment) {
          maybeAddButtons(node);
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize
watchForGmailCompose();