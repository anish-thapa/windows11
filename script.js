document.addEventListener('DOMContentLoaded', function() {
    // Update time and date
    function updateDateTime() {
        const now = new Date();
        const timeElement = document.querySelector('.time');
        const dateElement = document.querySelector('.date');
        
        // Format time (12-hour format with AM/PM)
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes} ${ampm}`;
        
        // Format date (MM/DD/YYYY)
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${month}/${day}/${year}`;
    }
    
    // Update time every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    // Start Menu Toggle with animation
    const startButton = document.querySelector('.start-button');
    const startMenu = document.getElementById('startMenu');
    
    startButton.addEventListener('click', function(e) {
        e.stopPropagation();
        startMenu.classList.toggle('active');
        
        // Add active class to start button when menu is open
        if (startMenu.classList.contains('active')) {
            startButton.classList.add('active');
        } else {
            startButton.classList.remove('active');
        }
    });
    
    // Close start menu when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenu.classList.remove('active');
            startButton.classList.remove('active');
        }
    });
    
    // Desktop icon double-click functionality with animation
    const desktopIcons = document.querySelectorAll('.icon');
    
    desktopIcons.forEach(icon => {
        // Add tooltip functionality
        icon.addEventListener('mouseenter', function(e) {
            const iconName = this.querySelector('span').textContent;
            createTooltip(iconName, e);
        });
        
        icon.addEventListener('mouseleave', function() {
            removeTooltip();
        });
        
        icon.addEventListener('dblclick', function() {
            const appName = this.querySelector('span').textContent;
            
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
            
            alert(`Opening ${appName}`);
        });
    });
    
    // Taskbar app click functionality with animation
    const taskbarApps = document.querySelectorAll('.taskbar-app');
    
    taskbarApps.forEach(app => {
        // Add tooltip functionality
        app.addEventListener('mouseenter', function(e) {
            const appName = this.querySelector('img').getAttribute('alt');
            createTooltip(appName, e);
        });
        
        app.addEventListener('mouseleave', function() {
            removeTooltip();
        });
        
        app.addEventListener('click', function() {
            const appIcon = this.querySelector('img');
            const appName = appIcon.getAttribute('alt');
            
            // Toggle active state
            taskbarApps.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            // Add click animation
            appIcon.style.transform = 'scale(0.8)';
            setTimeout(() => {
                appIcon.style.transform = 'scale(1)';
            }, 200);
            
            alert(`Opening ${appName}`);
        });
    });
    
    // Start menu app click functionality with animation
    const startMenuApps = document.querySelectorAll('.app-item');
    
    startMenuApps.forEach(app => {
        app.addEventListener('click', function() {
            const appName = this.querySelector('span').textContent;
            const appIcon = this.querySelector('img');
            
            // Add click animation
            appIcon.style.transform = 'scale(0.8)';
            setTimeout(() => {
                appIcon.style.transform = 'scale(1)';
            }, 200);
            
            alert(`Opening ${appName}`);
            startMenu.classList.remove('active');
            startButton.classList.remove('active');
        });
    });
    
    // Power button functionality with animation
    const powerButton = document.querySelector('.power-button');
    
    powerButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        if (confirm('Do you want to shut down?')) {
            // Fade out animation for shutdown
            const desktop = document.querySelector('.desktop');
            desktop.style.transition = 'opacity 1s ease';
            desktop.style.opacity = '0';
            
            setTimeout(() => {
                alert('Shutting down...');
                desktop.style.opacity = '1';
            }, 1000);
        }
    });
    
    // Tooltip functionality
    function createTooltip(text, event) {
        removeTooltip(); // Remove any existing tooltips
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        // Position the tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Make the tooltip visible after a small delay
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 50);
    }
    
    function removeTooltip() {
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.classList.remove('visible');
            setTimeout(() => {
                existingTooltip.remove();
            }, 200);
        }
    }
    
    // Wallpaper functionality
    const wallpapers = [
        'wallpaper.jpg',
        'wallpaper2.jpg',
        'wallpaper3.jpg',
        'wallpaper4.jpg'
    ];
    
    let currentWallpaperIndex = 0;
    const desktop = document.querySelector('.desktop');
    
    // Function to change wallpaper with smooth transition
    function changeWallpaper() {
        // Create transition element
        const transition = document.createElement('div');
        transition.className = 'wallpaper-transition';
        desktop.appendChild(transition);
        
        // Update index
        currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
        
        // Set new wallpaper to transition element
        transition.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
        
        // Fade in transition element
        setTimeout(() => {
            transition.style.opacity = '1';
        }, 50);
        
        // After transition completes, update main background and remove transition element
        setTimeout(() => {
            desktop.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
            transition.style.opacity = '0';
            
            setTimeout(() => {
                transition.remove();
            }, 1000);
        }, 1000);
    }
    
    // Change wallpaper every 30 seconds (optional)
    // setInterval(changeWallpaper, 30000);
    
    // Right-click menu for desktop
    const desktop_element = document.querySelector('.desktop');
    
    desktop_element.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // Create context menu
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item">View</div>
            <div class="context-menu-item">Sort by</div>
            <div class="context-menu-item" id="refresh-option">Refresh</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="change-wallpaper">Change wallpaper</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item">Display settings</div>
            <div class="context-menu-item">Personalize</div>
        `;
        
        // Position the menu
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
        
        // Add to DOM
        document.body.appendChild(contextMenu);
        
        // Add event listener for change wallpaper option
        document.getElementById('change-wallpaper').addEventListener('click', function() {
            changeWallpaper();
            contextMenu.remove();
        });
        
        // Add event listener for refresh option
        document.getElementById('refresh-option').addEventListener('click', function() {
            // Add a visual feedback before refreshing
            desktop.style.transition = 'opacity 0.3s ease';
            desktop.style.opacity = '0.8';
            
            // Remove the context menu
            contextMenu.remove();
            
            // Reload the page after a short delay
            setTimeout(() => {
                location.reload();
            }, 300);
        });
        
        // Close menu when clicking elsewhere
        document.addEventListener('click', function closeMenu() {
            contextMenu.remove();
            document.removeEventListener('click', closeMenu);
        });
    });
    
    // Add CSS for context menu
    const style = document.createElement('style');
    style.textContent = `
        .context-menu {
            position: absolute;
            background-color: rgba(36, 36, 36, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 5px 0;
            min-width: 200px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: fadeIn 0.2s ease;
        }
        
        .context-menu-item {
            padding: 8px 15px;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .context-menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .context-menu-separator {
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
            margin: 5px 0;
        }
    `;
    document.head.appendChild(style);
});