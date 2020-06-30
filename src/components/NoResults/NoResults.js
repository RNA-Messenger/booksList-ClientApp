import React from 'react';

const NoResults = () => (
  <div
    className="d-flex align-items-center flex-column"
    style={{ minHeight: '50vh' }}
  >
    <p> Sorry, we can seem to find what you are looking.</p>
    <p className="mb-4"> Please, refresh the page to continue browsing.</p>
    <a 
      href="#" 
      class="text-decoration-none" 
      onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }
      } 
    >
      Refresh
    </a>
  </div>
);
export default NoResults;
