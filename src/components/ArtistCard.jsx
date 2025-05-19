export default function ArtistCard({ artist }) {
  const { name, images } = artist
  const img = images?.[0]?.url

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm p-2">
      {img && <img src={img} alt={name} className="h-24 w-full object-cover mb-2" />}
      <h4 className="text-center">{name}</h4>
    </div>
  )
}
