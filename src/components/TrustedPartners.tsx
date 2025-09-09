export default function TrustedPartners() {
  const partners = [
    "Panasonic",
    "ADSO",
    "GIKEN", 
    "Micron"
  ]

  return (
    <div className="mt-8">
      <p className="text-blue-200 text-sm mb-4">Trusted by</p>
      <div className="space-y-3">
        {partners.map((partner, index) => (
          <div key={index} className="text-white font-medium text-lg">
            {partner}
          </div>
        ))}
      </div>
    </div>
  )
}