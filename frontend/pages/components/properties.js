import Image from "next/image";

function Properties({
  data,
  loading,
  error,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.properties.totalCount / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    const pageRangeDisplayed = 5; // Number of pages to display in pagination controls
    const halfPageRange = Math.floor(pageRangeDisplayed / 2);
    const startPage = Math.max(currentPage - halfPageRange, 1);
    const endPage = Math.min(currentPage + halfPageRange, totalPages);

    if (startPage > 1) {
      pages.push(
        <li
          key="1"
          className={`page-item ${currentPage === 1 ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="start-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="end-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pages.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pages}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          {data.properties.properties.map((property, propertyIndex) => (
            <div key={property.id} className="col-md-4 mb-4">
              <div className="card">
                <div
                  id={`carouselExample${propertyIndex}`}
                  className="carousel slide"
                >
                  <div className="carousel-inner">
                    {property.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <Image
                          src={image}
                          alt={`Property ${property.id}`}
                          className="img-fluid"
                          width={500}
                          height={300}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExample${propertyIndex}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExample${propertyIndex}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">{property.price}</p>
                  <p className="card-text">{property.bedrooms} Bedrooms</p>
                  <p className="card-text">{property.area} sq ft</p>
                  <p className="card-text">{property.description}</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {renderPagination()}
      </div>
    </section>
  );
}

export default Properties;
