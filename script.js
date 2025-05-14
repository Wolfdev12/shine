document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for the scroll down button
  const scrollButton = document.querySelector('.scroll-button');
  
  if (scrollButton) {
    scrollButton.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Simple animation for the avatar on hover
  const avatar = document.querySelector('.avatar');
  
  if (avatar) {
    avatar.addEventListener('mouseenter', () => {
      avatar.style.animationPlayState = 'paused';
      avatar.style.transform = 'scale(1.1)';
      avatar.style.boxShadow = '0 0 30px 15px rgba(173, 255, 47, 0.7)';
    });
    
    avatar.addEventListener('mouseleave', () => {
      avatar.style.animationPlayState = 'running';
      avatar.style.transform = '';
      avatar.style.boxShadow = '';
    });
  }
  
  // Add glow effect to buttons on hover
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
  
  // Function to add a shine effect when the page loads
  const addInitialShineEffect = () => {
    const title = document.querySelector('.title');
    if (title) {
      title.classList.add('shine-effect');
      
      // Remove the class after animation completes
      setTimeout(() => {
        title.classList.remove('shine-effect');
      }, 2000);
    }
  };
  
  // Call the shine effect on page load
  addInitialShineEffect();

  // Add scroll animations for About and Tokenomics sections
  const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Observe sections
    document.querySelectorAll('.about-content, .tokenomics-content, .tokenomics-card, .feature')
      .forEach(el => observer.observe(el));
  };

  // Add floating particles in the background
  const createBackgroundParticles = () => {
    ['about', 'tokenomics'].forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'background-particles';
      section.appendChild(particlesContainer);

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${posX}%;
          top: ${posY}%;
          animation: floatParticle ${duration}s ${delay}s infinite linear;
        `;
        
        particlesContainer.appendChild(particle);
      }
    });
  };

  // Interactive hover effects for tokenomics cards
  const setupTokenomicsInteraction = () => {
    const cards = document.querySelectorAll('.tokenomics-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });
  };

  // Improved copy functionality for contract address
  const copyContractAddress = () => {
    const contractAddress = document.getElementById('contractAddress');
    const copyBtn = document.querySelector('.copy-btn');
    
    if (contractAddress && copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(contractAddress.textContent.trim());
          
          // Visual feedback
          copyBtn.classList.add('copied');
          
          // Show success message
          const toast = document.createElement('div');
          toast.className = 'toast-message';
          toast.textContent = 'Address Copied! 🎉';
          document.body.appendChild(toast);
          
          // Remove message after animation
          setTimeout(() => {
            toast.remove();
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });
    }
  };

  // Initialize all new features
  observeElements();
  createBackgroundParticles();
  setupTokenomicsInteraction();
  copyContractAddress();
});