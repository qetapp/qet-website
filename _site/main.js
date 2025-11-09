const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
document.querySelectorAll('a').forEach(link => {
  const originalText = link.innerText;
  link.addEventListener('mouseover', () => {
    let interval = null;
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      link.innerText = link.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)]
        })
        .join("");
      if(iteration >= originalText.length){
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  });

  link.addEventListener('mouseout', () => {
    link.innerText = originalText;
  });
});
