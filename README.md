# MelOS: Interactive Portfolio

A macOS-style desktop OS portfolio built entirely in vanilla HTML, CSS, and JavaScript. No frameworks, no build step.

**Live:** [mlemxy.github.io/portfolio](https://mlemxy.github.io/portfolio/)

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas_API-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![face-api.js](https://img.shields.io/badge/face--api.js-0097A7?style=for-the-badge&logo=google&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_API-F55036?style=for-the-badge&logo=groq&logoColor=white)

---

## Features

**Desktop OS**
- Draggable, minimisable, maximisable windows — pure CSS + vanilla JS event handling
- macOS-style dock with bounce animations — CSS cubic-bezier transitions
- Live menubar clock
- Close All via menubar

**ML-Powered Login Screen**
- face-api.js (TinyFaceDetector + FaceLandmark68TinyNet) runs entirely in-browser, no backend
- Real-time face detection with 68 facial landmark dots and bounding box drawn on a Canvas 2D overlay
- Desktop unlocks after face is held in frame for 2 seconds
- Camera stopped immediately on entry

**Animated Canvas Wallpaper**
- Cozy cafe scene hand-drawn entirely in Canvas 2D: layered cake with flickering candle, parfait, cupcake, macaron stack, coffee mug with latte art and rising steam
- Cafe window with clouds drifting continuously, sun bobbing on a sine wave
- Flickering string lights with per-bulb opacity animation
- Floating 4-point stars and hearts — Canvas 2D with per-particle phase, rise, and drift
- Strawberry ribbon pattern on the login screen built in pure CSS (`repeating-linear-gradient`)

**Live AI Chatbot**
- Groq API (Llama 3.1 8B Instant) called directly from the browser
- System prompt built from full resume, projects, and experience — no vector DB, prompt fits comfortably in context
- Typing indicator, 2s cooldown, 20-message history cap
- Built as a learning project for APIs and LLMs

**Windows**

| Window | Contents |
|---|---|
| About | Bio, skill groups by category |
| Projects | Filterable grid with per-project detail — metrics, overview, tech stack, links |
| Chat | Live AI assistant |
| Terminal | Interactive shell: `help`, `whoami`, `ls`, `cat resume`, `skills`, `neofetch`, `meow`, and more |
| Resume | Education, experience, key projects, skills |
| Contact | Email, LinkedIn, GitHub |
| Extras | FocusTown study ID, interests, currently learning |

**Other**
- Draggable pinned photo with red pushpin — free-drag system separate from window drag
- Music player with spinning disc (CSS animation), progress bar updated on an interval
- Draggable "Want to Learn" todo checklist
- Hire Me popup that appears every 90 seconds
- Clicking the wallpaper spawns a floating mini avatar (CSS keyframe animation)

---

## Project Structure

```
melos/
├── index.html
├── assets/
│   ├── css/melos.css
│   ├── js/
│   │   ├── melos.js       # OS logic, canvas, chatbot, terminal
│   │   ├── projects.js    # Project data
│   │   └── env.js         # Groq API key
│   └── img/
└── README.md
```

---

## Notes

The face detection camera requires HTTPS. GitHub Pages serves over HTTPS by default, so it works on the live URL. Testing locally requires a local server (`python -m http.server`) rather than opening `index.html` directly.

The face detection model is loaded from CDN automatically.