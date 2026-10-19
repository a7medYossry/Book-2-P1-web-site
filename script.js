document.addEventListener("DOMContentLoaded", () => {
  // ===============================================
  // 1. Dark / Light Mode Switcher with LocalStorage
  // ===============================================
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  document.body.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = document.body.getAttribute("data-theme");
    const newTheme = activeTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // ===============================================
  // 2. Synchronized Bilingual Token Hover Glow
  // ===============================================
  const tokens = document.querySelectorAll(".token[data-id]");

  tokens.forEach((token) => {
    token.addEventListener("mouseenter", () => {
      const tokenId = token.getAttribute("data-id");
      const matchingTokens = document.querySelectorAll(`[data-id="${tokenId}"]`);
      matchingTokens.forEach((match) => match.classList.add("is-hovered"));
    });

    token.addEventListener("mouseleave", () => {
      const tokenId = token.getAttribute("data-id");
      const matchingTokens = document.querySelectorAll(`[data-id="${tokenId}"]`);
      matchingTokens.forEach((match) => match.classList.remove("is-hovered"));
    });
  });

  // ===============================================
  // 3. Arabic Web Speech Synthesis (Audio Pronounce)
  // ===============================================
  const audioButtons = document.querySelectorAll(".audio-btn");

  audioButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const textToSpeak = btn.getAttribute("data-speak");

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Stop any pending audio

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "ar-SA"; // Arabic Saudi Arabia voice
        utterance.rate = 0.85; // Slightly slower for language learners

        window.speechSynthesis.speak(utterance);
      } else {
        alert("متصفحك لا يدعم خاصية نطق الصوت المدمجة.");
      }
    });
  });

  // ===============================================
  // 4. Interactive Multiple Choice Quizzes (MCQs)
  // ===============================================
  const quizCards = document.querySelectorAll(".quiz-card");

  quizCards.forEach((card) => {
    const correctIndex = parseInt(card.getAttribute("data-correct"), 10);
    const buttons = card.querySelectorAll(".opt-btn");
    const feedback = card.querySelector(".feedback");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedIndex = parseInt(btn.getAttribute("data-index"), 10);

        // Disable all buttons in this quiz after answer
        buttons.forEach((b) => (b.disabled = true));

        if (selectedIndex === correctIndex) {
          btn.classList.add("correct");
          feedback.innerHTML = "✅ إجابة صحيحة! أحسنت! (Correct answer! Well done!)";
          feedback.style.color = "var(--color-green)";
        } else {
          btn.classList.add("wrong");
          buttons[correctIndex].classList.add("correct"); // Show the right one
          feedback.innerHTML = "❌ إجابة خاطئة. الإجابة الصحيحة محددة باللون الأخضر. (Incorrect. The right answer is marked in green).";
          feedback.style.color = "var(--color-red)";
        }

        feedback.classList.add("show");
      });
    });
  });
  // ===============================================
  // 5. Lessons Menu Switcher (تبديل الدروس التفاعلي)
  // ===============================================
  const lessonsBtn = document.getElementById("lessonsDropdownBtn");
  const lessonsMenu = document.getElementById("lessonsMenu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const lessonPanes = document.querySelectorAll(".lesson-pane");

  // فتح وإغلاق القائمة
  if (lessonsBtn && lessonsMenu) {
    lessonsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      lessonsMenu.classList.toggle("show");
    });

    // إغلاق القائمة عند النقر في أي مكان آخر
    document.addEventListener("click", () => {
      lessonsMenu.classList.remove("show");
    });
  }

  // التبديل بين الدروس
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");

      dropdownItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      lessonPanes.forEach((pane) => {
        if (pane.id === targetId) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });

      lessonsMenu.classList.remove("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});