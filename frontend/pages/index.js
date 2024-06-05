import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

const GET_PROPERTIES = gql`
  query GetProperties(
    $type: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $minArea: Int
    $maxArea: Int
    $limit: Int
    $offset: Int
  ) {
    properties(
      type: $type
      minPrice: $minPrice
      maxPrice: $maxPrice
      bedrooms: $bedrooms
      minArea: $minArea
      maxArea: $maxArea
      limit: $limit
      offset: $offset
    ) {
      id
      type
      price
      bedrooms
      area
      title
      description
      images
    }
  }
`;

export default function Home() {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // const { data, loading, error } = useQuery(GET_PROPERTIES, {
  //   variables: filters,
  // });

  const { data, loading, error, fetchMore } = useQuery(GET_PROPERTIES, {
    variables: { ...filters, limit: itemsPerPage, offset: 0 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (newPage) => {
    console.log("new page: " + newPage);
    setCurrentPage(newPage);
    fetchMore({
      variables: {
        offset: (newPage - 1) * itemsPerPage,
      },
    });
  };

  const totalPages = Math.ceil(data.properties.length / itemsPerPage);

  return (
    <div>
      <section>
        <div className="container">
          <h1 className="my-4">Real Estate Properties</h1>
          <div className="row">
            <div className="mb-4">
              <div className="form-group">
                <label>Type:</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price Range:</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minPrice: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxPrice: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Bedrooms:</label>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      bedrooms: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Area Range:</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minArea: parseInt(e.target.value),
                    })
                  }
                />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxArea: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {data.properties.map((property, propertyIndex) => (
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
                          <img
                            src={image}
                            alt={`Property ${property.id}`}
                            className="img-fluid"
                            style={{ height: "300px", objectFit: "cover" }}
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

          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
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
        </div>
      </section>
    </div>
  );
}
