const slugify = require("slugify");

function createSlug(title) {
  return slugify(title || '', { lower: true });
}

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (!data.slug) {
        data.slug = createSlug(data.title);
      } else {
        data.slug = createSlug(data.slug);
      }
    },
    beforeUpdate: async (params, data) => {
      if (!data.slug) {
        data.slug = createSlug(data.title);
      } else {
        data.slug = createSlug(data.slug);
      }
    }
  }
}
