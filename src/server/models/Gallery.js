import keystone from 'keystone';
const Types = keystone.Field.Types;

const Gallery = new keystone.List('Gallery', {
  autokey: {
    path: 'key',
    from: 'name',
    unique: true
  }
});

Gallery.add({
  name: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  heroImage: {
    type: Types.CloudinaryImage
  },
  images: {
    type: Types.CloudinaryImages
  }
});

Gallery.register();
