const textInput = document.getElementById("textInput");
const modeSelect = document.getElementById("modeSelect");
const colorSelect = document.getElementById("colorSelect");
const customColorPickerZone = document.getElementById("customColorPickerZone");
const customColor1 = document.getElementById("customColor1");
const customColor2 = document.getElementById("customColor2");
const factorRange = document.getElementById("factorRange");
const layerCountDisplay = document.getElementById("layerCountDisplay");
const doodleContainer = document.getElementById("doodleContainer");
let isMobileInput = false;

const isMobileDevice = () =>
  /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent) ||
  window.matchMedia("(pointer: coarse)").matches;

const updateMobileState = () => {
  isMobileInput = isMobileDevice();
  document.body.classList.toggle("is-mobile", isMobileInput);
};

const handleDeviceOrientation = (event) => {
  if (!isMobileInput) return;

  const gamma = event.gamma ?? 0;
  const beta = event.beta ?? 0;

  const xValue = Math.max(-30, Math.min(30, gamma));
  const yValue = Math.max(-20, Math.min(40, beta));

  const x = (xValue + 30) / 60;
  const y = (yValue + 20) / 60;

  document.body.style.setProperty("--mouse-x", x);
  document.body.style.setProperty("--mouse-y", y);
};

const handleTouchMove = (event) => {
  if (!isMobileInput) return;
  const touch = event.touches[0];
  if (!touch) return;

  const x = touch.clientX / window.innerWidth;
  const y = touch.clientY / window.innerHeight;

  document.body.style.setProperty("--mouse-x", x);
  document.body.style.setProperty("--mouse-y", y);
};

const initializeMotionInput = () => {
  updateMobileState();
  window.addEventListener("resize", updateMobileState);
  window.addEventListener("orientationchange", updateMobileState);

  if (window.DeviceOrientationEvent) {
    if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
      const requestPermission = async () => {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === "granted") {
            window.addEventListener(
              "deviceorientation",
              handleDeviceOrientation,
              true,
            );
          }
        } catch (error) {
          // permission denied or unsupported
        }
      };
      window.addEventListener("touchstart", requestPermission, {
        once: true,
      });
    } else {
      window.addEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        true,
      );
    }
  }

  window.addEventListener("touchmove", handleTouchMove, { passive: true });
};

// Nouveaux éléments pour l'effet personnalisé
const customEffectPickerZone = document.getElementById(
  "customEffectPickerZone",
);
const customDistance = document.getElementById("customDistance");
const customFluidity = document.getElementById("customFluidity");
const customElasticity = document.getElementById("customElasticity");
const customTime = document.getElementById("customTime");

const controlsPanel = document.getElementById("controlsPanel");
const hideMenuBtn = document.getElementById("hideMenuBtn");
const showMenuBtn = document.getElementById("showMenuBtn");

// Modals elements
const modalOS = document.getElementById("modalOS");
const modalPyro = document.getElementById("modalPyro");
const openSourceBtn = document.getElementById("openSourceBtn");
const repoBtn = document.getElementById("repoBtn");
const pyroBtn = document.getElementById("pyroBtn");
const closeOS = document.getElementById("closeOS");
const closePyro = document.getElementById("closePyro");

// Éléments pour le changement de langue
const langBtn = document.getElementById("langBtn");
const langFlag = document.getElementById("langFlag");

const colorPresets = {
  sunset: [
    "#fff8ec",
    "#feb944",
    "#fe6842",
    "#df5584",
    "#5a5ca8",
    "#454681",
    "#333461",
    "#242549",
    "#181933",
    "#0e0f21",
  ],
  cyberpunk: [
    "#00f0ff",
    "#ff0055",
    "#3a0066",
    "#ff00ff",
    "#00ff66",
    "#ffff00",
    "#0000ff",
    "#ff5500",
    "#aa00ff",
    "#00aaaa",
  ],
  neonAcid: [
    "#00ff66",
    "#a1ff00",
    "#d4ff00",
    "#1bf0a5",
    "#00bfa5",
    "#00796b",
    "#004d40",
    "#002414",
  ],
  forest: [
    "#e1eedd",
    "#95d1a5",
    "#4f98ca",
    "#2b5876",
    "#142834",
    "#0f3010",
    "#194d1a",
    "#387a3a",
    "#69a86b",
    "#9fdb9f",
  ],
  iceFire: [
    "#ffffff",
    "#74ebd5",
    "#9ecee6",
    "#f1a7a1",
    "#fe6842",
    "#ff0000",
    "#b30000",
    "#660000",
    "#00c6ff",
    "#0072ff",
  ],
  deepOcean: [
    "#e0f7fa",
    "#80deea",
    "#26c6da",
    "#00acc1",
    "#00838f",
    "#006064",
    "#013a40",
    "#001f24",
  ],
  volcano: [
    "#ffeb3b",
    "#fbc02d",
    "#ffa000",
    "#f57c00",
    "#e64a19",
    "#d84315",
    "#bf360c",
    "#7f2000",
    "#4e0500",
  ],
  vintage: [
    "#fbe9e7",
    "#ffccbc",
    "#ffab91",
    "#ff8a65",
    "#b2dfdb",
    "#80cbc4",
    "#4db6ac",
    "#009688",
  ],
};

// GESTIONNAIRE DE TRADUCTION INTEGRAL
let currentLang = "en";

const translations = {
  en: {
    flagUrl: "https://flagcdn.com/w40/gb.png",
    flagAlt: "English",
    settings: "Settings",
    textLabel: "Text (Max 30 chars)",
    parallaxLabel: "Parallax Effect",
    colorLabel: "Color Palette",
    layersLabel: "Layer Count: ",
    modalOsTitle: "Open-Source Code",
    modalOsBody: `<p>This project is open-source and available on GitHub with a <a href="https://opensource.org/license/mit" target="_blank">MIT license</a>.</p><p>Feel free to clone, fork, or contribute to the repository. You can use it to build gorgeous typography layouts, study multi-layered CSS parallax mechanics, or experiment with kinetic visual effects controlled entirely via custom properties.</p>`,
    modalPyroTitle: "About Pyro",
    modalPyroBody:
      "Passionate creator and developer of modern interactive interfaces and immersive visual effects.",
    closeBtn: "Close",
    repoBtn: "Repository",
    profileBtn: "GitHub Profile",
    customColorLabel: "Fluid Gradient",
    customDistLabel: "Distance",
    customFluidLabel: "Fluidity (Speed)",
    customElasticLabel: "Elasticity",
    customTimeLabel: "Temporal Factor",
    effects: [
      "Separated (Standard)",
      "Grouped (Follow)",
      "Distant (Explosion)",
      "Inverted (Mirror)",
      "Chaos (Disordered)",
      "Elastic Wave",
      "⚙️ Custom...",
    ],
    palettes: [
      "Sunset Glow (Original)",
      "Cyberpunk",
      "Neon Acid 🧪",
      "Mystic Forest",
      "Ice & Fire",
      "Deep Ocean 🌊",
      "Volcano 🔥",
      "Vintage Pastel 🌸",
      "🎨 Custom...",
    ],
  },
  fr: {
    flagUrl: "https://flagcdn.com/w40/fr.png",
    flagAlt: "Français",
    settings: "Réglages",
    textLabel: "Texte (Max 30 chars)",
    parallaxLabel: "Effet Parallaxe",
    colorLabel: "Palette de Couleurs",
    layersLabel: "Nombre de Couches : ",
    modalOsTitle: "Code Open-Source",
    modalOsBody: `<p>Ce projet est open-source et disponible sur GitHub sous <a href="https://opensource.org/license/mit" target="_blank">licence MIT</a>.</p><p>N'hésitez pas à cloner, forker ou contribuer au dépôt. Vous pouvez l'utiliser pour créer de superbes mises en page typographiques, étudier la mécanique des parallaxes CSS multicouches ou expérimenter des effets visuels cinétiques entièrement contrôlés par des propriétés personnalisées.</p>`,
    modalPyroTitle: "À propos de Pyro",
    modalPyroBody:
      "Créateur et développeur passionné d'interfaces interactives modernes et d'effets visuels immersifs.",
    closeBtn: "Fermer",
    repoBtn: "Dépôt GitHub",
    profileBtn: "Profil GitHub",
    customColorLabel: "Dégradé fluide",
    customDistLabel: "Éloignement",
    customFluidLabel: "Fluidité (Vitesse)",
    customElasticLabel: "Élasticité",
    customTimeLabel: "Temps",
    effects: [
      "Séparé (Standard)",
      "Groupé (Suivi)",
      "Distant (Explosion)",
      "Inversé (Miroir)",
      "Chaos (Désordonné)",
      "Onde Élastique",
      "⚙️ Personnalisé...",
    ],
    palettes: [
      "Lueur du soir (Original)",
      "Cyberpunk",
      "Acide Néon 🧪",
      "Forêt Mystique",
      "Glace & Feu",
      "Océan Profond 🌊",
      "Volcan 🔥",
      "Vintage Pastel 🌸",
      "🎨 Personnalisé...",
    ],
  },
};

const updateLanguage = (lang) => {
  const t = translations[lang];

  langFlag.innerHTML = `<img src="${t.flagUrl}" alt="${t.flagAlt}" class="flag-img">`;

  showMenuBtn.innerHTML = `<span>⚙️</span> ${t.settings}`;
  document.querySelector(".controls-title").textContent = t.settings;

  document.querySelector('label[for="textInput"]').textContent = t.textLabel;
  document.querySelector('label[for="modeSelect"]').textContent =
    t.parallaxLabel;
  document.querySelector('label[for="colorSelect"]').textContent = t.colorLabel;
  customColorPickerZone.querySelector("label").textContent = t.customColorLabel;

  // Tranduction des nouveaux labels de l'effet personnalisé
  document.querySelector('label[for="customDistance"]').textContent =
    t.customDistLabel;
  document.querySelector('label[for="customFluidity"]').textContent =
    t.customFluidLabel;
  document.querySelector('label[for="customElasticity"]').textContent =
    t.customElasticLabel;
  document.querySelector('label[for="customTime"]').textContent =
    t.customTimeLabel;

  const modeOptions = modeSelect.options;
  for (let idx = 0; idx < modeOptions.length; idx++) {
    modeOptions[idx].text = t.effects[idx];
  }

  const colorOptions = colorSelect.options;
  for (let idx = 0; idx < colorOptions.length; idx++) {
    colorOptions[idx].text = t.palettes[idx];
  }

  const numLayers = factorRange.value;
  document.querySelector('label[for="factorRange"]').innerHTML =
    `${t.layersLabel}<span id="layerCountDisplay">${numLayers}</span>`;

  modalOS.querySelector(".modal-title").textContent = t.modalOsTitle;
  modalOS.querySelector(".modal-body").innerHTML = t.modalOsBody;
  modalPyro.querySelector(".modal-title").textContent = t.modalPyroTitle;
  modalPyro.querySelector(".modal-body").textContent = t.modalPyroBody;

  closeOS.textContent = t.closeBtn;
  closePyro.textContent = t.closeBtn;
  openSourceBtn.textContent = t.modalOsTitle;
  if (repoBtn) repoBtn.textContent = t.repoBtn;

  const profileLink = modalPyro.querySelector(".modal-link-btn");
  if (profileLink) profileLink.textContent = t.profileBtn;
};

// ANIMATION D'ONDE DE CHOC SYNCHRONISÉE
langBtn.addEventListener("click", () => {
  document.body.classList.add("lang-changing");

  const layers = Array.from(document.querySelectorAll(".text-layer"));

  layers.forEach((layer, index) => {
    const waveDelay = index * 45;

    setTimeout(() => {
      layer.style.setProperty("--wave-y", "-80px");
      layer.style.setProperty("--wave-scale", "1.12");
      layer.style.setProperty(
        "--wave-rot",
        `${(index % 2 === 0 ? 1 : -1) * 4}deg`,
      );
      layer.style.setProperty("--wave-opacity", "0.1");

      setTimeout(() => {
        if (index === 0) {
          currentLang = currentLang === "en" ? "fr" : "en";
          updateLanguage(currentLang);
        } else {
          layer.textContent = textInput.value || " ";
        }

        layer.style.setProperty("--wave-y", "15px");
        layer.style.setProperty("--wave-scale", "0.96");
        layer.style.setProperty("--wave-rot", "0deg");
        layer.style.setProperty("--wave-opacity", "0.7");

        setTimeout(() => {
          layer.style.setProperty("--wave-y", "0px");
          layer.style.setProperty("--wave-scale", "1");
          layer.style.setProperty("--wave-opacity", "1");
        }, 250);
      }, 180);
    }, waveDelay);
  });

  setTimeout(() => {
    document.body.classList.remove("lang-changing");
    const numLayers = factorRange.value;
    const display = document.getElementById("layerCountDisplay");
    if (display) display.textContent = numLayers;
  }, 700);
});

// Controls display management
hideMenuBtn.addEventListener("click", () => {
  controlsPanel.classList.add("hidden");
  setTimeout(() => {
    showMenuBtn.style.display = "flex";
  }, 200);
});

showMenuBtn.addEventListener("click", () => {
  showMenuBtn.style.display = "none";
  controlsPanel.classList.remove("hidden");
});

// Modals management
openSourceBtn.addEventListener("click", () => modalOS.classList.add("active"));
pyroBtn.addEventListener("click", () => modalPyro.classList.add("active"));
closeOS.addEventListener("click", () => modalOS.classList.remove("active"));
closePyro.addEventListener("click", () => modalPyro.classList.remove("active"));

window.addEventListener("click", (e) => {
  if (e.target === modalOS) modalOS.classList.remove("active");
  if (e.target === modalPyro) modalPyro.classList.remove("active");
});

const getDynamicFontSize = (textLength) => {
  if (textLength <= 6) return "22vw";
  if (textLength <= 12) return "14vw";
  if (textLength <= 20) return "9vw";
  if (textLength <= 26) return "6.2vw";
  return "5.2vw";
};

