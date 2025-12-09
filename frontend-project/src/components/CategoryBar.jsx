export default function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <section className="category-bar">
      <div className="category-bar__inner">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`category-button${selectedCategory === cat.name ? ' is-active' : ''}`}
          >
            <div className="category-button__icon">{cat.icon}</div>
            <span className="category-button__label">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
