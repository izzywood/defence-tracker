// UK Defence Intelligence Hub JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // News data and configuration
  const DEFENCE_PRIMES = {
    bae: { name: 'BAE Systems', color: '#60a5fa', keywords: ['BAE Systems', 'BAE', 'Type 26', 'Typhoon', 'Astute'] },
    thales: { name: 'Thales', color: '#059669', keywords: ['Thales', 'Watchkeeper', 'Rafale', 'C4I'] },
    babcock: { name: 'Babcock', color: '#dc2626', keywords: ['Babcock', 'submarine', 'warship', 'engineering'] },
    qinetiq: { name: 'QinetiQ', color: '#7c3aed', keywords: ['QinetiQ', 'testing', 'evaluation', 'technology'] },
    'rolls-royce': { name: 'Rolls-Royce', color: '#f59e0b', keywords: ['Rolls-Royce', 'engines', 'nuclear', 'marine'] },
    cobham: { name: 'Cobham', color: '#10b981', keywords: ['Cobham', 'communications', 'electronic warfare'] }
  };

  const US_DEFENCE_PRIMES = {
    lockheed: { name: 'Lockheed Martin', color: '#ef4444', keywords: ['Lockheed Martin', 'F-35', 'F-22', 'C-130'] },
    boeing: { name: 'Boeing', color: '#3b82f6', keywords: ['Boeing', 'F-15', 'F/A-18', 'KC-46', 'AH-64'] },
    raytheon: { name: 'Raytheon Technologies', color: '#8b5cf6', keywords: ['Raytheon', 'missiles', 'radar', 'Pratt & Whitney'] },
    northrop: { name: 'Northrop Grumman', color: '#06b6d4', keywords: ['Northrop Grumman', 'B-21', 'Global Hawk', 'cyber'] },
    'general-dynamics': { name: 'General Dynamics', color: '#f97316', keywords: ['General Dynamics', 'Gulfstream', 'Virginia class', 'Abrams'] },
    l3harris: { name: 'L3Harris Technologies', color: '#84cc16', keywords: ['L3Harris', 'communications', 'space', 'electronic warfare'] }
  };

  const UK_NEWS_SOURCES = [
    'BBC News', 'The Guardian', 'The Times', 'Financial Times', 'Defence News', 
    'Jane\'s Defence', 'FlightGlobal', 'Defence Procurement International'
  ];

  let currentNews = [];
  let filteredNews = [];

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active class to navigation based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });

  // Sample UK defence news (in production, this would come from APIs)
  const sampleNews = [
    {
      title: "BAE Systems secures £2.1bn Type 26 frigate contract extension",
      summary: "The Ministry of Defence has awarded BAE Systems a significant contract extension for the Type 26 Global Combat Ship programme, ensuring continued production of anti-submarine warfare frigates.",
      date: "2024-01-15",
      source: "Defence News",
      prime: "bae",
      url: "#"
    },
    {
      title: "Thales UK delivers next-generation C4I systems to Royal Navy",
      summary: "Thales has successfully delivered advanced Command, Control, Communications, Computers and Intelligence systems to enhance the Royal Navy's operational capabilities.",
      date: "2024-01-14",
      source: "Jane's Defence",
      prime: "thales",
      url: "#"
    },
    {
      title: "Babcock awarded £400m submarine support contract",
      summary: "Babcock International has been awarded a major contract to provide through-life support for the Royal Navy's submarine fleet, including maintenance and upgrade services.",
      date: "2024-01-13",
      source: "The Guardian",
      prime: "babcock",
      url: "#"
    },
    {
      title: "QinetiQ partners with MoD on autonomous vehicle testing",
      summary: "QinetiQ has announced a new partnership with the Ministry of Defence to develop and test autonomous vehicle technologies for military applications.",
      date: "2024-01-12",
      source: "FlightGlobal",
      prime: "qinetiq",
      url: "#"
    },
    {
      title: "UK defence spending reaches £50bn as new capabilities emerge",
      summary: "The UK's defence budget has reached a record high with significant investments in cyber capabilities, space systems, and next-generation platforms.",
      date: "2024-01-11",
      source: "Financial Times",
      prime: "general",
      url: "#"
    },
    {
      title: "BAE Systems Typhoon aircraft completes successful test flight",
      summary: "The latest Typhoon aircraft from BAE Systems has completed its first successful test flight, demonstrating enhanced capabilities for the Royal Air Force.",
      date: "2024-01-10",
      source: "BBC News",
      prime: "bae",
      url: "#"
    }
  ];

  // News filtering and display functions
  function filterNewsByPrime(prime) {
    if (prime === 'all') {
      filteredNews = [...currentNews];
    } else {
      filteredNews = currentNews.filter(article => article.prime === prime);
    }
    displayNews();
  }

  function displayNews() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    if (filteredNews.length === 0) {
      newsGrid.innerHTML = '<div class="loading">No news articles found for the selected filter.</div>';
      return;
    }

    newsGrid.innerHTML = filteredNews.map(article => {
      const primeClass = article.prime !== 'general' ? `prime-${article.prime}` : '';
      return `
        <article class="news-item ${primeClass}">
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <div class="source">${article.source}</div>
          <p>${article.summary}</p>
          <span class="date">${article.date}</span>
        </article>
      `;
    }).join('');
  }

  function updateStats() {
    const totalArticles = document.getElementById('total-articles');
    const activeSources = document.getElementById('active-sources');
    
    if (totalArticles) {
      totalArticles.textContent = currentNews.length;
    }
    if (activeSources) {
      const uniqueSources = new Set(currentNews.map(article => article.source));
      activeSources.textContent = uniqueSources.size;
    }
  }

  // Initialize news data
  function initializeNews() {
    currentNews = [...sampleNews];
    filteredNews = [...currentNews];
    displayNews();
    updateStats();
  }

  // Event listeners for news controls
  function initializeNewsControls() {
    const primeFilter = document.getElementById('prime-filter');
    const refreshBtn = document.getElementById('refresh-news');

    if (primeFilter) {
      primeFilter.addEventListener('change', function() {
        filterNewsByPrime(this.value);
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        // In production, this would fetch new data from APIs
        showLoading(document.getElementById('news-grid'));
        setTimeout(() => {
          initializeNews();
        }, 1000);
      });
    }
  }

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case '1':
          e.preventDefault();
          document.querySelector('.main-nav a[href="#home"]').click();
          break;
        case '2':
          e.preventDefault();
          document.querySelector('.main-nav a[href="#news"]').click();
          break;
        case '3':
          e.preventDefault();
          document.querySelector('.main-nav a[href="#primes"]').click();
          break;
        case '4':
          e.preventDefault();
          document.querySelector('.main-nav a[href="#enterprise"]').click();
          break;
        case '5':
          e.preventDefault();
          document.querySelector('.main-nav a[href="#resources"]').click();
          break;
      }
    }
  });

  // Future API integration placeholder
  function fetchRealNews() {
    // This would integrate with news APIs like:
    // - NewsAPI
    // - Guardian API
    // - BBC News API
    // - Custom RSS feeds
    console.log('Real news API integration ready to be implemented');
  }

  // Stock chart functionality
  function generateStockData(company, basePrice, volatility = 0.3) {
    const data = [];
    const labels = [];
    let currentPrice = basePrice;
    
    // Generate 3 years of monthly data
    for (let i = 36; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }));
      
      // Add some realistic volatility
      const change = (Math.random() - 0.5) * volatility;
      currentPrice = currentPrice * (1 + change);
      data.push(Math.max(currentPrice * 0.5, currentPrice)); // Prevent negative prices
    }
    
    return { labels, data };
  }

  function createStockChart(canvasId, company, color, basePrice) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const { labels, data } = generateStockData(company, basePrice);
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stock Price',
          data: data,
          borderColor: color,
          backgroundColor: color + '20',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  function initializeStockCharts() {
    // UK Defence Primes
    createStockChart('bae-chart', 'BAE Systems', '#60a5fa', 1000);
    createStockChart('thales-chart', 'Thales', '#059669', 120);
    createStockChart('babcock-chart', 'Babcock', '#dc2626', 400);
    createStockChart('qinetiq-chart', 'QinetiQ', '#7c3aed', 350);
    createStockChart('rolls-royce-chart', 'Rolls-Royce', '#f59e0b', 200);
    createStockChart('cobham-chart', 'Cobham', '#10b981', 300);

    // US Defence Primes
    createStockChart('lockheed-chart', 'Lockheed Martin', '#ef4444', 450);
    createStockChart('boeing-chart', 'Boeing', '#3b82f6', 200);
    createStockChart('raytheon-chart', 'Raytheon Technologies', '#8b5cf6', 100);
    createStockChart('northrop-chart', 'Northrop Grumman', '#06b6d4', 500);
    createStockChart('general-dynamics-chart', 'General Dynamics', '#f97316', 250);
    createStockChart('l3harris-chart', 'L3Harris Technologies', '#84cc16', 200);
  }

  // Initialize everything
  initializeNews();
  initializeNewsControls();
  initializeStockCharts();
  
  console.log('UK Defence Intelligence Hub initialized successfully');
});
