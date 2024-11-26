import * as THREE from 'three';
import AOS from 'aos';
import { blogImages, portfolioImages } from './placeholder-images.js';

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-theme'));
});

// Three.js Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

const heroVisual = document.getElementById('hero-animation');
if (heroVisual) {
    renderer.setSize(heroVisual.clientWidth, heroVisual.clientHeight);
    heroVisual.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshNormalMaterial();
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Experience Timeline Data
const experiences = [
    {
        year: '2023',
        title: 'Senior IT Leadership',
        description: 'Leading digital transformation initiatives',
        category: 'leadership'
    },
    {
        year: '2020',
        title: 'Technical Director',
        description: 'Overseeing enterprise architecture and innovation',
        category: 'tech'
    },
    {
        year: '2015',
        title: 'Solutions Architect',
        description: 'Designing scalable enterprise solutions',
        category: 'tech'
    }
];

// Blog Posts Data
const blogPosts = [
    {
        title: 'The Future of Enterprise Architecture',
        excerpt: 'Exploring emerging trends in enterprise architecture and how they shape the future of IT infrastructure. Learn about microservices, serverless computing, and cloud-native architectures.',
        image: blogImages['enterprise-arch'],
        category: 'tech',
        date: '2023-11-01'
    },
    {
        title: 'Leading Through Digital Transformation',
        excerpt: 'Key strategies for successful digital transformation and change management. Discover how to lead teams through technological transitions while maintaining productivity.',
        image: blogImages['leadership'],
        category: 'leadership',
        date: '2023-10-15'
    },
    {
        title: 'Innovation in Enterprise Technology',
        excerpt: 'Exploring cutting-edge technologies reshaping enterprise IT. From AI and ML to blockchain and IoT, understand the impact on business operations.',
        image: blogImages['innovation'],
        category: 'innovation',
        date: '2023-10-01'
    }
];

// Portfolio Projects
const projects = [
    {
        title: 'Enterprise Cloud Migration',
        description: 'Led the successful migration of legacy systems to cloud infrastructure, improving scalability and reducing operational costs by 40%.',
        image: portfolioImages['cloud'],
        category: 'cloud'
    },
    {
        title: 'Mobile Banking Platform',
        description: 'Developed a secure, user-friendly mobile banking solution serving over 1 million customers with 99.99% uptime.',
        image: portfolioImages['mobile'],
        category: 'mobile'
    },
    {
        title: 'Enterprise Web Portal',
        description: 'Architected and delivered a modern web portal that streamlined operations across 5 departments, increasing efficiency by 60%.',
        image: portfolioImages['web'],
        category: 'web'
    }
];

// Skills Data for Radar Chart
const skillsData = {
    labels: ['Leadership', 'Architecture', 'Cloud', 'Security', 'Innovation', 'Development'],
    datasets: [{
        label: 'Expertise Level',
        data: [95, 90, 85, 88, 92, 85],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 0.8)',
        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
    }]
};

// Initialize Radar Chart
const initRadarChart = () => {
    const ctx = document.getElementById('skillsRadar');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: skillsData,
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
};

// Filter Functions
const filterItems = (items, category, container, createItemFunc) => {
    const filteredItems = category === 'all' 
        ? items 
        : items.filter(item => item.category === category);
    
    container.innerHTML = '';
    filteredItems.forEach(item => {
        container.appendChild(createItemFunc(item));
    });
};

// Create Blog Post Element
const createBlogPost = (post) => {
    const article = document.createElement('article');
    article.className = 'blog-card glass-morphism';
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-image">
        <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <small>${new Date(post.date).toLocaleDateString()}</small>
        </div>
    `;
    return article;
};

// Create Portfolio Item Element
const createPortfolioItem = (project) => {
    const div = document.createElement('div');
    div.className = 'portfolio-item glass-morphism';
    div.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="portfolio-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `;
    return div;
};

// Initialize Filters
const initFilters = () => {
    // Blog Filters
    const blogGrid = document.querySelector('.blog-grid');
    const blogFilters = document.querySelectorAll('.blog-filter .filter-btn');
    
    blogFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            blogFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterItems(blogPosts, btn.dataset.filter, blogGrid, createBlogPost);
        });
    });

    // Portfolio Filters
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioFilters = document.querySelectorAll('.portfolio-filters .filter-btn');
    
    portfolioFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            portfolioFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterItems(projects, btn.dataset.filter, portfolioGrid, createPortfolioItem);
        });
    });
};

// Populate Timeline
const timeline = document.querySelector('.timeline');
if (timeline) {
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-content" data-aos="fade-up">
                <h3>${exp.year}</h3>
                <h4>${exp.title}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Add your form submission logic here
        console.log(Object.fromEntries(formData));
    });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initRadarChart();
    initFilters();
    
    // Populate initial content
    const blogGrid = document.querySelector('.blog-grid');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    filterItems(blogPosts, 'all', blogGrid, createBlogPost);
    filterItems(projects, 'all', portfolioGrid, createPortfolioItem);
});
