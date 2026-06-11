function Footer() {
  return (
    <footer className="border-top mt-5 py-5">

      <div className="container-xl">

        <div className="row">

          <div className="col-md-4">
            <h5>LakunaArt</h5>

            <p>
              Discover masterpieces across museums.
            </p>
          </div>

          <div className="col-md-2">
            <h6>Explore</h6>

            <ul className="list-unstyled">
              <li>Artworks</li>
              <li>Artists</li>
              <li>Museums</li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Resources</h6>

            <ul className="list-unstyled">
              <li>Documentation</li>
              <li>API Sources</li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Legal</h6>

            <ul className="list-unstyled">
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;