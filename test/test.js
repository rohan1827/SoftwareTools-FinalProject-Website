const { JSDOM } = require('jsdom');
const assert = require('assert');

// Sample HTML structure with logos, critical sections, and other necessary elements
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Toronto LTD</title>
</head>
<body>
    <!-- Banner Section -->
    <div id="banner">
        <img src="images/logo.png" id="banner-logo" alt="Landing Page" />
    </div>

    <!-- Navigation Section -->
    <nav id="nav-main">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#clients">Clients</a></li>
        </ul>
    </nav>

    <!-- Sections -->
    <div id="about"></div>
    <div id="services"></div>
    <div id="clients"></div>

    <!-- Social Icons in Footer -->
    <footer>
        <ul class="social-icons">
            <li><a href="https://facebook.com" target="_blank"><span>Facebook</span></a></li>
            <li><a href="https://google.com" target="_blank"><span>Google+</span></a></li>
            <li><a href="https://twitter.com" target="_blank"><span>Twitter</span></a></li>
            <li><a href="https://instagram.com" target="_blank"><span>Instagram</span></a></li>
            <li><a href="https://behance.net" target="_blank"><span>Behance</span></a></li>
        </ul>
    </footer>

    <!-- Weather and DateTime Section -->
    <div id="datetime">2024-12-07 10:00 AM</div>
    <div id="temperature">-5°C</div>
    <div id="weatherIcon">☀️</div>
</body>
</html>
`;

const dom = new JSDOM(htmlContent);
global.document = dom.window.document;
global.window = dom.window;

describe('Website Functionality Tests', function () {
    before(function () {
        // Run this once before all tests
        console.log('Starting website functionality tests...');
    });

    it('should have all critical sections', function () {
        const sections = [
            { id: 'banner', name: 'Banner Section' },
            { id: 'about', name: 'About Section' },
            { id: 'services', name: 'Services Section' },
            { id: 'clients', name: 'Clients Section' }
        ];

        sections.forEach(section => {
            const sectionElement = document.getElementById(section.id);
            assert(sectionElement !== null, `${section.name} section should exist in the DOM`);
        });
    });

    it('should have correct navigation links', function () {
        const navLinks = document.querySelectorAll('#nav-main ul li a');
        const expectedLinks = ['Home', 'About', 'Services', 'Clients'];

        assert(navLinks.length === expectedLinks.length, 'Navigation should have the correct number of links');

        navLinks.forEach((link, index) => {
            assert(link.textContent.trim() === expectedLinks[index], `Navigation link ${index + 1} should be ${expectedLinks[index]}`);
            assert(link.getAttribute('href').startsWith('#'), `Navigation link ${index + 1} should have a valid section anchor`);
        });
    });

    it('should have correct social icons in footer', function () {
        const socialIcons = document.querySelectorAll('.social-icons li a');
        const expectedPlatforms = ['Facebook', 'Google+', 'Twitter', 'Instagram', 'Behance'];

        assert(socialIcons.length === expectedPlatforms.length, 'Footer should have the correct number of social icons');

        socialIcons.forEach((icon, index) => {
            assert(icon.querySelector('span').textContent === expectedPlatforms[index], `Social icon ${index + 1} should be for ${expectedPlatforms[index]}`);
            assert(icon.getAttribute('target') === '_blank', `Social icon ${index + 1} should open in a new tab`);
        });
    });

    it('should have weather and datetime section', function () {
        const dateTimeElement = document.getElementById('datetime');
        const temperatureElement = document.getElementById('temperature');
        const weatherIcon = document.getElementById('weatherIcon');

        assert(dateTimeElement !== null, 'Date and time element should exist');
        assert(temperatureElement !== null, 'Temperature element should exist');
        assert(weatherIcon !== null, 'Weather icon should exist');
    });

    after(function () {
        // Run this once after all tests
        console.log('Website functionality tests completed.');
    });
});
