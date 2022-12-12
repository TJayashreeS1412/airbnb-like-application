import React from 'react'
import "./scss/footer.scss"
const Footer = (props) =>{
    return (
    <footer class="text-center text-lg-start text-dark footer" style={{backgroundColor: "#ECEFF1"}}>
        {/* Section: Links */}
        <section class="p-2">
          <div class="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div class="row mt-3">
              {/* Grid column */}
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 class="text-uppercase fw-bold">Swayaway Inc.</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}} />
                <p>
                  We thrive to provide the most authentic yet the most affordable housing around the globe. And maybe beyond.
                </p>
              </div>
              {/* Grid column */}

        
              {/* <!-- Grid column --> */}
              {/* <!-- Grid column --> */}
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 class="text-uppercase fw-bold">Contact</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}/>
                <p><i class="fas fa-home mr-3"></i> UTD, Richardson, TX</p>
                <p><i class="fas fa-envelope mr-3"></i> info@swayaway.com</p>
                <p><i class="fas fa-phone mr-3"></i> + 465-574-5847</p>
                
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row -->/ */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}
      {/* <!-- Section: Social media --> */}
        <section class="text-center mb-5" >
          <div>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="text-dark me-4">
              <i class="fab fa-github"></i>
            </a>
          </div>
          {/* <!-- Right --> */}
        </section>
        {/* <!-- Section: Social media --> */}
        

      </footer>
    );
}

export default Footer