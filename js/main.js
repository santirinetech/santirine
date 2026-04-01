document.addEventListener('DOMContentLoaded', () => {

    // 1. Cursor Customizado (Magnetic)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const links = document.querySelectorAll('a, button, input, textarea');

    // Desativa em mobile devido ao touch e matchMedia de pointer
    if (cursorDot && cursorOutline && matchMedia('(pointer:fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot segue diretamente
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline segue com leve delay suave do JS usando CSS keys implícitas no animate API
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: "forwards" });
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            link.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    } else {
        if(cursorDot) cursorDot.style.display = 'none';
        if(cursorOutline) cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto'; // Fallback mobile
    }

    // 2. Animação de Entrada (Fade Up Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); Descomente para disparar 1x só. Deixamos loop.
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Header Opaque on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Card 3D Tilt / Glow Effect on Hover (Para Services Cards)
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; // tilt de 8 graus
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Background Light follow mouse
            const glow = card.querySelector('.card-glow');
            if(glow) {
                // Posiciona o centro do gradiente exatamente sob o mouse
                glow.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            const glow = card.querySelector('.card-glow');
            if(glow) glow.style.transform = 'translate(0px, 0px)';
        });
    });

    // 5. Prevenir Submit Fake do Formulário (Demonstração)
    const btnSubmit = document.querySelector('.btn-submit');
    if(btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const form = document.querySelector('.contact-form');
            if(form.checkValidity()) {
                btnSubmit.innerHTML = '<span>Lançado com Sucesso! <ion-icon name="checkmark-outline" style="vertical-align: middle;"></ion-icon></span>';
                btnSubmit.style.background = '#00F0FF';
                btnSubmit.style.color = '#000';
                
                setTimeout(() => {
                    btnSubmit.innerHTML = '<span>Lançar Projeto</span>';
                    btnSubmit.style.background = '';
                    btnSubmit.style.color = '';
                    form.reset();
                }, 4000);
            } else {
                form.reportValidity();
            }
        });
    }
});
