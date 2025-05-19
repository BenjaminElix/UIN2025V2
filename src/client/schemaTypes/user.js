export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'gender', title: 'Gender', type: 'string' },
    { name: 'age',    title: 'Age',    type: 'number' },
    {
      name: 'wishlist',
      title: 'Wishlist',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }]
    },
    {
      name: 'previousPurchases',
      title: 'Previous Purchases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }]
    }
  ]
}