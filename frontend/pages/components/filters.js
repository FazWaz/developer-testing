function Filters({ filters, setFilters }) {
    return (
      <section>
        <div className="container">
          <h1 className="my-4">Real Estate Properties</h1>
          <div className="row">
            <div className="mb-4">
              <div className="form-group">
                <label>Type:</label>
                <select
                  className="form-control"
                  value={filters.type || ''}
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
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minPrice: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxPrice: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Bedrooms:</label>
                <input
                  className="form-control"
                  type="number"
                  value={filters.bedrooms || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      bedrooms: parseInt(e.target.value) || undefined,
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
                  value={filters.minArea || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minArea: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Max"
                  value={filters.maxArea || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxArea: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Filters;
  