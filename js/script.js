document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle") ||
        document.querySelector(".mobile-menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =====================================================
       CONTACT WHATSAPP FORM
    ===================================================== */

    const form =
        document.getElementById("help-form");


    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            const nameField =
                document.getElementById("name");

            const emailField =
                document.getElementById("email");

            const whatsappField =
                document.getElementById("whatsapp");

            const locationField =
                document.getElementById("location");

            const helpTypeField =
                document.getElementById("help-type");

            const messageField =
                document.getElementById("message");


            if (
                !nameField ||
                !emailField ||
                !locationField ||
                !helpTypeField ||
                !messageField
            ) {
                return;
            }


            const name =
                nameField.value.trim();

            const email =
                emailField.value.trim();

            const whatsapp =
                whatsappField
                    ? whatsappField.value.trim()
                    : "";

            const location =
                locationField.value;

            const helpType =
                helpTypeField.value;

            const message =
                messageField.value.trim();



            /* VALIDATION */

            if (
                !name ||
                !email ||
                !location ||
                !helpType ||
                !message
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }



            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }



            /* CREATE WHATSAPP MESSAGE */

            const whatsappMessage =
`Hello Madeira Helper! 👋

I would like some help in Madeira.

Name: ${name}

Email: ${email}

WhatsApp: ${whatsapp || "Not provided"}

Location: ${location}

Help needed: ${helpType}

My request:

${message}

Thank you!`;



            const phoneNumber =
                "351927188219";


            const whatsappURL =
                "https://wa.me/" +
                phoneNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);


            window.location.href =
                whatsappURL;

        });

    }



    /* =====================================================
       BUSINESS DIRECTORY
    ===================================================== */

    const directorySearch =
        document.getElementById(
            "directory-search"
        );


    const directoryCards =
        document.querySelectorAll(
            ".directory-business-card"
        );


    const filterButtons =
        document.querySelectorAll(
            ".directory-filter"
        );


    const directoryCount =
        document.getElementById(
            "directory-count"
        );


    const noResults =
        document.getElementById(
            "directory-no-results"
        );


    const directorySection =
        document.querySelector(
            ".business-directory-section"
        );


    const foxgloveSection =
        document.querySelector(
            ".directory-featured-partner"
        );


    const foxglovePartner =
        document.getElementById(
            "foxglove-partner"
        );


    let activeCategory =
        "all";



    /* =====================================================
       UPDATE DIRECTORY
    ===================================================== */

    function updateDirectory() {


        /*
         * Stop if this page does not contain
         * the business directory.
         */

        if (
            directoryCards.length === 0 &&
            !foxglovePartner
        ) {

            return;

        }



        const searchTerm =
            directorySearch
                ? directorySearch.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleBusinesses =
            0;



        /* =================================================
           NORMAL BUSINESS CARDS
        ================================================= */

        directoryCards.forEach(
            function (card) {


                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const location =
                    (
                        card.dataset.location ||
                        ""
                    ).toLowerCase();


                const searchData =
                    (
                        card.dataset.search ||
                        ""
                    ).toLowerCase();


                const businessText =
                    (
                        card.textContent +
                        " " +
                        searchData +
                        " " +
                        location
                    ).toLowerCase();



                const matchesCategory =
                    activeCategory === "all" ||
                    category === activeCategory;



                const matchesSearch =
                    searchTerm === "" ||
                    businessText.includes(
                        searchTerm
                    );



                if (
                    matchesCategory &&
                    matchesSearch
                ) {

                    card.style.display = "";

                    visibleBusinesses++;

                } else {

                    card.style.display = "none";

                }

            }
        );



        /* =================================================
           FOXGLOVE FEATURED PARTNER
        ================================================= */

        let foxgloveVisible =
            false;


        if (
            foxgloveSection &&
            foxglovePartner
        ) {


            const foxgloveCategory =
                (
                    foxglovePartner.dataset.category ||
                    "finance"
                ).toLowerCase();


            const foxgloveSearchData =
                (
                    foxglovePartner.textContent +
                    " " +
                    (
                        foxglovePartner.dataset.search ||
                        ""
                    )
                ).toLowerCase();



            const foxgloveKeywords = [

                "foxglove",

                "foxglove international",

                "foxglove international limited",

                "finance",

                "financial",

                "financial services",

                "investment",

                "investments",

                "investor",

                "investors",

                "funding",

                "business funding",

                "featured partner",

                "partner"

            ];



            const matchesFoxgloveSearch =
                searchTerm !== "" &&
                (
                    foxgloveSearchData.includes(
                        searchTerm
                    ) ||

                    foxgloveKeywords.some(
                        function (keyword) {

                            return (
                                keyword.includes(
                                    searchTerm
                                ) ||
                                searchTerm.includes(
                                    keyword
                                )
                            );

                        }
                    )
                );



            /*
             * ALL CATEGORY:
             * Foxglove is visible normally.
             */

            if (
                activeCategory === "all" &&
                searchTerm === ""
            ) {

                foxgloveVisible = true;

            }



            /*
             * FINANCE CATEGORY:
             * Foxglove becomes the Finance result.
             */

            else if (
                activeCategory ===
                foxgloveCategory
            ) {

                foxgloveVisible = true;

            }



            /*
             * TEXT SEARCH:
             * Show Foxglove for finance,
             * investment, Foxglove, etc.
             */

            else if (
                activeCategory === "all" &&
                matchesFoxgloveSearch
            ) {

                foxgloveVisible = true;

            }



            /*
             * OTHERWISE HIDE FOXGLOVE.
             */

            else {

                foxgloveVisible = false;

            }



            if (foxgloveVisible) {

                foxgloveSection.style.display =
                    "";

            } else {

                foxgloveSection.style.display =
                    "none";

            }

        }



        /* =================================================
           BUSINESS COUNTER
        ================================================= */

        if (directoryCount) {


            /*
             * Finance is represented by the
             * Featured Partner rather than
             * a normal directory card.
             */

            if (
                activeCategory === "finance" &&
                foxgloveVisible
            ) {

                directoryCount.textContent =
                    "1 featured partner";

            }


            else if (
                searchTerm !== "" &&
                visibleBusinesses === 0 &&
                foxgloveVisible
            ) {

                directoryCount.textContent =
                    "1 featured partner";

            }


            else if (
                visibleBusinesses === 1
            ) {

                directoryCount.textContent =
                    "1 business";

            }


            else {

                directoryCount.textContent =
                    visibleBusinesses +
                    " businesses";

            }

        }



        /* =================================================
           NO RESULTS
        ================================================= */

        if (noResults) {


            const hasResults =
                visibleBusinesses > 0 ||
                foxgloveVisible;


            noResults.hidden =
                hasResults;

        }

    }



    /* =====================================================
       CATEGORY FILTER BUTTONS
    ===================================================== */

    if (filterButtons.length > 0) {


        filterButtons.forEach(
            function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        activeCategory =
                            this.dataset.filter ||
                            "all";



                        /* REMOVE ACTIVE STATE */

                        filterButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );



                        /* ACTIVATE CLICKED BUTTON */

                        this.classList.add(
                            "active"
                        );



                        /*
                         * Clear text search when
                         * choosing a category.
                         */

                        if (directorySearch) {

                            directorySearch.value =
                                "";

                        }



                        /* UPDATE RESULTS */

                        updateDirectory();



                        /*
                         * FINANCE:
                         * Scroll directly to
                         * Foxglove Featured Partner.
                         */

                        if (
                            activeCategory === "finance" &&
                            foxgloveSection
                        ) {

                            foxgloveSection.scrollIntoView({

                                behavior: "smooth",

                                block: "start"

                            });

                        }



                        /*
                         * OTHER CATEGORIES:
                         * Scroll to normal directory.
                         */

                        else if (directorySection) {

                            directorySection.scrollIntoView({

                                behavior: "smooth",

                                block: "start"

                            });

                        }

                    }
                );

            }
        );

    }



    /* =====================================================
       DIRECTORY LIVE SEARCH
    ===================================================== */

    if (directorySearch) {


        directorySearch.addEventListener(
            "input",
            function () {


                /*
                 * Manual searches always search
                 * across all categories.
                 */

                activeCategory =
                    "all";



                filterButtons.forEach(
                    function (button) {


                        if (
                            button.dataset.filter ===
                            "all"
                        ) {

                            button.classList.add(
                                "active"
                            );

                        } else {

                            button.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                updateDirectory();

            }
        );

    }



    /* =====================================================
       TOP FIND HELP FORM
    ===================================================== */

    const businessSearchButton =
        document.getElementById(
            "business-search-button"
        );


    if (businessSearchButton) {


        businessSearchButton.addEventListener(
            "click",
            function () {


                const serviceInput =
                    document.getElementById(
                        "business-search"
                    );


                const locationSelect =
                    document.getElementById(
                        "location-search"
                    );


                if (
                    !serviceInput ||
                    !locationSelect
                ) {

                    return;

                }



                const service =
                    serviceInput.value.trim();



                if (!service) {

                    alert(
                        "Please tell us what service you are looking for."
                    );

                    return;

                }



                const selectedLocation =
                    locationSelect.value
                        ? locationSelect.options[
                            locationSelect.selectedIndex
                        ].text
                        : "Madeira";



                const businessMessage =
`Hello Madeira Helper! 👋

I'm looking for: ${service}

Location: ${selectedLocation}

Can you help me find a suitable local service or business?

Thank you!`;



                const phoneNumber =
                    "351927188219";


                const whatsappURL =
                    "https://wa.me/" +
                    phoneNumber +
                    "?text=" +
                    encodeURIComponent(
                        businessMessage
                    );


                window.location.href =
                    whatsappURL;

            }
        );

    }



    /* =====================================================
       INITIALISE DIRECTORY
    ===================================================== */

    if (
        directoryCards.length > 0 ||
        foxglovePartner
    ) {

        updateDirectory();

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(

            ".service-card, " +

            ".language-intro, " +

            ".language-content, " +

            ".step, " +

            ".new-madeira-image, " +

            ".new-madeira-content, " +

            ".big-cta-inner, " +

            ".directory-card, " +

            ".directory-business-card, " +

            ".business-category-card, " +

            ".about-value-card, " +

            ".contact-process-step"

        );


    if ("IntersectionObserver" in window) {


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );

            }
        );



        const revealObserver =
            new IntersectionObserver(

                function (entries) {


                    entries.forEach(
                        function (entry) {


                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {

                    threshold: 0.12

                }

            );



        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       HERO IMAGE EFFECT
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (heroImage) {


        window.addEventListener(
            "scroll",
            function () {


                const scrollPosition =
                    window.scrollY;


                if (scrollPosition < 900) {

                    heroImage.style.transform =
                        `scale(${
                            1 +
                            scrollPosition *
                            0.00003
                        })`;

                }

            }
        );

    }



    /* =====================================================
       HEADER SHADOW
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {


        window.addEventListener(
            "scroll",
            function () {


                if (
                    window.scrollY > 20
                ) {

                    header.style.boxShadow =
                        "0 10px 35px rgba(18, 33, 27, 0.08)";

                } else {

                    header.style.boxShadow =
                        "none";

                }

            }
        );

    }


});

/* =========================================================
   FOXGLOVE FEATURED PARTNER MODAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const foxgloveCard =
        document.getElementById("foxglove-partner");

    const foxgloveModal =
        document.getElementById("foxglove-modal");

    if (!foxgloveCard || !foxgloveModal) {
        return;
    }


    const closeButtons =
        foxgloveModal.querySelectorAll("[data-foxglove-close]");

    const modalPanel =
        foxgloveModal.querySelector(".foxglove-modal-panel");

    const closeButton =
        foxgloveModal.querySelector(".foxglove-modal-close");

    const foxgloveVideo =
        foxgloveModal.querySelector(".foxglove-video");

    let previouslyFocusedElement = null;


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openFoxgloveModal() {

        previouslyFocusedElement =
            document.activeElement;

        foxgloveModal.classList.add("is-open");

        foxgloveModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "foxglove-modal-open"
        );


        /*
         * Move the modal back to the top every time
         * somebody opens Foxglove.
         */

        if (modalPanel) {
            modalPanel.scrollTop = 0;
        }


        /*
         * Move keyboard focus to the close button.
         */

        window.setTimeout(function () {

            if (closeButton) {
                closeButton.focus();
            }

        }, 300);

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeFoxgloveModal() {

        foxgloveModal.classList.remove("is-open");

        foxgloveModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "foxglove-modal-open"
        );


        /*
         * Stop the video when the visitor closes
         * the Foxglove profile.
         */

        if (foxgloveVideo) {

            foxgloveVideo.pause();

            foxgloveVideo.currentTime = 0;

        }


        /*
         * Return keyboard focus to the Foxglove card.
         */

        window.setTimeout(function () {

            if (
                previouslyFocusedElement &&
                typeof previouslyFocusedElement.focus === "function"
            ) {

                previouslyFocusedElement.focus();

            }

        }, 300);

    }


    /* =====================================================
       CLICK FOXGLOVE CARD
    ===================================================== */

    foxgloveCard.addEventListener(
        "click",
        function () {

            openFoxgloveModal();

        }
    );


    /* =====================================================
       KEYBOARD — ENTER / SPACE
    ===================================================== */

    foxgloveCard.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openFoxgloveModal();

            }

        }
    );


    /* =====================================================
       CLOSE BUTTONS / BACKDROP
    ===================================================== */

    closeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                closeFoxgloveModal();

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                foxgloveModal.classList.contains("is-open")
            ) {

                closeFoxgloveModal();

            }

        }
    );

});