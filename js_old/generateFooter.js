'use strict';

const generateHeader =()=>{
	const footer = `
            <footer class="footer-main">
            <div class="footer-container" id="footer">
                <div class="footer-cards">
                    <div class="footer-card">
                        <div class="footer-name">
                            SUPPORT
                        </div>
                        <div class="footer-description">
                            <a href="#">Help Center</a>
                        </div>
                    </div>
                    <div class="footer-card">
                        <div class="footer-name">
                            ABOUT US
                        </div>
                        <div class="footer-description">
                            <a href="#">Stats</a>
                        </div>
                        <div class="footer-description">
                            <a href="#">Jobs</a>
                        </div>
                        <div class="footer-description">
                            <a href="#">Contact</a>
                        </div>
                        <div class="footer-description">
                            <a href="#"></a>
                        </div>

                </div>
                    <div class="footer-card">
                        <div class="footer-name">
                            OTHERS
                        </div>
                        <div class="footer-description">
                            <a href="#">Blog</a>
                        </div>
                        <div class="footer-description">
                            <a href="index.html#how_works">Our team</a>
                        </div>
                        <div class="footer-description">
                            <a href="#">Our team</a>
                        </div>
                    </div>
                </div>
                <div class="footer-copyriting">
                    9th PLANET 2020
                </div>
            </div>
        </footer>

	`;
	document.body.insertAdjacentHTML('beforeend', footer);
}
// generateHeader();