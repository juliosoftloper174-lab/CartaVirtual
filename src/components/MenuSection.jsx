import MenuItem from "./MenuItem";

export default function MenuSection({ items }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay elementos en esta categoría</h3>
        <p className="text-gray-500 max-w-md mx-auto">Lo sentimos, actualmente no hay productos disponibles en esta categoría. Por favor, intenta con otra categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
