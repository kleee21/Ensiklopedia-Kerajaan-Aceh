/*
    script.js
    File ini menangani elemen interaktif umum untuk semua halaman, seperti menu seluler,
    efek navbar saat menggulir, penyorotan tautan aktif, inisialisasi AOS, dan carousel.
*/

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#main-nav .nav-link, #mobile-menu .nav-link');
    const header = document.querySelector('header'); // Pilih elemen header

    // --- Toggle Menu Seluler ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Toggle visibilitas menu seluler
        });
    } else {
        console.error("Tombol menu seluler atau elemen menu tidak ditemukan.");
    }

    // --- Penyorotan Tautan Navigasi Aktif ---
    // Bagian ini memastikan tautan yang benar disorot berdasarkan URL halaman saat ini
    const currentPath = window.location.pathname;
    const currentPageFile = currentPath.split('/').pop(); // Dapatkan 'index.html', 'sejarah.html', dll.

    navLinks.forEach(link => {
        link.classList.remove('active'); // Hapus kelas 'active' dari semua tautan terlebih dahulu

        const linkHref = link.getAttribute('href');
        // Tentukan apakah tautan ini sesuai dengan halaman saat ini
        // Menangani 'index.html' (ketika jalur kosong atau hanya '/') dan halaman spesifik
        if (currentPageFile === linkHref || (currentPageFile === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- Efek Navbar Transparan dengan Blur saat Menggulir ---
    const applyNavbarEffect = () => {
        if (window.scrollY > 50) { // Jika digulir lebih dari 50px
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    };

    // Panggil saat pemuatan halaman dan saat menggulir
    window.addEventListener('scroll', applyNavbarEffect);
    applyNavbarEffect(); // Panggil sekali saat DOM dimuat untuk mengatur status awal

    // --- Inisialisasi AOS (Animate On Scroll) ---
    // Pastikan AOS dimuat sebelum diinisialisasi
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, // Durasi animasi dalam ms
            once: true,    // Apakah animasi hanya dimainkan sekali saat menggulir ke bawah
            mirror: false, // Apakah elemen harus dianimasikan lagi saat menggulir ke atas
        });
    } else {
        console.warn("AOS library not loaded. Animations will not work.");
    }

 // --- Carousel di Halaman Beranda ---
 const carouselContainer = document.querySelector('.carousel-container');
 if (carouselContainer) { // Hanya jalankan kode carousel jika elemen ada di halaman
     const slidesContainer = carouselContainer.querySelector('.carousel-slides');
     const slides = carouselContainer.querySelectorAll('.carousel-slide');
     const prevArrow = carouselContainer.querySelector('.carousel-arrow.left');
     const nextArrow = carouselContainer.querySelector('.carousel-arrow.right');
     const dotsContainer = carouselContainer.querySelector('.carousel-dots');

     let currentIndex = 0;
     let autoSlideInterval;

     // Clear existing dots (if any, for robustness)
     dotsContainer.innerHTML = '';

     // Buat dot navigasi
     slides.forEach((_, index) => {
         const dot = document.createElement('div');
         dot.classList.add('carousel-dot');
         if (index === 0) dot.classList.add('active');
         dot.addEventListener('click', () => {
             goToSlide(index);
             resetAutoSlide();
         });
         dotsContainer.appendChild(dot);
     });

     const dots = dotsContainer.querySelectorAll('.carousel-dot');

     const goToSlide = (index) => {
         if (index < 0) {
             currentIndex = slides.length - 1;
         } else if (index >= slides.length) {
             currentIndex = 0;
         } else {
             currentIndex = index;
         }
         slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

         // Update active dot
         dots.forEach((dot, i) => {
             if (i === currentIndex) {
                 dot.classList.add('active');
             } else {
                 dot.classList.remove('active');
             }
         });
     };

     const nextSlide = () => {
         goToSlide(currentIndex + 1);
     };

     const prevSlide = () => {
         goToSlide(currentIndex - 1);
     };

     prevArrow.addEventListener('click', () => {
         prevSlide();
         resetAutoSlide();
     });

     nextArrow.addEventListener('click', () => {
         nextSlide();
         resetAutoSlide();
     });

     const startAutoSlide = () => {
         autoSlideInterval = setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
     };

     const resetAutoSlide = () => {
         clearInterval(autoSlideInterval);
         startAutoSlide();
     };

     // Initial slide setup
     goToSlide(currentIndex); // Ensure the first slide is correctly displayed on load
     startAutoSlide(); // Mulai auto-slide saat halaman dimuat
 }
});

  document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.toggle-content').forEach(button => {
            button.addEventListener('click', function() {
                const contentContainer = this.previousElementSibling;
                const moreContent = contentContainer.querySelector('.more-content');
                const firstParagraph = contentContainer.querySelector('.first-paragraph');

                if (moreContent.classList.contains('show')) {
                    // If content is expanded, collapse it
                    moreContent.classList.remove('show');
                    moreContent.classList.add('collapse');
                    firstParagraph.style.display = 'block'; // Show first paragraph again
                    this.textContent = 'See more';
                } else {
                    // If content is collapsed, expand it
                    moreContent.classList.remove('collapse');
                    moreContent.classList.add('show');
                    firstParagraph.style.display = 'none'; // Hide first paragraph
                    this.textContent = 'See less';
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moreContent = this.previousElementSibling; // This is the .more-content div
            moreContent.classList.toggle('hidden');

            if (moreContent.classList.contains('hidden')) {
                this.textContent = 'Read More';
            } else {
                this.textContent = 'Read Less';
            }
        });
    });
});