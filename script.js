/* THEME TOGGLE LOGIC */
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = toggleBtn.querySelector('i');
const htmlElement = document.documentElement;

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyDark();
    } else {
        applyLight();
    }
}

function applyDark() {
    htmlElement.setAttribute('data-theme', 'dark');
    toggleIcon.className = 'fa fa-sun'; 
}

function applyLight() {
    htmlElement.setAttribute('data-theme', 'light');
    toggleIcon.className = 'fa fa-moon'; 
}

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        applyDark();
        localStorage.setItem('theme', 'dark');
    } else {
        applyLight();
        localStorage.setItem('theme', 'light');
    }
});

initTheme();


/* MOBILE NAVIGATION LOGIC */
const mobileNavBtn = document.getElementById('mobile-nav-toggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;

function closeSidebar() {
    body.classList.remove('mobile-nav-active');
    const icon = mobileNavBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

function toggleSidebar() {
    body.classList.toggle('mobile-nav-active');
    const icon = mobileNavBtn.querySelector('i');
    
    if (body.classList.contains('mobile-nav-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// 1. Click Toggle Button
mobileNavBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from closing it immediately
    toggleSidebar();
});

// 2. Click Menu Links (Close Sidebar)
const navLinks = document.querySelectorAll('#main-menu ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// 3. Click Outside (Close Sidebar)
document.addEventListener('click', (e) => {
    // Only if sidebar is open
    if (body.classList.contains('mobile-nav-active')) {
        // If click is NOT on sidebar AND NOT on toggle button
        if (!sidebar.contains(e.target) && !mobileNavBtn.contains(e.target)) {
            closeSidebar();
        }
    }
});