const interpolateColor = (color1, color2, factor) => {
  const hex = (x) => ("0" + parseInt(x, 10).toString(16)).slice(-2);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

const renderLayers = () => {
  const numLayers = parseInt(factorRange.value, 10);

  const display = document.getElementById("layerCountDisplay");
  if (display) display.textContent = numLayers;

  let currentText = textInput.value;
  if (!currentText) currentText = " ";

  if (currentText.length > 30) {
    currentText = currentText.substring(0, 30);
    textInput.value = currentText;
  }

  const fontSize = getDynamicFontSize(currentText.length);

  // Afficher/Cacher la zone de couleur personnalisée
  const isCustomColor = colorSelect.value === "custom";
  customColorPickerZone.style.display = isCustomColor ? "flex" : "none";

  // Afficher/Cacher la zone des effets personnalisés
  const isCustomEffect = modeSelect.value === "customEffect";
  customEffectPickerZone.style.display = isCustomEffect ? "flex" : "none";

  const selectedPreset = colorPresets[colorSelect.value];
  doodleContainer.innerHTML = "";

  for (let index = 0; index < numLayers; index++) {
    const layer = document.createElement("div");
    layer.className = "text-layer";
    layer.textContent = currentText;
    layer.style.fontSize = fontSize;

    const i = index + 1;
    const dir = i % 2 === 0 ? -1 : 1;

    let color;
    if (isCustomColor) {
      const progress = numLayers > 1 ? index / (numLayers - 1) : 0;
      color = interpolateColor(
        customColor1.value,
        customColor2.value,
        progress,
      );
    } else {
      color = selectedPreset[index % selectedPreset.length];
    }

    layer.style.setProperty("--i", i);
    layer.style.setProperty("--dir", dir);
    layer.style.setProperty("--max-layers", numLayers);
    layer.style.color = color;

    doodleContainer.appendChild(layer);
  }

  updateFactors(modeSelect.value);
};

const updateFactors = (mode) => {
  const layers = document.querySelectorAll(".text-layer");

  // Affichage dynamique du sous-menu personnalisé
  const isCustomEffect = mode === "customEffect";
  customEffectPickerZone.style.display = isCustomEffect ? "flex" : "none";

  // Récupération des valeurs des sliders pour le mode personnalisé
  const dVal = parseFloat(customDistance.value) / 15; // Éloignement
  const fVal = parseFloat(customFluidity.value) / 15; // Fluidité
  const eVal = parseFloat(customElasticity.value) / 10; // Élasticité
  const tVal = parseFloat(customTime.value) / 10; // Temps / déphasage

  layers.forEach((layer, index) => {
    const i = index + 1;
    let factor = 1;
    let invert = 1;

    switch (mode) {
      case "separated":
        factor = i * 0.8;
        break;
      case "follow":
        factor = 1.5 / i;
        break;
      case "distant":
        factor = Math.pow(i, 2.2) * 0.4;
        break;
      case "inverted":
        factor = i * 0.8;
        invert = i % 2 === 0 ? -1 : 1;
        break;
      case "chaos":
        factor = ((index * 7 + 3) % 4) + 0.5;
        break;
      case "wave":
        factor = Math.sin(i * 1.2) * 2;
        break;
      case "customEffect":
        // Combinaison cinétique des 4 sliders : Éloignement, Fluidité, Élasticité et Temps
        factor =
          Math.log(i + 1) * dVal * fVal + Math.sin(i * eVal + tVal) * 0.5;
        invert = index % 2 === 0 ? -0.8 : 1.2;
        break;
    }

    layer.style.setProperty("--factor", factor);
    layer.style.setProperty("--invert", invert);
  });
};

textInput.addEventListener("input", () => {
  let newText = textInput.value;
  if (!newText) newText = " ";

  if (newText.length > 30) {
    newText = newText.substring(0, 30);
    textInput.value = newText;
  }

  const fontSize = getDynamicFontSize(newText.length);

  document.querySelectorAll(".text-layer").forEach((layer) => {
    layer.textContent = newText;
    layer.style.fontSize = fontSize;
  });
});

modeSelect.addEventListener("change", (e) => {
  updateFactors(e.target.value);
});

// Événements pour recalculer les facteurs cinétiques des nouveaux sliders en temps réel
customDistance.addEventListener("input", () => updateFactors("customEffect"));
customFluidity.addEventListener("input", () => updateFactors("customEffect"));
customElasticity.addEventListener("input", () => updateFactors("customEffect"));
customTime.addEventListener("input", () => updateFactors("customEffect"));

colorSelect.addEventListener("change", renderLayers);
customColor1.addEventListener("input", renderLayers);
customColor2.addEventListener("input", renderLayers);
factorRange.addEventListener("input", renderLayers);

window.addEventListener("mousemove", (e) => {
  if (isMobileInput) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.setProperty("--mouse-x", x);
  document.body.style.setProperty("--mouse-y", y);
});

initializeMotionInput();
renderLayers();
