import { tutorialSlides } from "./utils/data/tutorialData.js";

const TUTORIAL_KEY = "calendar_tutorial_seen"
let currentSlide = 0;
let tutorialOverlay = null;

function createTutorialOverlay(){
    const overlay = document.createElement("div")
    overlay.classList.add("tutorial-overlay")

    overlay.innerHTML = `
    <div class="tutorial-modal">
      <button type="button" class="tutorial-close">×</button>
      <div class="tutorial-content">
        <div class="tutorial-image-wrapper">
          <img class="tutorial-image" src="" alt="tutorial slide">
        </div>
        <div class="tutorial-text">
          <h2 class="tutorial-title"></h2>
          <p class="tutorial-description"></p>
        </div>
      </div>
      <div class="tutorial-actions">
        <button type="button" class="tutorial-prev">Indietro</button>
        <button type="button" class="tutorial-next">Avanti</button>
      </div>
    </div>
    `;
    document.body.appendChild(overlay)
    tutorialOverlay = overlay;

  overlay.querySelector(".tutorial-close").addEventListener("click", finishTutorial);
  overlay.querySelector(".tutorial-prev").addEventListener("click", prevSlide);
  overlay.querySelector(".tutorial-next").addEventListener("click", nextSlide);

}

function renderTutorial(index){
    const slide = tutorialSlides[index]
    if (!slide || !tutorialOverlay) return;

    tutorialOverlay.querySelector(".tutorial-image").src = slide.image
    tutorialOverlay.querySelector(".tutorial-title").innerText = slide.title;
    tutorialOverlay.querySelector(".tutorial-description").innerText = slide.text;

    const prevBtn = tutorialOverlay.querySelector(".tutorial-prev");
    const nextBtn = tutorialOverlay.querySelector(".tutorial-next");

    prevBtn.disabled = index === 0;
    nextBtn.innerText = index === tutorialSlides.length - 1 ? "Fine" : "Avanti"

}

export function openTutorial(){
    currentSlide = 0
    if(!tutorialOverlay){
        createTutorialOverlay()
    }
    tutorialOverlay.classList.add("show")
    renderTutorial(currentSlide)
}
function nextSlide(){
    if(currentSlide >= tutorialSlides.length - 1){
        finishTutorial()
        return;
    }
    currentSlide++;
    renderTutorial(currentSlide)
}

function prevSlide(){
    if(currentSlide === 0) return;
    currentSlide--;
    renderTutorial(currentSlide)
}

function closeTutorial(){
    if(!tutorialOverlay)return;
    tutorialOverlay.classList.remove("show")
}

function finishTutorial() {
  localStorage.setItem(TUTORIAL_KEY, "true");
  closeTutorial();
}

export function resetTutorial(){
    localStorage.removeItem(TUTORIAL_KEY)
    openTutorial()
}

export function initTutorial(){
    const hasSeentutorial = localStorage.getItem(TUTORIAL_KEY)
    if(!hasSeentutorial){
        openTutorial()
    }  
}