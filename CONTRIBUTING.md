## 🚀 Forking & Contributing

MailPilot is open source and we welcome contributions! Feel free to fork this repository, make changes, and submit pull requests.

### Development Setup

#### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Google Chrome (for testing the extension)

#### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/t33devv/mailpilot.git
   cd mailpilot/mail-pilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from the `mail-pilot` directory
   - The extension should now appear in your extensions list

5. **Development mode**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server. Note: For extension development, you'll need to rebuild and reload the extension after making changes.

#### Testing Your Changes

1. After making code changes, rebuild:
   ```bash
   npm run build
   ```

2. In Chrome, go to `chrome://extensions/` and click the refresh icon on the MailPilot extension card

3. Test your changes in Gmail or Outlook

### Project Structure

```
mail-pilot/
├── src/                          # Source code directory
│   ├── background.ts            # Background service worker
│   │                            # - Manages side panel enablement
│   │                            # - Handles email data storage
│   │                            # - Processes rewrite API calls
│   │
│   ├── contentScript.ts         # Gmail content script
│   │                            # - Injects MailPilot button into Gmail UI
│   │                            # - Captures email data (subject/body)
│   │                            # - Applies rewritten content back to Gmail
│   │
│   ├── outlookContentScript.ts  # Outlook content script
│   │                            # - Similar functionality for Outlook
│   │                            # - Handles Outlook-specific DOM manipulation
│   │
│   ├── SidePanelApp.tsx         # Main side panel React component
│   │                            # - UI for selecting tone/translation
│   │                            # - Displays rewritten email
│   │                            # - Handles rewrite requests
│   │                            # - Manages dark/light mode
│   │
│   ├── sidepanel.tsx            # Side panel entry point
│   ├── App.tsx                  # Popup entry component
│   ├── main.tsx                 # React app entry point
│   ├── index.css                # Global styles
│   └── App.css                  # Component styles
│
├── public/                      # Static assets
│   ├── manifest.json            # Chrome extension manifest
│   │                            # - Defines permissions, scripts, icons
│   │                            # - Configures side panel and content scripts
│   │
│   └── icons/                   # Extension icons (PNG & SVG)
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       ├── icon128.png
│       ├── moon.svg             # Dark mode icon
│       ├── sun.svg              # Light mode icon
│       └── settings128.svg
│
├── dist/                        # Build output (generated)
│                                # - Compiled JavaScript/CSS
│                                # - Ready to load as Chrome extension
│
├── index.html                   # Extension popup HTML
├── sidepanel.html               # Side panel HTML
│
├── vite.config.ts               # Vite build configuration
│                                # - Defines entry points
│                                # - Configures build output structure
│
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

### Key Files Explained

- **`background.ts`**: Service worker that runs in the background. Handles cross-tab communication, manages the side panel lifecycle, and processes API requests to the backend.

- **`contentScript.ts`** / **`outlookContentScript.ts`**: Scripts injected into Gmail/Outlook pages. These interact with the email compose interface, capture email data, and inject the MailPilot button.

- **`SidePanelApp.tsx`**: The main React component for the side panel. Contains the UI for tone selection, translation options, rewrite functionality, and displays the rewritten email.

- **`manifest.json`**: Chrome extension configuration file. Defines permissions, content script injection points, side panel settings, and extension metadata.

- **`vite.config.ts`**: Build tool configuration. Specifies how the TypeScript/React code is compiled and bundled for the extension.

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Backend Integration

MailPilot communicates with a backend API for email rewriting. The backend URL is currently hardcoded in `background.ts`. If you're forking for your own use, you'll need to:

- Set up your own backend API endpoint
- Update the API URL in `background.ts`
- Ensure your backend follows the expected request/response format

### License

This project is open source. See the LICENSE file for details.
