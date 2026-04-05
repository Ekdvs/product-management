interface Props {
    search: string;
    onSearch: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ search, onSearch }) => {
    return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-full border shadow dark:bg-gray-800"
      />
      <span className="absolute left-3 top-3">🔍</span>
    </div>
  );
}