import React from 'react'

function Footer() {
  return (
    <>
      <footer className="footer" style={{ backgroundColor: 'teal' }}>
        <div className="bg-teal-600 py-5 py-xl-8 py-xxl-9 border-top border-teal-300">
          <div className="container overflow-hidden">
            <div className="row gy-md-0 align-items-md-center justify-content-between">
              <div className="order-1 order-md-0">
                <div className="copyright text-white text-md-start" style={{ color: 'white' }}>
                  &copy; 2024. All Rights Reserved.
                </div>
              </div>
              <div className="order-2">
                <div className="credits text-white text-md-end" style={{ color: 'white' }}>
                  Built by <a href="http://teamignite.in" className="link-secondary text-decoration-none" style={{ color: 'inherit' }}>Team Ignite</a> with <span className="text-primary" style={{ color: 'darkblue' }}>&#9829;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer