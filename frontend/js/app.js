import { generateAI, checkCredits } from './api.js';

let currentMode = 'image';
let creditsRemaining = 3;

// Inițializare
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateCreditsDisplay();
});

// Schimbare vizualizări (Landing, App, Pricing)
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
    });
    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    lucide.createIcons();
}

// Schimbare mod generator (Imagine / Text)
function setGeneratorMode(mode) {
    currentMode = mode;
    
    // Actualizare butoane
    document.getElementById('tab-gen-image').classList.toggle('bg-indigo-600');
    document.getElementById('tab-gen-image').classList.toggle('text-white');
    document.getElementById('tab-gen-image').classList.toggle('text-slate-400');
    
    document.getElementById('tab-gen-text').classList.toggle('bg-indigo-600');
    document.getElementById('tab-gen-text').classList.toggle('text-white');
    document.getElementById('tab-gen-text').classList.toggle('text-slate-400');
    
    // Afișare/Ascundere opțiuni
    if (mode === 'image') {
        document.getElementById('image-options').classList.remove('hidden');
        document.getElementById('text-options').classList.add('hidden');
    } else {
        document.getElementById('image-options').classList.add('hidden');
        document.getElementById('text-options').classList.remove('hidden');
    }
}

// Generare conținut AI
async function handleAIGeneration() {
    const prompt = document.getElementById('ai-prompt').value.trim();
    
    if (!prompt) {
        alert('Te rog scrie un prompt!');
        return;
    }
    
    if (creditsRemaining <= 0) {
        alert('Nu mai ai credite gratuite. Upgradează-te la PRO!');
        switchView('pricing');
        return;
    }
    
    // Ascunde stare inițială, arată loading
    document.getElementById('output-state-empty').classList.add('hidden');
    document.getElementById('output-state-loading').classList.remove('hidden');
    
    try {
        const result = await generateAI({
            prompt,
            type: currentMode,
            style: currentMode === 'image' ? document.getElementById('image-style').value : null,
            tone: currentMode === 'text' ? document.getElementById('text-tone').value : null
        });
        
        displayResult(result);
        creditsRemaining--;
        updateCreditsDisplay();
    } catch (error) {
        console.error('Eroare generare:', error);
        alert('A apărut o eroare la generare. Încercă din nou.');
        document.getElementById('output-state-loading').classList.add('hidden');
        document.getElementById('output-state-empty').classList.remove('hidden');
    }
}

// Afișare rezultat
function displayResult(result) {
    document.getElementById('output-state-loading').classList.add('hidden');
    document.getElementById('output-state-result').classList.remove('hidden');
    
    const resultContent = document.getElementById('result-content');
    
    if (currentMode === 'image') {
        resultContent.innerHTML = `<img src="${result.url}" alt="Generated image" class="w-full h-full object-cover rounded-xl">`;
    } else {
        resultContent.innerHTML = `<div class="p-6 text-slate-100 leading-relaxed">${result.text}</div>`;
    }
}

// Actualizare afișaj credite
function updateCreditsDisplay() {
    document.getElementById('credits-count-badge').textContent = creditsRemaining;
}

// Setare raport imagine
function setRatio(ratio) {
    document.querySelectorAll('[id^="ratio-"]').forEach(btn => {
        btn.classList.remove('bg-indigo-600/20', 'border-indigo-500/40', 'text-indigo-300');
        btn.classList.add('bg-slate-950', 'border-slate-800', 'text-slate-400');
    });
    document.getElementById(`ratio-${ratio.replace(':', '-')}`).classList.add('bg-indigo-600/20', 'border-indigo-500/40', 'text-indigo-300');
}

// Copiere text
function copyOutputText() {
    const resultContent = document.getElementById('result-content').textContent;
    navigator.clipboard.writeText(resultContent);
    alert('Text copiat!');
}

// Descărcare imagine
function downloadOutputImage() {
    const img = document.querySelector('#result-content img');
    if (img) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = 'echoverse-generated-image.png';
        a.click();
    }
}

// Export funcții
window.switchView = switchView;
window.setGeneratorMode = setGeneratorMode;
window.handleAIGeneration = handleAIGeneration;
window.setRatio = setRatio;
window.copyOutputText = copyOutputText;
window.downloadOutputImage = downloadOutputImage;
