import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ search, onSearch }) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-3 rounded-full border shadow dark:bg-gray-800"
    />
    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
  </div>
);