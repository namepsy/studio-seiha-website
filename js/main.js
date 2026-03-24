const navbar = document.querySelector(".navbar");
const teamCards = document.querySelectorAll(".team-card");
const teamModal = document.getElementById("teamModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalDesc = document.getElementById("modalDesc");
const modalSummary = document.getElementById("modalSummary");
const modalCareer = document.getElementById("modalCareer");
const modalTags = document.getElementById("modalTags");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const audioPlayers = document.querySelectorAll("audio");

const modalInstagram = document.getElementById("modalInstagram");
const modalSoundcloud = document.getElementById("modalSoundcloud");
const modalLinktree = document.getElementById("modalLinktree");
const modalGithub = document.getElementById("modalGithub");
const modalYoutube = document.getElementById("modalYoutube");

/* ======================
NAVBAR SHADOW
====================== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ======================
AUDIO - 한 번에 하나만 재생
====================== */
audioPlayers.forEach((currentAudio) => {
  currentAudio.addEventListener("play", () => {
    audioPlayers.forEach((audio) => {
      if (audio !== currentAudio) {
        audio.pause();
      }
    });
  });
});

/* ======================
TEAM MODAL
====================== */
function createListItems(items) {
  return items
    .filter((item) => item.trim() !== "")
    .map((item) => `<li>${item.trim()}</li>`)
    .join("");
}

function createTagItems(tags) {
  return tags
    .filter((tag) => tag.trim() !== "")
    .map((tag) => `<span>${tag.trim()}</span>`)
    .join("");
}

function normalizeUrl(url) {
  if (!url || url.trim() === "") return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function setSocialLink(element, url) {
  const normalized = normalizeUrl(url);

  if (normalized) {
    element.href = normalized;
    element.style.display = "flex";
  } else {
    element.removeAttribute("href");
    element.style.display = "none";
  }
}

function openTeamModal(card) {
  const img = card.dataset.img || "";
  const name = card.dataset.name || "";
  const role = card.dataset.role || "";
  const desc = card.dataset.desc || "";
  const summary = card.dataset.summary || "";
  const career = (card.dataset.career || "").split("|");
  const tags = (card.dataset.tags || "").split(",");

  modalImg.src = img;
  modalImg.alt = `${name} 상세 이미지`;
  modalName.textContent = name;
  modalRole.textContent = role;
  modalDesc.textContent = desc;
  modalSummary.textContent = summary;
  modalCareer.innerHTML = createListItems(career);
  modalTags.innerHTML = createTagItems(tags);

  setSocialLink(modalInstagram, card.dataset.instagram);
  setSocialLink(modalSoundcloud, card.dataset.soundcloud);
  setSocialLink(modalLinktree, card.dataset.linktree);
  setSocialLink(modalGithub, card.dataset.github);
  setSocialLink(modalYoutube, card.dataset.youtube);

  teamModal.classList.add("active");
  teamModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeTeamModal() {
  teamModal.classList.remove("active");
  teamModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

teamCards.forEach((card) => {
  card.addEventListener("click", () => {
    openTeamModal(card);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeTeamModal);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && teamModal.classList.contains("active")) {
    closeTeamModal();
  }
});