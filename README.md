# Ocean Pets

Ocean Pets is a mobile-first browser game built with HTML5, CSS3, JavaScript, localStorage, a service worker, and a Three.js application renderer for the aquarium, navigation, buttons, cards, and game screens.

## Features

- Persistent shared save data across all pages.
- Multiple aquariums with rename, active tank selection, and five visual themes.
- Virtual pets with hunger, happiness, energy, level, experience, name, and age.
- Distinct Three.js animal models for turtle, clownfish, seahorse, jellyfish, dolphin, octopus, shark, whale, stingray, and angelfish.
- Food, hatchery, decoration, collection, progression, and mini-game reward systems.
- Five touch-friendly mini-games with Three.js-rendered targets, buttons, pearl rewards, and XP rewards.
- Offline app shell caching after the first successful load.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/` in a browser.

## Files

- `index.html` home aquarium and launch screen.
- `save.js` shared save data, progression, rendering hooks, and navigation.
- `ocean3d.js` Three.js application renderer for the aquarium, navigation, buttons, cards, and game screens.
- `style.css` visual system and responsive layout.
- `sw.js` offline cache service worker.
- `pets.html`, `aquariums.html`, `decorations.html`, `hatchery.html`, `settings.html` management pages.
- `games.html` and the five mini-game pages.
