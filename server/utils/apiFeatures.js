class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'search'];
    excludedFields.forEach((element) => delete queryObj[element]);

    let newQueryObj = {};
    let filteredObj = {};

    for (let key in queryObj) {
      if (queryObj[key].length > 0) {
        newQueryObj = queryObj[key];
        filteredObj['continent'] = JSON.parse(queryObj[key]).continent;
        if (filteredObj['continent'].length === 0) {
          filteredObj = {};
        }
      }
    }

    this.query = this.query.find(filteredObj);
    return this;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $text: { $search: this.queryString.search },
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
