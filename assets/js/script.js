/**
 * RAISE - Educational Website Script
 * Modernized Version
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. Navbar Scroll Behavior
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const menuIcon = menuBtn.querySelector('i');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuBtn) {
                const menuIcon = menuBtn.querySelector('i');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }
        });
    });

    // 4. Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / 50; // Speed adjustment

                const updateCount = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                countObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 1.0
    });

    counters.forEach(counter => countObserver.observe(counter));

    // 6. Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 7. Quiz Functions (Backward Compatibility)
    window.quizt = function(frame) {
        for (let i = 1; i <= 11; i++) {
            const el = document.getElementById('f' + i);
            if (el) el.style.display = 'none';
        }
        const active = document.getElementById('f' + frame);
        if (active) active.style.display = 'block';
    };

    window.startquiz = function() {
        const title = document.getElementById('title');
        const panel = document.getElementById('panel');
        const left = document.getElementById('left');
        const right = document.getElementById('right');
        
        if (title) title.style.display = 'none';
        if (panel) panel.style.display = 'flex';
        if (left) left.style.display = 'block';
        if (right) right.style.display = 'block';
    };

    // 8. Login/Register Toggle (Legacy support for login.html)
    window.register = function() {
        const x = document.getElementById("login");
        const y = document.getElementById("register");
        const z = document.getElementById("btn");
        const b = document.getElementById("reg");
        const a = document.getElementById("log");
        const w = document.getElementById("other");

        if (x && y && z) {
            x.style.left = "-400px";
            y.style.left = "40px";
            z.style.left = "120px";
            if (w) w.style.opacity = "0";
            if (w) w.style.pointerEvents = "none";
            if (b) b.style.color = "#fff";
            if (a) a.style.color = "#cbd5e1";
        }
    };

    window.login = function() {
        const x = document.getElementById("login");
        const y = document.getElementById("register");
        const z = document.getElementById("btn");
        const a = document.getElementById("log");
        const b = document.getElementById("reg");
        const w = document.getElementById("other");

        if (x && y && z) {
            x.style.left = "40px";
            y.style.left = "480px";
            z.style.left = "0px";
            if (w) w.style.opacity = "1";
            if (w) w.style.pointerEvents = "auto";
            if (a) a.style.color = "#fff";
            if (b) b.style.color = "#cbd5e1";
        }
    };
    
    // CheckBox Function for registration
    window.goFurther = function() {
        const chk = document.getElementById("chkAgree");
        const btn = document.getElementById('btnSubmit');
        if (chk && btn) {
            if (chk.checked) {
                btn.classList.remove('reg-btn');
                btn.disabled = false;
            } else {
                btn.classList.add('reg-btn');
                btn.disabled = true;
            }
        }
    };
});