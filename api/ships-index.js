const WG = 'https://vortex.worldofwarships.eu/api/encyclopedia/en'
const LOCALE = 'en'
const TYPES = ['Submarine', 'Destroyer', 'Cruiser', 'Battleship', 'AirCarrier']

export async function GET() {
  const [vehicles, nationsRes, typesRes, mediaRes] = await Promise.all([
    fetch(`${WG}/vehicles/`).then((r) => r.json()),
    fetch(`${WG}/nations/`).then((r) => r.json()),
    fetch(`${WG}/vehicle_types_common/`).then((r) => r.json()),
    fetch(`${WG}/media_path/`).then((r) => r.json()),
  ])

  const mediaPath = mediaRes.data
  const nationsByName = new Map(nationsRes.data.map((n) => [n.name, n]))
  const url = (path) => (path ? mediaPath + path : '')
  const hex = (c) => `#${c.toString(16).padStart(6, '0')}`

  const ships = []
  for (const [id, v] of Object.entries(vehicles.data)) {
    const typeId = TYPES.find((t) => v.tags.includes(t))
    if (!typeId) continue
    const nation = nationsByName.get(v.nation)
    const type = typesRes.data[typeId]
    const rarity = v.tags.includes('uiPremium')
      ? 'premium'
      : v.tags.includes('uiSpecial')
        ? 'special'
        : 'tech'
    const name = v.localization.mark[LOCALE] ?? v.name
    ships.push({
      id,
      name,
      searchableName: name.toLowerCase(),
      description: v.localization.description[LOCALE] ?? '',
      tier: v.level,
      nationId: v.nation,
      nationName: nation?.localization.mark[LOCALE] ?? v.nation,
      nationColor: nation ? hex(nation.color) : '#3f5b6b',
      nationFlagUrl: url(nation?.icons.small),
      typeId,
      typeName: type?.localization.mark[LOCALE] ?? typeId,
      typeSortOrder: type?.sort_order ?? Number.MAX_SAFE_INTEGER,
      typeIconUrl: url(type?.icons[rarity === 'tech' ? 'default' : rarity]),
      rarity,
      previewImageUrl: url(v.icons.medium),
      detailImageUrl: url(v.icons.large),
    })
  }

  const nations = nationsRes.data
    .map((n) => ({
      id: n.name,
      name: n.localization.mark[LOCALE] ?? n.name,
      color: hex(n.color),
      flagUrl: url(n.icons.small),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const shipTypes = Object.entries(typesRes.data)
    .map(([id, t]) => ({
      id,
      name: t.localization.mark[LOCALE] ?? id,
      iconUrl: url(t.icons.default),
      sortOrder: t.sort_order,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return new Response(JSON.stringify({ ships, nations, shipTypes }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
