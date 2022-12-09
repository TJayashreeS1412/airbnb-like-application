import React from 'react'

const Footer = (props) =>{
    return (
    <footer class="text-center text-lg-start text-dark" style={{backgroundColor: "#ECEFF1"}}>
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

              {/* Grid column */}
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 class="text-uppercase fw-bold">Products</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}/>
                <p>
                  <a href="#!" class="text-dark">MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" class="text-dark">MDWordPress</a>
                </p>
                <p>
                  <a href="#!" class="text-dark">BrandFlow</a>
                </p>
                <p>
                  <a href="#!" class="text-dark">Bootstrap Angular</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 class="text-uppercase fw-bold">Useful links</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}/>
                <p>
                  <a href="#!" class="text-dark">About us</a>
                </p>
                <p>
                  <a href="#!" class="text-dark">Join us</a>
                </p>
                <p>
                  <a href="#!" class="text-dark"></a>
                </p>
                <p>
                  <a href="#!" class="text-dark">Help</a>
                </p>
              </div>
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
        
        <div class="bottom-footer fixed-bottom">
          {/* <!-- Copyright --> */}
          <div class=" p-3" style={{width: '90%'}}>
            © 2022 Copyright
          </div>
          <div class="btn-group dropup" style={{justifyContent: 'right', alignItems: 'right', width: '10%'}}>
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor: 'transparent', color: 'black', border: 'none'}}>
              Convert Currency
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">USD</a>
              <a class="dropdown-item" href="#">INR</a>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer