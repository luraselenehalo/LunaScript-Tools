# LunaScript Tools

LunaScript Tools is a collection of developer utilities that run entirely in the browser. Built with
vanilla HTML, CSS, and JavaScript, it focuses on privacy, security, and a clean open-source
architecture that is easy to extend.

## Features

- Password Generator with strength indicator
- SHA-256 Hash Generator
- UUID Generator
- JSON Formatter
- Dark mode UI with space-inspired visuals

## Project Structure

```
LunaScript-Tools/
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── tools/
│           ├── hash-generator.js
│           ├── json-formatter.js
│           ├── password-generator.js
│           └── uuid-generator.js
├── tools/
│   ├── hash.html
│   ├── json.html
│   ├── password.html
│   └── uuid.html
├── about.html
├── index.html
└── open-source.html
```

## Getting Started

Open `index.html` in your browser or serve the folder with a simple static server:

```bash
python3 -m http.server 8000
```

## Contributing

Keep each tool inside its own JavaScript file under `assets/js/tools`, reuse the shared styles, and
submit a pull request with a clear description of your changes.
