document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#main-nav .nav-link, #mobile-menu .nav-link');
    const header = document.querySelector('header'); // Pilih elemen header

    // --- Toggle Menu Seluler ---
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        // Toggle class 'open' dan 'mobile-menu-closed'
        mobileMenu.classList.toggle('open');
        mobileMenu.classList.toggle('mobile-menu-closed');
    });

    // Tambahkan event listener untuk menutup menu saat tautan di dalamnya diklik
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobile.classList.add('mobile-menu-closed');
        });
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
            once: true,     // Apakah animasi hanya dimainkan sekali saat menggulir ke bawah
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

   
    // Untuk bagian "toggle-content" dan "read-more-btn"
    // Mari kita gabungkan ke dalam `DOMContentLoaded` yang utama.
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            mobileMenu.classList.toggle('mobile-menu-closed');
        });
    }

    // Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandableTextContainer = this.closest('.expandable-text');
            const shortContent = expandableTextContainer.querySelector('.short-content');
            const moreContent = expandableTextContainer.querySelector('.more-content');

            if (moreContent.classList.contains('hidden')) {
                shortContent.classList.add('hidden'); // Hide the short content
                moreContent.classList.remove('hidden');
                this.textContent = 'Read Less';
            } else {
                shortContent.classList.remove('hidden'); // Show the short content
                moreContent.classList.add('hidden');
                this.textContent = 'Read More';
            }
        });
    });
});
