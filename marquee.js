function setupMarquee(wrapperSelector, direction = 'left', speed = 0.5){
  const wrapper = document.querySelector(wrapperSelector);
  const content = wrapper.querySelector('.marquee-content');
  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);

  let isDragging = false;
  let startX;
  let currentX = direction === 'left' ? 0 : -content.offsetWidth;

  const dirFactor = direction === 'left' ? -1 : 1;

  function animate() {
    if(!isDragging){
      currentX += speed * dirFactor;
    }

    // Loop continuo
    if(direction === 'left' && currentX <= -content.offsetWidth){
      currentX = 0;
    }
    if(direction === 'right' && currentX >= 0){
      currentX = -content.offsetWidth;
    }

    wrapper.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // Drag mouse
  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - currentX;
    wrapper.style.cursor = 'grabbing';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    currentX = e.pageX - startX;
    wrapper.style.transform = `translateX(${currentX}px)`;
  });

  wrapper.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  // Drag touch
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - currentX;
  });

  wrapper.addEventListener('touchmove', (e) => {
    if(!isDragging) return;
    currentX = e.touches[0].pageX - startX;
    wrapper.style.transform = `translateX(${currentX}px)`;
  });

  wrapper.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Setup due marquee
document.addEventListener('DOMContentLoaded', () => {
  setupMarquee('#marquee-left', 'left', 0.5);
  setupMarquee('#marquee-right', 'right', 0.5);
});
